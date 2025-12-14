import React from 'react'
import useThemeStore from '../store/useThemeStore'
// import {useThemeStore} from "../store/useThemeStore.js"
const HomePage = () => {

  const{theme, setTheme} = useThemeStore() 
  return (
    <div>HomePage</div>
  )
}

export default HomePage