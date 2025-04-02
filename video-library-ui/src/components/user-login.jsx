import axios from "axios";
import { useFormik } from "formik";
import {useState} from "react"
import { useCookies } from "react-cookie";
import { Link, useNavigate,  } from "react-router-dom";



export function UserLogin(){

    const [users, setUsers]= useState([{UserId:'', UserName:'', Passward:'', Email:'', Mobile:''}]);

    const [cookies, setCookies, removeCookies] = useCookies(['username']);
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
           UserId:'',
           Passward:''
        },
        onSubmit:(user)=>{
            axios.get(`http://127.0.0.1:5050/get-users`)
            .then(response=>{
                var result= response.data.find(item=> item.UserId===user.UserId);
                if(result){
                    if(result.Passward===user.Passward){
                        setCookies('username',result.UserName);
                      navigate('/user-dash');
                    }else{
                        alert('Invalid Passward')
                    }
                }else{
                    alert('Invalid User Id')
                }
            })
        }
    })
    return(
        <div className="bg-cream m-4 p-4 w-25">
            <h3>User Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" /></dd>
                    <dt>Passward</dt>
                    <dd><input type="passward" onChange={formik.handleChange} name="Passward" /></dd>
                </dl>
                <button type="submit" className="btn btn-warning">Login</button>
               <div className="my-2">
               <Link to="/user-register">New User Register</Link>
               </div>
            </form>

        </div>
    )
}