// imports
import TextareaAutosize from "react-textarea-autosize";

function NewBottomBar({
    userInput,
    setUserInput,
}) {
    return (
        <div className="flex justify-center bg-slate-100 pt-4 pb-4">

            <TextareaAutosize
                className="w-[50%] p-2 rounded-md input input-bordered"
                placeholder="Message Capgemin.ai..."
                maxRows={10}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />

            <button
                className="btn btn-sm btn-primary ml-2"
                onClick={() => {
                    console.log('User Input:', userInput);
                    setUserInput("");
                }}
            >
                Submit
            </button>
        </div>
    );
}

export default NewBottomBar;