import React from 'react'
import Hero from '../componets/Hero'
import LatestCollection from '../componets/LatestCollection'
import BestSaller from '../componets/BestSaller'
import Policy from '../componets/Policy'
import NewsLatterBox from '../componets/NewsLatterBox'
import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Shop HM4500 – Premium Products</title>
        <meta name="description" content="Welcome to Shop HM4500. Discover handpicked premium products at affordable prices." />
        <link rel="canonical" href="https://shop-hm4500.vercel.app/" />
        <meta property="og:title" content="Shop HM4500" />
        <meta property="og:description" content="Discover quality shopping experience with Shop HM4500." />
        <meta property="og:url" content="https://shop-hm4500.vercel.app/" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero />
      <LatestCollection />
      <BestSaller />
      <Policy />
      <NewsLatterBox />
    </div>
  )
}

export default Home