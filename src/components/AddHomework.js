import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import mui_theme from '../styles/mui_theme.js'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
//import TabPanel from '@mui/material/TabPanel'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import CourseSelector from './CourseSelector.js'

import {unresolved_events} from '../api-fetch/api-user.js'

//Example homework addition json
// "course": {
//     "course": {
      
//       "name" : "Rapid Prototype Development", 
//       "dept_name" : "Computer Science", 
//       "dept_code" : "CSE", 
//       "course_code" : "330S", 
//       "description" : "Make fun projects"
//     },
//     "description": "On the struggle bus with this class rn",
//     "note": "A note",
//        "semester_taken": 4
//   },
// "date_time_created" : "2022-04-13T02:28:15.108Z",
// "date_time_assigned" : "2022-04-13T02:28:15.108Z",
// "date_time_due" : "2022-04-13T02:28:15.108Z",
// "progress" : 0,
// "description" : "Test homework add ARC",
// "note" : "I hate JS"

function AddHomework() {

    const [homework, setHomework] = useState({
        course: {
            
        },
        date_time_created: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), 
        //Cited from: https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
        date_time_assigned: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''), 
        date_time_due: "",
        progress: 0,
        description: "",
        note: "",

    });

    //Can use a MUI calendar picker to pick the date
    return (
            <div>
                    <TextField  label="Assignment" id="homework-description" variant= "outlined"
                            onChange = { //Each time this text field is changed, onChange is called , and an event object is passed to the function
                                (event)=>{
                                    setHomework({...homework, description: event.target.value});
                                }
                            }/>



                    <CourseSelector/>

                        <TextField label="Note" id="homework-note" variant= "outlined"
                            onChange = { //Constantly causing state to re-render, but thats fine for now
                                (event)=>{
                                    setHomework({...homework, note: event.target.value});
                                }
                                
                            }/>

                        <Button 
                            color="secondary" variant="contained"
                            onClick= { () => {

                                const user = info.username;
                               
                                // const on_success = (a) => {
                                //     console.log("In login success");
                                //     console.log(user);
                                //     document.cookie = "username= "+user+";"; //Because we still have access to this scope's info 
                                //     console.log('redirecting');
                                //     //redirect("/dash/"); //Change this redirect to only work on successful entry, maybe pass it to the api-user function
                                // }
                               
                                // login(info, on_success);
                                }
                            } >Enter</Button>

            </div>
    )
}

export default AddHomework;



//... is spread operator and is pretty useful since we can only update our state with useState()
//to do this we have to pass in one object at a time and can't really change individual fields the normal way

// const adrian = {
//     fullName: 'Adrian Oprea',
//     occupation: 'Software developer',
//     age: 31,
//     website: 'https://oprea.rocks'
//   };
//   Let’s assume you want to create a new object(person) with a different name and website, but the same occupation and age.
  
//   You could do this by specifying only the properties you want and use the spread operator for the rest, like below:
  
//   const bill = {
//     ...adrian,
//     fullName: 'Bill Gates',
//     website: 'https://microsoft.com'
//   };
//   What the code above does, is to spread over the adrian object and get all its properties, 
//   then overwrite the existing properties with the ones we’re passing. 
//   It copies the properties of the adrian object, over to the newly created object, 
//   and then explicitly overwrites firstName and webSite. 
//   Think of this spread thing as extracting all the individual properties one by one and transferring them to the new object.