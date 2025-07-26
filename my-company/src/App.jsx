import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./components/About"
import Contact from "./components/Contact"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Services from "./components/Services"

function App() {

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/services" element={<Services/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App


