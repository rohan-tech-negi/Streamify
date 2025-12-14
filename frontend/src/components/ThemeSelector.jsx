import React from 'react'
import useThemeStore from '../store/useThemeStore'
import { PaletteIcon } from 'lucide-react'
import { THEMES } from '../constants'
const ThemeSelector = () => {
    const{theme, setTheme} = useThemeStore()
  return (
    <div className='dropdown dropdown-end'>
        {/* DROPDOWN TRIGGER */}
        <button tabIndex={0} className='btn btn-ghost btn-circle'>
            <PaletteIcon className='size-5'></PaletteIcon>
        </button>

        <div tabIndex={0} className='dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 broder border-base-content/10 max-h-80 overflow-y-auto'>

            <div className='space-y-1'>
                {THEMES.map((themeOption)=>{
                  <button key={themeOption.name}>
                      
                  </button>
                })}
            </div>
        </div>
    </div>
  )
}

export default ThemeSelector