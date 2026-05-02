import { useData } from '../../context/DataContext'
import InfoBlock from "../../components/InfoBlock/InfoBlock"
import './NewsPage.css'
import { HiOutlineNewspaper } from "react-icons/hi";
import { HiOutlineArchive } from "react-icons/hi";
import prettyDate from '../../utils/prettyData';

export default function NewsPage() {
  const { hotNews, archiveNews, loading } = useData()
  
  return (
    <div className="news-page">
      <div className="news-page__news">
        <div className="news-page__news-title">
          <HiOutlineNewspaper/>
          <h2>СВЕЖИЕ НОВОСТИ</h2>
        </div>
        <div className="news-page__news-block">
          {
            hotNews.map(item => (
              <InfoBlock 
                key={item.id}
                blockId={item.id}
                imageId={item.image}
                infoType="news"
                date={prettyDate(item.date)}
                bgSize={item.bgSize}
                title={item.title}
              ></InfoBlock>
            ))
          }
        </div>
      </div>

      {archiveNews.lenght > 0 && <div className="news-page__news">
        <div className="news-page__news-title">
          <HiOutlineArchive />
          <h2>АРХИВ НОВОСТЕЙ</h2>
        </div>
        <div className="news-page__news-block">
          {
            archiveNews.map(item => (
              <InfoBlock 
                key={item.id}
                blockId={item.id}
                imageId={item.image}
                infoType="news"
                date={prettyDate(item.date)}
                bgSize={item.bgSize}
                title={item.title}
              ></InfoBlock>
            ))
          }
        </div>
      </div>}
    </div>
  )
}