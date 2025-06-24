import { useState, useEffect } from 'react'
import './App.css'
import SearchSection from './components/SearchSection'
import ShowCard from './components/ShowCard'

function App() {
  const [text, setText] = useState('') // สำหรับเก็บข้อความค้นหา
  const [places, setPlaces] = useState([]) // สำหรับเก็บข้อมูลสถานที่

  // ดึงข้อมูลจาก server
  useEffect(() => {
    const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4001";
    const url = text.trim() === ""
      ? `${API_BASE}/trips`
      : `${API_BASE}/trips?keywords=${text}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.data) {
          setPlaces(data.data);
        } else {
          setPlaces([]); 
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setPlaces([]);
      });
  }, [text]);

  return (
    <>
      <SearchSection text={text} setText={setText} />
      <ShowCard places={places} setText={setText} text={text} />
    </>
  )
}

export default App
