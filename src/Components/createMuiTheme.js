import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
  status: {
    danger: 'orange',
  },
});
withTheme()(Component) => Component
