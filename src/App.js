import React, { useState, useEffect } from 'react';
import ListItems from './ListItems';
import './App.css';


const getLocalData = () => {
  const list = localStorage.getItem('mytodolist');
  if (list)
    return JSON.parse(list);
  else
    return [];
}
const App = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState(getLocalData());
  const [toggle,setToggle] = useState(false);
  const [editIndex,setEditIndex]= useState();
  const submit = () => {
    if(!input){
      alert("Write something first");
    }
    else if(input && toggle){
      setToggle(false);
      setInput("");
      setEditIndex("");
      setData(
        data.map((curr)=>{
          if(curr.id=== editIndex){
            return {...curr,name:input};
        }
        return curr;
      })
      );
    }
    else{
      const modifyInput = { id: new Date().getTime().toString(), name: input };
      setData([...data, modifyInput]);
      setInput("");
    }
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(data));
  }, [data])
  const clear =()=>{
    setData([]);
  }
  const task = (perform, index) => {
    if (perform === "delete") {
      setData((oldarr) => {
        return oldarr.filter((element) => {
          return element.id !== index;
        })
      })
      setInput("");
      setToggle(false);
    }
    else if(perform==="edit"){
      setToggle(true);
      setEditIndex(index);
      const editText = data.find((curr)=>{
        return curr.id === index;
      })
      setInput(editText.name);
    }
  };
  return <>
    <div className="container">
      <h1>Todo List</h1>
      <div className="entry">
        <input type="text" placeholder='Enter List Item'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {toggle?<button className='btn btn-green' onClick={submit}>✏️</button>:
        <button className='btn btn-green' onClick={submit}>➕</button>
        }
      </div>
      <ol>
        {data.map((current) => {
          return <ListItems key={current.id} val={current} onClick={task} />
        })}
      </ol>
        <button className="btn clear"onClick={clear}>Clear All</button>
    </div>
  </>
}

export default App