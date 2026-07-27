import InfoBlock from "../../components/InfoBlock/InfoBlock"
import './MainPage.css'
// import { HiOutlineGlobe } from "react-icons/hi";
// import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";
// import { HiOutlineInformationCircle } from "react-icons/hi";
import { HiOutlineExclamation } from "react-icons/hi";

import SwipeSlide from "../../components/SwipeSlide/SwipeSlide";
import { useData } from '../../hooks/useData'
import prettyDate from '../../utils/prettyData';

export default function MainPage() {
  const { activeSuggestions, loading } = useData()
  return (
    <div className="main-page">
      
      <SwipeSlide />

      <div className="marg"></div>
      
      {!loading && activeSuggestions.length > 0 && <div className="suggestion-page__sug">
        <div className="suggestion-page__sug-title">
          <HiOutlineLightningBolt/>
          <h2>ГОЛОСОВАНИЯ</h2>
        </div>
        <div className="suggestion-page__sug-block">
          {
            activeSuggestions.map(item => (
              <InfoBlock 
                key={item.id}
                blockId={item.id}
                imageId={item.image}
                infoType="suggestions"
                date={item.timeLimit ? `До ${prettyDate(item.date)}` : "Нет даты окончания"}
                location=""
                bgSize={item.bgSize}
                title={item.title}
                isVotingActive={true}
              />
            ))
          }
        </div>
      </div>}

      <div className="center-block">
        <div className="main-page-info-block">
          <HiOutlineExclamation/>
          <h2 className="main-page-info">Данный сайт не является оффициальным сайтом Лицея.</h2>
        </div>
      </div>
    </div>
  )
}