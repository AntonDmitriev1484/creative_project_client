import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import mui_theme from '../styles/mui_theme.js'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
//import TabPanel from '@mui/material/TabPanel'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import {logout} from '../api-fetch/api-user.js';


function Dashboard() {
    const [shownComponent, setShownComponent] = useState({component_name:"planner"});
    const redirect = useNavigate(); //This is also a react hook

    let component;
    if (shownComponent.component_name === "planner"){
        component = (<Card color = "primary" variant = "outlined">
        <Typography variant="h1">Planner</Typography>
    </Card>);
    }
    else if (shownComponent.component_name === "user"){
        component = (<Card color = "primary" variant = "outlined">
        <Typography variant="h1">User</Typography>
    </Card>);
    }

    return (
        <div id = "dash-container">
                <Card color = "primary" variant = "outlined">
                    <Typography variant="h1">Dashboard</Typography>
                </Card>

                <Card color = "primary" variant = "outlined">
                        <Button 
                            color="secondary" variant="contained"
                            onClick= { () => {
                                setShownComponent({component_name:"user"})
                                }
                        } >User</Button>
                        <Button 
                            color="secondary" variant="contained"
                            onClick= { () => {
                                setShownComponent({component_name:"planner"})
                                }
                        } >Planner</Button>
                        <Button 
                            color="secondary" variant="contained"
                            onClick= {  async () => {
                                let response = await logout("");
                                console.log(response);
                                redirect("/");
                                }
                        } >Log out</Button>
                </Card>

                <Card color = "primary" variant = "outlined">
                    {component}
                </Card>
                    
        </div>
        


    );
}

export default Dashboard;