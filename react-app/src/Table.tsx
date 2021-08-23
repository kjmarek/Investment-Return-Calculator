import React from 'react';

import { yearValue } from './interfaces/yearValue';

import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }),
)(TableCell);

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }),
)(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ChartTable(props: {data: yearValue[]}) {
    const classes = useStyles();

    return (
    <>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Year</StyledTableCell>
            <StyledTableCell align="right">Account Value</StyledTableCell>
            <StyledTableCell align="right">Dividends (after tax)</StyledTableCell>
            <StyledTableCell align="right">Capital Gains</StyledTableCell>
            <StyledTableCell align="right">Weighted Div Pct (after tax)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((year) =>(
            <StyledTableRow key={year.year}>
            <StyledTableCell component="th" scope="row">
              {year.year}
            </StyledTableCell>
            <StyledTableCell align="right">{new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(year.value)}</StyledTableCell>
            <StyledTableCell align="right">{new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(year.dividends)}</StyledTableCell>
            <StyledTableCell align="right">{new Intl.NumberFormat('en', { style: 'currency', currency: 'USD' }).format(year.capitalGains)}</StyledTableCell>
            <StyledTableCell align="right">{new Intl.NumberFormat('en', { style: 'percent', maximumFractionDigits: 2 }).format(year.weightedDivPct)}</StyledTableCell>
          </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
    );
  }

  export default ChartTable;