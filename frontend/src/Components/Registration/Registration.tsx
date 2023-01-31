
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userModel from "../../Models/userModel";
import notify from "../../utils/notify";
import Header from "../Header/Header";
import "./Registration.css";

function Registration(): JSX.Element {
    const {register, handleSubmit, formState:{errors}} = useForm<userModel>();
    const navigate = useNavigate();
    const addNewUser = async (newUser: userModel)=>{
        console.log(newUser);
        try{
            await axios.post("http://localhost:3001/user/add", newUser)
            .then(result=>{
                console.log(result);
                if(result.data===""){
                    console.log("username exists")
                    notify.error("The username already exists")
            
                }else{
                    navigate("/");
                    notify.success("The registration is completed");
                }
            });
    } catch (err:any){
            console.log(err.message);
        }
    }
    
    return (
        <div className="Registration">
			<Header/>
            <div className="registrationBox">
                <form onSubmit={handleSubmit(addNewUser)}>
                <Typography variant="h5" className="HeadLine">Registration</Typography><br/>
                    {/* <label>First name</label><br/> */}
                    <TextField id="newName" label="First name" variant="outlined" required {...register("firstName",{
                        required:{
                            value: true,
                            message: "Please insert your name"
                        },
                        minLength:{
                            value:1,
                            message: "Your name must contain at least 1 letter"
                        }
                    })}/>
                    <span>{errors.firstName?.message}</span>
                    <br/><br/>
                    {/* <label>Last name</label><br/> */}
                    <TextField id="newLastName" label="Last name" variant="outlined" required {...register("lastName",{
                        required:{
                            value: true,
                            message: "Please insert your last name"
                        },
                        minLength:{
                            value:1,
                            message: "Your last name must contain at least 1 letter"
                        }
                    })}/>
                    <span>{errors.lastName?.message}</span>
                    <br/><br/>
                    {/* <label>Username</label><br/> */}
                    <TextField id="newUser" label="Username" variant="outlined" required {...register("username",{
                        required:{
                            value: true,
                            message: "Please insert your username"
                        },
                        minLength:{
                            value:3,
                            message: "Your username must contain at least 3 symbols"
                        }
                    })}/>
                    <span>{errors.username?.message}</span>
                    <br/><br/>
                    {/* <label>Password</label><br/> */}
                    <TextField id="newPassword" label="Password" variant="outlined" type="password" required {...register("password",{
                        required:{
                            value: true,
                            message: "Please insert your password"
                        },
                        minLength:{
                            value:6,
                            message: "Your password must contain at least 6 symbols"
                        }
                    })}/>
                    <span>{errors.password?.message}</span>
                    <br/><br/>
                    <Button variant="outlined" type="submit">Sign in</Button>
                    <Button variant="outlined" type="reset">Reset</Button>
                    {/* <input type="submit" value="Sign in" style={{ height: 30, backgroundColor: "lightskyblue", borderRadius: 10 }} />
                    <input type="reset" value="Reset" style={{ height: 30, backgroundColor: "lightskyblue", borderRadius: 10 }} /> */}
                </form>
            </div>
        </div>
    );
}

export default Registration;
