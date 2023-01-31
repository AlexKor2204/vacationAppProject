import { Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import User from "../../Models/userModel";
import userModel from "../../Models/userModel";
import notify from "../../utils/notify";
import "./Main.css";

function Main(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<User>();
    const navigate = useNavigate()
   // const params = useParams();
    const checkUser = async (user:userModel)=>{
        console.log(user);
        try{
            await axios.post("http://localhost:3001/user/login", user)
            .then(result=>{
                //console.log(result.data[0]);
                if(result.data===""){
                    console.log("wrong username or password")
                    notify.error("Wrong username or password")
                }else if (result.data==="admin"){
                    navigate("/admin");
                    console.log("Hello admin")
                    notify.success("Welcome admin")
                }else{
                    navigate(`/user/${result.data[0].id}`);
                    notify.success(`Welcome ${result.data[0].firstName}`);
                }
            });
    } catch (err:any){
            console.log(err.message);
        }
    };


    return ( 
        <div className="Main">
            <br/>
            <Typography variant="h5" className="HeadLine">The best website for vacation search</Typography>
            <br/>
                <form onSubmit={handleSubmit(checkUser)}>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                Vacation Project<br/>
            Designed and created by Alexandr Koryagin<br/>
            Id: 321117046<br />
            Full Stack Web Development<br/>
            Class 84<br/>
            </Typography>
            <Typography variant="subtitle2" color="error" gutterBottom>
            Admin access: <br/>
            username: admin <br/>
            password: password <br/>
            </Typography>
            <Typography variant="subtitle2" color="error" gutterBottom>
            User access: <br/>
            username: user <br/>
            password: 123456 <br/>
            </Typography>  
                    <Typography variant="subtitle1" gutterBottom>Please Login</Typography>
                    <TextField id="username" label="Username" variant="outlined" required {...register("username",{
                        required:{
                            value: true,
                            message: "Please insert your username"
                        },
                        minLength:{
                            value:3,
                            message: "Your username must contain at least 3 symbols"
                        }
                    })}/>
                    <br/>
                    <span>{errors.username?.message}</span>
                    <br/>
                    <TextField id="password" label="Password" variant="outlined" type="password" required {...register("password",{
                        required:{
                            value: true,
                            message: "Please insert your password"
                        },
                        minLength:{
                            value:3,
                            message: "Your password must contain at least 6 symbols"
                        }
                    })}/>
                    <br/>
                    <span>{errors.password?.message}</span>
                    <br/>
                    <Button variant="outlined" type="submit">Login</Button>
                    <Button variant="outlined" type="reset">Reset</Button>
                </form>
                <br/><br/>
                <Typography variant="subtitle1" gutterBottom>Don't have account yet? <NavLink to="/registration">Registration</NavLink></Typography>
        </div>
    );
}

export default Main;
