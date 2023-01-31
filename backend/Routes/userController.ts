// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import userLogic from '../Logic/userLogic';
import vacationLogic from '../Logic/vacationLogic';


// generic router 
const userController = express.Router();

userController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
});

// get all users
userController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await userLogic.allUsers());
})

// registration of the new user
userController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const newUser = request.body;
  response.status(201).json(await userLogic.addUser(newUser));
});

//delete user by id
userController.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const userId = +request.params.id;
  await userLogic.deleteUser(userId);
  response.status(204).send( "was deleted successfully");
});

// login
userController.post("/login",async (request: Request, response: Response, next: NextFunction) => {
  //user admin , password admin...
  const user = request.body;
  console.log(user.username,user.password);
  if (user.username==="admin" && user.password==="password"){
      // response.status(202).json(await vacationLogic.getAllVacations())
      response.status(202).send("admin")
      console.log("Hello Admin")
    } else {
      response.status(202).json(await userLogic.loginUser(user.username, user.password));
    }
    });

    //get user  by id
  userController.get("/id/:id", async (request: Request, response: Response, next: NextFunction) => {
      const userId = +request.params.id;
      response.status(200).json(await userLogic.getUserById(userId));
    });

    //get user  by username
  userController.get("/username/:username", async (request: Request, response: Response, next: NextFunction) => {
    const userName = request.params.username;
    response.status(200).json(await userLogic.getUserByUserName(userName));
  });

export default userController;