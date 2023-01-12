import React from "react";
import { useState } from "react";
import Login from './loginform';
import Register from './registerform';
import { useDispatch } from "react-redux";
import { register } from "../accountSlice";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";

//ATTENTION: npx vite build
//ATTENTION: TO UPDATE, BUILD FIRST THEN DEPLOY FIREBASE

export default function Root() {

    //Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyCbMxT6v3s1Lq04uWPKfwZfgbsKWTnyS4g",
      authDomain: "verrachats.firebaseapp.com",
      projectId: "verrachats",
      storageBucket: "verrachats.appspot.com",
      messagingSenderId: "544306720541",
      appId: "1:544306720541:web:16fa6607d912de8f2dfbf4",
      measurementId: "G-D5PR6NB21D"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    //State for account checking
    const [formToggle, setFormToggle] = useState(false);

    const dispatch = useDispatch();

    //Toggle between register and login page
    const toggle = () => {
        setFormToggle(prev => !prev);
    }
    //Gets the accounts from localStorage to the Redux state when logging in
    dispatch(register(JSON.parse(localStorage.getItem('registered'))));

    return (
        <React.Fragment>
        <motion.div className="border border-1 border-light rounded-4 bg-light bg-opacity-75 justify-content-center pt-2" style={{ marginTop: '15vh', paddingBottom: '20vh', 
        marginLeft: '25vw', marginRight: '25vw' }} whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}>
            <div className="justify-content-center mt-5">
                {formToggle ? <Register /> : <Login />}
            </div>
            <div className="text-center">
            <button type="submit" onClick={toggle} className="btn btn-success border-0 text-light rounded" style={{width: '10vw', height: '5vh'}}>
                {formToggle ? <p>Login</p> : <p>Register</p>}
            </button>
            </div>
        </motion.div>
        </React.Fragment>
    )
}