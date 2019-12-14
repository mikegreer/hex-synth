import React from 'react'
import ReactDOM from 'react-dom'
import './index.css';
import { DndProvider } from 'react-dnd'
import * as serviceWorker from './serviceWorker';
import HexSynth from './HexSynth';
// import TouchBackend from 'react-dnd-touch-backend'
// import Backend from 'react-dnd-html5-backend'
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';

function App() {
    return (
        <div className="App">
            <DndProvider 
                // backend={Backend}
                backend={MultiBackend} 
                options={HTML5toTouch}
                // options={{
                //     enableMouseEvents: true
                // }}
            >
                <HexSynth />
            </DndProvider>
        </div>
    )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
