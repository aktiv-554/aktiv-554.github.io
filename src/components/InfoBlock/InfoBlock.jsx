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
  archived = false,
  isVotingActive = false,
}) {
  const img_source = new URL(
    `../../assets/images/${infoType}/${imageId}`, 
    import.meta.url
  ).href

  return (
    <NavLink 
      className="info-block"
      to={`/${infoType}/${blockId}`}
      style={{textDecoration: 'none'}}
    >
      <div className={`info-block__image-block ${infoType == 'event' ? 'event' : ''}`}>
        <div className={`info-block__image ${archived ? "archived" : ""}`} style={{
          background: `url(${img_source})`,
          backgroundPosition: 'center',
          backgroundSize: `${bgSize == 'contain' ? 'auto 95%' : bgSize}`,
          backgroundRepeat: 'no-repeat'
        }}></div>
      </div>

      <h2 className={`info-block__title ${archived ? "archived" : ""}`}>{title}</h2>
      <p className='info-block__block'>
        <span className="info-block__date">{date}{time ? `, ${time}` : ''} {(location && date) ? ` • ` : ''}{location ? location : ''}</span>
        {
          infoType == 'suggestions' ?
          <span className={`info-block__votingActivity ${isVotingActive ? 'votingActive' : 'votingNotActive'}`}>
            {isVotingActive ? ` • Активно` : ` • Закрыто`}
          </span>
          : false
        }
      </p>
      {/* <p className="info-block__date">{date}{location ? `, ${location}` : ''} {time ? ` • ${time}` : ''}</p> */}
    </NavLink>
  )
}