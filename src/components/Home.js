import React from 'react';
import { useState } from 'react';
import Login from './Login.js';
import Register from './Register.js';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';


function Home(props) {

    
    return (

                <Card color = "primary" variant = "outlined">
                    <Typography variant="h1">Home</Typography>
                    <Login/>
                    <Register/>
                </Card>

        
            );

}

export default Home;