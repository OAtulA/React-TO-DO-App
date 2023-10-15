import { useReducer, useState, useRef } from "react"

let taskList = []
function reducer(prevTasks, action) {
  console.log('sometask');
  let newTasks;
  switch (action.type) {
    case "ADD":
      newTasks = [...prevTasks, action.newEntry];
      return newTasks;
    case "EDIT":
      newTasks = [...prevTasks]
      newTasks[action.index] = action.newEntry;
      return newTasks
    case "DELETE":
      newTasks = prevTasks.filter((task, index) => index !== action.index)
      return newTasks
    default:
      return prevTasks
  }
}

//This will form the li of task list
function Task(props) {
  // let TaskName= "Wonder";
  // let ind =0;
  let [editFormDisplay, set_editFormDisplay] = useState("dispNone")
  let TaskRef = useRef(null)
  function handleDelete() {
    props.taskDispatch({ type: "DELETE", index: props.ind })
  }
  function handleEdit() {
    props.taskDispatch({ type: "EDIT", index: props.ind, newEntry: TaskRef.current.value })
  }
  return (
    <>
      <div className="Task">

        <input type="checkbox" className="taskName" ref={TaskRef}>{props.TaskName}</input>
        <form action={handleEdit} className={editFormDisplay}>
          <input type="text" name="EditTask" id="editTask" />
          <button type="submit" onClick={set_editFormDisplay("dispNone")}></button>
        </form>
        <button className="edit" onClick={set_editFormDisplay("visibleTaskEdit")}>Edit</button>
        <button className="delete" onClick={handleDelete}>Delete</button>
      </div>
    </>
  )
}


function App() {

  const [tasks, taskDispatch] = useReducer(reducer, taskList);
  let inputREf = useRef(null)
  function addTask(task, ind) {
    return (<li>
    <Task TaskName={task} ind={ind} taskDispatch={taskDispatch} />
    </li>)
  }

  function addEntry() {
    const newTask = inputREf.current.value;
    taskDispatch({ type: "ADD", newEntry: newTask })
  }


  return (
    <>
      <h1>TO DO List</h1>
      <div className="TO_DO_List">
        <input type="text" name="newEntry" id="newEntry" placeholder="Good Task" ref={inputREf} /><br />
        <button className="addEntry" onClick={addEntry}></button>
        <hr />
        <ul className="Tasks">
          {
            (!tasks.length) ?
              tasks.map(addTask(task, ind)) : <h2>Empty List</h2>
          }
        </ul>
      </div>
    </>
  )
}

export default App