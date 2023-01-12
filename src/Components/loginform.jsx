import React, { useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from '@firebase/app';
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { register } from "../accountSlice";

const registeredList = [];

export default function Login() {

    const ref = useRef([]);
    const [wrongEmailText, updateWrongEmailText] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

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
  
    const db = getFirestore(app);

    const auth = getAuth();

    async function verifyAccount(e){
        e.preventDefault();
        //Get form details using useRef hook
        const inp = ref.current;
        const loginform = {
            email: inp['login-email'].value,
            password: inp['login-password'].value,
        }
        signInWithEmailAndPassword(auth, loginform.email, loginform.password).then((userCredentials) => {
            return navigate('/home');
        }).catch((error) => {
            return updateWrongEmailText(true);
        })
        //Getting the documents and listing them into the dispatch function
        const query = await getDocs(collection(db, 'users'));
        query.forEach((doc) => {
            registeredList.push(doc.data().username);
        })
        dispatch(register(registeredList));
    }

    return (
        <React.Fragment>
        <h1 className="text-warning text-center" style={{fontWeight: 'bolder'}}>LOGIN</h1>
            <div className="d-flex justify-content-center">
                <form className="d-flex flex-column m-3 text-warning" ref={ref} onSubmit={verifyAccount}>
                    {wrongEmailText ? <span className="text-danger"><p>Wrong email or password!</p></span> : null}
                    <div className="d-flex">
                        <label className="d-flex flex-column text-center"> Email
                            <input type={'email'} style={{width: '25.5vw', height: '5vh'}} name='login-email' className="rounded-5
                            border border-0 ps-3"></input>
                        </label>
                    </div>
                    <div className="d-flex mt-3">
                        <label className="d-flex flex-column text-center"> Password
                            <input type={'password'} style={{width: '25.5vw', height: '5vh'}} name='login-password' className="rounded-5
                            border border-0 ps-3"></input>
                        </label>
                    </div>
                    <div className="text-center">
                    <button type="submit" onClick={verifyAccount} className="bg-warning border-0 text-white rounded" 
                    style={{width: '10vw', height: '5vh', marginTop: '2.5em', marginBottom: '1em'}}>
                        Submit
                    </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}