/* eslint-disable react/display-name */
// src/components/ProjectTable.jsx
import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";

import styles from "./projectTable.module.scss";
import { getPageButtonClassName, getSerialNumberToDisplay } from "./helpers/projectTable.general";

const renderProjectRow =
    (currentPage) =>
    (project = {}, index) => {
        const { id, ["percentage.funded"]: percentageFunded, ["amt.pledged"]: amountPledged } = project;
        const serialNumberToDisplay = getSerialNumberToDisplay(currentPage, index);
        return (
            <tr key={id}>
                <td className={styles.tableComponent}>{serialNumberToDisplay}</td>
                <td className={styles.tableComponent}>{percentageFunded}%</td>
                <td className={styles.tableComponent}>${amountPledged}</td>
            </tr>
        );
    };

const ProjectTable = (props) => {
    const { projects } = props;

    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 5;

    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

    const handleOnclickPage = useCallback((pageNumber) => setCurrentPage(pageNumber), [setCurrentPage]);

    return (
        <>
            <div className={styles.projectTableContainer}>
                <table className={`${styles.tableComponent} ${styles.projectTable}`}>
                    <thead>
                        <tr>
                            <th className={styles.tableComponent}>S.No.</th>
                            <th className={styles.tableComponent}>Percentage Funded</th>
                            <th className={styles.tableComponent}>Amount Pledged</th>
                        </tr>
                    </thead>
                    <tbody>{currentProjects.map(renderProjectRow(currentPage))}</tbody>
                </table>
            </div>
            <div className={styles.pageNumbersContainer}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`${styles.pageNumberButton} ${getPageButtonClassName(index, currentPage)}`}
                        onClick={() => handleOnclickPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </>
    );
};

ProjectTable.propTypes = {
    projects: PropTypes.array,
};

ProjectTable.defaultProps = {
    projects: [],
};

export default ProjectTable;
