// import React, { Component } from 'react';
import React, { useState, useCallback } from 'react'
import './App.css';
import Menu from './components/Menu';
import HexGrid from './components/HexGrid';
import ItemTypes from './ItemTypes'
import Box from './Box'
import update from 'immutability-helper'
import { NativeTypes } from 'react-dnd-touch-backend'

const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

// const generateGrid = (cols, rows) => {
//     // const [grid] = useState([
//     //     { name: 'Bottle', type: ItemTypes.GLASS },
//     //     { name: 'Banana', type: ItemTypes.FOOD },
//     //     { name: 'Magazine', type: ItemTypes.PAPER },
//     //   ])

//     const gridBuild = [];
//     for(let row = 0; row < rows; row ++) {
//         let currentRow = [];
//         for(let col = 0; col < cols; col ++) {
//             currentRow.push({
//                 id: col + (row * cols)
//             })
//         }
//         gridBuild.push(currentRow);
//     }
//     const [grid] = useState(gridBuild);
//     // return grid;
// }
// generateGrid(7, 6);

const HexSynth = () => {
    const cols = 7
    const rows = 6
    const gridBuild = []
    for(let row = 0; row < rows; row ++) {
        let currentRow = []
        for(let col = 0; col < cols; col ++) {
            currentRow.push({
                id: col + (row * cols)
            })
        }
        gridBuild.push(currentRow)
    }
    const [grid] = useState(gridBuild)

    const [boxes] = useState([
        { name: 'Bottle', type: ItemTypes.BOX },
        { name: 'Banana', type: ItemTypes.BOX },
        { name: 'Magazine', type: ItemTypes.BOX },
    ])
    const [droppedBoxNames, setDroppedBoxNames] = useState([])
    function isDropped(boxName) {
        console.log(boxName);
        return droppedBoxNames.indexOf(boxName) > -1
    }
    const handleDrop = useCallback(
        (index, item) => {
          const { name } = item
          setDroppedBoxNames(
            update(droppedBoxNames, name ? { $push: [name] } : { $push: [] }),
          )
        //   setDustbins(
        //     update(dustbins, {
        //       [index]: {
        //         lastDroppedItem: {
        //           $set: item,
        //         },
        //       },
        //     }),
        //   )
        },
        [droppedBoxNames],
    )
    
    return (
        <div className="App">
            <div className="toolbox">
                {boxes.map(({ name, type }, index) => (
                    <Box
                        name={name}
                        type={type}
                        isDropped={isDropped(name)}
                        key={index}
                    />
                ))}
            </div>
            <div className="hex-grid">
                <HexGrid
                    accept={[ItemTypes.BOX]}


                    grid = {grid}
                    cellSize = {30}
                    // piecePosition = {this.props.piecePosition}
                ></HexGrid>
            </div>
            
            {/* <Menu items={this.state.items}></Menu> */}
        </div>
    );
}

export default HexSynth;
