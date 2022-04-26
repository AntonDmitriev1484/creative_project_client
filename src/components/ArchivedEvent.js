import React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

function ArchivedEvent (props) {

    return (
        <Typography> Assignment: {props.description}. For {props.course_code}. Note: {props.note}. <Button variant = "outlined">Restore</Button></Typography>
    )

}

export default ArchivedEvent