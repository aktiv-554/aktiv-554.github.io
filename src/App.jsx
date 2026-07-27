import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import SovetLogo from './components/SovetLogo/SovetLogo'
import MainPage from './pages/MainPage/MainPage'
import NewsPage from './pages/NewsPage/NewsPage'
import AboutPage from './pages/AboutPage/AboutPage'
import EventsPage from './pages/EventsPage/EventsPage'
import SuggestionPage from './pages/SuggestionPage/SuggestionPage'
import MainLayout from './layouts/MainLayout/MainLayout'
import NewsDetailPage from './pages/NewsDetailPage/NewsDetailPage'
import EventDetailPage from './pages/EventDetailPage/EventDetailPage'
import SuggestionsDetailPage from './pages/SuggestionsDetailPage/SuggestionsDetailPage'

function App() {
  const [count, setCount] = useState(0)
  const location = useLocation()
  
  useEffect(() => {
    const calculateScrollbarWidth = () => {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.documentElement.style.setProperty('--sw', `${scrollbarWidth}px`)
    }

    setTimeout(() => {
      calculateScrollbarWidth()
    }, 50)

    window.addEventListener('resize', calculateScrollbarWidth)

    return () => {
      window.removeEventListener('resize', calculateScrollbarWidth)
    }

  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="news/:id" element={<NewsDetailPage />} /> 
        <Route path="suggestions" element={<SuggestionPage />} />
        <Route path="suggestions/:id" element={<SuggestionsDetailPage />} /> 
        <Route path="event" element={<EventsPage />} />
        <Route path="event/:id" element={<EventDetailPage />} /> 
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}

export default App
