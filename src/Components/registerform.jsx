import React, { useRef } from "react"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore";
import { initializeApp } from "@firebase/app";
import { getFirestore } from "firebase/firestore";

export default function Register() {

    // Your web app's Firebase configuration
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

    //Grab the current value of the forms and push them into the account list
    const ref = useRef([]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const inp = ref.current;
        const accountdetails = {
            username: inp['username'].value,
            email: inp['email'].value,
            password: inp['password'].value,
        }
        //Creating a user account and sending it to the firestore database
        createUserWithEmailAndPassword(auth, accountdetails.email, accountdetails.password).then(() => {
            updateProfile(auth.currentUser, {
                displayName: accountdetails.username,
                photoURL: null,
            }).then(() => {
                const userInfo = addDoc(collection(db, "users"), {
                    id: auth.currentUser.uid,
                    username: auth.currentUser.displayName,
                });
            }).catch((error) => {window.alert(error.message)});
        }).catch((error) => {
            window.alert(error.message);
        })
        window.alert("Account has been registered successfully!");
    }
    
    return (
        <React.Fragment>
        <h1 className="text-warning text-center" style={{fontWeight: 'bolder'}}>REGISTER</h1>
            <div className="d-flex justify-content-center text-warning">
                <form className="d-flex flex-column m-3" onSubmit={handleSubmit} ref={ref}>
                    <div className="d-flex">
                    <label className="d-flex flex-column text-center">Username<input type={'text'} className='me-2 ps-3 rounded-4 border border-0' name='username' style={{ height: '5vh', width: '26.8vw' }}></input></label>
                    </div>
                    <div className="d-flex mt-3">
                        <label className="d-flex flex-column text-center"> Email
                            <input type={'email'} style={{width: '27vw', height: '5vh'}} className='rounded-4 ps-3 border-0' name='email'></input>
                        </label>
                    </div>
                    <div className="d-flex mt-3">
                        <label className="d-flex flex-column text-center"> Password
                            <input type={'password'} style={{width: '27vw', height: '5vh'}} className='rounded-4 ps-3 border-0' name='password'></input>
                        </label>
                    </div>
                    <div className="text-center">
                    <button type="submit" className="btn btn-warning mt-3 border-0 text-light rounded" style={{width: '10vw', height: '5vh'}}>
                        Submit
                    </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}