import './NewsDetailPage.css'
import { useParams } from 'react-router-dom';
import { useData } from '../../hooks/useData'
import ReactMarkdown from 'react-markdown';
import { useEffect, useState } from 'react';
// import prettyDate from '../../utils/prettyData';
// import { HiOutlineCalendar } from "react-icons/hi";
// import Divider from '../../components/Divider/Divider';
import BannerImage from '../../components/BannerImage/BannerImage';

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
        <BannerImage cat="news" item={item} />

        <div className="news-detail-markdown-margin"></div>

        <ReactMarkdown>
          {item.textData}
        </ReactMarkdown>
      </div>}
    </>
    )
  }
}