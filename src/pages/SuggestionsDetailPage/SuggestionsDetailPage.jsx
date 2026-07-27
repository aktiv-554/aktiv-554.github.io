import './SuggestionsDetailPage.css'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useData } from '../../hooks/useData'
import { HiOutlineHand } from "react-icons/hi"
import ReactMarkdown from 'react-markdown';
import BannerImage from '../../components/BannerImage/BannerImage'
// import prettyDate from '../../utils/prettyData'

export default function SuggestionsDetailPage() {
  const { id } = useParams();
  const { getById, loading, activeSuggestions } = useData()
  const [item, setItem] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [imgSource, setImgSource] = useState(null);
  const [iframeVisibility, setIframeVisibility] = useState(false)

  useEffect(() => {
    if (!loading) {
      const foundItem = getById(id, 'sug');
      setItem(foundItem);
      setImgSource(new URL(
        `../../assets/images/suggestions/${foundItem.image}`, 
        import.meta.url
      ).href)

      activeSuggestions.forEach(i => {
        if (i.id == foundItem.id) {
          setIsActive(true)
        }
      })
    }
  }, [loading, id, getById]);

  if (loading || !item) {
    return <h2>Загрузка...</h2>;
  }
  else {
    return (
    <>
      {!loading && <div className='sug-detail-page'>

        {/* <div className="center-block">
          <img className='sug-detail-image' src={imgSource} alt={item.image}/>
        </div>
        <div className="center-block">
          <h2 className="sug-detail-title">{item.title}</h2>
        </div> */}

        <BannerImage cat="suggestions" item={item} />

        {
          isActive ? 
          <div>
            <div className="center-block" onClick={() => {setIframeVisibility(!iframeVisibility); console.log(activeSuggestions)}}>
              <div className="sug-detail-go-button">
                <h2>ГОЛОСОВАТЬ</h2>
                <HiOutlineHand/>
              </div>
            </div>
            <div className="center-block"><iframe className={`sug-detail-iframe ${iframeVisibility ? '' : 'none'}`} src={`${item.link}?iframe=1`} frameBorder="0" name={`${item.link}`.replace('https://forms.yandex.ru/u/', 'ya-form-').replace('?iframe=1', '')}></iframe></div>
          </div> : false
        }
        
        <ReactMarkdown>
          {item.textData}
        </ReactMarkdown>

      </div>}
    </>
    )
  }
}