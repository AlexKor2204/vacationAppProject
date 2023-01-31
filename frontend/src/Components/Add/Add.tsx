
import { Button, Typography } from "@mui/material";
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import ImageIcon from '@mui/icons-material/Image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import vacationModel from "../../Models/vacationModel";
import Vacation from "../../Models/vacationModel";
import notify from "../../utils/notify";
import Header from "../Header/Header";
import "./Add.css";
import { useEffect, useState } from "react";

function Add(): JSX.Element {
   const {register, handleSubmit, formState:{errors}} = useForm<Vacation>();
   const navigate = useNavigate();
   const params = useParams();
   const [vacation, setVacation] = useState<Vacation>();
   const id = +(params.id || 0);

   useEffect(()=>{
      if (id > 0) {
         axios.get(`http://localhost:3001/vacations/id/${params.id}`)
            .then(response => {
               setVacation(response.data[0]);
               console.log(response.data[0]);
            });
   }
   },[id, params.id])

   const addNewVacation = async (newVacation: vacationModel)=>{
      //console.log(newVacation.image);
      console.log(getBase64(newVacation.image[0]));
      newVacation.image = await getBase64(newVacation.image[0]);
      console.log(newVacation);
      try{
         if (id===0){
         await axios.post("http://localhost:3001/vacations/add", newVacation)
         .then(result=>navigate("/admin"));
         notify.success("New vacation was added successfully")
            //   console.log(result);
         }
         if (id>0){
            newVacation.id = id;
            await axios.put("http://localhost:3001/vacations/", newVacation)
            .then(result=>navigate("/admin"));
            notify.success("Vacation was updated successfully")
         }
         } catch (err:any){
            console.log(err.message);
      }
}

  //convert a file to string
const getBase64 = (file: any): Promise<any> => {
   return new Promise<any>((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
           // console.log(reader.result);
         resolve(reader.result?.toString());
      };
      reader.onerror = function (error) {
         reject(error);
      };
   })
}

   return(
   <div className="Add">
			<Header/>
         <Button variant="outlined" startIcon={<ArrowBackIcon />} onClick={()=>{navigate("/admin")}}>Back</Button>
         <br/>
            <div className="AddBox">
               <form onSubmit={handleSubmit(addNewVacation)}>
               <Typography variant="h5" className="HeadLine">Add or Edit</Typography><br/>
               <label>Description</label><br/>
                  <input type="text" defaultValue={vacation?.description}  required {...register("description",{
                        required:{
                           value: true,
                           message: "Please insert description"
                        },
                        minLength:{
                           value:1,
                           message: "Write description"
                        }
                  })}/>
                  <span>{errors.description?.message}</span>
                  <br/><br/>
                  <label>Destination</label><br/>
                  <input type="text"  defaultValue={vacation?.destination}  required {...register("destination",{
                        required:{
                           value: true,
                           message: "Please insert destination"
                        },
                        minLength:{
                           value:1,
                           message: "Write about destination"
                        }
                  })}/>
                  <span>{errors.destination?.message}</span>
                  <br/><br/>
                  <label>Price</label><br/>
                  <input type="text" defaultValue={vacation?.price} required {...register("price",{
                        required:{
                           value: true,
                           message: "Please insert the price"
                        },
                        minLength:{
                           value:3,
                           message: "Insert the price"
                        }
                  })}/>
                  <span>{errors.price?.message}</span>
                  <br/><br/>
                  <label>From</label><br/>
                  <input type="date"  required {...register("startDate",{
                        required:{
                           value: true,
                           message: "Please insert From..."
                        },
                        minLength:{
                           value:6,
                           message: "Choose the date"
                        }
                  })}/>
                  <span>{errors.startDate?.message}</span>
                  <br/><br/>
                  <label>To</label><br/>
                  <input type="date" required {...register("endDate",{
                        required:{
                           value: true,
                           message: "Please insert To..."
                        },
                        minLength:{
                           value:6,
                           message: "Choose the date"
                        }
                  })}/>
                  <span>{errors.endDate?.message}</span>
                  <br/><br/>
                  <input type="file" required {...register("image")}/>
                  <br/><br/>
                  <label>Followers</label><br/>
                  <input type="text" required {...register("followers")}/>
                  <span>{errors.destination?.message}</span>
                  <br/><br/>
                  <Button variant="outlined" type="submit">Add</Button>
                  <Button variant="outlined" type="reset">Reset</Button>
               </form>
            </div>
         </div>

   );
}

export default Add;
