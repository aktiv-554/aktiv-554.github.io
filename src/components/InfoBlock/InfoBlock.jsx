import './InfoBlock.css'
import { NavLink } from 'react-router-dom'

export default function InfoBlock({
  blockId = '',
  infoType = 'news',
  imageId = '',
  title = 'Нет названия',
  date = '01.01.2000',
  time = '',
  location = '',
  bgSize = 'cover',
}) {
  const img_source = new URL(
    `../../assets/images/${infoType}/${imageId}`, 
    import.meta.url
  ).href;

  return (
    <NavLink 
      className="info-block"
      to={`/${infoType}/${blockId}`}
      style={{textDecoration: 'none'}}
    >
      <div className={`info-block__image-block ${infoType == 'event' ? 'event' : ''}`}>
        <div className="info-block__image" style={{
          background: `url(${img_source})`,
          backgroundPosition: 'center',
          backgroundSize: bgSize,
          backgroundRepeat: 'no-repeat',
        }}></div>
      </div>

      <h2 className="info-block__title">{title}</h2>
      <p className="info-block__date">{date}{time ? `, ${time}` : ''} {location ? ` • ${location}` : ''}</p>
    </NavLink>
  )
}