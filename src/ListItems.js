import React, { useState } from 'react'

const ListItems = (props) => {
  const [line,setLine] = useState(false);
  const done = ()=>{
    setLine(true);
  };
  return (
    <div className='listItems'>
    <li style={{textDecoration : line ? "line-through":"none",paddingLeft:"0.4rem",textAlign:"left"}}>{props.val.name}</li>
    <div className="btns">
      <button className='btn btn-green' style={{display: line ? "none":"inline"}} onClick={done}>👍</button>
      <button className='btn btn-green' style={{display: line ? "none":"inline"}} onClick={()=>{props.onClick("edit",props.val.id)}}>✏️</button>
      <button className='btn btn-red'  onClick={()=>props.onClick("delete",props.val.id)}> ✖️ </button>
    </div>
  </div>
  )
}

export default ListItems