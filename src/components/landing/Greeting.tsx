import {useState} from "react";
import {invoke} from "@tauri-apps/api/tauri";

export interface IGreet {
    title?: string
}
export const Greeting = ({title = "Here goes greeting title",
    ...props
} : IGreet) => {
    console.log("Rendering...")
    const [greetMsg, setGreetMsg] = useState("");
    const [name, setName] = useState("");
    async function greet() {
        // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
        setGreetMsg(await invoke("greet", { name }));
    }

    return (
    <>
        <h1>{title}</h1>

        <div className="row">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Calling Greet..");
                    greet();
                }}
            >
                <input
                    id="greet-input"
                    onChange={(e) => setName(e.currentTarget.value)}
                    placeholder="Enter a name..."
                />
                <button type="submit">Greet</button>
            </form>
        </div>
        <p title={"greet-msg"}>{greetMsg}</p>
    </>
    );
}