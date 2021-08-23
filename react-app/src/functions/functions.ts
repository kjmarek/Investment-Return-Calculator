//Currently adds funds at the beginning of the year

//To improve: allow different investment amounts totally chosen by the user with an interface that has investment amount & number of years

/* TODO
    * add a inflation percentage
    * let user chose certain amount of years investing a certain amount
    * add increase in investment percent
*/

/*
yearsInv = years investing (adding money)
yearsRet = years not investing (not adding money)
inv = investment per year
retPct = average return percentage yearly
divPct = average dividend percentage yearly
divGrowth = average dividend growth percentage yearly
divTax = average dividend tax percentage yearly

yearlyTotals = the total at the end of each year
yearlyInvestments = the amount your money from each year is worth
*/

export default function calculate(yearsInv: number, yearsRet: number, inv: number, retPct: number, divPct: number, divGrowth: number, divTax: number) {
    interface year {
        year: number,
        costBasis: number,
        dividends: number,
        totalValue: number,
    }

    interface yearValue {
        year:  number,
        value: number,
        dividends: number,
        capitalGains: number,
        weightedDivPct: number
    }

    var yearlyTotals:yearValue[] = []
    var yearlyInvestments:year[] = []
    var divGrowthPct = (divGrowth * .01)
    var yearRetPct = (retPct * .01)
    var totalYears = yearsInv + yearsRet

    /*
    set yearlyInvestments starting year, investment value, and dividends
    */

    /*
    years investing
    */
    for (var i = 1; i <= yearsInv; i++) {
        yearlyInvestments.push({year: i, costBasis: inv, dividends: divPct * .01, totalValue: inv});
    }

    /*
    years retired
    */
    for (var l = 1; l <= yearsRet; l++) {
        yearlyInvestments.push({year: yearsInv + l, costBasis: 0, dividends: divPct * .01, totalValue: 0})
    }

    /*
    basic calculate yearly total just adding the values invested
    */
    for (var x = 1; x <= totalYears; x++) {
        var total = 0
        var totalDivs = 0
        var totalCapGains = 0
        // for loop for every year up to current year for each year's return + dividend
        for (var y = 1; y <= x; y++) {
            var yearTotal = 0
            // start with the investment amount from the year
            var yearInvestment =  yearlyInvestments[y - 1].costBasis
            var yearTotalAmount = yearlyInvestments[y - 1].totalValue
            // calculate the dividends
            var yearDiv = yearInvestment * yearlyInvestments[y - 1].dividends
            // take away dividend taxes
            yearDiv = yearDiv * (1 - (divTax * .01))
            totalDivs = totalDivs + yearDiv
            // calculate the return
            var yearGain = yearTotalAmount * yearRetPct
            totalCapGains = totalCapGains + yearGain
            // add dividends and total to the yearTotal
            yearTotal = yearTotalAmount + yearDiv + yearGain
            // increase the dividend pct with dividend growth
            yearlyInvestments[y - 1].dividends = yearlyInvestments[y - 1].dividends * (1+ divGrowthPct)
            // update the investment value to what the value of the year was at the end
            yearlyInvestments[y - 1].costBasis = yearInvestment + yearDiv
            yearlyInvestments[y - 1].totalValue = yearTotal
            // increase the total for this year's return
            //console.log(yearlyInvestments[y - 1]);
            total = total + yearTotal;
        }
        var totalWeightedDivPcts = totalDivs / total

        // push result after all to array
        yearlyTotals.push({year: x, value: total, dividends: totalDivs, capitalGains: totalCapGains, weightedDivPct: totalWeightedDivPcts})
    }

    // can add for loop for all the years to calculate end totals
    // fix investment value for calculating dividends, should be only based on original investment and dividends not including capital gains

    console.log(yearlyTotals);

    return yearlyTotals;
}