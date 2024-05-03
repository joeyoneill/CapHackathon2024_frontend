// imports
import { useState, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { selectCurrentAuthToken } from "../store/auth/AuthSlice";
import {v4 as uuidv4} from "uuid";

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
    const apiHostUrl = "https://columbiateam1backend.azurewebsites.net";
    //const apiHostUrl = "http://localhost:8000";

    // Initialize Reducer
    const [state, dispatch] = useReducer(reducer, initialState);

    // State Variables
    const [token, setToken] = useState(useSelector(selectCurrentAuthToken));
    const [chatId, setChatId] = useState(null);
    const [isIntialLoading, setIsIntialLoading] = useState(false);
    const [aiHistory, setAiHistory] = useState([]);
    const [userHistory, setUserHistory] = useState([]);

    // Initial Get of Variables
    useEffect(() => {
        console.log(token);
        // Fetchs all initial data
        const fetchData = async () => {
            // Set Splash Page to True
            dispatch({ type: setShowSplashPage, payload: true });
            
            // Loading of Page
            setIsIntialLoading(true);

            // Set new ChatId
            const uuid = uuidv4()
            setChatId(uuid);
            
            // Try to Get Data from APIs
            try {
                // Fetch History
                const response = await fetch(apiHostUrl + '/all_chat_history', {
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

    // return JSX
    return (
        <div className="flex">
            <div>
                <NewHistorySidebar
                    allHistory={state.allHistory}
                    splashPage={state.splashPage}
                    setChatId={setChatId}

                    setAiHistory={setAiHistory}
                    setUserHistory={setUserHistory}
                />
            </div>
            <div>
                <NewChatCard
                    aiHistory={aiHistory}
                    userHistory={userHistory}
                />
            </div>
        </div>
    );
}

export default NewChatPage;