import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { useData } from '../../context/DataContext'
import { NavLink } from 'react-router-dom'
import './SwipeSlide.css'
import { HiArrowRight } from "react-icons/hi";
import { HiArrowLeft } from "react-icons/hi";
import { HiOutlineLightningBolt } from "react-icons/hi";

export default function SwipeSlide() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { hotNews, activeSuggestions } = useData()
  const [ hotData, setHotData ] = useState([])
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: hotData.length > 1,
    draggable: hotData.length > 1,
    watchDrag: hotData.length > 1
  })

  useEffect(() => {
    if (hotNews && activeSuggestions) {
      setHotData([...hotNews, ...activeSuggestions])
    }
  }, [hotNews, activeSuggestions])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
    onSelect()
  }, [emblaApi, onSelect])


  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi || hotData.length <= 1) return
    const timer = setInterval(() => emblaApi.scrollNext(), 5000)
    return () => clearInterval(timer)
  }, [emblaApi, hotData.length])

  if (hotData.length === 0) return null

  return (
    <div className="banner">
      <div className="banner-viewport" ref={emblaRef}>
        <div className="banner-track">
          {hotData.map((newsItem, index) => (
            <NavLink to={`/${newsItem.id.includes('sug') ? 'suggestions' : 'news'}/${newsItem.id}`} className="banner-slide" key={index}>
              <div
                className="banner-image"
                style={{ background: 'url(' + new URL(`../../assets/images/${newsItem.id.includes('sug') ? 'suggestions' : 'news'}/${newsItem.image}`, import.meta.url).href + ')',
                  backgroundPosition: 'center',
                  backgroundSize: `${newsItem.bgSize == 'contain' ? 'auto 95%' : newsItem.bgSize}`,
                  backgroundRepeat: 'no-repeat',
                }}
              />
              <div className="banner-overlay">
                <h2>{newsItem.title}</h2>
                <p>{newsItem.text}</p>
                <div className="banner-time">
                  {newsItem.id.includes('sug') && <HiOutlineLightningBolt/>}
                  <time>
                    {newsItem.id.includes('sug') && 'До '}{new Date(newsItem.date).toLocaleDateString('ru-RU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    }).replace(' г.', '')}
                  </time>
                </div>
              </div>
            </NavLink>
          ))}
        </div>

        {hotData.length > 1 && <div className="banner-dots">
          {hotData.map((_, index) => (
            <button
              key={index}
              className={`banner-dot ${index === selectedIndex ? 'active' : ''}`}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
            />
          ))}
        </div>}
      </div>

      {hotData.length > 1 && <>
        <button className="banner-btn banner-prev" onClick={scrollPrev}> <HiArrowLeft/> </button>
        <button className="banner-btn banner-next" onClick={scrollNext}> <HiArrowRight/> </button>
      </>}
    </div>
  )

}