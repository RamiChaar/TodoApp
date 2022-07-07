import Task from './Task'


export default function List({tasks, toggleTask, onHover}) {
  return (
    tasks.map(task => {
      return <Task key={task.id} task={task} toggleTask={toggleTask} onHover={onHover}/>
    })
  )
}
