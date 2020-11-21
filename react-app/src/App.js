import React from 'react';

import calculate from './functions/functions';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
}));

function App() {
  const classes = useStyles();

  /*
  Improvements
    * put separate card for inputs with fields and calculate button
    * put separate card for graph
    * put separate card for data grid with the data from each year
  */
  
  return (
    <React.Fragment>
      <CssBaseline />
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
      <Container maxWidth="md">
        <Grid
          container
          justify="center"
        >
          <Button 
          align="center"
          variant="contained"
          onClick={() => calculate(20, 40000, 20, 10, 3, 7)}
          >
            Calculate
          </Button>
          <Grid item xs={12}>
            graph goes here on a card
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default App;
