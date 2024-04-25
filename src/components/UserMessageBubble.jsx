import React from 'react'

function UserMessageBubble() {
  return (
    <div class="flex flex-col max-w-[300px] md:max-w-[500px] lg:max-w-[700px] ml-auto leading-1.5 p-4 border-gray-200 bg-blue-500 rounded-tr-none rounded-l-xl rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-white dark:text-white">Bonnie Green</span>
         <span class="text-sm font-normal text-white dark:text-gray-400">11:46</span>
      </div>
      <p class="text-sm font-normal py-2.5 text-white dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
      <span class="text-sm font-normal text-white dark:text-gray-400">Delivered</span>
    </div>
  )
}

export default UserMessageBubble