import Header from "./Header";
import Tasks from "./Tasks";
import React, { useState } from "react";
import AddTask from "./AddTask";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo } from "../redux/actions/action";

const Timer = () => {
  const todos = useSelector((state)=>state.allTodos.todos);
  const dispatch = useDispatch();
  // console.log(todos);
  const [editTaskId, setEditTaskId] = useState(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [expectedTime, setExpectedTime] = useState("");
  // const [tasks, setTasks] = useState(todos);
  const title = "Timer App";
  //add new task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;
    const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    dispatch(addTodo([...todos, newTask]));
  };
  //delete the task
  const deleteTask = (id) => {
    // setTasks(tasks.filter((item) => item.id !== id));
    dispatch(deleteTodo(todos.filter((item) => item.id !== id)))
  };
  function editFunc(id) {
    const selectedValue = todos.find((item)=>item.id===id)
    setTaskName(selectedValue.taskName);
    setExpectedTime(selectedValue.expectedTime)
    setEditTaskId(id);
    setShowAddTask(true);
  }
  function editTaskFunc(task) {
    // console.log("task",task);
      todos.map((item) => {
        // if (item.id === editTaskId) {
          dispatch(editTodo([task]));
        // }
        return item;
      })
  }
  return (
    <div className="container">
      <Header
        title={title}
        onToggle={() => {
          setShowAddTask(!showAddTask);
        }}
        showAddClose={showAddTask}
      />
      {showAddTask && (
        <AddTask
          onAdd={addTask}
          taskName={taskName}
          setTaskName={setTaskName}
          expectedTime={expectedTime}
          setExpectedTime={setExpectedTime}
          editTaskFunc={editTaskFunc}
          editTaskId={editTaskId}
        />
      )}
      {todos.length > 0 ? (
        <Tasks tasks={todos} onDelete={deleteTask} editFunc={editFunc} />
      ) : (
        "No Task"
      )}
    </div>
  );
};

export default Timer;
