import { Link, useNavigate, redirect } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticate,
  getConversationHistory,
  setUserEmail,
} from "../store/auth/AuthSlice";
import { selectCurrentAuthToken } from "../store/auth/AuthSlice";
import Loader from "../components/Loader";
import CapLogo from "../assets/CapLogo.png";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectCurrentAuthToken);

  // state for the email and password fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [error, setError] = useState(false);
  // const [token, setToken] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  // method to call the authenticate method in the AuthService
  const logUserIn = async () => {
    try {
      // setIsLoading(true);
      // await dispatch(authenticate({ email: email, password: password }));
      // setIsLoading(false);
      // navigate("/Chat");
      setError(false);
      setIsLoading(true);
      const result = await dispatch(
        authenticate({ email: email, password: password })
      );

      // check if the authentication was successful
      if (result.payload && result.payload.status === 200) {
        setIsLoading(false);
        dispatch(setUserEmail(email));
        navigate("/NewChat");
      } else {
        setIsLoading(false);
        setError(true);
        setUserLoggedIn(false);
        console.log(
          "Authentication failed : Login Page ",
          result.payload.message
        );
      }
    } catch (error) {
      console.log("Error logging in: ", error);
      setUserLoggedIn(false);
      setRedirectToHome(false);
    }
  };

  // method to navigate to the register page
  const registerUser = async () => {
    navigate("/Register");
  };

  return (
    <>
      {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-22 w-auto mt-20"
            src={CapLogo}
            alt="Your Company"
          />
          <h2 className="mt-4 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <form className="space-y-6"> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-capVibrantBlue sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="text-sm">
                <a className="font-semibold text-capBlue hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-capVibrantBlue sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              onClick={logUserIn}
              className="flex w-full mt-4 justify-center rounded-md bg-capVibrantBlue hover:bg-capVibrantBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
            {error && (
              <p className="text-red-500 mt-2 text-sm text-center">
                Login failed. Please check your email and password.
              </p>
            )}
            <div className="text-sm flex justify-center mt-5">
              <a
                onClick={registerUser}
                className="font-semibold text-capBlue hover:text-indigo-500"
              >
                Create an Account
              </a>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center mt-5">
              <Loader />
            </div>
          ) : null}
          {/* </form> */}
        </div>
      </div>
    </>
  );
}
