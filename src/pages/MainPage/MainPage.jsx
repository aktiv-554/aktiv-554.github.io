import InfoBlock from "../../components/InfoBlock/InfoBlock"
import './MainPage.css'
import { HiOutlineGlobe } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import SwipeSlide from "../../components/SwipeSlide/SwipeSlide";
import { useData } from '../../context/DataContext'
import prettyDate from '../../utils/prettyData';

export default function MainPage() {
  const { activeSuggestions, loading } = useData()
  return (
    <div className="main-page">
      
      <SwipeSlide />
      
      {!loading && <div className="main-page__events">
        <div className="main-page__events-title">
          <HiOutlineLightningBolt/>
          <h2>ГОЛОСОВАНИЯ</h2>
        </div>
        <div className="main-page__events-block">
          {
            activeSuggestions.map(item => (
              <InfoBlock 
                key={item.id}
                blockId={item.id}
                imageId={item.image}
                infoType="suggestions"
                date={'До ' + prettyDate(item.date)}
                bgSize={item.bgSize}
                title={item.title}
              />
            ))
          }
        </div>
      </div>}

      
    </div>
  )
}