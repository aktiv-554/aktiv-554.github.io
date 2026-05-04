import { useParams } from 'react-router-dom';
import { useData } from '../../context/DataContext'
import ReactMarkdown from 'react-markdown';
import './SuggestionsDetailPage.css'
import { useEffect, useState } from 'react';

export default function SuggestionsDetailPage() {
  const { id } = useParams();
  const { getById, loading } = useData()
  const [item, setItem] = useState(null);
  const [imgSource, setImgSource] = useState(null);

  useEffect(() => {
    if (!loading) {
      const foundItem = getById(id, 'sug');
      setItem(foundItem);
      setImgSource(new URL(
        `../../assets/images/suggestions/${foundItem.image}`, 
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
      {!loading && <div className='sug-detail-page'>
        <div className="center-block">
          <img className='sug-detail-image' src={imgSource} alt={item.image}/>
        </div>
        <div className="center-block">
          <h2 className="sug-detail-title">{item.title}</h2>
        </div>
        
        <ReactMarkdown>
          {item.textData}
        </ReactMarkdown>

        <iframe className='sug-iframe' src={`${item.link}?iframe=1`} frameborder="0" name={`${item.link}`.replace('https://forms.yandex.ru/u/', 'ya-form-').replace('?iframe=1', '')}></iframe>
      </div>}
    </>
    )
  }
}