import React, {
    useState,
    
} from 'react'
import SideBarNav from '../components/SideBarNav'



function HomePage() {

  const [chatOpen, setChatOpen] = useState(true);

  const chatToggle = () => {
    setChatOpen(!chatOpen);
  }

  return (
    <>
    </>
  )
}

export default HomePage