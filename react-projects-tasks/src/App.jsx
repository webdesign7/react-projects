import Sidebar from "./components/Sidebar.jsx";
import NoProjects from "./components/NoProjects.jsx";
import { useState } from 'react';
import ProjectForm from "./components/ProjectForm.jsx";
import ProjectDetails from "./components/ProjectDetails.jsx";

function App() {

    const [projects, setProjects] = useState([
        { id: 1, name: "Project 1", description: "Description 1", dueDate: "2023-10-01", 'tasks': ['Task1', 'Task2'] },
        { id: 2, name: "Project 2", description:  "Description 2", dueDate: "2023-10-01", tasks: [] },
        { id: 3, name: "Project 3" , description: "Description 3", dueDate: "2023-10-01", tasks: [] },
    ]);

    const [showProjectForm, setShowProjectForm] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);

    function onShowProjectForm() {
        setShowProjectForm(true);
    }

    function onProjectSelect(projectId) {
        setCurrentProject(projectId);
        setShowProjectForm(false);
    }

    function getProjectById(projectId) {
        return projects.find(project => project.id === projectId);
    }

    function onAddNewProject(project) {
        const newProject = {
            id: projects.length + 1,
            ...project
        };
        setProjects([...projects, newProject]);
        setShowProjectForm(false);
        setCurrentProject(newProject.id);
    }

    function onRemoveProject(projectId) {
        const updatedProjects = projects.filter(project => project.id !== projectId);
        setProjects(updatedProjects);
        setCurrentProject(null);
    }

    function onAddNewProjectTask(projectId, task) {

        const updatedProjects = projects.map(project => {
            if (project.id === projectId) {
                return { ...project, tasks: [...project.tasks, task] };
            }
            return project;
        });

        setProjects(updatedProjects);
    }

    function onRemoveTaskFromProject(projectId, task) {
        const updatedProjects = projects.map(project => {
            if (project.id === projectId) {
                return { ...project, tasks: project.tasks.filter(t => t !== task) };
            }
            return project;
        });

        setProjects(updatedProjects);
    }

    return (
      <>
          <div className="h-screen flex">
              <Sidebar projects={projects}
                        onProjectSelect={onProjectSelect}
                       showProjectForm={onShowProjectForm}
                        />
              <div className="flex-1">
                  <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-4 col-start-2 mt-10">
                          {showProjectForm ? (
                              <ProjectForm addProject={onAddNewProject} />
                          ) : currentProject ? (
                              <ProjectDetails
                                  project={getProjectById(currentProject)}
                                    addProjectTask={onAddNewProjectTask}
                                    removeProject={onRemoveProject}
                                    removeProjectTask={onRemoveTaskFromProject}
                                  onAddNewProject={onAddNewProject} />
                          ) : (
                              <NoProjects showProjectForm={onShowProjectForm} />
                          )}
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
}

export default App;
