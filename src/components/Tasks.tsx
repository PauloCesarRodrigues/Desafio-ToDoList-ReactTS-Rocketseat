import styles from './Tasks.module.css'
import { Trash } from "phosphor-react"

interface TasksProps {
  content: string | number; 
  onDeleteTask: (id: number) => void; 
  id: number;
  onUpdateTaskStatus: (id: number, completed: boolean) => void; 
}

export function Tasks({ content, onDeleteTask, id, onUpdateTaskStatus }: TasksProps){

  function handleDeleteTask(){
    onDeleteTask(id)
  }

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    onUpdateTaskStatus(id, isChecked); 
  }

  return(

      <div className={styles.task}>
        <input type="checkbox" className={styles.taskCheck} onChange={handleCheckboxChange} />
        <p className={styles.taskContent}>{content}</p>
        <button className={styles.trashButton}> <Trash className={styles.trash} size="24" onClick={handleDeleteTask}/> </button>
      </div>
      
  )
}


