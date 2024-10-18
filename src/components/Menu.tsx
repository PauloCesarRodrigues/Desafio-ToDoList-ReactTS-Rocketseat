
import styles from './Menu.module.css'
import clipboard from '../assets/clipboard.svg';
import plusIcon from '../assets/plus.svg';
import { useState } from 'react';
import { Tasks } from './Tasks';

interface Task{
  id: number
  content: string | number
  completed: boolean
}

export function Menu(){

  const [taskList, setTaskList] = useState<Task[]>([ 
    {
      id: 9,
      content: 'Acordar às 5h30',
      completed: false
    },
    {
      id: 7,
      content: 'Almoçar 12h',
      completed: false
    }
  ])

  const [newTaskText, setNewTaskText] = useState('')

  function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>){
    event?.preventDefault()
    const taskInput = (event.currentTarget as HTMLFormElement).task.value;
    
    if (taskInput.length <= 0 || taskInput.length > 249 ){
      alert('A quantidade de caracteres de uma tarefa deve estar entre 1 e 249. ')
      return
    }

    const taskListSizeID = taskList.length + 10
    setTaskList([...taskList, {content: taskInput, id: taskListSizeID, completed: false}])
    setNewTaskText('')
  }
  
 function deleteTask(taskToDelete: number){
    const tasksWithoutDeletedOne = taskList.filter((task) => task.id !== taskToDelete);

    setTaskList(tasksWithoutDeletedOne);

  }

  function handleNewTaskChange(event: React.ChangeEvent<HTMLInputElement>){
    setNewTaskText(event.target.value)
  }

  function handleUpdateTaskStatus(id: number, completed: boolean) {
    const updatedTasks = taskList.map(task =>
      task.id === id ? { ...task, completed } : task
    );
    setTaskList(updatedTasks);
  }

  const completedTasksCount = taskList.filter(task => task.completed).length;

  return(
    <div className={styles.box}>

      <form onSubmit={handleCreateNewTask} className={styles.taskBarSection}>
          <input
            type="text"
            className={styles.taskBar} 
            value={newTaskText}
            placeholder='Adicione uma nova tarefa' 
            name="task"
            onChange={handleNewTaskChange}
          />
          <button type="submit" className={styles.buttonCreate}> Criar <img src={plusIcon} /></button>
      </form>

      <div className={styles.container}>
        <header className={styles.Header}>

          <div className={styles.CreatedTasks}>
            <p className={styles.TitleCreatedTasks}> Tarefas Criadas </p>
            <p className={styles.QuantityCreatedTasks}> {taskList.length} </p>
          </div>
          
          <div className={styles.CompletedTasks}>
            <p className={styles.TitleCompletedTasks}> Concluídas </p>
            <p className={styles.QuantityCompletedTasks}> { completedTasksCount } </p>
          </div>
        </header>

        <div 
          className={styles.NoTasks}
          style={{ display: taskList.length !== 0 ? 'none' : 'flex' }}
        >
          <img src={clipboard}/>
          <p className={styles.NoTasksParagraphBold}>Você ainda não tem tarefas cadastradas</p>
          <p className={styles.NoTasksParagraph}>Crie tarefas e organize seus itens a fazer</p>
        </div>

        <div>
          {taskList.map(task =>{
            return(
              <Tasks 
                content = {task.content}
                key = {task.id}
                onDeleteTask = {deleteTask}
                id = {task.id}
                onUpdateTaskStatus = {handleUpdateTaskStatus}
              />
            )
          })}
        </div>

      </div> 


    </div>


  )
}
