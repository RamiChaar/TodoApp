import React, {useState, useRef, useEffect} from 'react'
import './Styling/App.css';
import './Styling/List.css';
import './Styling/Input.css';
import './Styling/Remove.css';
import './Styling/Settings.css';
import List from './List/List'
import ColorList from './ColorList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'react-practice.tasks'
const LOCAL_STORAGE_KEY2 = 'react-practice.color'
const LOCAL_STORAGE_KEY3 = 'react-practice.darkMode'
const colors = [{hue: '1' ,sat: '53', light: '60', id: uuidv4()},
                {hue: '26',sat: '52', light: '60', id: uuidv4()}, 
                {hue: '51',sat: '52', light: '59', id: uuidv4()}, 
                {hue: '75',sat: '53', light: '59', id: uuidv4()}, 
                {hue: '99',sat: '53', light: '59', id: uuidv4()}, 
                {hue: '125',sat: '52', light: '60', id: uuidv4()}, 
                {hue: '150',sat: '52', light: '60', id: uuidv4()}, 
                {hue: '176',sat: '51', light: '59', id: uuidv4()}, 
                {hue: '200',sat: '52', light: '60', id: uuidv4()}, 
                {hue: '226',sat: '53', light: '60', id: uuidv4()}, 
                {hue: '251',sat: '53', light: '60', id: uuidv4()}, 
                {hue: '276',sat: '53', light: '60', id: uuidv4()}]

function App() {
  const [tasks, setTasks] = useState([])
  const [color, setColor] = useState([])
  const [darkMode, setDarkMode] = useState([])
  const taskNameRef = useRef()

  useEffect(() => {
    let storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTasks){
      setTasks(storedTasks)
    }
    let storedColor = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY2))
    if(storedColor){
      setColor(storedColor)
      document.documentElement.style.setProperty('--hue', storedColor[0])
      document.documentElement.style.setProperty('--sat', storedColor[1]+"%")
      document.documentElement.style.setProperty('--lightness', storedColor[2]+"%")
    } else {
      setColor(color => [colors[8].hue, colors[8].sat, colors[8].light])
    }
    let storedDarkMode = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY3))
    if(storedDarkMode){
      setDarkMode(storedDarkMode)
    } else {
      setDarkMode([0])
    }
    if(storedDarkMode && storedDarkMode[0] === 1){
      document.documentElement.style.setProperty('--color', 'hsl(228, 5%, 22%)')
      document.documentElement.style.setProperty('--text-color', 'hsl(0, 0%, 80%)')
      document.documentElement.style.setProperty('--pressed-color', 'var(--darker-color)')
      document.querySelector('.addButton').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color')
    } 
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY2, JSON.stringify(color))
  }, [color])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY3, JSON.stringify(darkMode))
  }, [darkMode])

  function handleAddTask() {
      const name = taskNameRef.current.value
      if (name === '') {
        return
      }
      setTasks(prevTasks => {
        return [...prevTasks, {id: uuidv4(), name: name, complete: false}]
      })
      taskNameRef.current.value = null
    }

  function handleClearTask() {
    const newTasks = tasks.filter(task => !task.complete)
    setTasks(newTasks)
  }

  function toggleTask(id) {
    const newTasks = [...tasks]
    const task = newTasks.find(task => task.id === id)
    task.complete = !task.complete
    setTasks(newTasks)
    closeSettings()
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      document.querySelector('.addButton').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--pressed-color')
      handleAddTask()
    }
  }

  function handleKeyUp(event) {
    closeSettings()
    if (event.key === "Enter") {
      document.querySelector('.addButton').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color')
    }
  }

  function handleSelectAll() {
    const newTasks = [...tasks]
    newTasks.forEach(task => {
      if(task.complete === false) {
        task.complete = true
      }
    })
    setTasks(newTasks)
  }

  function onHover() {
    document.querySelector('.listContainer').focus()
  }

  let open = false;

  function handleSettings() { 
    if(document.querySelector('.settings').getAttribute('clicked') === 'true' && !open){
      setSettings(open)
    } else {
      open = true
      setSettings(open)
      loadColors()
    }
  }

  function setSettings(open) {
    if(open === true) {
      let element = document.querySelector('.settings')
      element.setAttribute('clicked', 'true')
    } else {
      let element = document.querySelector('.settings')
      element.setAttribute('clicked', 'false')
    }
  }

  function handleExitSettings() {
    open = false
  }

  function closeSettings(){
    open = false
    setSettings(false)
  }

  function updateDarkMode() {
    if(darkMode[0] === 0){
      setDarkMode([1])
      document.documentElement.style.setProperty('--color', 'hsl(228, 5%, 22%)')
      document.documentElement.style.setProperty('--text-color', 'hsl(0, 0%, 80%)')
      document.documentElement.style.setProperty('--pressed-color', 'var(--darker-color)')
      document.querySelector('.addButton').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color')
    } else {
      setDarkMode([0])
      document.documentElement.style.setProperty('--color', 'hsl(0, 0%, 90%)')
      document.documentElement.style.setProperty('--text-color', 'black')
      document.documentElement.style.setProperty('--pressed-color', 'var(--lighter-color)')
      document.querySelector('.addButton').style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--color')
    }
  }

  function loadColors() {
    colors.forEach(color => {
      let element = document.getElementById(color.id)
      element.style.setProperty('--hue-1', color.hue)
      element.style.setProperty('--sat-1', color.sat+"%")
      element.style.setProperty('--lightness-1', color.light+"%")
  });
  }

  return (
    <div className='main'>

      <button className='selectAllButton' onClick={() => {handleSelectAll(); closeSettings()}}>Select All Tasks</button>
      <div className='settings' onClick={handleSettings} clicked='false'>
        <span className='icon' >&#9881;</span>
        <div className='closeSettings' onClick={handleExitSettings}></div>
        <label className='colorLabel' onClick={handleSettings}>Theme</label>
        <div className='colorPicker' onClick={handleSettings}>
          <ColorList class='colorList' colors={colors} setColor={setColor} handleSettings={handleSettings}/>
        </div>
        <label className='darkModeLabel' onClick={handleSettings}>Dark Mode</label>
        <input className='darkModeCheck' type='checkbox' checked={darkMode[0]} onClick={()=>{updateDarkMode();handleSettings();}} onChange={updateDarkMode}/>
      </div>
      <div className='listContainer' onPointerOver={onHover}>
        <List class='list' tasks={tasks} toggleTask={toggleTask} onHover={onHover}/>
      </div>

      <div className='inputPanel'>
        <input className='input' onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} ref={taskNameRef} type='text' />
        <button className='addButton' onClick={()=>{handleAddTask();closeSettings()}}>Add Task</button>
      </div>

      <div className='removePanel'>
        <button className='clearButton' onClick={()=>{handleClearTask();closeSettings()}}>Clear Completed Tasks</button>
        <div className='label' >{tasks.filter(task => !task.complete).length} Tasks Left</div>
      </div>

    </div>
  )
}

export default App