import axios from 'axios';

// baseUrl for the calls
const baseUrl = 'https://columbiateam1backend.azurewebsites.net/';

// methods to authenticate and get the user information
const authenticate = async (email, password) => {
  try {

    // log the email and password
    console.log('Login request: ', email, password);

    // create the request body
    const requestBody = JSON.stringify({
        email: email,
        password_hash: password,
    });
    
    // get the response from the call
    const response = await axios.post(
        `${baseUrl}auth/login`,
        requestBody,
        { headers: { 'Content-Type': 'application/json' } }
    );

    console.log('Login response: ', response.data);

    return response.data;

  } catch (error)   {
    console.log('Login error: ', error.response.data);
  }
};

// API call to get the previous conversations
const GetAllConversations = async (authToken) => {
  try {
    console.log('GetConversations request: ', authToken);

    // header including the auth token
    // const headers = {
    //     'Authorization': `Bearer ${authToken}`
    // }

    // get the response from the call
    const response = await axios.get(
        `${baseUrl}all_chat_history`,
        // { headers: headers }
        {
            headers: {
              'Authorization': `Bearer ${authToken}`
            }
        }
    );

    console.log('Get Conversations response: ', response);

    console.log('Chat History: ', response.data.chat_history);
    return response.data.chat_history;
  } catch (error) {
    console.log('GetConversations error: ', error.response.data);
  }
};

const AuthService = {
    authenticate,
    GetAllConversations
};

export default AuthService;