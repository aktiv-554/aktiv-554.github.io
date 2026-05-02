import { useParams } from 'react-router-dom';
import './EventDetailPage.css'

export default function EventDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <h2>{id}</h2>
    </div>
  )
}