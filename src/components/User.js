import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import {user_info} from '../api-fetch/api-user.js'

function User() {

    const [userInfo, setUserInfo] = useState({});

    useEffect( () => {
        use();
        async function use () {
            const info = await user_info("");
            setUserInfo(info);
        }
    });


    return (<Card color = "primary" variant = "outlined">
                <Typography variant="h1">User</Typography>
                <Typography variant="h4">Username: {userInfo.username}</Typography>
                <Typography variant="h4">Email: {userInfo.email}</Typography>

            </Card>);
}

export default User;