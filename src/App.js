import React from 'react'
import {BrowserRouter as Router,Route, Routes} from 'react-router-dom'
import Alerts from './components/layout/Alerts'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import User from './components/layout/User'
import About from './pages/About'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import { AlertProvider } from './context/alert/AlertContext'
import { GithubProvider } from './context/github/GithubContext'

const App = () => {
  return (
    <GithubProvider>
      <AlertProvider>
        <Router>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />
            <main className="container px-3 pb-12 mx-auto">
              <Alerts />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </Router>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App
 