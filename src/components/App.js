import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Test_component from './Test.js'
import Home from './Home.js'
import Dashboard from './Dashboard.js'
import mui_theme from '../styles/mui_theme.js'
import { ThemeProvider} from '@mui/material/styles';
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';


function App(props) {


    //Can also use the following syntax for routes: https://v5.reactrouter.com/web/example/basic

    return (
        <BrowserRouter>
            <ThemeProvider theme={mui_theme}>
                <Routes>
                    <Route exact path = "/" element= {<Home/>}/>
                    <Route exact path = "client/test"  element= {<Test_component/>}/>
                    <Route exact path = "dash/" element = {<Dashboard/>}/>
                </Routes>
            </ThemeProvider>
        </BrowserRouter>
            

    )


}

export default App;

//I'll use export default for each React component since there will only be 1 component function per file

//Possible creative portion things to say:
// - University API of course offerings which you can add to your own
// - 'Focus' days on homework, i.e. how I move homework between planner dates. Draggable (/can click to send them up or down) to acheive this
// - Progress meters fill up and are percentage based rather than complete/incomplete