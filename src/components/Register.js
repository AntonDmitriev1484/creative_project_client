import React from 'react';
import { useState } from 'react';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import {create_user} from '../api-fetch/api-user.js'

function Register(props) {

    const [info, setInfo] = useState({username:"", password:"", email:""});

    return (
        <Card color = "secondary" variant = "outlined">
                        <Typography variant="h4">Register</Typography>

                        <TextField  label="Email" id="register-email" variant= "outlined"
                            onChange = { //Each time this text field is changed, onChange is called , and an event object is passed to the function
                                (event)=>{
                                    setInfo({
                                        username: info.username, 
                                        password: info.password,
                                        email: event.target.value
                                    });
                                }
                            }/>


                        <TextField  label="Username" id="register-username" variant= "outlined"
                            onChange = { //Each time this text field is changed, onChange is called , and an event object is passed to the function
                                (event)=>{
                                    setInfo({
                                        username: event.target.value, 
                                        password: info.password,
                                        email: info.email
                                    });
                                }
                            }/>

                        <TextField label="Password" id="register-password" variant= "outlined"
                            onChange = { //Constantly causing state to re-render, but thats fine for now
                                (event)=>{
                                    setInfo({
                                        username: info.username, 
                                        password: event.target.value,
                                        email: info.email
                                    });
                                }
                                
                            }/>

                        <Button 
                            color="secondary" variant="contained"
                            onClick= {  async () => {
                                let response = await create_user(info);
                                console.log(response);
                                }
                            } >Submit</Button>

                    </Card>
    )
}

export default Register;