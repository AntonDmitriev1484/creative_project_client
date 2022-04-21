//My MUI Theme
//https://mui.com/material-ui/customization/theming/
import { createTheme } from '@mui/material/styles';
//import { createMuiTheme } from '@material-ui/core/styles'

//Import error fixed by: https://lifesaver.codes/answer/module-not-found-error-when-bundling-with-webpack-5-7260


//https://bareynol.github.io/mui-theme-creator/ For theme creation

const theme = createTheme({
    palette: {
        primary: {
          main: '#022B3A',
        },
        secondary: {
          main: '#1f7A8C',
        },
        type: 'dark',
      }
    });


export default theme;