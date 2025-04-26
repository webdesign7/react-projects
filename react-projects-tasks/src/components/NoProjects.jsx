import Button from "./Button.jsx";
import plusIcon from '../assets/icons/plus.svg';
import noProjectsImg from '../assets/no-projects.png'

function NoProjects() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center bg-gray-100">
            <img
                src={noProjectsImg}
                alt="No projects"
                className="w-32 h-32 mb-4"
            />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
                No project selected
            </h2>
            <p className="text-gray-500 mb-4">
                Start by adding a new project to get started.
            </p>
            <Button
                text="Add New Project"
                className="bg-blue-500 text-white hover:bg-blue-600"
                icon={<img src={plusIcon} alt="Plus Icon" className="w-4 h-4" />}
                onClick={() => alert("Add New Project clicked!")}
            />
        </div>
    );
}

export default NoProjects;