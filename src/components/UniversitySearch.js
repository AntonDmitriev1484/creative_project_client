import React from 'react';
import { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';


import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import {current_courses, user_info, delete_course} from '../api-fetch/api-user.js'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table

import UniversityChip from './UniversityChip.js'

function UniversitySearch() {

    const [universities, setUniversities] = useState({});

    return (
        <div>
            <Typography variant="h4">Find your university: </Typography>
            <TextField  label="Input university here... " id="university-search" variant= "standard"
            onChange = { //Each time this text field is changed, onChange is called , and an event object is passed to the function
                (event)=>{
                    // //event.target.value is the value within this MUI object
                    // const temp = info.password;
                    // setInfo({username: event.target.value, password: temp});
                }
            }/>
            <UniversityChip name="Washington University in St. Louis"/>
        </div>
       
    )

}


export default UniversitySearch