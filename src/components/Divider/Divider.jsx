import './Divider.css'
import { useEffect, useState } from 'react';

export default function Divider(size) {
  return(
    <div className={`divider ${size}`}>
      <div></div>
    </div>
  )
}