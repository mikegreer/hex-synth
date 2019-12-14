import React from 'react'
import { ItemTypes } from './Constants'
import { useDrag } from 'react-dnd'

function Piece(props) {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.PIECE },
		collect: monitor => ({
			isDragging: !!monitor.isDragging(console.log()),
		}),
  })

  return (
    <g 
        className="router" 
        ref={drag}
        style={{
            opacity: isDragging ? 0.5 : 1,
            cursor: 'move',
        }}
    >
        <circle cx={props.scale * Math.sqrt(3) / 2} cy="0" r={props.scale/2} stroke="red" fill="red" strokeWidth="5" />
        {/* <circle cx={0} cy="0" r={10} stroke="red" fill="none" strokeWidth="5"  /> */}
    </g>
  )
}

export default Piece