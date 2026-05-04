import { useData } from '../../context/DataContext'
import InfoBlock from "../../components/InfoBlock/InfoBlock"
import './EventsPage.css'
import { HiOutlineArchive } from "react-icons/hi";
import { HiOutlineGlobe } from "react-icons/hi";
import prettyDate from '../../utils/prettyData';

export default function EventsPage() {
  const { upcomingEvents, pastEvents, loading } = useData()
  
  return (
    <div className="events-page">
      {upcomingEvents.length > 0 && <div className="events-page__events">
        <div className="events-page__events-title">
          <HiOutlineGlobe/>
          <h2>ПРЕДСТОЯЩИЕ</h2>
        </div>
        <div className="events-page__events-block">
          {
            upcomingEvents.map(item => (
              <InfoBlock 
                key={item.id}
                blockId={item.id}
                imageId={item.image}
                infoType="event"
                date={prettyDate(item.date)}
                time={item.time}
                location={item.location}
                bgSize={item.bgSize}
                title={item.title}
              ></InfoBlock>
            ))
          }
        </div>
      </div>}

      {pastEvents.length > 0 && <div className="events-page__events">
        <div className="events-page__events-title">
          <HiOutlineArchive />
          <h2>АРХИВ МЕРОПРИЯТИЙ</h2>
        </div>
        <div className="events-page__events-block">
          {
            pastEvents.map(item => (
              <InfoBlock 
                key={item.id}
                blockId={item.id}
                imageId={item.image}
                infoType="event"
                date={prettyDate(item.date)}
                location="Завершено"
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