import {useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";
import "./App.css";
import {Greeting} from "./components/landing/Greeting";

function App() {

    console.log("Rendering..");
    return (
        <div className="container">
            <Greeting title={"Welcome to Analog ML Connect"}/>
        </div>
    );
}

export default App;
