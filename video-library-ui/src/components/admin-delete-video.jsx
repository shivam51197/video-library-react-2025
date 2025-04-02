import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";


export function AdminDeleteVideo(){

    const [videos, setVideos] = useState([{VideoId:0, Title:'', Url:'', Description:'', Likes:0, Dislikes:0, Views:0, Comments:[], CategoryId:0}]);
 
     // Collect the route parameters using params
        let params= useParams();
        let navigate= useNavigate();

        useEffect(()=>{
            //    params.id is returning only one video.
            axios.get(`http://127.0.0.1:5050/get-video/${params.id}`)
            .then(response=>{
                setVideos(response.data);
                // console.log(response.data)
            });
        });

        function handleDeleteClick(){
            axios.delete(`http://127.0.0.1:5050/delete-video/${params.id}`);

            navigate('/admin-dash');
        }

        
    return(
        <div className="bg-light mt-3 p-3 w-25">
            <h2>Are you sure, want to delete</h2>
            <dl>
                <dt>Title</dt>
                <dd>{videos[0].Title}</dd>
                <dt>Description</dt>
                <dd>{videos[0].Description}</dd>
            </dl>
            <button onClick={handleDeleteClick} className="btn btn-danger">Yes</button>
            <Link to="/admin-dash" className="btn btn-warning ms-2">No</Link>
        </div>
    )
}