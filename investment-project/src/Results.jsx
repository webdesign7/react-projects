import {calculateInvestmentResults, formatter} from "./util/investment.js";

export function Results({annualInvestment, initialInvestment, investmentDuration, expectedReturn
}) {
    const results = calculateInvestmentResults({
        initialInvestment: Number(initialInvestment),
        annualInvestment: Number(annualInvestment),
        expectedReturn: Number(expectedReturn),
        duration: Number(investmentDuration),
    });

    let initialInvestmentValue = 0;

    if (results.length > 0) {
        initialInvestmentValue = results[0].valueEndOfYear - results[0].interest - results[0].annualInvestment;
    }


    return (
        <table id="result">
            <thead>
                <tr>
                    <th>Year</th>
                    <th>Investment Value</th>
                    <th>Interest Year</th>
                    <th>Total Interest</th>
                    <th>Invested Capital</th>
                </tr>
            </thead>
            <tbody>
                {results.map((result, index) => {

                    const totalInterest = result.valueEndOfYear - result.annualInvestment * result.year - initialInvestmentValue;

                    const investedCapital = result.valueEndOfYear -totalInterest;

                    return ( <tr key={index}>
                        <td>{result.year}</td>
                        <td>
                            {formatter.format(result.valueEndOfYear)}
                        </td>
                        <td>
                            {formatter.format(result.interest)}
                        </td>
                        <td>
                            {formatter.format(totalInterest)}
                        </td>
                            <td>
                            {formatter.format(investedCapital)}
                            </td>
                    </tr>
                    );
                })}
            </tbody>
        </table>
    );
}