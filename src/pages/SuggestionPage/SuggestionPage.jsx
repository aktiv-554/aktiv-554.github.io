import InfoBlock from "../../components/InfoBlock/InfoBlock"
import './SuggestionPage.css'
import { HiOutlineArchive } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import SwipeSlide from "../../components/SwipeSlide/SwipeSlide";
import { useData } from '../../context/DataContext'
import prettyDate from '../../utils/prettyData';

export default function SuggestionPage() {
  const sugLink = 'https://forms.yandex.ru/u/69f8c3ca95add5a2ed2c7ae9'
  const { activeSuggestions, closedSuggestions, loading } = useData()
  return (
    <div className="suggestion-page">
      
      <iframe className='sug-page-iframe' src={`${sugLink}?iframe=1`} frameBorder="0" name={`${sugLink}`.replace('https://forms.yandex.ru/u/', 'ya-form-').replace('?iframe=1', '')}></iframe>

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
                date={'До ' + prettyDate(item.date)}
                bgSize={item.bgSize}
                title={item.title}
              />
            ))
          }
        </div>
      </div>}

      {!loading && closedSuggestions.length > 0 && <div className="suggestion-page__sug">
        <div className="suggestion-page__sug-title">
          <HiOutlineArchive/>
          <h2>АРХИВ</h2>
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
                location="Закрыто"
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