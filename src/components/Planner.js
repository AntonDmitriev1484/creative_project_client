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
import Button from '@mui/material/Button';
import {unresolved_events} from '../api-fetch/api-user.js';


import { DataGrid } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table
//https://mui.com/x/api/data-grid/data-grid/


//Sample event json

// {"date_time_created":"2022-04-13T02:28:15.108Z",
// "date_time_assigned":"2022-04-13T02:28:15.108Z",
// "date_time_due":"2022-04-13T02:28:15.108Z",
// "progress":0,
//"description":"Test homework add ARC",
// "note":"I hate JS",
// "course":{
//     "course":{"name":"Rapid Prototype Development",
//             "dept_name":"Computer Science",
//             "dept_code":"CSE",
//             "course_code":"330S",
//             "_id":"625799063724762d6bde1e51"},
//             "tags":[],
//             "description":"On the struggle bus with this class rn",
//             "note":"A note",
//             "semester_taken":4,
//             "_id":"625799063724762d6bde1e50"},
// "_id":"625799063724762d6bde1e4f"}

function Planner () {
    const [unresolvedEvents, setUnresolvedEvents] = useState({events:[]});
    useEffect( () => {

        const on_success = (a) => {
            console.log(a);
            setUnresolvedEvents({events:a.events});
        }

         unresolved_events("", on_success);

    }, []);

    const cols =[ //Defining the data grid's columns
        {field: "description", headerName: "Assignment", width: "100"},
        {field: "course_code", headerName: "Course", width: "100"},

    ];

    const rows = unresolvedEvents.events.map((event) => ({
        id: event._id,
        description: event.description,
        course_code: event.course.course.dept_code+""+event.course.course.course_code,
    }));

    //Need some way to convert each event into a EventRow component
    //props???

    //nest that in one component
    //then render it in the bod

    let row_component_array = [];

    
    console.log(rows);
    console.log(cols);
    // return (<div> <Typography variant="h1">User</Typography>
    // <Typography variant="h4">Events: {unresolvedEvents.events.toString()}</Typography></div>);

    return (<div> <Typography variant="h1">Planner</Typography>
    <DataGrid rows = {rows} columns = {cols} autoHeight = {true}></DataGrid>
    <Typography variant="h4">Events: {unresolvedEvents.events.toString()}</Typography></div>);
}

export default Planner;