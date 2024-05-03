// imports
import TextareaAutosize from "react-textarea-autosize";
import { FaCircleArrowUp } from "react-icons/fa6";

function NewBottomBar({
    userInput,
    setUserInput,
}) {
    return (
        <div className="flex justify-center bg-white pt-4 pb-4">

            <TextareaAutosize
                className="w-[50%] p-2 rounded-md input input-bordered input-slate-600"
                placeholder="Message Capgemin.ai..."
                maxRows={10}
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />

            <button
                className="btn btn-sm h-10 btn-outline btn-info ml-2"
                onClick={() => {
                    console.log('User Input:', userInput);
                    setUserInput("");
                }}
            >
                <FaCircleArrowUp className='text-info'/>
            </button>
        </div>
    );
}

export default NewBottomBar;