import React from 'react';
import ReactDOM from 'react-dom';
//import { useTheme, createMuiTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import Card from '@mui/material/Card'
//import Typography from '@mui/material/Typography'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
//import { makeStyles } from '@material-ui/core/styles'
//import Typography from '@material-ui/core/Typography'


// const useStyles = makeStyles(theme => ({
//     // card: {
//     //     maxWidth: 600,
//     //     margin: 'auto',
//     //     marginTop: theme.spacing(5),
//     //     color: theme.palette.primary
//     // },
// }))

function Test_component(props) {

    //const classes = useStyles(useTheme());
    //className={theme.card}
    //With MUI you can use the styles on normal HTML elements by specifying theme.field
    //Or, if you use the MUI components, they automatically use whatever theme is provided

    //Since App is wrapped in theme provider, its styles will pass down to this component
    //Test should render all fancy-like
    return (
        <div>
        <Card color = "primary" variant = "outlined">
            <Typography variant="h6">Howdy</Typography>
        </Card>
        <Button color = "primary" variant = "contained">Button</Button>
        <Card color = "primary" variant = "outlined">
                <Button color = "secondary" variant = "outlined" ></Button>
                <Typography color = "secondary" variant="h6">Test</Typography>
                </Card>
        </div>
        
            );

}

// class Test_component extends React.Component {

//     render() {
//         return (
//             <div>
//                 <h2>Test</h2>
//             </div>
//         )
//     }

// }

export default Test_component;