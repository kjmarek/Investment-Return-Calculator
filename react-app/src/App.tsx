import React from 'react';

import calculate from './functions/functions';
import theme from './theme';

import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles((theme: Theme) => ({
  mainContent: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6)
  },
  heroContent: {
    padding: theme.spacing(6, 0, 4),
  },
  body: {
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    padding: theme.spacing(2),
/*     display: 'flex',
    overflow: 'auto',
    flexDirection: 'column', */
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  formMargin: {
    margin: theme.spacing(1)
  }
}));

function App() {
  const classes = useStyles();

  const [values, setValues] = React.useState({
    amount: '',
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  /*
  Improvements
    * put separate card for inputs with fields and calculate button
    * put separate card for graph
    * put separate card for data grid with the data from each year
  */
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Investment Return Calculator
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Calculate the yearly return of your investments. Made by Kyle Marek.
          </Typography>
        </Container>
      </div>
      <Container maxWidth="md" className={classes.mainContent}>
        <Grid
          container
          justify="center"
          spacing={3}
        >
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Grid
                container
                justify="center"
                spacing={3}
              >
                <Grid item xs={12}>
                  <FormControl fullWidth className={classes.formMargin}>
                    <InputLabel htmlFor="standard-adornment-amount" color="secondary">Amount</InputLabel>
                    <Input
                      id="standard-adornment-amount"
                      value={values.amount}
                      onChange={handleChange('amount')}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      color={"secondary"}
                    />
                  </FormControl>
                </Grid>
                <Button 
                  variant="contained"
                  className={classes.button}
                  onClick={() => calculate(20, 40000, 20, 10, 3, 7)}
                >
                  Calculate
                </Button>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <Paper className={classes.paper}>
              Total = 25,000
            </Paper>
          </Grid>
          <Grid item xs={12} md={12} lg={10}>
            <Paper className={classes.paper}>
              This is where the graph will go after the calculations
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;