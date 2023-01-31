import express, {NextFunction, Request, Response} from 'express';
import favoritesLogic from '../Logic/favoritesLogic';
import vacationLogic from '../Logic/vacationLogic';

// generic router 
const favoritesController = express.Router();

//get favorites  by userId
favoritesController.get("/id/:id", async (request: Request, response: Response, next: NextFunction) => {
    const favoriteId = +request.params.id;
    response.status(200).json(await favoritesLogic.getFavoriteById(favoriteId));
});

// get all favorites
favoritesController.get("/all", async (request: Request, response: Response, next: NextFunction) => {
    response.status(200).json(await favoritesLogic.allFavorites());
})

//delete favorite by vacationId
favoritesController.delete("/:id", async (request: Request, response: Response, next: NextFunction) => {
    const favoriteId = +request.params.id;
   // console.log(favoriteId);
    await vacationLogic.removeFollower(favoriteId);
    await favoritesLogic.deleteFavorite(favoriteId);
    response.status(204).send( "was deleted successfully");
});

// add new favorite
favoritesController.post("/add", async (request: Request, response: Response, next: NextFunction) => {
    const newFavorite = request.body;
    await vacationLogic.addFollower(newFavorite);
    response.status(201).json(await favoritesLogic.addFavorite(newFavorite));
});

export default favoritesController;