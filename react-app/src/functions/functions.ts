//To improve: allow different investment amounts totally chosen by the user with an interface that has investment amount & number of years

/*
yearsInv = years investing (adding money)
inv = investment per year
yearsRet = years not investing (not adding money)
retPct = average return percentage yearly
divPct = average dividend percentage yearly
divGrowth = average dividend growth percentage yearly

yearlyTotals = the total at the end of each year
yearlyInvestments = the amount your money from each year is worth
*/

export default function calculate(yearsInv: number, inv: number, yearsRet: number, retPct: number, divPct: number, divGrowth: number) {
    interface year {
        year: number,
        investmentValue: number,
        dividends: number
    }

    var yearlyTotals:number[] = []
    var yearlyInvestments:year[] = []

    /*
    set yearlyInvestments starting year, investment value, and dividends
    */
    for (var i = 1; i <= yearsInv; i++) {
        yearlyInvestments.push({year: i, investmentValue: inv, dividends: inv * divPct});
    }

    console.log(yearlyInvestments);

    return yearsInv;
}