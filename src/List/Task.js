import React from 'react'

export default function Task({task, toggleTask, onHover}) {

  function handleTaskChecked() { 
    toggleTask(task.id)
  }

  function handleChange() {
    toggleTask(task.id)
  }

  return (
    <div className='task' onClick={handleTaskChecked} onPointerOver={onHover}>
      <input className='checkbox' id='checkbox' type='checkbox' checked={task.complete} onChange={handleChange} />
      <span className="checkbox-custom"></span>
      <div className='text'>{task.name}</div>
    </div>
  )
}
