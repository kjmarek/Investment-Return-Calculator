import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        background: {
            default: '#F5F5F5'
        },
        secondary: {light: "#81c784", main: "#4caf50", dark: "#388e3c", contrastText: "rgba(0, 0, 0, 0.87)"}
    }
  });

export default theme;