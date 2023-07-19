import Task from "./components/Task";
import { AiOutlinePlus } from 'react-icons/ai';
import { ChangeEvent, FormEvent, useRef } from "react";
import { useState } from "react";

interface Task {
  completed: boolean,
  task: string,
  id: string
}

function App() {
  const [showTaskInput, setShowTaskInput] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<string>("");
  const taskInput = useRef<HTMLInputElement>();


  const addTask = (e: FormEvent): void => {
    e.preventDefault();
    if (task.length < 1 || task.trim().split("").length < 1) return alert("get serious");

    const previousTasks = tasks;
    const newTask: Task = {
      task: task,
      completed: false,
      id: new Date().toISOString()
    };

    previousTasks.unshift(newTask);
    setTasks([...previousTasks]);
    setTask("");
    taskInput.current!.value = "";
  };

  const markAsCompleted = (id: string): void => {
    const previousTasks = tasks;
    previousTasks[previousTasks.findIndex((tsk) => tsk.id === id)].completed = !previousTasks[previousTasks.findIndex((tsk) => tsk.id === id)].completed;
    setTasks([...previousTasks]);
  }

  const deleteTask = (id: string): void => {
    const previousTasks = tasks;
    previousTasks.splice(previousTasks.findIndex((tsk) => tsk.id === id), 1);
    setTasks([...previousTasks]);
  }


  return (
    <>
      <main className='bg-gray-100 w-full min-h-screen pt-20'>
        <header className="max-w-[700px] p-5 bg-purple-500 m-auto mb-5 border" >
          <h3 className="text-center font-bold text-white text-2xl">Simple todo 📝</h3>
        </header>

        <section className='max-w-[700px] relative  h-[500px]  m-auto p-4 border bg-white'>
          <ul className="h-[calc(100%-50px)] w-full list-none overflow-auto tasks-container pb-5">
            {tasks.length > 0 && tasks.map((tsk) => <Task markAsCompletd={markAsCompleted} delete={deleteTask} task={tsk.task} completed={tsk.completed} id={tsk.id} />)}
            {tasks.length < 1 && (<h1 className="text-center mt-10">No Task Yet !</h1>)}
          </ul>

          {!showTaskInput && < div className="w-full flex items-center justify-center absolute bottom-0">
            <button onClick={() => setShowTaskInput(true)} className="w-[200px] h-[50px] flex gap-2  items-center justify-center relative top-5 bg-purple-500 active:bg-purple-600 rounded-md">
              <AiOutlinePlus className="text-2xl text-white" />
              <h3 className="font-bold text-gray-100">Add Task</h3>
            </button>
          </div>
          }

          {showTaskInput && <form onSubmit={addTask} action="">
            < div className="w-[calc(100%-30px)] py-2  border-t h-[70px] bg-white  flex gap-4 items-center justify-center absolute bottom-0">
              <input ref={(element: HTMLInputElement) => taskInput.current = element} defaultValue={task} onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)} type="text" className="w-full h-full border outline-purple-200 px-4 focus:drop-shadow-lg" placeholder="Add task " />
              <button className="h-full active:bg-purple-600 w-[200px] bg-purple-500 text-white rounded-md ">Add</button>
              <button onClick={(e) => {
                e.stopPropagation();
                setShowTaskInput(false);
                setTask("");
                taskInput.current!.value = "";
              }} className="h-full px-3 active:bg-purple-600 text-sm text-white bg-purple-500 rounded-md ">Close</button>

            </div>
          </form>
          }
        </section>

      </main >
    </>
  )
}

export default App
