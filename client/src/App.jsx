import { useState, useEffect } from 'react'
import './App.css'
import SearchSection from './components/SearchSection'
import ShowCard from './components/ShowCard'


function App() {
  const [text, setText] = useState('') //เอาไว้เก็บข้อมูลที่ค้นหา
  const [places, setPlaces] = useState([]) //เอาไว้เก็บข้อมูลที่เที่ยว

//อันนี้สำหรับดึงข้อมูลที่เที่ยวจาก server
useEffect(() => {
  const url = text.trim()==="" ? "http://localhost:4001/trips" : `http://localhost:4001/trips?keywords=${text}`;
  fetch(url)
  .then((res)=>res.json())
  .then((data)=> setPlaces(data.data));
}, [text]);


  return (
    <>
    <SearchSection text={text} setText={setText} />
    <ShowCard places={places} setText={setText} text={text}/>
     
    </>
  )
}

export default App
