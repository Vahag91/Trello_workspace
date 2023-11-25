import React from "react";
import SideBar from "widgetss/SideBar";
import TodoCardList from "shared/TodoCardList";

const WorkspacePage: React.FC = () => {

    return (
        <div style={{ display: "flex" }}>
            <SideBar />
            <TodoCardList />
        </div>
    )
}

export default WorkspacePage