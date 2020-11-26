import React, { useState } from 'react';
import clsx from 'clsx';

import calculate from './functions/functions';
import theme from './theme';
import logo from './images/LogoPng.png';

import { makeStyles, Theme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip } from 'recharts';

const useStyles = makeStyles((theme: Theme) => ({
  mainContent: {
    paddingTop: theme.spacing(0),
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
  },
  button: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  fixedHeight: {
    height: 280
  }
}));

function App() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  interface yearValue {
    year: number,
    value: number
  }

  const [data, setData] = useState<yearValue[]>([]);
  const [total, setTotal] = useState<String>('');
  const [years, setYears] = useState<String>('');
  const [calculated, setCalculated] = useState<boolean>(false);

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

    var payload: yearValue[] = calculate(Number(yearsInv), Number(yearsRet), Number(inv), Number(retPct), Number(divPct), Number(divGrowth))

    setData(payload);
    setTotal("$" + new Intl.NumberFormat('en').format(payload[payload.length - 1].value))
    setYears(payload.length.toString())
    setCalculated(true);
  }
  /*
  Improvements
    * add total number same height and better looking, show yearly table button onClick show the table
    * add loading spinner before the calculation and stop it once done
    * add table at the bottom with the values of everything (dividends for each year, value each year, total div return, etc.)
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
      <Container maxWidth="lg" className={classes.mainContent}>
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
                  >
                    Calculate
                  </Button>
                </Grid>
              </form>
            </Paper>
          </Grid>
          {calculated && (
            <>
              <Grid item xs={12} md={12} lg={3}>
                <Paper className={fixedHeightPaper}>
                  <Typography component="p" variant="h4">
                    {total}
                  </Typography>
                  <Typography color="textSecondary">
                    ending portfolio value after {years} years
                </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={9}>
                <Paper className={fixedHeightPaper}>
                  <ResponsiveContainer>
                    <LineChart
                      data={data}
                      margin={{
                        top: 16,
                        right: 16,
                        bottom: 24,
                        left: 24,
                      }}
                    >
                      <XAxis dataKey="year" stroke={theme.palette.text.secondary}>
                        <Label
                          position="bottom"
                          style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
                        >
                          Year
                        </Label>
                      </XAxis>
                      <YAxis stroke={theme.palette.text.secondary}
                        tickFormatter={function (value) {
                          if (typeof value === "number") {
                            return "$" + new Intl.NumberFormat('en').format(value);
                          }
                          else {
                            return value;
                          }
                        }}
                      />
                      <Tooltip
                        cursor={false}
                        labelStyle={{ color: theme.palette.text.primary }}
                        itemStyle={{ color: theme.palette.text.primary }}
                        formatter={function (value, name) {
                          if (typeof value === "number") {
                            return ["$" + new Intl.NumberFormat('en').format(value), 'Value'];
                          }
                          else {
                            return ["$" + value, 'Value'];
                          }
                        }}
                        labelFormatter={function (value) {
                          return `Year ${value}`;
                        }}
                      />
                      <Line type="monotone" dataKey="value" stroke={theme.palette.success.main} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </Paper>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  );
}

export default App;
