import { useEffect } from 'react'
import { HiOutlineCalendar } from "react-icons/hi"
import { HiOutlineLightningBolt } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi"
import { HiOutlineOfficeBuilding } from "react-icons/hi"
import prettyDate from '../../utils/prettyData'
import './BannerImage.css'

export default function BannerImage({
    cat = 'news',
    item = {},
  }) {

  const imgSource = new URL(
    `../../assets/images/${cat}/${item.image}`, 
    import.meta.url
  ).href

  return(
    <div className="banner-image-comp">
      <div className="banner-image-comp-bg" 
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${imgSource})`,
        backgroundSize: item.bgSize,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}>
        <h2 className="banner-image-comp-title">{item.title}</h2>
        <div className="banner-image-comp-info-block">
          {item.date && <div className="banner-image-comp-info-item">
            { 
              cat == 'suggestions' ?
                <HiOutlineLightningBolt/>
                :
                <HiOutlineCalendar/>
            }
            <h2>{cat == 'suggestions' ? `${item.timeLimit ? `До ${prettyDate(item.date)}` : 'Без даты окончания'}` : prettyDate(item.date)}{item.time ? (', ' + item.time) : ''}</h2>
          </div>}
          {/* {item.target && <div className="banner-image-comp-info-item">
            <HiOutlineUserGroup/>
            <h2>{item.target}</h2>
          </div>}
          {item.duration && <div className="banner-image-comp-info-item">
            <HiOutlineClock/>
            <h2>{item.duration}</h2>
          </div>}
          {item.location && <div className="banner-image-comp-info-item">
            <HiOutlineOfficeBuilding/>
            <h2>{item.location}</h2>
          </div>} */}
        </div>
      </div>
    </div>
  )
}