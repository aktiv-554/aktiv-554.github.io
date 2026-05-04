import { createContext, useContext, useState, useEffect, useMemo } from 'react'
import newsData from '../store/news.json'
import eventsData from '../store/events.json'
import suggestionsData from '../store/suggestions.json'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [news, setNews] = useState([])
  const [events, setEvents] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setNews(newsData)
    setEvents(eventsData)
    setSuggestions(suggestionsData)
    setLoading(false)
  }, [])

  const closedSuggestions = useMemo(() => {
    const today = new Date();
    return suggestions
      .filter(item => {
        const isClosedStatus = item.status === 'closed' || item.status === 'done';
        const isExpired = item.date && new Date(item.date) < today;
        
        return isClosedStatus || isExpired;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [suggestions]);


  const activeSuggestions = useMemo(() => {
    const today = new Date();
    return suggestions
      .filter(item => {
        const isNotClosed = item.status !== 'closed' && item.status !== 'done';
        const isNotExpired = item.date ? new Date(item.date) >= today : true; 
        
        return isNotClosed && isNotExpired;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [suggestions]);


  const addSuggestion = (suggestion) => {
    const newSuggestion = {
      id: Date.now(),
      ...suggestion,
      date: new Date().toISOString(),
      status: 'new'
    }
    setSuggestions(prev => [newSuggestion, ...prev])
  }

  const updateSuggestion = (id, updates) => {
    setSuggestions(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ))
  }

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
      .filter(item => new Date(`${item.date}T${item.time}`) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [events])

  const pastEvents = useMemo(() => {
    const today = new Date()
    return events
      .filter(item => new Date(`${item.date}T${item.time}`) < today)
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
      ),
      suggestions: suggestions.filter(item =>
        item.title?.toLowerCase().includes(q) ||
        item.text?.toLowerCase().includes(q)
      )
    }
  }

  const getById = (id, type = 'news') => {
    let data
    if (type === 'news') {
      data = news
    }
    else if (type === 'event') {
      data = events
    }
    else if (type === 'sug') {
      data = suggestions
    }
    
    return data.find(item => item.id === id)
  }

  const getNewsByType = (type) => 
    news.filter(item => item.type === type)

  return (
    <DataContext.Provider value={{
      // Данные
      news,
      events,
      suggestions,
      loading,
      
      // Фильтрованные данные
      hotNews,
      archiveNews,
      upcomingEvents,
      pastEvents,
      closedSuggestions,
      activeSuggestions,
      
      // Функции
      searchAll,
      getById,
      getNewsByType,
      addSuggestion,
      updateSuggestion
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