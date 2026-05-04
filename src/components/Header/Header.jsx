import './Header.css'
import { useState, useEffect, useRef } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import SovetLogo from '../SovetLogo/SovetLogo'
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineNewspaper } from "react-icons/hi";
import { HiNewspaper } from "react-icons/hi";
import { HiOutlineGlobe } from "react-icons/hi";
import { HiGlobe } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiLightBulb } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";
import { HiInformationCircle } from "react-icons/hi";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeNow, setActiveNow] = useState('')
  const location = useLocation()
  const historyPushed = useRef(false)

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  useEffect(() => {
    if (isOpen && !historyPushed.current) {
      window.history.pushState({ menuOpen: true }, '', window.location.href)
      historyPushed.current = true
    }

    if (!isOpen && historyPushed.current) {
      historyPushed.current = false
    }
  }, [isOpen])

  useEffect(() => {
    const handlePopState = (e) => {
      if (historyPushed.current) {
        setIsOpen(false)
        historyPushed.current = false
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

 useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'
    document.body.style.overscrollBehavior = 'none'
  } else {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
    document.body.style.overscrollBehavior = ''
  }
  
  return () => {
    document.body.style.overflow = ''
    document.body.style.touchAction = ''
    document.body.style.overscrollBehavior = ''
  }
}, [isOpen])



  const menuItems = [
    { path: '/news', label: 'Новости', id: 'news' },
    { path: '/event', label: 'Мероприятия', id: 'events' },
    { path: '/suggestions', label: 'Предложения', id: 'suggestions' },
    { path: '/about', label: 'О нас', id: 'about' },
  ]

  return (
    <header className="header">
      <div className="header-container">

        <NavLink to="/" className="logo" draggable={false}>
          <SovetLogo withText={true}></SovetLogo>
        </NavLink>

        <HiOutlineMenu 
          className={`burger ${isOpen ? 'burger-active' : ''}`}
          onClick={() => setIsOpen(!isOpen)}
        />

        <div 
          className={`overlay ${isOpen ? 'overlay-visible' : ''}`}
          onClick={() => setIsOpen(false)}
        />

        <nav className={`nav ${isOpen ? 'nav-open' : ''}`}>
          {menuItems.map(item => (
            <NavLink
              draggable={false}
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `nav-link ${isActive ? 'active' : ''}`
              }
              onClick={() => {
                setIsOpen(false)
                // setActiveNow(item.id)
              }}
            >
              <div className="nav-icon">
                {
                  item.id == 'news' && item.id == activeNow ?
                  <HiNewspaper></HiNewspaper>
                  : false
                }
                {
                  item.id == 'news' && item.id !== activeNow ?
                  <HiOutlineNewspaper></HiOutlineNewspaper>
                  : false
                }

                
                {
                  item.id == 'events' && item.id == activeNow ?
                  <HiGlobe></HiGlobe>
                  : false
                }
                {
                  item.id == 'events' && item.id !== activeNow ?
                  <HiOutlineGlobe></HiOutlineGlobe>
                  : false
                }


                {
                  item.id == 'suggestions' && item.id == activeNow ?
                  <HiLightBulb></HiLightBulb>
                  : false
                }
                {
                  item.id == 'suggestions' && item.id !== activeNow ?
                  <HiOutlineLightBulb></HiOutlineLightBulb>
                  : false
                }


                {
                  item.id == 'about' && item.id == activeNow ?
                  <HiInformationCircle></HiInformationCircle>
                  : false
                }
                {
                  item.id == 'about' && item.id !== activeNow ?
                  <HiOutlineInformationCircle></HiOutlineInformationCircle>
                  : false
                }
              </div>
              <p>{item.label}</p>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}