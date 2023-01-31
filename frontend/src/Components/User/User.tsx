import { Button, IconButton, Typography } from "@mui/material";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import axios from "axios";
import { useEffect, useState } from "react";
import Vacation from "../../Models/vacationModel";
import Header from "../Header/Header";
import "./User.css";
import { useNavigate, useParams } from "react-router-dom";
import userModel from "../../Models/userModel";


function User(): JSX.Element {
    const [vacations,setVacations]=useState<Vacation[]>([]);
    const [user, getUser]=useState<userModel>();
    const params = useParams();
    const navigate = useNavigate();
    //console.log(vacations)

    useEffect(()=>{
        axios.get("http://localhost:3001/vacations/all")
        .then(response=>setVacations(response.data));
        if (params){
            //console.log(params.id);
            axios.get(`http://localhost:3001/user/id/${params.id}`)
            .then(response=>getUser(response.data[0]));
        }
    },[])

    return (
        <div className="User">
            <Header/>
            <br/> 
            <Typography variant="h6" >Hello {user?.firstName}</Typography>
            <br/> 
            <Button variant="outlined" startIcon={<FavoriteRoundedIcon />} onClick={()=>{navigate(`/favorites/${user?.id}`)}}> My Favorites </Button>
            <br/>
                {vacations.map((item)=><div className="Box" key ={item.id}>
                <Typography variant="subtitle1" gutterBottom>
                <img className="image" alt="" src={item.image} />
                
                    <br/>
                    {item.destination}
                    <br/>
                    {item.description}
                    <br/>
                    Price: {item.price}
                    <br/>
                    From: {new Date(item.startDate).toLocaleDateString("en-GB")}
                    <br/>
                    To: {new Date(item.endDate).toLocaleDateString("en-GB")}
                    
                    {/* Followers:{item.followers} */}
                    </Typography>    
                    <IconButton aria-label="edit" size="medium" onClick={()=>{
                        const favorite = {
                            userId:user?.id,
                            vacationId: item.id
                        }
                        axios.post("http://localhost:3001/favorites/add", favorite )}
                        }>{item.followers}
                    <FavoriteRoundedIcon color="primary" fontSize="inherit" />
                    </IconButton>
                    </div>)}	
        </div>
    );
}

export default User;
