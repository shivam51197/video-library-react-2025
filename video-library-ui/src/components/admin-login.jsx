
import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate, } from "react-router-dom";


export function AdminLogin(){
    let navigate = useNavigate();

    const formik = useFormik({
        initialValues:{
            UserId:'',
            Passward:''
        },
        onSubmit: (admin)=>{
            // console.log(admin)
          axios.get("http://127.0.0.1:5050/get-admin")
         .then(response=>{
        //    response.data is an array and find menthod is search for specific record and return that record which is matching.
            //    console.log(response.data)
               var user= response.data.find(item=> item.UserId===admin.UserId);
               if(user){
                 if(admin.Passward===user.Passward){
                      navigate("/admin-dash");

                 } else{
                    alert(`Invalid Passward`);
                 }
               }else{
                alert(`Invalid User Id`)
               }
             })
        }
    })
    return(
        <div className="bg-cream m-4 p-4 w-25">
            <h3>Admin Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Admin Id</dt>
                    <dd><input type="text" name="UserId" onChange={formik.handleChange} className="form-control"/></dd>
                    <dt>Passward</dt>
                    <dd><input type="passward" name="Passward" onChange={formik.handleChange} className="form-control" /></dd>
                </dl>
                <button className="btn btn-warning w-100">Login</button>
                <Link to='/' className="mt-4">Back to Home</Link>
            </form>
        </div>
    )
}