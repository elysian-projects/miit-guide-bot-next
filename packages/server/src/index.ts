import bodyParser from "body-parser";
import express, { Router } from "express";
import { join } from "path";
import { DBSource } from "./database/data-source";
import * as articleService from "./services/articles.service";
import * as baseService from "./services/base.service";
import { invalidSyntaxError } from "./services/error.service";
import * as tabService from "./services/tabs.service";
import * as userService from "./services/users.service";

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
router.get("/", baseService.index);

// User routes
router.get("/api/users", userService.getUser);

// Tab routes
router.post("/api/tabs", tabService.insertTab);
router.get("/api/tabs", tabService.getTabs);
router.put("/api/tabs", tabService.updateTab);
router.delete("/api/tabs", tabService.deleteTab);

// Article routes
router.post("/api/articles", articleService.insertArticle);
router.get("/api/articles", articleService.getArticles);
router.put("/api/articles", articleService.updateArticle);
router.delete("/api/articles", articleService.deleteArticle);

// The rest queries must be considered as non-correct routes
router.get("*", baseService.notFound);

// Middlewares
server.use(bodyParser.json());
server.use(invalidSyntaxError);
server.use("/assets", express.static(join(__dirname, "../assets")));
server.use(router);

const bootstrap = () => {
  server.listen(PORT, () => {
    console.log("Server is running on port:", PORT);
  });
};

bootstrap();
