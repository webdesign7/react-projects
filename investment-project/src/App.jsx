import {UserInput} from "./UserInput.jsx";
import {useState} from "react";
import {calculateInvestmentResults} from "./util/investment.js";
import {Results} from "./Results.jsx";


function App() {

  const [initialInvestment, setInitialInvestment] = useState(0);
  const [annualInvestment, setAnnualInvestment] = useState(0);
  const [investmentDuration, setInvestmentDuration] = useState(0);
  const [expectedReturn, setExpectedReturn] = useState(0);

  let validateInputs = false;

  if (initialInvestment && annualInvestment && investmentDuration && expectedReturn) {
    validateInputs = true;
  }

  function validateInputData(initialInvestment, investmentDuration) {
    if (initialInvestment <= 0) {
      return 'Initial investment must be a positive number';
    }

    if (investmentDuration <= 0) {
        return 'Investment duration must be a positive number';
    }

    return true;
  }

  const isDataValid = validateInputData(initialInvestment, investmentDuration);


  function handleChange(event) {
    const { name, value } = event.target;

    switch (name) {
      case "initialInvestment":
        setInitialInvestment(value);
        break;
      case "annualInvestment":
        setAnnualInvestment(value);
        break;
      case "investmentDuration":
        setInvestmentDuration(value);
        break;
      case "expectedReturn":
        setExpectedReturn(value);
        break;
      default:
        break;
    }
  }



  return (
      <>
    <UserInput onChange={handleChange} />

        {(isDataValid !== true) && <div className="error">Error</div>}

        {(validateInputs && isDataValid === true ) && <Results
        annualInvestment={annualInvestment}
        initialInvestment={initialInvestment}
        investmentDuration={investmentDuration}
        expectedReturn={expectedReturn}
        />}

      </>
  )
}

export default App
