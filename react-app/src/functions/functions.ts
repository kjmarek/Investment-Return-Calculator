//To improve: allow different investment amounts totally chosen by the user with an interface that has investment amount & number of years

/*
yearsInv = years investing (adding money)
yearsRet = years not investing (not adding money)
inv = investment per year
retPct = average return percentage yearly
divPct = average dividend percentage yearly
divGrowth = average dividend growth percentage yearly

yearlyTotals = the total at the end of each year
yearlyInvestments = the amount your money from each year is worth
*/

export default function calculate(yearsInv: number, yearsRet: number, inv: number, retPct: number, divPct: number, divGrowth: number) {
    interface year {
        year: number,
        investmentValue: number,
        dividends: number
    }

    interface yearValue {
        year:  number,
        value: number
    }

    var yearlyTotals:yearValue[] = []
    var yearlyInvestments:year[] = []

    /*
    set yearlyInvestments starting year, investment value, and dividends
    */
    for (var i = 1; i <= yearsInv; i++) {
        yearlyInvestments.push({year: i, investmentValue: inv, dividends: inv * (divPct * .01)});
    }

    /*
    basic calculate yearly total just adding the values invested
    */
    for (var i = 1; i <= yearsInv; i++) {
        var total = 0;
        if (i === 1) {
            total = total + yearlyInvestments[i - 1].investmentValue;
        }
        else {
            total = total + yearlyTotals[i - 2].value + yearlyInvestments[i - 1].investmentValue;
        }
        yearlyTotals.push({year: i, value: total})
    }

    console.log(yearlyTotals);

    return yearlyTotals;
}