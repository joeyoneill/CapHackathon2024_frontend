import React, {
    useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentConversation } from '../store/auth/AuthSlice';

function ChatButton({ title, conversationHistory }) {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    console.log('click click');
    setLoading(true);
    dispatch(setCurrentConversation(conversationHistory));
    setLoading(false);
  }

  return (
    <div
      onClick={handleClick} 
      className='flex flex-col justify-center bg-slate-200  rounded-md w-full h-10'>
        <p className='ml-2 font-semibold'>{title}</p>
    </div>
  )
}

export default ChatButton