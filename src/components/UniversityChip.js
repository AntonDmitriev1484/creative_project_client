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
import {current_courses, user_info, delete_course} from '../api-fetch/api-user.js'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'; //Actually want to use this instead of a normal table

import UniversityCoursesList from './UniversityCoursesList.js';

//If we want making changes in the modal to re-render the users courses component,
//we might be able to pass a lambda function down through props that triggers a re-render, and use it whenever a new course gets added

function UniversityChip (props) {

    const [open , setOpen] = useState(false); //using a react hook to set the state of the modal window

    //console.log('in universitychip'); Infinite loop is contained to universitycourseslist
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 750,
        height: 750,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 16,
        p: 4,
      };
      //It wasn't showing up earlier because of the styles or something
      //Re-write this style later so it isn't the exact same thing as off the MUI docs

    return (
        <div>
        <Chip color = "primary" label={props.name} variant="filled" onClick = {
            () => {
                setOpen(true);
            }
        }> </Chip>

        <Modal
                open={open} //Just looks at the state to see whether or not the modal should display
                onClose={() => { setOpen(false)}}
            >
                <Box sx={style}>
                    <Card variant="outlined">
                        <Typography variant="h4" sx={{ mt: 2 }}>
                            Courses offered at {props.name}:
                        </Typography>
                    </Card>
                    <Card variant="outlined">
                        <UniversityCoursesList name={props.name} trigger_rerender = {props.trigger_rerender}/>
                    </Card>
                </Box>
            </Modal>
        </div>
    )

}

export default UniversityChip;