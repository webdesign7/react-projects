import Sidebar from "./components/Sidebar.jsx";
import NoProjects from "./components/NoProjects.jsx";
import { useState } from 'react';
import ProjectForm from "./components/ProjectForm.jsx";

function App() {

    const [projects, setProjects] = useState([
        { id: 1, name: "Project 1" },
        { id: 2, name: "Project 2" },
        { id: 3, name: "Project 3" },
    ]);

    const [showProjectForm, setShowProjectForm] = useState(false);

    function onAddNewProject() {
        setShowProjectForm(true);
    }

    return (
      <>
          <div className="h-screen flex">
              <Sidebar projects={projects} onAddNewProject={onAddNewProject} />
              <div className="flex-1">
                  <div className="grid grid-cols-6 gap-4">
                      <div className="col-span-4 col-start-2 mt-10">
                          {showProjectForm && <ProjectForm/>}
                          {!showProjectForm && <NoProjects/>}
                      </div>
                  </div>
              </div>
          </div>
      </>
    );
}

export default App;
