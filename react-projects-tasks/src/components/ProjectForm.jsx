import { useState } from "react";
import InputField from "./Input.jsx";
import Button from "./Button.jsx";

function ProjectForm({ onCancel, addProject }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        addProject({ name, description, dueDate, tasks: [] });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center p-4 bg-white rounded shadow-md"
        >
            <h2 className="text-lg font-bold mb-4">Add New Project</h2>
            <InputField
                type="text"
                placeholder="Title"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <InputField
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <InputField
                type="date"
                placeholder="Due Date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
                <Button
                    text="Cancel"
                    className="bg-gray-500 text-white hover:bg-gray-600"
                    onClick={onCancel}
                />
                <Button
                    text="Submit"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    type="submit"
                />
            </div>
        </form>
    );
}

export default ProjectForm;