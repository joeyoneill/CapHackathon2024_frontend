// imports
import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectCurrentAuthToken, selectUserEmail } from "../store/auth/AuthSlice";
import {v4 as uuidv4} from "uuid";
import axios from "axios";

// In-App Components
import NewHistorySidebar from "../components/NewHistorySidebar";
import NewChatCard from "../components/NewChatCard";

///////////////////////////////////////////////////////////////////////////////////////////

// Reducer Initial State
const initialState = {
    allHistory: [],
    aiHistory: [],
    userHistory: [],
    isGenerating: false,
    showSplashPage: false,
}

// Case Names
const setIsGenerating = "SET_IS_GENERATING";
const setAllHistory = "SET_ALL_HISTORY";
const setAiHistory = "SET_AI_HISTORY";
const setUserHistory = "SET_USER_HISTORY";
const setShowSplashPage = "SET_SPLASH_PAGE";
const setChatHistory = "SET_CHAT_HISTORY";

// Reducer Function to handle state updates
function reducer(state, action) {
    switch (action.type) {
        case setIsGenerating:
            return {
                ...state,
                isGenerating: action.payload
            };
        case setShowSplashPage:
            return {
                ...state,
                splashPage: action.payload
            };
        case setAllHistory:
            return {
                ...state,
                allHistory: action.payload
            };
        case setAiHistory:
            return {
                ...state,
                aiHistory: action.payload
            };
        case setUserHistory:
            return {
                ...state,
                userHistory: action.payload
            };
        case setChatHistory:
            return {
                ...state,
                aiHistory: action.payload.ai,
                userHistory: action.payload.user
            };
        default:
            return state;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////

// Main Component
function NewChatPage() {

    // API HOST NAME
    const apiHostUrl = "columbiateam1backend.azurewebsites.net";

    // Initialize Reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // State Variables
    const [token, setToken] = useState(useSelector(selectCurrentAuthToken));
    const [email, setEmail] = useState(useSelector(selectUserEmail));
    const [chatId, setChatId] = useState(null);
    const [isIntialLoading, setIsIntialLoading] = useState(false);
    const [aiHistory, setAiHistory] = useState([]);
    const [userHistory, setUserHistory] = useState([]);
    const [showSplash, setShowSplash] = useState(false);
    const [isLoadingLock, setIsLoadingLock] = useState(false);

    // Stream Vars
    const [socket, setSocket] = useState(null);
    const [userInput, setUserInput] = useState('');
    const [userMsg, setUserMsg] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);

    ///////////////////////////////////////////////////////////////////////////////////////
    // Initial Get of Variables
    ///////////////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        console.log(token);
        // Fetchs all initial data
        const fetchData = async () => {
            // Set Splash Page to True
            setShowSplash(true);
            
            // Loading of Page
            setIsIntialLoading(true);

            // Set new ChatId
            const uuid = uuidv4()
            setChatId(uuid);
            
            // Try to Get Data from APIs
            try {
                // Fetch History
                const response = await fetch('https://' + apiHostUrl + '/all_chat_history', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                console.log('DATA:', data.chat_history);
                dispatch({ type: setAllHistory, payload: data.chat_history });
            } catch (error) {
                console.error(error);
            }

            // End Loading of Page
            setIsIntialLoading(false);
        };

        // Call Fetch Data
        fetchData();
    }, []);

    ///////////////////////////////////////////////////////////////////////////////////////
    //
    ///////////////////////////////////////////////////////////////////////////////////////
    async function fetchChatHistoryUntilMatch(local_input, maxAttempts = 10, attempt = 1) {
        await axios.get(`https://${apiHostUrl}/all_chat_history`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            const chatHistory = response.data.chat_history;

            if (chatHistory.length > 0 && chatHistory[0].history.human[0] === local_input) {
                dispatch({ type: setAllHistory, payload: chat_history });
            } else if (attempt < maxAttempts) {
                // Wait for 3 seconds before making the next call
                setTimeout(() => fetchChatHistoryUntilMatch(local_input, maxAttempts, attempt + 1), 1500);
            } else {
                console.log('Max attempts reached without finding a match.');
            }
        })
        .catch(error => {
            console.error('Failed to fetch chat history:', error);
            if (attempt < maxAttempts) {
                // Optionally retry after a delay even on error
                setTimeout(() => fetchChatHistoryUntilMatch(local_input, maxAttempts, attempt + 1), 3000);
            }
        });
    }

    ///////////////////////////////////////////////////////////////////////////////////////
    // Websocket Connection
    ///////////////////////////////////////////////////////////////////////////////////////
    // Webosocket Connection
    const connectWebSocket = async () => {
        const ws = new WebSocket('wss://' + apiHostUrl + '/ws');
        //const ws = new WebSocket('ws://localhost:8000/ws');
        let json_expected = false;
        let local_input = '';

        ws.onopen = () => {
            console.log('Connected to Websocket...');
            setIsGenerating(true);
            setIsLoadingLock(true);
            setUserMsg(userInput);
            setShowSplash(false);
            setSocket(ws);
            
            if (userInput.trim() !== '') {
                local_input = userInput;
                ws.send(
                    JSON.stringify(
                    {
                        query: userInput,
                        chatId: chatId,
                        jwt: `Bearer ${token}`,
                        email: email
                    }
                ));
                setUserInput('');
            } else {
                ws.close();
            }
        };

        ws.onmessage = (event) => {
            const msg = event.data;
            if (msg === '<<END>>') {
                ws.close();
            }
            else if (msg === '<<JSON>>') {
                json_expected = true;
            }
            else if (msg === '<<E:NO_QUERY>>') {
                ws.close();
                console.log('ERROR: No query provided...')
            }
            else if (msg === '<<E:NO_CHAT_ID>>') {
                ws.close();
                console.log('ERROR: No chat ID provided...')
            }
            else if (msg === '<<E:INVALID_JWT>>') {
                ws.close();
                console.log('ERROR: Invalid JWT Token provided...')
            }
            else if (msg === '<<E:NO_EMAIL>>') {
                ws.close();
                console.log('ERROR: No email provided...')
            }
            else {
                if (json_expected) {
                    try {
                        const json_data = JSON.parse(msg);
                        setIsGenerating(false);
                        setAiHistory((prevAiHistory) => [...prevAiHistory, json_data.ai_response]);
                        setUserHistory((prevUserHistory) => [...prevUserHistory, json_data.user_query]);
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    setAiResponse((prevAiResponse) => prevAiResponse + msg);
                }
            }
        };

        ws.onclose = async () => {
            await fetchChatHistoryUntilMatch(local_input);
            console.log('Disconnected from server.');
            setSocket(null);
            setUserMsg('');
            setAiResponse('');
            setIsLoadingLock(false);
        };
    };

    ///////////////////////////////////////////////////////////////////////////////////////
    // return JSX
    ///////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
        
        {isIntialLoading ? (
            <div className="modal modal-open">
                <div className="modal-box">
                    <h3 className="font-bold text-lg text-center">Loading Capgemin.AI</h3>
                    <div className="flex justify-center py-4">
                        <span className="loading loading-spinner text-primary"></span>
                        <span className="loading loading-spinner text-secondary"></span>
                        <span className="loading loading-spinner text-accent"></span>
                        <span className="loading loading-spinner text-neutral"></span>
                        <span className="loading loading-spinner text-info"></span>
                        <span className="loading loading-spinner text-success"></span>
                        <span className="loading loading-spinner text-warning"></span>
                        <span className="loading loading-spinner text-error"></span>
                    </div>
                </div>
            </div>
        ) : null}

        <div className="flex">
            <div>
                <NewHistorySidebar
                    allHistory={state.allHistory}
                    splashPage={state.splashPage}
                    setChatId={setChatId}

                    setAiHistory={setAiHistory}
                    setUserHistory={setUserHistory}

                    showSplash={showSplash}
                    setShowSplash={setShowSplash}

                    isLoadingLock={isLoadingLock}
                />
            </div>
            <div>
                <NewChatCard
                    aiHistory={aiHistory}
                    userHistory={userHistory}
                    userInput={userInput}
                    aiResponse={aiResponse}
                    setUserInput={setUserInput}
                    connectWebSocket={connectWebSocket}
                    isGenerating={isGenerating}
                    userMsg={userMsg}
                    showSplash={showSplash}
                    setShowSplash={setShowSplash}
                    isLoadingLock={isLoadingLock}
                />
            </div>
        </div>

        </div>
    );
}

export default NewChatPage;