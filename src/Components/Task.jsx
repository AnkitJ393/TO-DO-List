import React, { useState } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import isAfter from 'date-fns/isAfter';
import isBefore from "date-fns/isBefore";
import isToday from "date-fns/isToday";
import addDays from "date-fns/addDays";

const FORMAT="dd/MM/yyyy";
function formatDate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
  }

const AddTask = ({ onCancel, onAddTask }) => {
  const [task, setTask] = useState("");
    const[date,setDate] =useState(null);
  
    return (
    <div className="add-task-dialog">
      <input type="text" onChange={(event) => setTask(event.target.value)} />
      <div className="add-task-actions-container">
        <div className="btns-container">
          
          <button className="add-btn" disabled={!task} onClick={() => {onAddTask(task,date) ;setTask("");onCancel();   }}>
            Add task
          </button>

          <button className="cancel-btn" onClick={()=>{onCancel();setTask("") }}>
            Cancel
          </button>
        
        </div>

        <div className="icons-container">
            <DayPickerInput onDayChange={(day)=>setDate(day)} 
            placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
            formatDate={formatDate}
            format={FORMAT}
            dayPickerProps={{
                modifiers: {
                    disabled:[{before:new Date()}],
                },
            }}
            />
        </div>
      
      </div>
    </div>
  );
};


const TASKS_HEADER_MAPPING={
    INBOX : "Inbox",
    TODAY : "Today",
    NEXT_7: "Next 7 days"
}

const TaskItems=({selectedTab,tasks})=>{
    let taskstoRender=[...tasks];
    if(selectedTab === 'NEXT_7'){
        taskstoRender=taskstoRender.filter((task)=>
            isAfter(task.date ,new Date()) && 
            isBefore(task.date ,addDays(new Date(),7))
            );
            // .map((task)=>(
            //     <p>
            //         {task.text} {dateFnsFormat(new Date(task.date),FORMAT) }{" "}
            //     </p>
            // ));
    }

    if(selectedTab === 'TODAY'){
        taskstoRender= taskstoRender
        .filter((task)=>isToday(task.date))
        // .map((task)=>(
        //     <p>
        //         {task.text} {dateFnsFormat(new Date(task.date),FORMAT)}{" "}
        //     </p>
        // ));
    
    }
    return (
        <div className="task-items-container">
            {taskstoRender.map((task)=>(
                <div className="task-item">
                    <p>
                        {task.text}
                    </p>
                    <p>
                        {dateFnsFormat(new Date(task.date),FORMAT)}
                    </p>
                </div>
            )

            
            ) 
        }
        </div>
            )
    
    // return taskstoRender.map((task)=>(
    //    <p>
    //         {task.text} {dateFnsFormat(new Date(task.date), FORMAT )}{" "}
    //     </p>
    
    // ));
};

const Task = ({selectedTab}) => {
  const [showAtTask, setshowAtTask] = useState(false);
  
  const [tasks, setTasks] = useState([]);

  const addNewTask = (text,date) => 
  {
    const newTaskItem = {text,date:date||new Date()};
    setTasks((tasks) => [...tasks, newTaskItem]);

  }


    return (
      <div className="task">
        <h1>{TASKS_HEADER_MAPPING[selectedTab]} </h1>
        {selectedTab==='INBOX'?  <div
          className="add-task-btn"
          onClick={() => setshowAtTask((showAtTask) => !showAtTask)}
        >
          <span className="plus">+</span>
          <span className="add-task-text">Add Task </span>
        </div>:null}
        {showAtTask && (
          <AddTask
            onAddTask={addNewTask}
            onCancel={() => setshowAtTask(false)}
          />
        )}
        {tasks.length > 0 ?
        
        <TaskItems tasks={tasks} selectedTab={selectedTab}/>
            : 
            (
             <p>No tasks yet</p>
             )
        }
        
        
      </div>
    );
  };


export default Task;
