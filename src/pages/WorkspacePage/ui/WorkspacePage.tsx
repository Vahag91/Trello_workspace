import React from "react";
import SideBar from "widgetss/SideBar";
import TodoCardList from "shared/TodoCardList";
import styles from './WorkspacePage.module.css'
import { setColumn } from "todoCardSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "store";

const WorkspacePage: React.FC = () => {

  
    const dispatch = useDispatch()



    return (
        <div className={styles.mainDiv}>
            <SideBar />
            <TodoCardList />
         
        </div>
    )
}

export default WorkspacePage