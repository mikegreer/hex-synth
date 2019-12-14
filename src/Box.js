import React from 'react'
import { useDrag } from 'react-dnd'
const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
}
const Box = ({ name, type, isDropped }) => 
{
  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
    }),
  })
  return (
    <div
        className="router" 
        ref={drag}
        style={{ ...style, opacity }}
        >
        {isDropped ? <s>{name}</s> : name}
            <svg>
        <circle cx={30 * Math.sqrt(3) / 2} cy="0" r={30/2} stroke="red" fill="red" strokeWidth="5" />
    </svg>
    </div>
  )
}
export default Box
