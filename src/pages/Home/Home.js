import React from 'react'
import Header from "../../components/sections/Header/Header";
import Solution from '../../components/sections/solutions/Solution'
import AppFeatures from '../../components/sections/features/AppFeatures'
import BasicFeatures from '../../components/sections/basicFeatures/BasicFeatures'
import CallToAction from '../../components/sections/callToAction/CallToAction'
import AppBadge from '../../components/sections/appBadge/AppBadge'
import Questions from '../../components/sections/questions/questions';

const Home = () => {
  return (
    <div>
        <Header />
         <Solution />
        <AppFeatures />
        <AppBadge /> 
         <BasicFeatures /> 
        <CallToAction />
      
        <Questions />
    </div>
  )
}

export default Home
