import InfoBlock from "../../components/InfoBlock/InfoBlock"
import './MainPage.css'
import { HiOutlineGlobe } from "react-icons/hi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";


export default function MainPage() {
  return (
    <div className="main-page">
      <div className="main-page__events">
        <div className="main-page__events-title">
          <HiOutlineLightningBolt/>
          <h2>ГОЛОСОВАНИЯ</h2>
        </div>
        <div className="main-page__events-block">
          <InfoBlock imageId="logo-big.png" infoType="event" date="До 10 мая 2026" bgSize="contain" title="Повесить в школе ящик для предложений"></InfoBlock>
        </div>
      </div>

      
    </div>
  )
}