// imports for any of the of services
import AuthService from "./AuthService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {
    user: {
        authToken: null, 
        refreshToken: null, 
        isLoading: false,
        hasError: false,
        errorMessage: null,
        prevConversations: [],
    }
}

// calls to the services with asyncThunk get pieces of the state
export const authenticate = createAsyncThunk(
    // Action type string - unique for each function
    'auth/authenticate',
    // The payload creator receives the partial `{title, content, user}` object
    async ({ email, password}, thunkAPI) => {
        try {
            return await AuthService.authenticate(email, password);
        } catch (error) {
            return thunkAPI.rejectWithValue({ error: error.message });
        }
    },
);

export const getConversationHistory = createAsyncThunk(
    'auth/getConversations',
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
export default authSlice.reducer;

// Selectors to retreive data from the state
export const selectCurrentAuthToken = (state) => state.auth.user.authToken;
export const selectPrevConversations = (state) => state.auth.user.prevConversations;

