import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import {user_info} from '../api-fetch/api-user.js'

function User(props) {

    const [userInfo, setUserInfo] = useState({username:"",email:""});


    useEffect( () => {

        const on_success = (a) => {
            setUserInfo({username:a.user_info.username,email:a.user_info.email});
        }

         user_info("", on_success);

         //NEW RULE:
         //.thens() pass function parameters to be executed within
         //async/await, rely on getting a return value


        // const info = user_info("");
        // setUserInfo(info);

        // use();
        // function use () {
        //     const a = user_info("", ()=> {});
        //     setUserInfo({username:a.user_info.username,email:a.user_info.email});
            
        // }
    }, []);

    //user_info("", useEffect( (a) => {setUserInfo(a)}, []))

    console.log("User: "+userInfo.username+" "+userInfo.email);


    return (<Card color = "primary" variant = "outlined">
                <Typography variant="h1">User</Typography>
                <Typography variant="h4">Username: {userInfo.username}</Typography>
                <Typography variant="h4">Email: {userInfo.email}</Typography>

            </Card>);
}

export default User;