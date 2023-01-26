import bodyParser from "body-parser";
import express, { Router } from "express";
import { join } from "path";
import { userController } from "./controllers/users.controller";
import baseRoutes from "./routes/base";

const server = express();
const PORT = process.env.SERVER_PORT || 5000;

// Main router, do NOT export it
const router = Router();

// Router handlers
router.get("/", baseRoutes.index);

// User routes
router.get("/api/user/:id", userController.getUser);


router.get("*", baseRoutes.notFound);

// Middlewares
server.use(bodyParser.json());
server.use("/assets", express.static(join(__dirname, "../assets")));
server.use(router);

const bootstrap = () => {
  server.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
};

bootstrap();
