import './SovetLogo.css'
import { useLocation } from 'react-router-dom'

export default function SovetLogo({ withText = false }) {
  const location = useLocation()
  const titles = {
    '/news': 'НОВОСТИ',
    '/event': 'АФИША',
    '/suggestions': 'ИДЕИ',
    '/about': 'О НАС',
  }

  const currentTitle = titles[location.pathname] || 'АКТИВ'

  return (
    <div className='sovet-logo'>
      <div className="sovet-logo__image"></div>
      {withText && <h2 className="sovet-logo__text">{currentTitle}</h2>}
    </div>
  )
}