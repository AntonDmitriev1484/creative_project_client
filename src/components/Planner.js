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
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EventArchive from './EventArchive.js'
import AddHomework from './AddHomework.js'
import CourseSelector from './CourseSelector.js'
import {unresolved_events, current_courses, 
    delete_event, add_event, update_event} from '../api-fetch/api-user.js'


import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table

//https://mui.com/x/api/data-grid/data-grid/


function Planner () {
    const [unresolvedEvents, setUnresolvedEvents] = useState({events:[]});
    const [courses, setCourses] = useState({});

    const [split_view, setSplitView] = useState(false);



    const convert_courses_to_str = () => {
        //return courses.map((course)=>(course.course.dept_code+course.course.course_code))
        return courses.map((course)=>(course.course.course_code))
    }


    
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

            //https://mui.com/x/react-data-grid/editing/#column-with-valuegetter
            //https://codesandbox.io/s/data-grid-set-cell-value-issue-example-forked-or3rw?file=/src/Demo.tsx

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
                        "course":"",
                        // "course":{
                        // }
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
    let view_component = []; //Will either be an array of multiple data tables and text, or will just be one main data grid
   
    if (split_view){

        //First it'll be helpful to sort by date

        let sorted_events = [...unresolvedEvents.events]; //Copies the state's events into this other array


        console.log('pre sort ');

        sorted_events.forEach((event)=> {
            console.log(event);
        })

        sorted_events.sort(
            (a,b)=> { 
              let one = new Date(a.date_time_due);
              let two = new Date(b.date_time_due);
              return one - two;
          });

        console.log('post studio ');
        sorted_events.forEach((event)=> {
            console.log(event);
        })

        // const target = {_id: unresolvedEvents.events[params.row.index]._id}

        let i = 0;


        console.log('length '+sorted_events.length);
        while (i < sorted_events.length-1){

            //Comparing NAN to NAN because the last element in the sorted array is always a blank column that we prep for the other view

            console.log('out while '+i);
            let event = sorted_events[i];
            
            //Kind of works but is a bit buggy, the first place I would check is the indexing system used to map rows to state objects

            let split_rows = [];

            // if (!(new Date(event.date_time_due).setHours(0,0,0) === new Date((sorted_events[i]).date_time_due).setHours(0,0,0))){

            // }


            console.log(new Date(event.date_time_due).setHours(0,0,0) + ' '+new Date((sorted_events[i]).date_time_due).setHours(0,0,0))
            while (new Date(event.date_time_due).setHours(0,0,0) === new Date((sorted_events[i]).date_time_due).setHours(0,0,0)){

                console.log('in while '+i)

                //if (!(sorted_events[i]).new){
                    split_rows.push( {
                        new : false,
                        index: i,
                        id: (sorted_events[i])._id,
                        description: (sorted_events[i]).description,
                        course_code: (sorted_events[i]).course.course.dept_code+""+(sorted_events[i]).course.course.course_code,
                        progress: (sorted_events[i]).progress,
                        date_due: new Date((sorted_events[i]).date_time_due).toLocaleDateString(),
                        note: (sorted_events[i]).note
                    })
                //}
                // else {
                //     split_rows.push( {
                //         new: true,
                //         index: i,
                //         id: (sorted_events[i])._id,
                //         description: (sorted_events[i]).description,
                //         course_code: (sorted_events[i]).course.course.dept_code+""+(sorted_events[i]).course.course.course_code,
                //         progress: (sorted_events[i]).progress,
                //         date_due: new Date((sorted_events[i]).date_time_due).toLocaleDateString(),
                //         note: (sorted_events[i]).note})
                // }
                
                i++;
            }

            // if (i == 6) {
            //     i=7;
            // }

            
            view_component.push(
                <Card>
                    <Typography> Date: {new Date(event.date_time_due).toLocaleDateString()} </Typography>
                        <DataGrid 
                        rowHeight = {100}
                        rows = {split_rows} 
                        editMode = "row"
                        columns = {cols} 
                        autoHeight = {true}
                        experimentalFeatures={{ newEditingApi: true }}
                        />
                </Card>
            )

            // i++


            // //Adds the tail event to the list
            // if (!event.new){
            //     split_rows.push( {
            //         new : false,
            //         index: i,
            //         id: event._id,
            //         description: event.description,
            //         course_code: event.course.course.dept_code+""+event.course.course.course_code,
            //         progress: event.progress,
            //         date_due: new Date(event.date_time_due).toLocaleDateString(),
            //         note: event.note})
            // }
            // else {
            //     split_rows.push( {
            //         new: true,
            //         index: i,
            //         id: event._id,
            //         description: event.description,
            //         course_code: event.course.course.dept_code+""+event.course.course.course_code,
            //         progress: event.progress,
            //         date_due: new Date(event.date_time_due).toLocaleDateString(),
            //         note: event.note})
            // }
        
        }


    }
    else {

        //let rows = [];

     //Says: if unresolvedEvents.events exists, then run forEach
     unresolvedEvents.events?.forEach((event, index) => {

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

        view_component = (<DataGrid 
            rowHeight = {100}
            rows = {rows} 
            editMode = "row"
            columns = {cols} 
            autoHeight = {true}
            experimentalFeatures={{ newEditingApi: true }}
            />);
    }
   

    const trigger_rerender = () => {
        //This function will be passed through props all the way to the restore button for each archived event
        //where it'll be used to re-render this component in the background
        
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


    return (<div> <Typography variant="h1">Planner</Typography>

                <Button onClick = {
                    (event) => {
                        setSplitView(!split_view);
                    }
                }>Switch View</Button>


                {view_component}
                {/* <DataGrid 
                    rowHeight = {100}
                    rows = {rows} 
                    editMode = "row"
                    columns = {cols} 
                    autoHeight = {true}
                    experimentalFeatures={{ newEditingApi: true }}
                    /> */}

                <Accordion TransitionProps={{ unmountOnExit: true }}>
                    <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                    >
                    <Typography>See your archived events</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                            <EventArchive rerender_planner = {trigger_rerender}/>
                    </AccordionDetails>
                </Accordion>
                
             
            </div>);
}

export default Planner;