import {isEmail, hasMinLength, isEqualToOtherValue, isNotEmpty} from "../util/validation.js";
import { useActionState } from 'react';
export default function Signup() {

    function signUpAction(prevFormState, formData) {

        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirm-password');
        const firstName = formData.get('first-name');
        const lastName = formData.get('last-name');
        const role = formData.get('role');
        const acquisition = formData.getAll('acquisition');
        const terms = formData.get('terms-and-conditions');

        // Here you would typically send the data to your server
        console.log({
            email,
            password,
            confirmPassword,
            firstName,
            lastName,
            role,
            acquisition,
            terms
        });

        let errors = [];

        if (!isEmail(email)) {
            errors.push('Invalid email address.');
        }

        if (errors.length > 0) {
            return {
                errors: errors,
                enteredValues: {
                    email,
                    password,
                    confirmPassword,
                    firstName,
                    lastName,
                    role,
                    acquisition,
                    terms
                }
            }
        }

        return { errors:  null };

    }

    const [formState, formAction] = useActionState(signUpAction, {
        errors: [],
    });

    return (
    <form action={formAction}>
      <h2>Welcome on board!</h2>
      <p>We just need a little bit of data from you to get you started 🚀</p>

      <div className="control">
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" />
      </div>

      <div className="control-row">
        <div className="control">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" defaultValue={formState.enteredValues?.password} />
        </div>

        <div className="control">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            name="confirm-password"
          />
        </div>
      </div>

      <hr />

      <div className="control-row">
        <div className="control">
          <label htmlFor="first-name">First Name</label>
          <input type="text" id="first-name" name="first-name" />
        </div>

        <div className="control">
          <label htmlFor="last-name">Last Name</label>
          <input type="text" id="last-name" name="last-name" />
        </div>
      </div>

      <div className="control">
        <label htmlFor="phone">What best describes your role?</label>
        <select id="role" name="role">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="employee">Employee</option>
          <option value="founder">Founder</option>
          <option value="other">Other</option>
        </select>
      </div>

      <fieldset>
        <legend>How did you find us?</legend>
        <div className="control">
          <input
            type="checkbox"
            id="google"
            name="acquisition"
            value="google"
            defaultChecked={formState.enteredValues?.acquisition?.includes('google')}
          />
          <label htmlFor="google">Google</label>
        </div>

        <div className="control">
          <input
            type="checkbox"
            id="friend"
            name="acquisition"
            value="friend"
            defaultChecked={formState.enteredValues?.acquisition?.includes('friend')}
          />
          <label htmlFor="friend">Referred by friend</label>
        </div>

        <div className="control">
          <input type="checkbox" id="other" name="acquisition" value="other"
          defaultChecked={formState.enteredValues?.acquisition?.includes('other')}
          />
          <label htmlFor="other">Other</label>
        </div>
      </fieldset>

      <div className="control">
        <label htmlFor="terms-and-conditions">
          <input type="checkbox" id="terms-and-conditions" name="terms" />I
          agree to the terms and conditions
        </label>
      </div>

        {formState.errors && formState.errors.length > 0 && (
        <div className="error">
            <ul>
                {formState.errors.map((error, index) => (
                <li key={index}>{error}</li>
                ))}
            </ul>
        </div>
        )}

      <p className="form-actions">
        <button type="reset" className="button button-flat">
          Reset
        </button>
        <button className="button">Sign up</button>
      </p>
    </form>
  );
}
