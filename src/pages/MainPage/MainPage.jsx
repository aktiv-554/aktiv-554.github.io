import InfoBlock from "../../components/InfoBlock/InfoBlock"
import './MainPage.css'
import { HiOutlineGlobe } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineInformationCircle } from "react-icons/hi";

export default function MainPage() {
  return (
    <div className="main-page">
      <div className="main-page__events">
        <div className="main-page__events-title">
          <HiOutlineGlobe></HiOutlineGlobe>
          <h2>МЕРОПРИЯТИЯ</h2>
        </div>
        <div className="main-page__events-block">
          <InfoBlock imageId="logo-big.png" infoType="event" date="До 10 мая 2026" bgSize="contain" title="Открыт набор в учсовет"></InfoBlock>
        </div>
      </div>

      
    </div>
  )
}