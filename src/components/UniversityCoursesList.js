import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import {current_courses, user_info, delete_course, university_courselist, add_course} from '../api-fetch/api-user.js'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table

function UniversityCoursesList (props) {

    const [courses_offered, setCoursesOffered] = useState({courses:[]})

        useEffect(() => {

                const on_success = (a) => {
                    //a.content.courses
                    setCoursesOffered({courses:a.content.courses}) //Extra .content field because I did these differently
                }
        
                const uni = props.name.replace(" ", "_"); //replaces all space with underscores so that the university name can be sent through the url to the api
        
                // university_courselist(props.name, on_success);
                university_courselist(uni, on_success);
         

        },[props.name]) //Fixed infite loop issue by adding props.name as a dependency. See: https://daveceddia.com/useeffect-hook-examples/

    

    let component_array = [];

    courses_offered.courses.forEach((course)=> {
        component_array.push(
            <Card variant="outlined">
                <Typography variant = "h6">{course.name} - {course.dept_code} {course.course_code}</Typography>
                <Typography>{course.description}</Typography>
                <Button color = "secondary" 
                variant = "contained" 
                onClick={
                    ()=> {
                        const on_success =(a) => {
                            //upon adding the course, we need to trigger a lambda function which re-renders the usercourses component
                            props.trigger_rerender();
                        }

                        add_course({course:course},on_success);
                    }
                }>Add</Button>
            </Card>
            )
    })
    return (
        <Card variant="outlined">
            {component_array}
        </Card>
    );
}

export default UniversityCoursesList