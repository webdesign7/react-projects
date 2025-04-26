import Button from "./Button.jsx";
import plusIcon from '../assets/icons/plus.svg';

function Sidebar({projects, onProjectSelect, showProjectForm}) {
    return (
        <div className="h-screen w-80 bg-gray-800 text-white flex flex-col">
            <div className="p-4 text-lg font-bold border-b border-gray-700">
                Projects
            </div>
            <nav className="flex-1 p-4">
                <Button
                    text="Add New Project"
                    className="w-full mb-4 bg-blue-500 text-white hover:bg-blue-600"
                    icon={<img src={plusIcon} alt="Plus Icon" className="w-4 h-4" />}
                    onClick={showProjectForm}
                />

                <ul className="space-y-2">
                    {projects.map((project) => {
                        return (
                            <li key={project.id}>
                                <button onClick={() => onProjectSelect(project.id)} className="w-full text-left block p-2 rounded hover:bg-gray-700">
                                    {project.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>


            </nav>
        </div>
    );
}

export default Sidebar;