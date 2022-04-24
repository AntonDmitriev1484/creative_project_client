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
import { PropaneSharp } from '@mui/icons-material';

function UniversitySearch(props) {

    const[all_universities, setAllUniversities] = useState({array:[
        "Washington University in St.Louis", "Harvard University", "Purdue University", "University of Urbana Champaign in Illinois"
    ]}); //Holds all univiersities

    const [universities, setUniversities] = useState({array:[
        "Washington University in St.Louis", "Harvard University", "Purdue University", "University of Urbana Champaign in Illinois"
    ]}); //This will be modified as we add things to our search

    //use Effect is causing the full list to render after each time we update the component in render, so the search isn't really doing anything
    // useEffect(() => {

    //     setAllUniversities({array:[
    //         "Washington University in St. Louis", "Harvard University", "Purdue University", "University of Urbana Champaign in Illinois"
    //     ]})

    //     setUniversities({array:[
    //         "Washington University in St. Louis", "Harvard University", "Purdue University", "University of Urbana Champaign in Illinois"
    //     ]})
    // })

    let UniversityChips = [];

    universities.array.forEach((uni)=> {
        UniversityChips.push(<UniversityChip name={uni} trigger_rerender = {props.trigger_rerender}/>);
    })


    return (
        <div>
            <Typography variant="h4">Find your school: </Typography>
            <TextField  label="Input university here... " id="university-search" variant= "standard"
            onChange = { //Each time this text field is changed, onChange is called , and an event object is passed to the function
                (event)=>{
                    const search = event.target.value;

                    let newUniversities = [];
                    all_universities.array.forEach((uni)=> { //Changing our array to match what is being searched
                        if (uni.includes(search)){
                            newUniversities.push(uni);
                        }
                    })

                    setUniversities({array:newUniversities})
                }
            }/>
            {/* <UniversityChip name="Washington University in St. Louis"/> */}
            {UniversityChips}
        </div>
       
    )

}


export default UniversitySearch