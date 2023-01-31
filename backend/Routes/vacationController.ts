// All the routes that connect the the DB and client.
import express, {NextFunction, Request, Response} from 'express';
import vacationLogic from '../Logic/vacationLogic';


// generic router 
const vacationController = express.Router();

vacationController.get("/", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json("controller working");
})

// get all vacations
vacationController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
  response.status(200).json(await vacationLogic.getAllVacations());
})

  //get vacation  by id
  vacationController.get("/id/:id", async (request: Request, response: Response, next: NextFunction) => {
    const vacationId = +request.params.id;
    response.status(200).json(await vacationLogic.getVacationById(vacationId));
  }); 

// add new vacation
vacationController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
  const newVacation = request.body;
  response.status(201).json(await vacationLogic.addVacation(newVacation));
});

//delete vacation by id
vacationController.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
  const vacationId = +request.params.id;
  await vacationLogic.deleteVacation(vacationId);
  response.status(204).send( "was deleted successfully");
});

//update vacation
vacationController.put("/", async (request: Request, response: Response, next: NextFunction) => {
    const body = request.body;
    response.status(201).json( await vacationLogic.updateVacation(body));
});

export default vacationController;