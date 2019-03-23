import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import MainRoute from './MainRoute';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import 'typeface-roboto';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
//import history from './Componentes/history'

const theme = createMuiTheme({
  root: {
    flexGrow: 1,
  },
  typography: {
    useNextVariants: true,
    htmlFontSize: 16,
    fontFamily: "'Montserrat', sans-serif",
  },
  palette: {
    primary: pink,
    secondary: grey,
  },
  status: {
    danger: 'pink',
  },
  grid: {
    flexGrow: 1,
  },
  img: {
    display:"block",
  },
  overrides: {
    MuiButton: {
      root: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        // borderRadius: 3,
        // border: 0,
        // color: 'white',
        // height: 48,
        // padding: '0 30px',
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      },
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MainRoute Url="http://app.dinadiesel.com/" ApiRest="https://app.dinadiesel.com/ApiRest/"/>
    </MuiThemeProvider>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
