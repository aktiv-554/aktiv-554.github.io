import InfoBlock from "../../components/InfoBlock/InfoBlock"
import { useState } from "react";
import './SuggestionPage.css'
// import { HiOutlineHand } from "react-icons/hi"
import { HiOutlineArchive } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";
// import SwipeSlide from "../../components/SwipeSlide/SwipeSlide";
import { useData } from '../../hooks/useData'
import prettyDate from '../../utils/prettyData';

export default function SuggestionPage() {
  const sugLink = 'https://forms.yandex.ru/u/69f8c3ca95add5a2ed2c7ae9'
  const { activeSuggestions, closedSuggestions, loading } = useData()
  const [iframeVisibility, setIframeVisibility] = useState(false)
  
  return (
    <div className="suggestion-page">

      <div className="sug-page-go-button-block">
        <div className="center-block" onClick={() => {setIframeVisibility(!iframeVisibility)}}>
          <div className="sug-page-go-button">
            <h2>Предложить...</h2>
            <HiOutlineLightBulb/>
          </div>
        </div>
        <div className="center-block"><iframe className={`sug-page-iframe ${iframeVisibility ? '' : 'none'}`} src={`${sugLink}?iframe=1`} frameBorder="0" name={`${sugLink}`.replace('https://forms.yandex.ru/u/', 'ya-form-').replace('?iframe=1', '')}></iframe></div>
      </div>

      {!loading && activeSuggestions.length > 0 && <div className="suggestion-page__sug">
        {/* <div className="suggestion-page__sug-title">
          <HiOutlineLightningBolt/>
          <h2>ГОЛОСОВАНИЯ</h2>
        </div> */}
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

          {
            closedSuggestions.map(item => (
              <InfoBlock 
                key={item.id}
                blockId={item.id}
                imageId={item.image}
                infoType="suggestions"
                date={'До ' + prettyDate(item.date)}
                location=""
                bgSize={item.bgSize}
                title={item.title}
                archived={true}
                isVotingActive={false}
              />
            ))
          }
        </div>
      </div>}

      {/* {!loading && closedSuggestions.length > 0 && <div className="suggestion-page__sug">
        <div className="suggestion-page__sug-title">
          <HiOutlineArchive/>
          <h2>ЗАКРЫТЫЕ</h2>
        </div>
        <div className="suggestion-page__sug-block">
          {
            closedSuggestions.map(item => (
              <InfoBlock 
                key={item.id}
                blockId={item.id}
                imageId={item.image}
                infoType="suggestions"
                date={'До ' + prettyDate(item.date)}
                location=""
                bgSize={item.bgSize}
                title={item.title}
                archived={true}
                isVotingActive={false}
              />
            ))
          }
        </div>
      </div>} */}
    </div>
  )
}