import './EventDetailPage.css'
import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext'
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
import Divider from '../../components/Divider/Divider';
import { HiOutlineClock } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";


export default function EventDetailPage() {
  const { id } = useParams();
  const { getById, loading } = useData()
  const [item, setItem] = useState(null);
  const [imgSource, setImgSource] = useState(null);

  useEffect(() => {
    if (!loading) {
      const foundItem = getById(id, 'event');
      setItem(foundItem);
      setImgSource(new URL(
        `../../assets/images/event/${foundItem.image}`, 
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
      {!loading && <div className='events-detail-page'>
        <div className="center-block">
          <h2 className="events-detail-title">{item.title}</h2>
        </div>

        <div className="events-detail-subtitle">
          <HiOutlineUserGroup/>
          <h2>{item.target}</h2>
        </div>
        <div className="events-detail-subtitle">
          <HiOutlineClock/>
          <h2>{item.duration}</h2>
        </div>
        <div className="events-detail-subtitle">
          <HiOutlineOfficeBuilding/>
          <h2>{item.location}</h2>
        </div>
        
        <div className="center-block">
          <img className='events-detail-image' src={imgSource} alt={item.image}/>
        </div>

        <ReactMarkdown>
          {item.textData}
        </ReactMarkdown>
      </div>}
    </>
    )
  }
}