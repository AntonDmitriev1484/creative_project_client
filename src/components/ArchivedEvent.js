import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import {restore_archived_event} from '../api-fetch/api-user.js'

function ArchivedEvent (props) {

    const D = new Date(props.date).toLocaleDateString();

    return (
        <Typography> 
            <Chip label={props.course_code}/>: {props.description}. Note: {props.note}. - Archived {D} 
            <Button variant = "outlined"
                onClick = {
                    () => { //Knows what event to restore though event_id prop

                        const on_success = (a) => {
                            console.log('event has been successfully re-added');
                            props.rerender_planner();
                            props.rerender_archive();
                        }

                        restore_archived_event({_id:props.event_id}, on_success)
                    }
                }>Restore</Button>
        </Typography>
    )

}

export default ArchivedEvent