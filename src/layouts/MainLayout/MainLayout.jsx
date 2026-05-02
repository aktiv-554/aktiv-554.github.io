import Header from "../../components/Header/Header"
import { Outlet } from 'react-router-dom'
import './MainLayout.css'

export default function MainLayout() {
  return (
    <div>
      <Header></Header>
      
      <main className="app-container">
        <Outlet /> 
      </main>
    </div>
  )
}