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
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import {current_courses} from '../api-fetch/api-user.js'


function CourseSelector() {

    //Need to somehow attach a callback onto each option which contains that course's full information

    const [course, setCourse] = useState({});

    let courses = [];

    useEffect(() => {
        const on_success = (a) => {
            courses = a.courses;
        }
        current_courses("", on_success);

    })

    //const courses_component_array = courses.map((course)=>(<MenuItem value={course}>{course.course_code}</MenuItem>)); //Not producing an array? Just producing nothing?
    //maps each course json object to a <MenuItem react component which has the full json of information about the course associated with it

    //console.log("Course component array "+courses_component_array);
    return (
        <FormControl fullWidth>
           
            <Select
            id="course-select"
            defaultValue=""
            label="Age"
            width="100"
            onChange={
                (event) => { //So this components state 'course' will always 
                    setCourse(event.target.value);
                }
            }
            >
            {/* {courses_component_array} */}
            <MenuItem value={{
                name: "The American School",
                dept_name: "Education",
                dept_code: "EDUC",
                course_code: "301",
                description: "School things"
            }}>301</MenuItem>
            </Select>
      </FormControl>
    )
}

export default CourseSelector;
