import React from 'react'
import Hero from '../componets/Hero'
import LatestCollection from '../componets/LatestCollection'
import BestSaller from '../componets/BestSaller'
import Policy from '../componets/Policy'
import NewsLatterBox from '../componets/NewsLatterBox'

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSaller />
      <Policy />
      <NewsLatterBox />
    </div>
  )
}

export default Home