import { useState } from 'react'
import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import Header from './components/Header'
import Footer from './components/Footer'
import MainContent from './components/MainContent'

import Counter from './components/Counter'
import UserContext from './components/UserContext' 
import ProfilePage from './components/UserProfile'

function App() {
  const [count, setCount] = useState(0)
  const userData = { name: "Jane Doe", email: "jane.doe@example.com" };

  return (
    <>
      <WelcomeMessage />
      <Header />
      <MainContent />
      
      
      {/* ✅ Provide user data to context */}
      <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
      
      <Footer />
      <Counter />
    </>
  )
}

export default App
