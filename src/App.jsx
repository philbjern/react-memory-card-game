import { useState } from 'react'

import ScoreBoard from './components/ScoreBoard.jsx'
import CardsGrid from './components/CardsGrid.jsx'


import './App.css'

function App() {

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  const DIFFICULTY = {
    EASY: 10,
    MEDIUM: 20,
    HARD: 30
  }

  return (
    <>

      <div className="container">

        <header>
          <h1 className="title">Pokemon Memory Card Game</h1>          
          <div className="header-description">
            <p>Click on cards, but try not to click on the same card twice 😅</p>
          </div>
        </header>

        <div className="score-board">
          <ScoreBoard />
        </div>

        <div className="cards-container">
          <CardsGrid />
        </div>

      </div>

    </>
  )
}

export default App
