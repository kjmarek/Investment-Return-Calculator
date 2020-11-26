import React, { useState } from 'react';

import calculate from './functions/functions';
import theme from './theme';

import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import logo from './images/LogoPng.png';

const useStyles = makeStyles((theme: Theme) => ({
  mainContent: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  heroContent: {
    padding: theme.spacing(4, 0, 4),
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

  const [yearsInv, setYearsInv] = useState<String>('');
  const [yearsRet, setYearsRet] = useState<String>('');
  const [inv, setInv] = useState<String>('');
  const [retPct, setRetPct] = useState<String>('');
  const [divPct, setDivPct] = useState<String>('');
  const [divGrowth, setDivGrowth] = useState<String>('');

  const handleYearsInv = (event: any) => {
    const re = /^[1-9]{1}$|^[1-9]{1}[0-9]{1}$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setYearsInv(event.target.value);
    }
  };

  const handleYearsRet = (event: any) => {
    const re = /^[0-9]{1}$|^[1-9]{1}[0-9]{1}$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setYearsRet(event.target.value);
    }
  };

  const handleInv = (event: any) => {
    const re = /^[1-9]{1}$|^[1-9]{1}[0-9]{1,5}$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setInv(event.target.value);
    }
  };

  const handleRetPct = (event: any) => {
    const re = /^[0-9]{1}$|^[0-9]{1}\.{1}$|^[0-9]{1}\.{1}[0-9]{1,2}$|^[1-9]{1}[0-9]{1}$|^[1-9]{1}[0-9]{1}\.{1}$|^[1-9]{1}[0-9]{1}\.{1}[0-9]{1,2}$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setRetPct(event.target.value);
    }
  };

  const handleDivPct = (event: any) => {
    const re = /^[0-9]{1}$|^[0-9]{1}\.{1}$|^[0-9]{1}\.{1}[0-9]{1,2}$|^[1-9]{1}[0-9]{1}$|^[1-9]{1}[0-9]{1}\.{1}$|^[1-9]{1}[0-9]{1}\.{1}[0-9]{1,2}$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setDivPct(event.target.value);
    }
  };

  const handleDivGrowth = (event: any) => {
    const re = /^[0-9]{1}$|^[0-9]{1}\.{1}$|^[0-9]{1}\.{1}[0-9]{1,2}$|^[1-9]{1}[0-9]{1}$|^[1-9]{1}[0-9]{1}\.{1}$|^[1-9]{1}[0-9]{1}\.{1}[0-9]{1,2}$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      setDivGrowth(event.target.value);
    }
  };

  const submitForm = (event: any) => {
    event.preventDefault();

    calculate(Number(yearsInv), Number(yearsRet), Number(inv), Number(retPct), Number(divPct), Number(divGrowth));
  }
  /*
  Improvements
    * put separate card for data grid with the data from each year
    * add graph
    * add total number
    * allow for any variation of investing/retired with inputs
  */

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.heroContent}>
        <Container maxWidth="sm">
          <Grid
            container
            justify="center"
          >
            <img
              src={logo}
              width="100px"
              alt="logo"
            />
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Investment Return Calculator
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Calculate the year by year return of your investments. Made by Kyle Marek.
            </Typography>
          </Grid>
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
              <form onSubmit={submitForm} autoComplete="off">
                <Grid
                  container
                  justify="center"
                  spacing={3}
                >
                  <Grid item xs={6}>
                    <TextField
                      color={"secondary"}
                      required
                      fullWidth
                      id="yearsInv"
                      label="Years Investing"
                      name="yearsInv"
                      value={yearsInv}
                      onChange={handleYearsInv}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"> </InputAdornment>,
                      }}
                      autoFocus
                      helperText="Years adding investments (1 - 99)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      color={"secondary"}
                      required
                      fullWidth
                      id="yearsRet"
                      label="Years Retired"
                      name="yearsRet"
                      value={yearsRet}
                      onChange={handleYearsRet}
                      InputProps={{
                        startAdornment: <InputAdornment position="start"> </InputAdornment>,
                      }}
                      helperText="Years without adding investments (0 - 99)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      color={"secondary"}
                      required
                      fullWidth
                      id="inv"
                      label="Investment Per Year"
                      name="inv"
                      value={inv}
                      onChange={handleInv}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      }}
                      helperText="Investment added per year ($1 - 999,999)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      color={"secondary"}
                      required
                      fullWidth
                      id="retPct"
                      label="Average Yearly Return"
                      name="retPct"
                      value={retPct}
                      onChange={handleRetPct}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      helperText="Percent return expected yearly (.01 - 99.99%)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      color={"secondary"}
                      required
                      fullWidth
                      id="divPct"
                      label="Average Dividend Percentage"
                      name="divPct"
                      value={divPct}
                      onChange={handleDivPct}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      helperText="Percent dividend return expected yearly (.01 - 99.99%)"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      color={"secondary"}
                      required
                      fullWidth
                      id="divGrowth"
                      label="Average Dividend Growth Percentage"
                      name="divGrowth"
                      value={divGrowth}
                      onChange={handleDivGrowth}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">%</InputAdornment>,
                      }}
                      helperText="Percent dividend growth expected yearly (.01 - 99.99%)"
                    />
                  </Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    className={classes.button}
                  /* onClick={() => calculate(20, 40000, 20, 10, 3, 7)} */
                  >
                    Calculate
                  </Button>
                </Grid>
              </form>
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
