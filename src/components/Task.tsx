import React from "react"
import { FiTrash2 } from 'react-icons/fi';


interface Props {
    task: string,
    completed: boolean,
    id: string,
    markAsCompletd: (id: string) => void,
    delete: (id: string) => void
}

const Task: React.FC<Props> = (props) => {
    return (
        <div className="flex task items-center my-4 task gap-3" key={props.id + Math.random().toString()}>
            <div onClick={() => props.markAsCompletd(props.id)} className="p-[4px] cursor-pointer  border-2 rounded-full ">
                <div className={`${props.completed && "bg-purple-400 border"}  p-1  rounded-full w-full h-full`}>
                </div>
            </div>

            <div className=" w-[calc(100%-100px)]">
                <p style={props.completed ? { textDecoration: "line-through" } : {}} className="text-gray-500">{props.task}</p>
            </div>

            <div onClick={() => props.delete(props.id)} className={`${props.completed ? "opacity-1" : "opacity-0"} text-gray-500 cursor-pointer delete-btn  duration-200`}>
                <FiTrash2 />
            </div>
        </div>
    )
}

export default Task