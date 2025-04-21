import { useState } from 'react';
import {styled} from "styled-components";
import Button from './UI/Button';
import Input from './UI/CustomInput';

const ControlsDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;


export default function AuthInputs() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleInputChange(identifier, value) {
    if (identifier === 'email') {
      setEnteredEmail(value);
    } else {
      setEnteredPassword(value);
    }
  }

  function handleLogin() {
    setSubmitted(true);
  }

  const emailNotValid = submitted && !enteredEmail.includes('@');
  const passwordNotValid = submitted && enteredPassword.trim().length < 6;

  return (
    <div id="auth-inputs">
      <ControlsDiv>

        <Input type="email" invalid={emailNotValid} label="Email" onChange={(event) => handleInputChange('email', event.target.value)} />
        <Input type="password" invalid={passwordNotValid} label="Password" onChange={(event) => handleInputChange('email', password.target.value)} />

      </ControlsDiv>
      <div className="actions">
        <button type="button" className="text-button">
          Create a new account
        </button>
        <Button onClick={handleLogin}>Sign In</Button>
      </div>
    </div>
  );
}
