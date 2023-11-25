import { useState } from 'react';
import styles from './Board.module.css'
import { FaPen, FaClipboardUser } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import { Boards, setBoard } from 'boardSlice';
import { useDispatch } from 'react-redux';




const Board: React.FC = () => {

    const [title, setTitle] = useState<string>(" Working place Trello")
    const [newBoard, setNewBoard] = useState<string>("")
    const [isBoardOpen, setIsBoardOpen] = useState<boolean>(false)
    const [isTitleOpen, setIsTitleOpen] = useState<boolean>(false)


    const myBoard = useSelector((state: RootState) => {
        return state.boards.boardList
    })

    const dispatch = useDispatch()

console.log(myBoard);

    const hanldeNewBoard = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const addedBoard: string = event.target.value.trim()
        if (addedBoard !== "") { setNewBoard(addedBoard) }
    }



    const handleChangeInput = (): void => {
        if (newBoard) {
            dispatch(setBoard({ name: newBoard, color: "#009AAE" }));
        }
        setNewBoard("")
        setIsBoardOpen(!isBoardOpen)
    }

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle: string = event.target.value
        setTitle(newTitle)
    }

    return (

        <div className={styles.mainBoard}>

            <div className={styles.boardHeader}>

                <div className={styles.boardHeaderTitle}>
                    <h2> T </h2>
                </div>


                <div className={styles.boardHeaderBody}>
                    {isTitleOpen ?
                        (<input
                            type='text'
                            placeholder='Enter here'
                            value={title}
                            onChange={handleChangeTitle} />) : (
                            <h2> {title}</h2>)}

                    <button className={styles.boadHeaderbtn} onClick={() => { setIsTitleOpen(!isTitleOpen) }}><span> <FaPen /></span> </button>
                </div>

            </div>

           

            <div className={styles.boardBody}>

                <div className={styles.board}>
                    <h2> <FaClipboardUser />  Your Boards</h2>

                    <div className={styles.boardList}>
                        <ul>
                            {myBoard.map((item: Boards) => {
                                return (
                                    <li>
                                        <button style ={{ backgroundColor: item.color }}
                                        className={styles.boardBodyButton}>
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                )
                            })}
                            {isBoardOpen ? (
                                <div className={styles.inputContainer}>
                                    <input className={styles.inputField}
                                        type="text"
                                        placeholder='Enter new board name'
                                        value={newBoard}
                                        onChange={hanldeNewBoard}
                                    />
                                    <button className={styles.addButton} onClick={handleChangeInput}>
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <button className={styles.addBoardBtn} onClick={handleChangeInput} >
                                  <span className={styles.boardAddBtn}> Create New Board</span>  
                                </button>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board