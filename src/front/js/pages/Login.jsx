import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {

    const {store, actions} = useContext(Context)
    const [email, setEmail]  = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()


    const handleLogin = async () =>{
        event.preventDefault();

        if (email == "" || password == ""){
            alert("Por favor complete todos los datos")
            return;
        }

        try {

            const result = await actions.login(email,password)

            if(!result) {
                alert("Error al loguearse, verifique sus datos")
                return;
            }

            alert("Usuario logueado")
            navigate("/private")
            
            
        } catch (error) {
            console.error("Este es el error: ", error)
            return;
        }

    }

  return (
    <div>

            <div>
                <h1>Puedes loguearte aqui:</h1>
            </div>

            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Direccion de Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e)=>setEmail(e.target.value)} value={email} required/>
                   
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e)=>setPassword(e.target.value)} value={password} required/>
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleLogin}>Login</button>
    </form>
        


    </div>
  )
}

export default Login