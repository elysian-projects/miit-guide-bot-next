import { defaultUserData } from "@/constants/user";
import { User } from "@/controllers/userController";
import { UserData } from "@/types/user";
import { describe, expect, jest, test } from "@jest/globals";

const chatId = 1;
const userData: UserData = {
  title: "Title 1", content: [
    {label: "Label 1", content: "Content 1", picture: "Picture 1"},
    {label: "Label 2", content: "Content 2", picture: "Picture 2"},
    {label: "Label 3", content: "Content 3", picture: "Picture 3"},
  ], step: 0
};
const handlers = {
  changeStepHandler: () => {
    return;
  }
};

describe("creates and mutates user object", () => {
  test("should create a user controller object", () => {
    const user = new User(chatId);

    expect(user).toBeInstanceOf(User);
    expect(user.id()).toBe(chatId);
    expect(user.getData()).toStrictEqual(defaultUserData);

    expect(() => {
      user.getCurrentContent();
    }).toThrowError();
  });

  test("should change state with setters", () => {
    const user = new User(chatId);

    user.setData(userData);

    expect(user.getData()).toStrictEqual(userData);
    expect(user.getCurrentContent()).toStrictEqual(userData.content[0]);
  });

  test("should throw errors on nextStep and prevStep if the data list is empty", () => {
    const user = new User(chatId);

    expect(() => {
      user.nextStep();
    }).toThrowError();

    expect(() => {
      user.prevStep();
    }).toThrowError();
  });

  test("should increase and decrease step", () => {
    const user = new User(chatId);

    user.setData(userData);
    expect(user.isFirstStep()).toBeTruthy();
    expect(user.isLastStep()).toBeFalsy();
    expect(user.getCurrentContent()).toStrictEqual(userData.content[0]);

    user.nextStep();
    expect(user.isFirstStep()).toBeFalsy();
    expect(user.isLastStep()).toBeFalsy();
    expect(user.getCurrentContent()).toStrictEqual(userData.content[1]);

    user.nextStep();
    expect(user.isFirstStep()).toBeFalsy();
    expect(user.isLastStep()).toBeTruthy();
    expect(user.getCurrentContent()).toStrictEqual(userData.content[2]);

    // Nothing must change here
    user.nextStep();
    expect(user.isFirstStep()).toBeFalsy();
    expect(user.isLastStep()).toBeTruthy();
    expect(user.getCurrentContent()).toStrictEqual(userData.content[2]);

    user.prevStep();
    expect(user.isFirstStep()).toBeFalsy();
    expect(user.isLastStep()).toBeFalsy();
    expect(user.getCurrentContent()).toStrictEqual(userData.content[1]);

    user.prevStep();
    expect(user.isFirstStep()).toBeTruthy();
    expect(user.isLastStep()).toBeFalsy();
    expect(user.getCurrentContent()).toStrictEqual(userData.content[0]);

    // Nothing must change here
    user.prevStep();
    expect(user.isFirstStep()).toBeTruthy();
    expect(user.isLastStep()).toBeFalsy();
    expect(user.getCurrentContent()).toStrictEqual(userData.content[0]);
  });

  test("should add change step handler and call it on step change", () => {
    const handlerSpy = jest.spyOn(handlers, "changeStepHandler");
    const user = new User(chatId);

    user.setData(userData);
    user.addChangeStepHandler(handlers.changeStepHandler);

    user.nextStep();
    expect(handlerSpy).toBeCalledTimes(1);

    user.nextStep();
    expect(handlerSpy).toBeCalledTimes(2);

    // This time handler must not be called as we are on the last step
    user.nextStep();
    expect(handlerSpy).toBeCalledTimes(2);

    user.prevStep();
    expect(handlerSpy).toBeCalledTimes(3);

    user.prevStep();
    expect(handlerSpy).toBeCalledTimes(4);

    // This time handler must not be called as we are on the first step
    user.prevStep();
    expect(handlerSpy).toBeCalledTimes(4);
  });
});
