// Main file in the SERVER 
import cors from "cors";
import express from "express";
import ErrorHandler from "./MiddleWare/route-not-found";
import favoritesController from "./Routes/favoritesController";
import userController from "./Routes/userController";
import vacationController from "./Routes/vacationController";
import mysql_init from "./sql/init";
import config from "./Utils/config";


const server = express();
mysql_init();
const currentPort = config.port;
server.use(cors());
server.use(express.json());
server.use("/vacations", vacationController)
server.use("/user", userController)
server.use("/favorites", favoritesController)
server.use("*", ErrorHandler);

server.listen(currentPort, () => {console.log(`listening on http://localhost:${currentPort}`)} )