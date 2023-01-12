import React, { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import ScrollToBottom, { useScrollToBottom } from 'react-scroll-to-bottom';
import { BiLogOutCircle } from 'react-icons/bi';
import { IconContext } from 'react-icons/lib';
import { motion } from 'framer-motion';
import { getAuth } from 'firebase/auth';
import { initializeApp } from '@firebase/app';
import { getFirestore, collection, addDoc, updateDoc, serverTimestamp} from 'firebase/firestore';
import { setChatUser } from '../accountSlice';

export default function Chatroom() {

    const [linkClicked, setLinkClicked] = useState(false);
    const chatlist = useSelector(state => state.account);
    const dispatch = useDispatch();
    const [message, sendMessage] = useState('');
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
    

    const autoScroll = useScrollToBottom();

    const [input, updateInput] = useState('');

    //Get input from friends list input bar
    const handleOnChange = (e) => {
        e.preventDefault();
        updateInput(e.target.value);
    }
    //Get input from chatbox
    const handleInput = (e) => {
        e.preventDefault();
        sendMessage(e.target.value);
    }
    //Send messages
    async function handleSubmit() {
        const chatlog = await addDoc(collection(db, 'chatlog'),{
            text: message,
            sender: auth.currentUser.displayName,
            receiver: chatlist.chatUser,
            timestamp: serverTimestamp(),
        });
        await updateDoc(chatlog, {
            id: chatlog.id,
        })
        autoScroll();
    }

    const logOut = () => {
        localStorage.removeItem('loggedAccount');
        localStorage.removeItem('chatlist');
    }

    //Function to know who you are chatting with
    function setChatUserFunc(user){
        //Show input bar onClick
        setLinkClicked(true);
        dispatch(setChatUser(user));
    }
    
    return (
        <React.Fragment>
            <div className='d-flex'>
                <div className='bg-light bg-opacity-75 border border-light d-flex flex-column me-4' style={{ paddingLeft: '2.5vw', 
                 paddingBottom: '87vh', width: '20vw'}}>
                    <h2 className='text-warning mt-4 ms-4 text-justify' style={{ fontWeight: 'bolder' }}>CHAT LIST</h2>
                    <div className='d-flex flex-column pt-2 ps-2'>
                        <input type={'text'} className='justify-content-center rounded border border-0' style={{width: '13vw'}}
                        onChange={handleOnChange}></input>
                    </div>
                    <div className='mt-3'>
                        <ul className='list-group'>
                            {
                            /** Check for accounts with same values as the input */
                            chatlist !== null ? chatlist.accountdetails.filter(user => (
                                input && (input.toLowerCase() === user.toLowerCase()) &&
                                (input.toLowerCase() !== auth.currentUser.displayName)
                            )).map(user => (
                                <Link to={`/home/chat`} className='text-decoration-none' key={user} onClick={() => {setChatUserFunc(user)}}>
                                    <motion.li className='list-group-item border-0 bg-lilght text-warning me-5 mb-3 rounded-3 text-decoration-none'
                                    initial={{ y: 5 }} animate={{ y: 0 }} whileHover={{ scale: 1.1, transition: {duration: 0.3} }}>{user}</motion.li> 
                                </Link>
                              )) : null
                            }
                        </ul>
                    </div>
                </div>
                <p className='d-block mt-3 text-light'>User: {auth.currentUser.displayName}</p>
                <div className='d-block border bg-light rounded-4 bg-opacity-75' style={{marginTop: '5rem', width: '65vw', height: '80vh', overflowY: 'auto'}}>
                    <ScrollToBottom>
                        <Outlet />
                    </ScrollToBottom>
                </div>
                <motion.section className='mt-4 ps-3' whileHover={{ opacity: 0.5 }}>
                    <Link to={`/`} onClick={logOut}>
                        <IconContext.Provider value={{ color: 'white', size: '28' }}>
                            <BiLogOutCircle />
                        </IconContext.Provider>
                    </Link>
                </motion.section>
                <div className='d-block position-absolute' style={{top: '93vh', left: '26vw'}}>
                    {
                        linkClicked ? 
                        <motion.form initial={{ x: -10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
                            <input type='text' className='rounded-4 ps-3 border-success ms-5' style={{width: '55vw'}} onChange={handleInput}></input>
                            <button type='button' className='btn border-0 ms-3 btn-warning' onClick={handleSubmit}>Submit</button>
                        </motion.form> : null
                    }
                </div>
            </div>
        </React.Fragment>
    )
}