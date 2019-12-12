import React, { Component } from 'react';
import './App.css';
import Menu from './components/Menu';
import HexGrid from './components/HexGrid';

const getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k}`,
        content: `item ${k}`
    }));

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: getItems(10),
            grid: [],
            saveFiles: [],
        };
        // this.onDragEnd = this.onDragEnd.bind(this);
        this.state.grid = this.generateGrid(7, 6);
    }
    
    componentDidMount = () => {
        // document.addEventListener("keydown", this.handleKeyPress.bind(this));
        this.setState({saveFiles: JSON.parse(localStorage.getItem('saveFiles'))});
        // this.state.grid = this.generateGrid(7, 6);
    }    

   

    generateGrid = (cols, rows) => {
        const grid = [];
        for(let row = 0; row < rows; row ++) {
            let currentRow = [];
            for(let col = 0; col < cols; col ++) {
                currentRow.push({
                    id: col + (row * cols)
                })
            }
            grid.push(currentRow);
        }
        // for(let i = 0; i < cols * rows; i ++) {
        //     const column = i % cols;
        //     const row = Math.floor(i / cols);
        //     grid.push({
        //         id: i,
        //         column: column,
        //         row: row,
        //     });
        // }
        return grid;
    }

    saveLevel = (level) => {
        //get existing saved files from local stoarge, and parse back to a list
        let saveFiles = JSON.parse(localStorage.getItem('saveFiles'));
        const newSave = {
            grid: this.state.grid,
            level: this.state.level,
            rules: this.state.rules,
            settings: this.state.settings,
        }
        if(saveFiles === null){
            saveFiles = [];
        }    
        saveFiles.push(newSave);
        localStorage.setItem('saveFiles', JSON.stringify(saveFiles));
        this.setState({saveFiles: saveFiles});
    }

    loadLevel = (id) => {
        const saveFiles = JSON.parse(localStorage.getItem('saveFiles'));
        this.setState({
            grid: saveFiles[id].grid,
            level: saveFiles[id].level,
            rules: saveFiles[id].rules,
            settings: saveFiles[id].settings
        });
        this.cutOffCells = [];
    }

    

    render() {
        return (
            <div className="App">
                <div className="toolbox">

                </div>
                <div className="hex-grid">
                    <HexGrid
                        grid = {this.state.grid}
                        cellSize = {30}
                    ></HexGrid>
                </div>
                <Menu items={this.state.items}></Menu>
            </div>
        );
    }
}

export default App;
