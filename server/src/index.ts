import bodyParser from "body-parser";
import express, { Router } from "express";
import { join } from "path";
import * as tabController from "./controllers/tabs.controller";
import * as userController from "./controllers/users.controller";
import { DBSource } from "./database/data-source";
import * as baseRoutes from "./routes/base";

// Initialize database connection and make migrations
DBSource
  .initialize()
  .then(() => console.log("Schemas initialized!"))
  .catch(error => console.log(error));

// Initialize application
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
router.delete("/api/tabs", tabController.deleteTab);

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
