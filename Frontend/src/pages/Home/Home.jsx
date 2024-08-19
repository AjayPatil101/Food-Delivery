import React, { useState } from 'react'
import './Home.css'
import Header from '../../compntents/Header/Header'
import ExploerMenu from '../../compntents/Exploremenu/ExploerMenu'
import FoodDisplay from '../../compntents/FoodDisplay/FoodDisplay'
import AppDownload from '../../compntents/AppDownload/AppDownload'
const Home = () => {
    const [category, setCategory] = useState("All")
  return (
    <div>
      <Header/>
      <ExploerMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      <AppDownload/>
    </div>
  )
}

export default Home
