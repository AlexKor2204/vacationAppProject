import { Button, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import axios from "axios";
import { useEffect, useState } from "react";
import Vacation from "../../Models/vacationModel";
import Header from "../Header/Header";
import "./Admin.css";
import {  useNavigate } from "react-router-dom";

function Admin(): JSX.Element {
    const [vacations,setVacations]=useState<Vacation[]>([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get("http://localhost:3001/vacations/all")
        .then(response=>setVacations(response.data));
    },[])


    return (
        <div className="Admin">
			<Header/>
            <Typography variant="subtitle1" gutterBottom>Welcome to admin mode</Typography>
            <Button variant="outlined" startIcon={<AddIcon />} onClick={()=>{navigate("/add")}}>Add new</Button>
            <br/>
            
                {vacations.map((item)=><div className="adminBox" key ={item.id}>
                <Typography variant="subtitle1" gutterBottom>
                <img className="image" alt="" src={item.image} style={{ height: 250 }}/>
                
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
                    </Typography>
                    <IconButton aria-label="delete" size="large" onClick={()=>{
                                axios.delete(`http://localhost:3001/vacations/${item.id}`);
                                setVacations(vacations.filter(singleVacation=>singleVacation.id !== item.id));
                                }
                                }>
                        <DeleteIcon fontSize="inherit" color="primary"/>
                    </IconButton>

                    <IconButton aria-label="edit" size="large" onClick={()=>{
                        navigate(`/add/${item.id}`)
                    }
                    }>
                        <ModeEditIcon fontSize="inherit" color="primary"/>
                    </IconButton>
                    {/* <Button variant="outlined" startIcon={<ModeEditIcon />}> Edit</Button> */}
                    {/* <DeleteForeverIcon /> */}
                    {/* <ModeEditIcon/> */}

                    </div>)}
            
        </div>
    );
}

export default Admin;
