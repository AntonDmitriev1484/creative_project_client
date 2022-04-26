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

import ArchivedEvent from './ArchivedEvent.js'
import {archived_events} from '../api-fetch/api-user.js'


import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table


function EventArchive() {

    const [archivedEvents, setArchivedEvents] = useState({archived:[]})


    useEffect(() => {

        const on_success = (a) => {
            

            setArchivedEvents({archived:a.events});
        }

        archived_events("",on_success);

    }, [])


    let archived_event_components = [];

    archivedEvents.archived.forEach((event) => {
        archived_event_components.push(
            <ArchivedEvent
             description = {event.description} 
             course_code = {event.course.course.dept_code+""+event.course.course.course_code}
             note = {event.note}/>
        )
    })


    return (
        <div>
            {archived_event_components}
        </div>

    )
}

export default EventArchive;