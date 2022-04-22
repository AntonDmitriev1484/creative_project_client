import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import mui_theme from '../styles/mui_theme.js'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
//import TabPanel from '@mui/material/TabPanel'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AddHomework from './AddHomework.js'
import CourseSelector from './CourseSelector.js'
import {unresolved_events, current_courses, delete_event} from '../api-fetch/api-user.js'


import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table
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
    const [courses, setCourses] = useState({});

    const convert_courses_to_str = () => {
        return courses.map((course)=>(course.course.dept_code+course.course.course_code))
    }

    
    useEffect( () => {

        const on_success_events = (a) => {
            console.log(a);
            setUnresolvedEvents({events:a.events});
        }

         unresolved_events("", on_success_events);

         const on_success_courses = (a) => {
             setCourses( a.courses); 
             //console.log('selector options '+courses);
         }

         current_courses("", on_success_courses);

    }, []);

    const cols =[ //Defining the data grid's columns
        {field: "description", headerName: "Assignment", width: "350", editable: true},

        {field: "course_code", 
        headerName: "Course", 
        width: "100", 
         editable:true,
          type:'singleSelect',
        valueOptions:convert_courses_to_str},

        {field: "progress", headerName: "Progress", width: "200", editable: true},
        {field: "date_due", headerName: "Due", width: "100", editable: true},
        {field: "note", headerName: "Note", width: "350", editable: true},

        {field: "actions", 
        type:'actions',
        headerName: "Actions", 
        width:"200",
        //getActions called on each row
        getActions: (params) => [ //params: GridRowParams //icon={}
            <GridActionsCellItem  icon={<DeleteIcon/>} label="Delete" showInMenu
            onClick = {
                () => {
                    console.log(unresolvedEvents.events[params.row.index]);
                    //When creating rows, we give each row an index which 1:1 corresponds to an event
                    //in the unresolvedEvents state object
                    //So, we can use this index to obtain the full event from our state
                    //then we can use this event in our request to the backend

                    const on_success = (a) => {
                        console.log("event successfully deleted");
                        //Since backend delete just returns the message
                        //We need to manualy remove this event from our react component state


                        let newUnresolvedEvents = [...unresolvedEvents.events]; // shallow copy
                        console.log(newUnresolvedEvents);
                        newUnresolvedEvents?.splice(params.row.index,1);
                        setUnresolvedEvents({events:newUnresolvedEvents});
                    }
                    //delete_unresolved_event on the backend really just needs an _id

                    console.log(unresolvedEvents.events[params.row.index]._id);
                    const target = {_id: unresolvedEvents.events[params.row.index]._id}
                    delete_event(target, on_success);

                }
            }/>,
            <GridActionsCellItem  icon={<SaveIcon/>}  label="Update" showInMenu 
            onClick = {
                () => {
                    //Something like
                    //setUnresolvedEvents({params.row.progress.value, params.row.note.value ...}) @ params.row.index
                    console.log(unresolvedEvents.events[params.row.index]);
                    }
            }/>,
          ]
        
        
        }



    ];


    let rows = [];
    //Says: if unresolvedEvents.events exists, then run forEach
    unresolvedEvents.events?.forEach((event, index) => {
                //console.log(index);
                rows.push( {
                index: index,
                id: event._id,
                description: event.description,
                course_code: event.course.course.dept_code+""+event.course.course.course_code,
                progress: event.progress,
                date_due: event.date_time_due,
                note: event.note})
            }
        );

    //Might edit events through a pop-up window, include an edit button in each row
    //Might delete events through a delete button in each row

    //Most pressing concern is figuring out how to include full course information on each element of course_selector and then access that.

    let row_component_array = [];

    
    console.log(rows);
    console.log(cols);
    // return (<div> <Typography variant="h1">User</Typography>
    // <Typography variant="h4">Events: {unresolvedEvents.events.toString()}</Typography></div>);

    return (<div> <Typography variant="h1">Planner</Typography>
                <DataGrid 
                    rows = {rows} 
                    editMode = "row"
                    columns = {cols} 
                    autoHeight = {true}
                    experimentalFeatures={{ newEditingApi: true }}
                    />
                {/* <Card color = "primary" variant = "outlined">
                    <AddHomework/>
                </Card> */}
            </div>);
}

export default Planner;