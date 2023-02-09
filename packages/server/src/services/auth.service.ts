import { DBSource } from "@/database/data-source";
import { Token } from "@/entity/tokens";
import { User } from "@/entity/users";
import { generateAuthToken, generateExpirationDate, getEncryptedPassword, isValidPassword } from "@/utils/auth";
import { createResponse } from "@/utils/response";
import { Handler } from "express";

export const checkUserTokenExpiration: Handler = async (req, res, next) => {
  const {token} = req.body;

  if(!token) {
    return res.status(401).json(createResponse({
      status: 401,
      ok: false,
      message: "Невалидные данные!"
    }));
  }

  const tokenRepo = DBSource.getRepository(Token);

  const signedUser = await tokenRepo.findOneBy({
    value: token
  });

  if(!signedUser) {
    return res.status(401).json(createResponse({
      status: 401,
      ok: false,
      message: "Пользователь не авторизован!"
    }));
  }

  if(signedUser.expires > new Date()) {
    tokenRepo.delete(signedUser);

    return res.status(401).json(createResponse({
      status: 401,
      ok: false,
      message: "Необходимой войти в систему ещё раз!"
    }));
  }

  return next();
};

export const loginUser: Handler = async (req, res) => {
  const {login, password} = req.body;

  console.log(login, password);

  if(!login?.trim() || !password?.trim()) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Некорректные данные!"
    }));
  }

  const tokenRepo = DBSource.getRepository(Token);
  const userRepo = DBSource.getRepository(User);

  const existingUser = await userRepo.findOneBy({
    login: login?.trim()
  });

  if(!existingUser) {
    return res.status(404).json(createResponse({
      status: 404,
      ok: false,
      message: "Пользователь с таким логином не найден!"
    }));
  }

  if(await isValidPassword(password, existingUser.password) === false) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Пароль введён неверно!"
    }));
  }

  const authToken = generateAuthToken(existingUser);
  const tokenRecord = new Token();

  tokenRecord.userId = existingUser.id;
  tokenRecord.value = authToken;
  tokenRecord.expires = generateExpirationDate();

  await tokenRepo.save(tokenRecord);

  return res.status(200).json(createResponse({
    status: 200,
    ok: true,
    data: {
      token: authToken
    }
  }));
};

export const logoutUser: Handler = async (req, res) => {
  const {token} = req.body;

  if(!token?.trim()) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Невалидные данные!"
    }));
  }

  const tokenRepo = DBSource.getRepository(Token);

  const existingTokenRecord = await tokenRepo.findOneBy({
    value: token
  });

  if(!existingTokenRecord) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Записи о сессии не существует!"
    }));
  }

  tokenRepo.delete(existingTokenRecord);

  return res.status(200).json(createResponse({
    status: 200,
    ok: true
  }));
};

export const signUpUser: Handler = async (req, res) => {
  if(process.env.PRODUCTION) {
    return res.status(403).json(createResponse({
      status: 403,
      ok: false,
      message: "Невозможно выполнить данное действие!"
    }));
  }

  const {login, password} = req.body;

  if(!login?.trim() || !password?.trim()) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Невалидные данные!"
    }));
  }

  const userRepo = DBSource.getRepository(User);

  const userWithSameLogin = await userRepo.countBy({
    login: login?.trim()
  });

  if(userWithSameLogin) {
    return res.status(400).json(createResponse({
      status: 400,
      ok: false,
      message: "Пользователь с такими данными уже существует!"
    }));
  }

  const newUser = new User();

  newUser.login = login?.trim();
  newUser.password = await getEncryptedPassword(password?.trim());

  userRepo.save(newUser);

  return res.status(201).json(createResponse({
    status: 200,
    ok: true
  }));
};
