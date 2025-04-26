import NoProjects from "./NoProjects.jsx";
import ProjectTasks from "./ProjectTasks.jsx";

function ProjectDetails({onAddNewProject, project, addProjectTask, removeProjectTask, removeProject}) {
    if (!project) {
        return (
            <NoProjects onAddNewProject={onAddNewProject} />
        );
    } else {
        return (
            <div className="flex flex-col">
                <h1 className="text-2xl font-semibold text-gray-700 mb-4">
                    {project.name}
                </h1>

                <button onClick={() => {removeProject(project.id)}}>Delete project</button>

                <p className="text-gray-300 mb-4">
                    {project.dueDate}
                </p>
                <p className="text-gray-500 mb-4">{project.description}</p>

                <ProjectTasks
                    project={project}
                    removeProjectTask={removeProjectTask}
                    addProjectTask={addProjectTask}
                />

            </div>
        );
    }
}

export default ProjectDetails;