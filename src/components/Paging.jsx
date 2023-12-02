import React from 'react'
import styles from "./PagingStyles.module.css";
import { FaAnglesLeft, FaAngleLeft, FaAngleRight, FaAnglesRight } from "react-icons/fa6";

const Paging = (props) => {
    const { usersLength, setPage, page, deleteSelected } = props;
    
    const getTotalPages = (length)=> {
        return Math.ceil(length/10);
    }

    const totalPages = getTotalPages(usersLength);
    const changePage = (index) => {
    setPage(index);
    };


    const navigatePage = (index) => {
        if (index < 1) {
        index = 1;
        } else if (index > totalPages) {
        index = totalPages;
        }
        setPage(index);
    };

    let pages = [];
    pages.push(
        <div
        key={-3}
        className={`${styles.page} ${page === 1 ? styles.disabled : ""}`}
        onClick={() => changePage(1)}
        >
        <FaAnglesLeft/>
        </div>
    );
    pages.push(
        <div
        key={-2}
        className={`${styles.page} ${page === 1 ? styles.disabled : ""}`}
        onClick={() => navigatePage(page - 1)}
        >
        <FaAngleLeft/>
        </div>
    );
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
        <div
            key={i}
            onClick={() => changePage(i)}
            className={`${styles.page} ${page === i ? styles.selected : ""}`}
        >
            {i}
        </div>
        );
    }
    pages.push(
        <div
        key={-1}
        className={`${styles.page} ${page === totalPages ? styles.disabled : ""}`}
        onClick={() => navigatePage(page + 1)}
        >
        <FaAngleRight />

        </div>
    );
    pages.push(
        <div
        key={0}
        className={`${styles.page} ${page === totalPages ? styles.disabled : ""}`}
        onClick={() => changePage(totalPages)}
        >
        <FaAnglesRight />

        </div>
    );

  return (
    <div className={styles.paginationContainer}>
      <button className={styles.delete} onClick={() => deleteSelected()}>
        Delete Selected
      </button>
      <div className={styles.pagination}>{pages}</div>
    </div>
  )
}

export default Paging
