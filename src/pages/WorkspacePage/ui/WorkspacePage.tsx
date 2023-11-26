import React from "react";
import SideBar from "widgetss/SideBar";
import TodoCardList from "widgetss/TodoCardList";
import styles from './WorkspacePage.module.css'




const WorkspacePage: React.FC = () => {


    return (
        <div className={styles.mainDiv}>
            <SideBar />
            <TodoCardList />

        </div>
    )
}

export default WorkspacePage