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

// method to register a new user with a given email and password
const register = async (email, password) => {
  try {
    console.log('Register request: ', email, password);

    // create the request body
    const requestBody = JSON.stringify({
      email: email,
      password_hash: password,
    });

    // get the response from the call
    const response = await axios.post(
      `${baseUrl}auth/register`,
      requestBody,
      { headers: { 'Content-Type': 'application/json' } }
    );

    // log the response
    console.log('Register response: ', response.data);

    // return the response
    return response.data;

  } catch (error) {
    console.log('Register error: ', error.response.data);
  }
}

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

// get all documents method
const getAllDocuments = async (authToken) => {
  try {
    console.log('GetDocuments request: ', authToken);

    const response = await axios.get(
      `${baseUrl}get_all_documents`,
      {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
      }
    );

    console.log('Get Documents response: ', response);
    return response.data;
  } catch (error) {
    console.log('GetDocuments error: ', error.response.data);
  }
};

// export the methods
const AuthService = {
    authenticate,
    register,
    GetAllConversations,
    getAllDocuments,
};

export default AuthService;