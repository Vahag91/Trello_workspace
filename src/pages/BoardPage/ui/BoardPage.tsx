
import SideBar from 'widgetss/SideBar'
import Board from 'widgetss/Board'
import styles from './BoardPage.module.css'



const BoardPage: React.FC = () => {

    return (
        <div className={styles.board}>
            <SideBar />
            <Board />
        </div>
    )
}

export default BoardPage