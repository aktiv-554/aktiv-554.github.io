import './EventDetailPage.css'
import { useParams } from 'react-router-dom'
import { useData } from '../../hooks/useData'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'
import { HiOutlineClock, HiOutlineUserGroup, HiOutlineOfficeBuilding, HiOutlineHand } from "react-icons/hi"
import BannerImage from '../../components/BannerImage/BannerImage'

const eventImages = import.meta.glob('../../assets/images/event/*', { eager: true, as: 'url' })

export default function EventDetailPage() {
  const { id } = useParams()
  const { getById } = useData()
  
  const [iframeVisibility, setIframeVisibility] = useState(false)

  const item = getById(id, 'event')

  if (!item) {
    return <h2>Мероприятие не найдено</h2>
  }

  const imgPath = `../../assets/images/event/${item.image}`
  const imgSource = eventImages[imgPath] || ''

  return (
    <div className='events-detail-page'>
      <BannerImage cat="event" item={item} imgSource={imgSource} />

      <div className="events-detail-wrapper">        
        
        <div className="events-detail-subtitle-block">
          {item.target && (
            <div className="events-detail-subtitle">
              <HiOutlineUserGroup/>
              <h2>{item.target}</h2>
            </div>
          )}
          {item.duration && (
            <div className="events-detail-subtitle">
              <HiOutlineClock/>
              <h2>{item.duration}</h2>
            </div>
          )}
          {item.location && (
            <div className="events-detail-subtitle">
              <HiOutlineOfficeBuilding/>
              <h2>{item.location}</h2>
            </div>
          )}
        </div>

        <div className="events-detail-button-block">
          <div className="center-block" onClick={() => setIframeVisibility(!iframeVisibility)}>
            <div className="events-detail-go-button">
              <h2>ЗАПИСАТЬСЯ</h2>
              <HiOutlineHand/>
            </div>
          </div>
          
          <div className="center-block">
            <iframe 
              className={`event-detail-iframe ${iframeVisibility ? '' : 'none'}`} 
              src={`${item.link}?iframe=1`} 
              frameBorder="0" 
              name={item.link?.replace('https://forms.yandex.ru/u/', 'ya-form-').replace('?iframe=1', '')}
            />
          </div>
        </div>
      </div>
        
      <ReactMarkdown>
        {item.textData}
      </ReactMarkdown>
    </div>
  )
}
