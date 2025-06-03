import React, { useState, useContext, useEffect } from 'react'
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";

const Private = () => {

    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

useEffect(() => {

    if (!localStorage.getItem("token")) {
      navigate('/')
    }
    try {

      const fetchPrivateData = async () => {
        const response = await actions.private();
        if (!response) {
          navigate('/');
        }
      };

      fetchPrivateData();
      
    } catch (error) {
      console.error("Se tiene el siguiente error: ", error);
      navigate('/');
    }

},[]);

  return (
    <div className='d-flex flex-column justify-content-center'>

        <h3 className='text-center'>Ventana Privada</h3>
        <h4 className='text-center'>Te presentamos el siguiente mensaje desde el backend</h4>
        <h1 className='text-center'>{store.private}</h1>

        <div className='d-flex justify-content-center'>
          <img className='w-50' src="https://i.pinimg.com/736x/f3/fa/37/f3fa37b5db4b7a64d96e96f952cd6a81.jpg" alt="" />
        </div>

        
    </div>
  )
}

export default Private