import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";



export function UserDashBoard(){

    const [cookies, setCookies,removeCookies] = useCookies(['username']);
    let navigate = useNavigate();

      function handleSignout(){
        removeCookies('username')
        navigate('/user-login')
      }

      const [videos , setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:'', Comments:[], CategoryId:''}]);

      useEffect(()=>{
        axios.get("http://127.0.0.1:5050/get-videos")
       .then(response=>{
         setVideos(response.data);
       });
     },[]);
    return(
        <div className="bg-light mt-3 p-3 ">
            <h3 className="d-flex justify-content-between"><div><span>{cookies['username']}</span> <span>Dashboard</span></div><div><button className="btn btn-link">Signout</button></div></h3>
        </div>
    )
}