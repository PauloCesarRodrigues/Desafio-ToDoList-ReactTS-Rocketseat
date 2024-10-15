import styles from './Header.module.css';
import ToDoLogo from '../assets/logo.svg'

export function Header(){
  return (
    <div className={styles.header}> 
      <img src={ToDoLogo} className={styles.logo}/>
    </div>
  )
}