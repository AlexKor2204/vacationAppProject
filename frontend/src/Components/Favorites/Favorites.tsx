import { Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Vacation from "../../Models/vacationModel";
import Header from "../Header/Header";
import "./Favorites.css";

function Favorites(): JSX.Element {
    const [vacations,setVacations]=useState<Vacation[]>([]);
    const params = useParams();
    const navigate = useNavigate();
    // console.log(vacations); כשהדף עולה לא מקבל כלום
    //console.log(params.id);


    useEffect(()=>{
        axios.get("http://localhost:3001/vacations/all")
        .then((response)=>{getFavorites(response.data);
        })
    },[]);
    // console.log(vacations);
    
    const getFavorites = async (data: Vacation[])=>{
        try{
            await axios.get(`http://localhost:3001/favorites/id/${params.id}`)
            .then(result=>{const favorites = result.data;
                setVacations(data.filter(singleVacation => favorites.some((singleFavorite: { vacationId: number; }) => singleVacation.id === singleFavorite.vacationId)));
            });
            }catch (err:any){
                console.log(err.message);
            }
        }


    // const getFavorites = async ()=>{
    //     try{
    //         await axios.get(`http://localhost:3001/favorites/id/${user?.id}`)
    //         .then(result=>{const favorites = result.data;
    //             console.log(favorites);
    //             setVacations(vacations.filter(singleVacation => favorites.some((singleFavorite: { vacationId: number; }) => singleVacation.id === singleFavorite.vacationId)));
    //         });
    //         //console.log(favorites);
    //         //setVacations(vacations.filter(singleVacation => favorites.some(singleFavorite => singleVacation.id === singleFavorite.vacationId)));
    //         }catch (err:any){
    //             console.log(err.message);
    //         }
    //     }



    return (
        <div className="Favorites">
            <Header/>
            <Button variant="outlined" startIcon={<FormatListNumberedIcon/>} onClick={()=>{navigate(`/user/${params.id}`)}}> All vacations </Button>
            <br/>
            {/* <Typography variant="subtitle1" gutterBottom>Favorites list</Typography> */}
		{vacations.map((item)=><div className="Box" key ={item.id}>
        <Typography variant="subtitle1" gutterBottom>
                <img className="image" alt="" src={item.image} style={{ height: 250 }}/>
                
                    <br/>
                    {item.destination}
                    <br/>
                    {item.description}
                    <br/>
                    Price:{item.price}
                    <br/>
                    From:{new Date(item.startDate).toLocaleString()}
                    <br/>
                    To:{new Date(item.endDate).toLocaleString()}
                    <br/>
                    {/* Followers:{item.followers} */}
                    </Typography>    
                    
                    <IconButton aria-label="delete" size="large" onClick={()=>{
                        axios.delete(`http://localhost:3001/favorites/${item.id}`)
                        setVacations(vacations.filter(singleVacation=>singleVacation.id !== item.id));
                    }}>
            
                        <DeleteIcon fontSize="inherit" color="primary"/>
                    </IconButton>
        </div>)}
        </div>
    );
}

export default Favorites;
