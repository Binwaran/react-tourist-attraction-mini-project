import { useState, useEffect } from 'react'
import './App.css'
import SearchSection from './components/SearchSection'
import ShowCard from './components/ShowCard'


function App() {
  const [text, setText] = useState('') //เอาไว้เก็บข้อมูลที่ค้นหา
  const [places, setPlaces] = useState([]) //เอาไว้เก็บข้อมูลที่เที่ยว

 
//อันนี้สำหรับดึงข้อมูลที่เที่ยวจาก server

  return (
    <>
    <SearchSection/>
    <ShowCard/>
     
    </>
  )
}

export default App
