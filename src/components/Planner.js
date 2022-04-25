import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'

import mui_theme from '../styles/mui_theme.js'

import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';
import Grid from '@mui/material/Grid';

import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
//import TabPanel from '@mui/material/TabPanel'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Slider from '@mui/material/Slider'
import AddHomework from './AddHomework.js'
import CourseSelector from './CourseSelector.js'
import {unresolved_events, current_courses, 
    delete_event, add_event, update_event} from '../api-fetch/api-user.js'


import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table
import { PropaneRounded } from '@mui/icons-material';
//https://mui.com/x/api/data-grid/data-grid/


//Sample event json

// {"date_time_created":"2022-04-13T02:28:15.108Z",
// "date_time_assigned":"2022-04-13T02:28:15.108Z",
// "date_time_due":"2022-04-13T02:28:15.108Z",
// "progress":0,
// "description":"Test homework add ARC",
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
        //return courses.map((course)=>(course.course.dept_code+course.course.course_code))
        return courses.map((course)=>(course.course.course_code))
    }

    const component = <Button/>;

    
    useEffect( () => {

        const on_success_events = (a) => {
            console.log(a);
            a.events?.push({ //pushes back a blank event
                "new":true, //New "flag" is set to true
                "_id":"0", //BE CAREFUL ABOUT THIS IT MIGHT CAUSE BUGS WHEN SENT TO DB
                "date_time_due":"",
                "progress":0,
                "description":"",
                "note":"",
                "course":{
                    "course":{
                        "dept_code":"",
                        "course_code":""
                    },
                }
            }); //Pushes an extra item back into the array, this will be our way to add new events
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

        {field: "progress", 
        headerName: "Progress", 
        width: "250",
         type:'slider', 
         editable: true,
         renderCell: (props) => {

            console.log(props);
            return (
                <Slider
                    defaultValue={props.row.progress}
                    // getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={10}
                    width="200"
                    marks
                    size="small"
                    min={0}
                    max={100}
                    />
                    // <Slider defaultValue={30} step={10} marks min={10} max={110} disabled />
            );
         },
         renderEditCell: (props) => {
            //const apiRef = useGridApiContext();
            const { id, api, field, value } = props;

            const handleChange = (event) => {
                const newValue = event.target.value; 
                props.api.setEditCellValue({ id, field, value: newValue });
                // The new value entered by the user
                //Since we're using a custom grid cell component, we need to
                //define how it's value appears on the grid
            };

            return (
                <Slider
                    defaultValue={props.row.progress}
                    // getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={10}
                    width="200"
                    marks
                    size="small"
                    min={0}
                    max={100}

                    onChange={handleChange}
                    />
                    // <Slider defaultValue={30} step={10} marks min={10} max={110} disabled />
            );
          }

        },
        {field: "date_due", 
        headerName: "Due", 
        width: "200", 
        type:'date', 
        editable: true},

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
                    //When creating rows, we give each row an index which 1:1 corresponds to an event
                    //in the unresolvedEvents state object
                    //So, we can use this index to obtain the full event from our state
                    //then we can use this event in our request to the backend

                    const on_success = (a) => {
                        //Since backend delete just returns the message
                        //We need to manualy remove this event from our react component state

                        let newUnresolvedEvents = [...unresolvedEvents.events]; // shallow copy
                        newUnresolvedEvents?.splice(params.row.index,1);
                        setUnresolvedEvents({events:newUnresolvedEvents});
                    }
                    //delete_unresolved_event on the backend really just needs an _id

                    const target = {_id: unresolvedEvents.events[params.row.index]._id}
                    delete_event(target, on_success);

                }
            }/>,
            (params.row.new ? //If this row has the new flag set to true, we'll render a save button instead of an update button
            <GridActionsCellItem  icon={<SaveIcon/>}  label="Create" showInMenu 
            onClick = {
                () => {
                    //Need to update state for the frontend

                    //And send a request to add event to the backend

                    const on_success = () => {

                        //If adding the event is successful, our planner will re-render by performing
                        //another fetch request back to the server for unresolved events.

                        const on_success_events = (a) => {
                            a.events?.push({ //pushes back a blank event
                                "new":true, //New "flag" is set to true
                                "_id":"0", //BE CAREFUL ABOUT THIS IT MIGHT CAUSE BUGS WHEN SENT TO DB
                                "date_time_due":"",
                                "progress":0,
                                "description":"",
                                "note":"",
                                "course":{
                                    "course":{
                                        "dept_code":"",
                                        "course_code":""
                                    },
                                }
                            }); //Pushes an extra item back into the array, this will be our way to add new events
                            setUnresolvedEvents({events:a.events});
                        }
                
                         unresolved_events("", on_success_events);

                    }

                    let row_info = params.row;

                    // console.log(row_info.date_due);
                    // console.log(new Date(row_info.date_due).toISOString());
                    const date_due_formatted = new Date(row_info.date_due).toISOString();
                    //Conver the normal format date into an ISOString format before storage in our MongoDB database

                    let event = {
                        "date_time_created":"",
                        "date_time_assigned":"",
                        "date_time_due":row_info.date_due,
                        "progress":row_info.progress,
                        "description":row_info.description,
                        "note":row_info.note,
                        "course":{
                            
                        }
                    }

                    //WARNING: DISGUSTINGLY BAD CODE

                    //There's definitley a better way to do this,
                    //for now, this method will linear search through the courses state
                    //until it finds a course_code in a course object which matches the one
                    //that we get as a string from the singleSelect

                    courses.forEach( (course) => {
                        console.log('state course code '+course.course.course_code+' singleSelect course code '+params.row.course_code);
                        if (course.course.course_code === row_info.course_code){
                            
                            event.course = course;
                        }
                    })



                    event.date_time_created = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    //Cited from: https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
                    event.date_time_assigned = event.date_time_created;

                    //Adding date time created and assigned properties


                    add_event(event, on_success)
                    //console.log(unresolvedEvents.events[params.row.index]);
                    }
            }/> 
            : 
            <GridActionsCellItem  icon={<EditIcon/>}  label="Update" showInMenu 
            onClick = {
                () => {


                    const on_success = () => {

                        //If adding the event is successful, our planner will re-render by performing
                        //another fetch request back to the server for unresolved events.

                        const on_success_events = (a) => {
                            a.events?.push({ //pushes back a blank event
                                "new":true, //New "flag" is set to true
                                "_id":"0", //BE CAREFUL ABOUT THIS IT MIGHT CAUSE BUGS WHEN SENT TO DB
                                "date_time_due":"",
                                "progress":0,
                                "description":"",
                                "note":"",
                                "course":{
                                    "course":{
                                        "dept_code":"",
                                        "course_code":""
                                    },
                                }
                            }); //Pushes an extra item back into the array, this will be our way to add new events
                            setUnresolvedEvents({events:a.events});
                        }
                
                         unresolved_events("", on_success_events);

                    }

                    let row_info = params.row;
                    const date_due_formatted = new Date(row_info.date_due).toISOString();

                    let event = {
                        "_id":row_info.id,
                        "date_time_created":"",
                        "date_time_assigned":"",
                        "date_time_due":row_info.date_due,
                        "progress":row_info.progress,
                        "description":row_info.description,
                        "note":row_info.note,
                        "course":{
                            
                        }
                    }

                    //WARNING: DISGUSTINGLY BAD CODE

                    //There's definitley a better way to do this,
                    //for now, this method will linear search through the courses state
                    //until it finds a course_code in a course object which matches the one
                    //that we get as a string from the singleSelect

                    courses.forEach( (course) => {
                        console.log('state course code '+course.course.course_code+' singleSelect course code '+params.row.course_code);
                        if (course.course.course_code === row_info.course_code){
                            
                            event.course = course;
                        }
                    })



                    event.date_time_created = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
                    //Cited from: https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs
                    event.date_time_assigned = event.date_time_created;

                    //Adding date time created and assigned properties

                    console.log(event);

                    //I THINK THIS IS FINE, API UPDATE EVENT METHOD IS RETURNING SUCCESS WITHOUT ACTUALLY UPDATING EVENT

                    update_event(event, on_success);
                    //console.log(unresolvedEvents.events[params.row.index]);
                    }
                    
            }/> )
            ,
          ]
        
        
        }



    ];


    let rows = [];
    //Says: if unresolvedEvents.events exists, then run forEach
    unresolvedEvents.events?.forEach((event, index) => {
                //console.log(index);

                // const progress_slider = (<Slider
                //     defaultValue={0}
                //     // getAriaValueText={valuetext}
                //     valueLabelDisplay="auto"
                //     step={10}
                //     marks
                //     min={event.progress}
                //     max={100}
                //     />)

                if (!event.new){
                    rows.push( {
                        new : false,
                        index: index,
                        id: event._id,
                        description: event.description,
                        course_code: event.course.course.dept_code+""+event.course.course.course_code,
                        progress: event.progress,
                        date_due: new Date(event.date_time_due).toLocaleDateString(),
                        note: event.note})
                }
                else {
                    rows.push( {
                        new: true,
                        index: index,
                        id: event._id,
                        description: event.description,
                        course_code: event.course.course.dept_code+""+event.course.course.course_code,
                        progress: event.progress,
                        date_due: new Date(event.date_time_due).toLocaleDateString(),
                        note: event.note})
                }
            }
        );

    //Might edit events through a pop-up window, include an edit button in each row
    //Might delete events through a delete button in each row

    //Most pressing concern is figuring out how to include full course information on each element of course_selector and then access that.

    let row_component_array = [];


    // return (<div> <Typography variant="h1">User</Typography>
    // <Typography variant="h4">Events: {unresolvedEvents.events.toString()}</Typography></div>);

    return (<div> <Typography variant="h1">Planner</Typography>
                <DataGrid 
                
                    rowHeight = {100}
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