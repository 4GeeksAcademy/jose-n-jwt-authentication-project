import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

    const {store, actions} = useContext(Context)
    const [email, setEmail]  = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()


    const handleSignup = async () =>{
        event.preventDefault();

        if (email == "" || password == ""){
            alert("Por favor complete todos los datos")
            return;
        }

        try {

            const result = await actions.signUp(email,password)
            console.log(result)

            if(!result) {
                alert("Se tuvo un error al crear el usuario")
                return;
            }

            alert("Usuario creado con exito")
            navigate("/login")
            return;
            
        } catch (error) {
            console.error("Este es el error: ", error)
            
        }

    }


  return (
        <div>

            <div>
                <h1>Registra tus datos aca:</h1>
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

                <button type="submit" className="btn btn-primary" onClick={handleSignup}>Registrase</button>
     </form>
    </div>
    


  )
}

export default Signup