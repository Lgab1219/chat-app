import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { initializeApp } from '@firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function Chat() {

    const firebaseConfig = {
        apiKey: "AIzaSyCbMxT6v3s1Lq04uWPKfwZfgbsKWTnyS4g",
        authDomain: "verrachats.firebaseapp.com",
        projectId: "verrachats",
        storageBucket: "verrachats.appspot.com",
        messagingSenderId: "544306720541",
        appId: "1:544306720541:web:16fa6607d912de8f2dfbf4",
        measurementId: "G-D5PR6NB21D"
      };

    
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth();
    const [messages, setMessages] = useState([]);
    const account = useSelector(state => state.account);

    useEffect(() => {
        const q = query(collection(db, 'chatlog'), orderBy('timestamp', 'asc'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            const newDocs = querySnapshot.docs.map(doc => doc.data());
            setMessages(newDocs);
        })
    }, []);

    return (
        <React.Fragment>
            <div className='d-flex pt-3 ps-3' style={{width: '60vw', height: '75vh'}}>
                <ul className='mt-3'>
                {
                    //Render sent messages
                    messages !== null ? messages.map(doc => (
                        doc.sender === auth.currentUser.displayName && doc.receiver === account.chatUser ?
                        <motion.div className='text-warning mb-3' key={doc.id} initial={{ y: 5 }} animate={{ y: 0 }}>
                            <p style={{ fontWeight: 'bolder' }}>{doc.sender}</p>
                            <li key={doc.id} className='d-block'>{doc.text}</li>
                        </motion.div> : 
                        doc.sender === account.chatUser && doc.receiver === auth.currentUser.displayName ?
                        <motion.div className='text-warning mb-3' key={doc.id} initial={{ y: 5 }} animate={{ y: 0 }}>
                            <p style={{ fontWeight: 'bolder' }}>{doc.sender}</p>
                            <li key={doc.id} className='d-block'>{doc.text}</li>
                        </motion.div> : null
                    )) : null

                }
                </ul>
            </div>
        </React.Fragment>
    )
}