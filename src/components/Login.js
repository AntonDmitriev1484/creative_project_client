import React from 'react';
import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';

import {login} from '../api-fetch/api-user.js'

import {archived_events} from '../api-fetch/api-user.js'

function Login(props) {

    const [info, setInfo] = useState({username:"", password:""});
    const redirect = useNavigate(); //This is also a react hook

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
                            onClick= { () => {

                                const user = info.username;
                               
                                const on_success = (a) => {
                                    console.log("In login success");
                                    console.log(user);
                                    document.cookie = "username= "+user+";"; //Because we still have access to this scope's info 
                                    console.log('redirecting');
                                    redirect("/dash/"); //Change this redirect to only work on successful entry, maybe pass it to the api-user function
                                }
                               
                                login(info, on_success);


                                // const on_success_t = (a) => {
                                //     console.log(a);
                                // }

                                // archived_events("",on_success_t)
                                
                                }
                            } >Enter</Button>


                    </Card>
    )
}

export default Login;