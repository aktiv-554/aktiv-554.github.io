import './SovetLogo.css'

export default function SovetLogo({ withText = false }) {
  return (
    <div className='sovet-logo'>
      <div className="sovet-logo__image"></div>
      {withText && <h2 className="sovet-logo__text">АКТИВ</h2>}
    </div>
  )
}