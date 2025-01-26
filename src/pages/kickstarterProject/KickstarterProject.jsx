// src/App.jsx
import React, { useEffect, useState } from "react";
import { fetchProjects } from "./services/kickstarterProject.projects";
import ProjectTable from "./molecules/projectTable";

import styles from "./kickstarterProject.module.scss";

function KickstarterProject() {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        const getProjects = async () => {
            try {
                const data = await fetchProjects();
                setProjects(data);
            } catch (error) {
                setError(error.message);
            }
        };

        getProjects();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.appContainer}>
            <div className={styles.headerText}>Highly Rated Kickstarter Projects</div>
            <div className={styles.tableContainer}>
                {projects?.length > 0 ? <ProjectTable projects={projects} /> : <div>Loading...</div>}
            </div>
        </div>
    );
}

export default KickstarterProject;
