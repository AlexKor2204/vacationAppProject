import { Button, Typography } from "@mui/material";
import HouseIcon from '@mui/icons-material/House';
import FlightIcon from '@mui/icons-material/Flight';
import { useNavigate } from "react-router-dom";
import "./Header.css";

function Header(): JSX.Element {
    const navigate = useNavigate();
    return (
        <div className="Header">
            <br/>
			{/* <h1>The best website for vacation search</h1>
            <h6>Designed and created by Alex Koryagin</h6> */}
            <Typography variant="h5" color="primary" className="HeadLine">The best website for vacation search <FlightIcon fontSize="large"/></Typography>
            <Button variant="outlined" startIcon={<HouseIcon />}  onClick={()=>{navigate("/")}}>HOME</Button>
        </div>
    );
}

export default Header;
