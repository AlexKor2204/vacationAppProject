import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
import Favorites from "../Models/favoritesModel";
import Vacation from "../Models/vacationModel";

 // get favorite vacations by userId
const getFavoriteById = async(id:number):Promise<Favorites> =>{
    const sql = `SELECT* FROM favorites WHERE userId =${id}`;
    const favorite = await dal.execute(sql);
    return favorite;
}

// get all favorites
const allFavorites = async (): Promise<Favorites[]> => {
    // command line for the DB
    const sql = `
    SELECT favorites.* , vacations.destination AS vacationId
    FROM favorites JOIN vacations
    ON favorites.vacationId = vacations.id
`;
    // a promise function that connects us to the database with the command line
    const favorites = await dal.execute(sql);
    return favorites;
}

//add new favorite
const addFavorite = async(newFavorite:Favorites):Promise<Favorites> =>{
    const sql =`SELECT * FROM favorites WHERE userId = '${newFavorite.userId}' AND vacationId ='${newFavorite.vacationId}'`;
    const favorite = await dal.execute(sql);
    if (favorite.length>0){
        console.log("This vacation is already in favorites") 
        
    } else{
    const newSql = `
    INSERT INTO favorites (userID, vacationId) 
    VALUES (${newFavorite.userId}, ${newFavorite.vacationId});
    `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(newSql);
    newFavorite.id = result.insertId;
    return newFavorite;
}
}

//delete favorite
const deleteFavorite = async(id:number):Promise<void> =>{
    const sql = `DELETE FROM favorites WHERE vacationId =${id}`;
    return await dal.execute(sql);
}

export default{
    getFavoriteById,
    allFavorites,
    deleteFavorite,
    addFavorite
}