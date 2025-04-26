import Button from "./Button.jsx";
import {useState} from "react";

function ProjectTasks({project, removeProjectTask, addProjectTask}) {

    const [taskName, setTaskName] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        addProjectTask(project.id, taskName);

        setTaskName("");
    };

    function handleChange(e) {
        setTaskName(e.target.value);
    }

    function handleRemoveProjectTask(taskName){
        removeProjectTask(project.id, taskName);
    }

    return (
        <section>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Tasks:</h2>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center p-4 bg-white rounded shadow-md"
            >
                <input type="text" className="border border-gray-300 rounded p-2 mb-4 w-full"
                          placeholder="Task Name"
                          value={taskName}
                          onChange={handleChange}/>

                <Button
                    text="Submit"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    type="submit"
                />

            </form>


            {(project.tasks && project.tasks.length === 0) && (
                <p className="text-gray-500 mb-4">No tasks added yet.</p>
            )}

            {(project.tasks && project.tasks.length > 0) && (

                <ul className="list-disc list-inside text-gray-600">
                    {project.tasks.map((task, index) => (
                        <li key={index} className="mb-2">
                            <span className="font-semibold">{task}</span>
                            <button onClick={fn => {handleRemoveProjectTask(task)}} className="border border-amber-300 hover:border-amber-600 px-2
                            float-right clear-end">Clear</button>
                        </li>
                    ))}
                </ul>

            )}


        </section>
    );
}

export default ProjectTasks;