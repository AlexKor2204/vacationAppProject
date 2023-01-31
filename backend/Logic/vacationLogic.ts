import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
// import model from...
import Vacation from "../Models/vacationModel";
import Favorites from "../Models/favoritesModel";


//get all vacations 
const getAllVacations = async (): Promise<Vacation[]> => {
    // command line for the DB
    const sql = "SELECT * FROM vacations";
    // a promise function that connects us to the database with the command line
    const vacations = await dal.execute(sql);
    return vacations;
}

//get vacation by id
const getVacationById = async(id:number):Promise<Vacation> =>{
    const sql = `SELECT * FROM vacations WHERE id =${id}`;
    const vacation = await dal.execute(sql);
    return vacation;
}

//add new vacation
const addVacation = async(newVacation:Vacation):Promise<Vacation> =>{
    const sql = `
    INSERT INTO vacations (description, destination, image, startDate, endDate, price, followers) 
    VALUES ('${newVacation.description}', '${newVacation.destination}', '${newVacation.image}', '${newVacation.startDate}', '${newVacation.endDate}', '${newVacation.price}', ${newVacation.followers});
    `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(sql);
    newVacation.id = result.insertId;
    return newVacation;
}

//update vacation
const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
    const sql = `
    UPDATE vacations 
    SET description = '${vacation.description}',
    destination = '${vacation.destination}',
    image = '${vacation.image}',
    startDate = '${vacation.startDate}',
    endDate = '${vacation.endDate}', 
    price = '${vacation.price}', 
    followers = ${vacation.followers} 
    WHERE id = ${vacation.id}
    `;
    await dal.execute(sql);
    return vacation;
}

//delete vacation
const deleteVacation = async(id:number):Promise<void> =>{
    const sql = `DELETE FROM vacations WHERE id =${id}`;
    return await dal.execute(sql);
}

//add follower
const addFollower = async(newFavorite:Favorites):Promise<Favorites> =>{
    const sql =`SELECT * FROM favorites WHERE userId = '${newFavorite.userId}' AND vacationId ='${newFavorite.vacationId}'`;
    const favorite = await dal.execute(sql);
    if (favorite.length>0){
        console.log("This vacation is already in favorites") 
        
    } else{  
    const newSql =`UPDATE vacations SET followers = followers + 1 WHERE id=${newFavorite.vacationId}`;
    await dal.execute(newSql);
    return newFavorite;
}
}
//remove follower
const removeFollower = async(id:any):Promise<Vacation> =>{
    const sql =`UPDATE vacations SET followers = followers - 1 WHERE id=${id}`;
    await dal.execute(sql);
    console.log(id);
    return id;
}
export default{
    getAllVacations,
    addVacation,
    updateVacation,
    deleteVacation,
    getVacationById,
    addFollower,
    removeFollower
}