import {use, useActionState} from 'react';
import {OpinionsContext} from "../store/opinions-context.jsx";
import {Submit} from "./Submit.jsx";

export function NewOpinion() {

  const { addOpinion } = use(OpinionsContext);

  async function opinionFormAction(prevFormState, formData) {

    const username = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    // Here you would typically send the data to your server
    console.log({
      username,
      title,
      body,
    });

    let errors = [];

    if (body.length > 10) {
      errors.push('Opinion must not exceed 500 characters.');
    }

    if (errors.length > 0) {
      return {
        errors: errors,
        enteredValues: {
          userName: username,
          title: title,
          body: body,
        }
      }
    }

    await addOpinion({
      userName: username,
      title: title,
      body: body,
    });

    return {errors: null};

  }

  const [formState, formAction] = useActionState(opinionFormAction, {
    errors: [],
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text"
                   defaultValue={formState.enteredValues?.userName}
                   id="userName"
                   name="userName" />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body"
                    defaultValue={formState.enteredValues?.body}
                    rows={5}></textarea>
        </p>

        {formState.errors && formState.errors.length > 0 && (
            <ul className="errors">
                {formState.errors.map((error, index) => (
                <li key={index}>{error}</li>
                ))}
            </ul>
            )}


        <Submit/>
      </form>
    </div>
  );
}
