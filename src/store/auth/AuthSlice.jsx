// imports for any of the of services
import AuthService from "./AuthService";
import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";

const initializeAuthToken = () => {
  const storedToken = localStorage.getItem("authToken");
  return storedToken ? { authToken: storedToken } : null;
}

const initialState = {
    user: {
        // authToken: null, 
        ...initializeAuthToken(),
        refreshToken: null, 
        isLoading: false,
        hasError: false,
        errorMessage: null,
        currentConversationId: null,
        email: null,
        currentConversation: [],
        prevConversations: [],
        currentUserMessages: [],
        currentBotMessages: [],
    }
}

// calls to the services with asyncThunk get pieces of the state
export const authenticate = createAsyncThunk(
    // Action type string - unique for each function
    'auth/authenticate',
    // The payload creator receives the partial `{title, content, user}` object
    async ({ email, password}, thunkAPI) => {
        try {
            const response = await AuthService.authenticate(email, password);
            localStorage.setItem('authToken', response.jwt);
            return await AuthService.authenticate(email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    },
);

// calls to the services with asyncThunk get pieces of the state
export const register = createAsyncThunk(
    // Action type string - unique for each function
    'auth/register',
    // The payload creator receives the partial `{title, content, user}` object
    async ({ email, password }, thunkAPI) => {
        try {
            return await AuthService.register(email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// calls to the services with asyncThunk get pieces of the state
export const getConversationHistory = createAsyncThunk(
    // Action type string - unique for each function
    'auth/getConversations',
    // The payload creator receives the partial `{title, content, user}` object
    async ({ authToken }, thunkAPI) => {
        try {
            return await AuthService.GetAllConversations(authToken);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    }
);

// TODO: extraReducers for the builder cases
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        reset: (state) => {
            state.user = initialState.user;
        },
        setCurrentConversation(state, action) {
            console.log('Conversation payload: ', action.payload);
            state.user.currentConversation = action.payload;
            console.log('Current State Conversation: ', state.user.currentConversation);
        },
        setCurrentConversationId(state, action) {
            state.user.currentConversationId = action.payload;
            state.user.currentUserMessages = [];
            state.user.currentBotMessages = [];
            console.log('Current conversaton ID: ', state.user.currentConversationId);
        },
        updatePrevConversations(state, action) {
            state.user.prevConversations = action.payload;
            console.log('Updated prev conversations: ', state.user.prevConversations);
        },
        setUserEmail(state, action) {
            state.user.email = action.payload;
            console.log('State user email: ', state.user.email);
        },
        addUserMessage(state, action) {
            console.log('User message being added: ', action.payload);
            state.user.currentUserMessages.push(action.payload);
        },
        addBotMessage(state, action) {
            state.user.currentBotMessages.push(action.payload);
        }
    },
    extraReducers : (builder) => {
        // case for the authenticate pending
        builder.addCase(authenticate.pending, (state) => {
            state.user.isLoading = true;
        });

        // case for the authenticate succeeding
        builder.addCase(authenticate.fulfilled, (state, action) => {
            console.log('Auth response: ', action.payload);
            state.user.isLoading = false;
            state.user.authToken = action.payload.jwt;
            console.log('Auth token: ', state.user.authToken);
        });

        // case for the authenticate failing
        builder.addCase(authenticate.rejected, (state) => {
            state.user.isLoading = false;
            state.user.hasError = true;
            state.user.errorMessage = 'Error authenticating';
        });

        // case for the register pending
        builder.addCase(register.pending, (state) => {
            state.user.isLoading = true;
        });

        // case for the register succeeding
        builder.addCase(register.fulfilled, (state, action) => {
            console.log('Register response: ', action.payload);
            state.user.isLoading = false;
        });

        // case for the register failing
        builder.addCase(register.rejected, (state) => {
            state.user.isLoading = false;
            state.user.hasError = true;
            state.user.errorMessage = 'Error registering';
        });

        // case for the getConversations pending
        builder.addCase(getConversationHistory.pending, (state) => {
            state.user.isLoading = true;
        });

        // case for the getConversations succeeding
        builder.addCase(getConversationHistory.fulfilled, (state, action) => {
            console.log('Conversations response: ', action.payload);
            state.user.isLoading = false;
            state.user.prevConversations = action.payload;
        });

        // case for the getConversations failing
        builder.addCase(getConversationHistory.rejected, (state) => {
            state.user.isLoading = false;
            state.user.hasError = true;
            state.user.errorMessage = 'Error getting conversations';
        });
    }
})


// TODO: exports for the additional reducers

export const { 
    reset, 
    setCurrentConversation, 
    setCurrentConversationId,
    updatePrevConversations,
    setUserEmail,
    addUserMessage, 
    addBotMessage,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors to retreive data from the state
export const selectCurrentAuthToken = (state) => state.auth.user.authToken;
export const selectPrevConversations = (state) => state.auth.user.prevConversations;
export const selectCurrentUserMessages = (state) => state.auth.user.currentUserMessages;
export const selectCurrentBotMessages = (state) => state.auth.user.currentBotMessages;
export const selectCurrentConversation = (state) => state.auth.user.currentConversation;
export const selectCurrentConversationID = (state) => state.auth.user.currentConversationId;
export const selectUserEmail = (state) => state.auth.user.email;

export const selectMessagesFromConversation = (conversationId) => 
  createSelector([selectPrevConversations], (prevConversations) => {
    const conversation = prevConversations.find(
        (conv) => conv.id === conversationId
    );
    console.log('Current conversation: ', conversation);
    return conversation ? conversation.history : [];
});

