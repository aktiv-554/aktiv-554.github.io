import './NewsDetailPage.css'
import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext'
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import prettyDate from '../../utils/prettyData';
import { HiOutlineCalendar } from "react-icons/hi";
import Divider from '../../components/Divider/Divider';

export default function NewsDetailPage() {
  const { id } = useParams();
  const { getById, loading } = useData()
  const [item, setItem] = useState(null);
  const [imgSource, setImgSource] = useState(null);

  useEffect(() => {
    if (!loading) {
      const foundItem = getById(id);
      setItem(foundItem);
      setImgSource(new URL(
        `../../assets/images/news/${foundItem.image}`, 
        import.meta.url
      ).href)
    }
  }, [loading, id, getById]);

  if (loading || !item) {
    return <h2>Загрузка...</h2>;
  }
  else {
    return (
    <>
      {!loading && <div className='news-detail-page'>
        <div className="center-block">
          <img className='news-detail-image' src={imgSource} alt={item.image}/>
        </div>
        <div className="center-block">
          <h2 className="news-detail-title">{item.title}</h2>
        </div>
        {item.date && <div className="news-detail-subtitle-center-block">
          <div className="news-detail-subtitle">
            <HiOutlineCalendar/>
            <h2>{prettyDate(item.date)}{item.time ? (', ' + item.time) : ''}</h2>
          </div>
        </div>}

        <Divider/>
  
        <ReactMarkdown>
          {item.textData}
        </ReactMarkdown>
      </div>}
    </>
    )
  }
}