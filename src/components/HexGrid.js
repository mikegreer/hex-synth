import React from 'react';
import classNames from 'classnames';
import { movePiece } from './Synth'
import { ItemTypes } from './Constants'
import { useDrop } from 'react-dnd'
import Piece from './Piece';


import { DndProvider } from 'react-dnd'
import TouchBackend from 'react-dnd-touch-backend'

function renderPiece(scale, hasPiece) {
    if(hasPiece) {
        return <Piece scale={scale} />
    }
    return;
}

function Hexagon({gridPosition, coordinates, scale, hasPiece}) {
    // const [{ isOver }, drop] = useDrop({
    //     accept: ItemTypes.PIECE,
    //     drop: () => movePiece(gridPosition.x, gridPosition.y),
    //     collect: monitor => ({
    //         isOver: !!monitor.isOver(),
    //     }),
    // })

    const width = Math.sqrt(3) * scale;
    const hexPoints = [
        {x: width, y: (scale/2)*-1},
        {x: width, y: scale/2},
        {x: width/2, y: scale},
        {x: 0, y: scale/2},
        {x: 0, y: (scale/2)*-1},
        {x: width/2, y: scale*-1}
    ];
    let points = "";
    hexPoints.forEach(point => {
        points += point.x + "," + point.y + " ";
    });
    const center = coordinates;
    // center.x += 1;
    // center.y += scale * 0.3
    return(
        <g 
            style = {{
                transform: "translate(" + (center.x + 1) + "px, " + (center.y + scale * 0.3) + "px)"
            }}
            // ref={drop}
        >
            <polygon
                points={points}
                fill="none" 
                strokeWidth="1"
                className={classNames("hex")}
            ></polygon>
                {renderPiece(scale, hasPiece)}
            {/* {isOver && (
                <g className="router">
                    <circle cx={scale * Math.sqrt(3) / 2} cy="0" r={scale/2} stroke="red" fill="red" strokeWidth="5" />
                </g>
            )} */}
        </g>
    );
}

const HexGrid = ({ lastDroppedItem, onDrop, grid, cellSize }) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        // accept: ItemTypes.BOX,
        drop: onDrop,
        collect: monitor => ({
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
      })

    const getHexStyle = () => ({
        stroke: '#1aaac2',
        pointerEvents: 'visible', 
        boxSizing: 'border-box',
    });
    
    // render() {
    const rowCount = grid.length;
    const colCount = grid[0].length;
    const hexScale = cellSize;
    const width = Math.sqrt(3) * cellSize * (colCount + 0.5) + 2;
    const height = 0.75 * cellSize * (rowCount + 0.5) * 2 + 2;
    const hexGrid = [];

    //TODO: part of below temp moving calcs
    const cellHeight = (hexScale * 2) * .75;
    const cellWidth = Math.sqrt(3) * hexScale;
    grid.forEach((row, rowIndex) => {
        row.forEach((hex, colIndex) => {
            const gridX = rowIndex % 2 ? colIndex * cellWidth : colIndex * cellWidth + (cellWidth / 2);
            const gridY = rowIndex * cellHeight + cellHeight / 2;
            hexGrid.push(<Hexagon
                // style={this.getHexStyle()}
                key={hex.id}
                // hasPiece={colIndex === this.props.piecePosition[0] && rowIndex === this.props.piecePosition[1]}
                scale={hexScale}
                coordinates = {{x: gridX, y: gridY}}
                gridPosition = {{x: colIndex, y: rowIndex}}
            />); 
        });
    })

        return(
        // <DndProvider 
        //     backend={TouchBackend} 
        //     options={{
        //         enableMouseEvents: true
        //     }}
        // >
            <div className="grid" ref={drop}>
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
                    {hexGrid}
                </svg>
            </div>
        // </DndProvider>
        );
    // }
}

export default HexGrid;