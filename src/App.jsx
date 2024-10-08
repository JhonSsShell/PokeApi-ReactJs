import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./index.css"
import PokemonList from './components/lista/Lista'

function App() {

  return (
    <div className='w-screen flex justify-center items-center h-screen'>
      <PokemonList />
    </div>
  )
}

export default App
