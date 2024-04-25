import React from "react";

function MessageBubble() {
  return (
    <div className="flex flex-col max-w-[300px] md:max-w-[500px] lg:max-w-[700px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <div className="flex items-center space-x-2 rtl:space-x-reverse">
         <span className="text-sm font-semibold text-gray-900 dark:text-white">Capgemin.AI</span>
         <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
      </div>
      <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
  );
}

export default MessageBubble;
