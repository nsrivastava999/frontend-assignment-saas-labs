import styles from "../projectTable.module.scss";

export const getSerialNumberToDisplay = (currentPage, index) => (currentPage - 1) * 5 + index + 1;

export const getPageButtonClassName = (index, currentPage) =>
    index + 1 === currentPage ? styles.currentPageButton : "";
