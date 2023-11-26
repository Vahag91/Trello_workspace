
import React, { ReactNode, useState } from "react"
import styles from './TodoCardList.module.css'
import { FaRegSun, FaPen, FaPlus, FaCanadianMapleLeaf } from "react-icons/fa6"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ColumnType, CardType } from "todoCardSlice";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useDispatch } from "react-redux";
import { setCard, setColumn } from "todoCardSlice";



const TodoCardList: React.FC = () => {

  const myColumns = useSelector((state: RootState) => {
    return state.todo
  })

  const [columns, setColumns] = useState<ColumnType[]>(myColumns.columns)



  const onDragEnd = (result: any) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    const sourceColumn: ColumnType = columns.find((column) => column.id === source.droppableId) as ColumnType;
    const destinationColumn: ColumnType = columns.find((column) => column.id === destination.droppableId) as ColumnType;

    const newSourceCards: CardType[] = Array.from(sourceColumn?.cards || []);
    const [removedCard] = newSourceCards.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      newSourceCards.splice(destination.index, 0, removedCard);

      const newColumn: ColumnType = {
        ...sourceColumn,
        cards: newSourceCards,
      };

      setColumns(columns.map(column => column.id === newColumn.id ? newColumn : column))
    } else {

      const newDestinationCards: CardType[] = Array.from(destinationColumn.cards || []);
      newDestinationCards.splice(destination.index, 0, removedCard);


      const newSourceColumn: ColumnType = {
        ...sourceColumn,
        cards: newSourceCards
      }

      const newDestinationColumn: ColumnType = {
        ...destinationColumn,
        cards: newDestinationCards
      }


      setColumns(columns.map(column => {
        if (column.id === newSourceColumn.id) return newSourceColumn;
        if (column.id === newDestinationColumn.id) return newDestinationColumn;
        return column
      }))
    }
  }

  const dispatch = useDispatch()

  const handleChange = () => {
    const id = "col" + Math.floor(Math.random() * 10000)

    const newColumn = {
      id,
      title: "Todo",
      cards: []
    }
    dispatch(setColumn(newColumn))


  }


  const handleAddTask = (columnId: string) => {

    const cards = { id: "2", content: "" }
    dispatch(setCard({ columnId, card: cards }))
  }




  return (
    <div className={styles.mainBoard}>


      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="5">
          {
            (provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.mainDiv}>

                {myColumns.columns.map((item, index): ReactNode => {
                  return (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {
                        (provided) => {
                          return (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <li className={styles.todoCard}>
                                <div className={styles.todo}>

                                  <div className={styles.title}>
                                    <h2> {item.title} </h2>
                                    <button> <FaRegSun /></button>
                                  </div>

                                  <Droppable droppableId="5">
                                    {(provided) => (
                                      <div ref={provided.innerRef} {...provided.droppableProps} className={styles.mainDiv}>
                                        <ol className={styles.list}>
                                          {item.cards.map((card, index): ReactNode => {
                                            return (
                                              <li key={index}>
                                                <span> {card.content}</span>
                                                <button> <FaPen /> </button>
                                              </li>
                                            );
                                          })}


                                        </ol>
                                      </div>
                                    )}
                                  </Droppable>

                                </div>

                                <div className={styles.addBtn}>
                                  <button onClick={() => { handleAddTask(item.id) }}> <FaPlus /> <span>Add Card</span></button>
                                  <button><FaCanadianMapleLeaf /> </button>
                                </div>
                              </li>
                            </div>
                          )
                        }
                      }

                    </Draggable>)
                })

                }

              </div>
            )
          }

        </Droppable>

      </DragDropContext >

      <button className={styles.addCardBtn} onClick={handleChange}> <span><FaPlus/> Add Card</span></button>
    </div>
  )
}


export default TodoCardList






