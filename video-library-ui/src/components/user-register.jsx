import { useFormik } from "formik";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";



export function UserRegister(){

    let navigate= useNavigate();

    const formik = useFormik({
        initialValues:{
            UserId:'',
            UserName:'',
            Passward:'',
            Email:'',
            Mobile:''

        },

        onSubmit: (user)=>{
        axios.post(`http://127.0.0.1:5050/register-user`, user);
        alert('User Registered Successfullly..');
        navigate('/user-login');
        }
})

        
    
    return(
        <div className="bg-light mt-3 p-3 w-25">
            <h3> Register User</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>User Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="UserId" /></dd>
                    <dt>User Name</dt>
                    <dd><input type="text" onChange={formik.handleChange}  name="UserName" /></dd>
                    <dt>Passward</dt>
                    <dd><input type="passward" onChange={formik.handleChange} name="Passward" /></dd>
                    <dt>Email</dt>
                    <dd><input type="email" onChange={formik.handleChange} name="Email" /></dd>
                    <dt>Mobile</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="Mobile" /></dd>
                </dl>
                <button className="btn btn-warning">Register</button>
                <div className="my-2">
                <Link to="/user-login">Existing User Login</Link>
                </div>
                <div>
                    <Link to="/admin-login">Admin Login</Link>
                </div>
            </form>
        </div>
    )
}