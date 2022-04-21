import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import {login} from '../api-fetch/api-user.js'

function User() {


    return (<Card color = "primary" variant = "outlined">
                <Typography variant="h1">User</Typography>


            </Card>);
}

export default User;