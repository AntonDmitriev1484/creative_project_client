import React from 'react';
import { useState } from 'react';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import {login} from '../api-fetch/api-user.js'

function Login(props) {

    const [info, setInfo] = useState({username:"", password:""});

    return (
        <Card color = "secondary" variant = "outlined">
                        <Typography variant="h4">Login</Typography>

                        <TextField  label="Username" id="login-username" variant= "outlined"
                            onChange = { //Each time this text field is changed, onChange is called , and an event object is passed to the function
                                (event)=>{
                                    //event.target.value is the value within this MUI object
                                    const temp = info.password;
                                    setInfo({username: event.target.value, password: temp});
                                }
                            }/>

                        <TextField label="Password" id="login-password" variant= "outlined"
                            onChange = { //Constantly causing state to re-render, but thats fine for now
                                (event)=>{
                                    const temp = info.username;
                                    setInfo({username: temp, password: event.target.value});
                                }
                                
                            }/>

                        <Button 
                            color="secondary" variant="contained"
                            onClick= {  async () => {
                               
                                let response = await login(info);
                                console.log(response);
                                }
                            } >Enter</Button>


                    </Card>
    )
}

export default Login;