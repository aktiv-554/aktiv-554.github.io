import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import newsData from '../store/news.json'
import eventsData from '../store/events.json'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setNews(newsData)
    setEvents(eventsData)
    setLoading(false)
  }, [])

  const hotNews = useMemo(() => {
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    
    return news
      .filter(item => new Date(item.date) > monthAgo)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [news])

  const archiveNews = useMemo(() => {
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    
    return news
      .filter(item => new Date(item.date) <= monthAgo)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [news])

  const upcomingEvents = useMemo(() => {
    const today = new Date()
    return events
      .filter(item => new Date(item.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [events])

  const pastEvents = useMemo(() => {
    const today = new Date()
    return events
      .filter(item => new Date(item.date) < today)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }, [events])

  const searchAll = (query) => {
    const q = query.toLowerCase()
    return {
      news: news.filter(item => 
        item.title.toLowerCase().includes(q) ||
        item.text.toLowerCase().includes(q)
      ),
      events: events.filter(item =>
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      )
    }
  }

  const getById = (id, type = 'news') => {
    const data = type === 'event' ? events : news
    return data.find(item => item.id === id)
  }

  const getNewsByType = (type) => 
    news.filter(item => item.type === type)

  return (
    <DataContext.Provider value={{
      // Данные
      news,
      events,
      loading,
      
      // Фильтрованные данные
      hotNews,
      archiveNews,
      upcomingEvents,
      pastEvents,
      
      // Функции
      searchAll,
      getById,
      getNewsByType
    }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('error')
  }
  return context
}