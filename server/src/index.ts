import bodyParser from "body-parser";
import express, { Router } from "express";
import { join } from "path";
import * as tabController from "./controllers/tabs.controller";
import * as userController from "./controllers/users.controller";
import * as baseRoutes from "./routes/base";

const server = express();
const PORT = process.env.SERVER_PORT || 5000;

// Main router, do NOT export it
const router = Router();

// Router handlers
router.get("/", baseRoutes.index);

// User routes
router.get("/api/users", userController.getUser);

// Tab routes
router.post("/api/tabs", tabController.insertTab);
router.get("/api/tabs", tabController.getTabs);
router.put("/api/tabs", tabController.updateTab);

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
