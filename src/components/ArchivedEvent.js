import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip';
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

function ArchivedEvent (props) {

    const D = new Date(props.date).toLocaleDateString();

    return (
        <Typography> <Chip label={props.course_code}/>: {props.description}. Note: {props.note}. - Archived {D} <Button variant = "outlined">Restore</Button></Typography>
    )

}

export default ArchivedEvent