


import React, { ReactNode, useState } from "react"
import styles from './TodoCardList.module.css'
import { FaRegSun, FaPen, FaPlus, FaCanadianMapleLeaf } from "react-icons/fa6"
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



interface CardType {
  id: string;
  content: string;
}

interface ColumnType {
  id: string;
  title: string;
  cards: CardType[];
}

const initialColumns: ColumnType[] = [
  {
    id: 'col-1',
    title: 'To Do',
    cards: [{ id: 'c-1', content: 'Task 1' }, { id: 'c-2', content: 'Task 2' }, { id: 'c-3', content: 'Task 3' }]
  },
  {
    id: 'col-2',
    title: 'In Progress',
    cards: [{ id: 'c-4', content: 'Task 4' }, { id: 'c-5', content: 'Task 5' }, { id: 'c-6', content: 'Task 6' }]
  },
  {
    id: 'col-3',
    title: 'Done',
    cards: [{ id: 'c-7', content: 'Task 7' }]
  }
]





const TodoCardList: React.FC = () => {

  const [columns, setColumns] = useState<ColumnType[]>(initialColumns)


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
  const arr:number[] = [8, 9]


  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="5">
        {
          (provided) => (
            <div ref={provided.innerRef}
              {...provided.droppableProps}
              className={styles.mainDiv}>
              {arr.map((item,index):ReactNode => {
                return (
                <Draggable draggableId={String(item)} index={index}>
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

                                <h2> {item} title</h2>
                                <button> <FaRegSun /></button>

                              </div>
                            </div>

                            <div className={styles.addBtn}>
                              <button> <FaPlus />  <span>Add Card</span></button>
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
  )
}


export default TodoCardList




// <ol className={styles.list}>
//     <li>
//         <span> Todo</span>
//         <button><FaPen /> </button>
//     </li>
//     <li>
//         <span> Todo</span>
//         <button><FaPen /> </button>
//     </li>

//     <li>
//         <span> Todo</span>
//         <button> <FaPen /></button>
//     </li>
// </ol>

