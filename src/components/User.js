import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

import UniversitySearch from './UniversitySearch.js';

import {current_courses, user_info, delete_course} from '../api-fetch/api-user.js'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table


function User(props) {

    const [userInfo, setUserInfo] = useState({username:"",email:"", courses:[]});

    //This state contains user's username, email, and an array of their pcourse objects


    //let personal_rows = [ ];

    useEffect( () => {

        const on_success_info = (a) => {
            setUserInfo({...userInfo, username:a.user_info.username,email:a.user_info.email});


            const inner_username = a.user_info.username;
            const inner_email = a.user_info.email;

            const on_success_courses = (b) => {
                setUserInfo({username:inner_username, email:inner_email, courses:b.courses})
            }
            
            current_courses("", on_success_courses);

        }

         user_info("", on_success_info);



    }, []);


    //For the grid which shows what courses are offered by the university. course objects
    const offerings_cols =[ //Defining the data grid's columns
        {field: "course_name", headerName: "Course", width: "350"},
        {
        field: "course_code", 
        headerName: "Course Code", 
        width: "100"
        },
        {
        field: "dept_code",
        headerName: "Dept Code",
        width: "100"
        },
        {
        field: "official_description",
        headerName: "Official Description",
        width: "400",

        }
    ]

    //For classes which the user has selected. pcourse objects
    const personal_cols = [
        {field: "course_name", headerName: "Course", width: "350"},
        {
        field: "course_code", //Will actually be dept_code + course_code
        headerName: "Course Code", 
        width: "100"
        },
        //Commented out, to do thewse we'd have to give an editing option and thats a pain in the ass
        // {
        // field:"personal_description",
        // headername: "Your Description",
        // width: "400",
        // },
        // {
        //     field:"personal_note",
        //     headername:"Note"
        // },
        {

            field:"actions",
            headerName:"Actions",
            width:200,
            type:"actions",
            getActions: (params) => [ //You will only be able to delete personal courses
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
    
                            let newCourses = [...userInfo.courses]; // shallow copy
                            newCourses?.splice(params.row.index,1); //Splice at the course indexed at our current row
                            setUserInfo({...userInfo, courses:newCourses});
                        }
    
                        const target = {_id: userInfo.courses[params.row.index]._id}
                        delete_course(target, on_success);
    
                    }
                }/>
            ]
        }
       
    ]




    console.log(userInfo);

    let personal_rows = [];

            userInfo.courses.forEach((course, index) => {
    
            personal_rows.push(
                {
                    id: course._id,
                    index: index,
                    course_name: course.course.name,
                    course_code: course.course.dept_code+""+course.course.course_code,
                    // "personal_description": ,
                    // "personal_note": ,
                }
            )})

        personal_rows.forEach((course) => console.log(course));
        //console.log("personal_rows "+personal_rows);

    return (<Card color = "primary" variant = "outlined">
                <Typography variant="h1">User</Typography>
                <Typography variant="h4">Username: {userInfo.username}</Typography>
                <Typography variant="h4">Email: {userInfo.email}</Typography>
                
                <Card color = "primary" variant = "outlined">
                    <Typography variant="h2">Your Courses</Typography>
                    
                    <DataGrid 
                    columns={personal_cols} 
                    rows={personal_rows}
                    autoHeight = {true}
                    experimentalFeatures={{ newEditingApi: true }}/>
                </Card>
                <Card color = "primary" variant = "outlined">
                    <Typography variant = "h2">Add Courses</Typography>
                    <UniversitySearch/>
                </Card>

            </Card>);
}

export default User;