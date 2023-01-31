import dal from "../Utils/dal_mysql";
import { OkPacket } from "mysql";
// import model from...
import User from "../Models/userModel";

//get all users 
const allUsers = async (): Promise<User[]> => {
    // command line for the DB
    const sql = "SELECT * FROM user";
    // a promise function that connects us to the database with the command line
    const users = await dal.execute(sql);
    return users;
}
 // get user by id
const getUserById = async(id:number):Promise<User> =>{
    const sql = `SELECT * FROM user WHERE id =${id}`;
    const user = await dal.execute(sql);
    return user;
} 
// get user by username
const getUserByUserName = async(username:string):Promise<User> =>{
    const sql = `SELECT * FROM user WHERE username =${username}`;
    const user = await dal.execute(sql);
    return user;
} 

//add new user(registration)
const addUser = async(newUser:User):Promise<User> =>{
    const sql =`SELECT * FROM user WHERE username = '${newUser.username}'`;
    const user = await dal.execute(sql);
    if (user.length>0){
        console.log("User already exists") 
        
    } else{
        const newSql = `
    INSERT INTO user (firstName, lastName, username, password) 
    VALUES ('${newUser.firstName}', '${newUser.lastName}', '${newUser.username}', '${newUser.password}');
     `; // sqlלוודא שיש רווח בין המילים ב
    const result: OkPacket = await dal.execute(newSql);
    newUser.id = result.insertId;
    return newUser;
    }
}

//delete user
const deleteUser = async(id:number):Promise<void> =>{
    const sql = `DELETE FROM user WHERE id =${id}`;
    return await dal.execute(sql);
}

// user login
const loginUser = async (username:string, password:string): Promise<User> => {
    // command line for the DB
    const sql = `SELECT * FROM user WHERE username ='${username}' AND password='${password}'`;
    // a promise function that connects us to the database with the command line
    const user = await dal.execute(sql);
    if (user.length>0){
        console.log("Welcome") 
    return user;
    } else{
        console.log("Who are you?");
        return;
    }
}

export default{
    allUsers,
    addUser,
    deleteUser,
    loginUser,
    getUserById,
    getUserByUserName
}