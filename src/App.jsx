import { useState } from 'react'
import { useEffect } from 'react'

import ScoreBoard from './components/ScoreBoard.jsx'
import CardsGrid from './components/CardsGrid.jsx'

import PokemonCardData from './components/model/PokemonCardData.js'

import './App.css'

function App() {

  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [pokemonArray, setPokemonArray] = useState([]);

  const DIFFICULTY = {
    EASY: 12,
    MEDIUM: 20,
    HARD: 30
  }

  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${DIFFICULTY.EASY}`

  const updateScore = () => {
    setScore(score + 1)
  }

  const resetScore = () => {
    setScore(0);
    setMaxScore(0);
  }

  const updateMaxScore = () => {
    if (score > maxScore) {
      setMaxScore(score);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_URL);
      
      if (response.ok === false) {
        console.error('API call failed')
      }
  
      const data = await response.json();
      
      const parsePokemonData = (data) => {
        let pokemonArray = [];
        data.map(async (item) => {
          const response = await fetch(item.url);
          if (!response.ok) {
            console.error("API call for pokemon data failed for pokemon ")
          }
          const data = await response.json();

          let name = data.name.substring(0, 1).toUpperCase() + data.name.substring(1);
          const id = data.id;
          const pictureUrl = data.sprites.front_default;
          const baseExperience = data.base_experience;
          const height = data.height;
          const weight = data.weight;

          const pokemon = new PokemonCardData(id, name, pictureUrl, baseExperience, height, weight);
          pokemonArray.push(pokemon);
        })
        setPokemonArray(pokemonArray)
      }
  
      parsePokemonData(data.results);
    }

    fetchData();
  }, [])



  const cardsData = [
    new PokemonCardData(0, 'Pikachu', 'image.png', 22, 12, 3),
    new PokemonCardData(1, 'Bulbasaur', 'image.png', 10, 1, 3),
  ]



  return (
    <>

      <div className="main-container">

        <header className="container">
          <h1 className="title">Pokemon Memory Card Game</h1>          
          <div className="header-description">
            <p>Click on cards, but try not to click on the same card twice 😅</p>
          </div>
        </header>

        <div className="score-board container">
          <ScoreBoard score={score} maxScore={maxScore} />
        </div>

        <div className="cards-container container">
          <CardsGrid updateScore={updateScore} resetScore={resetScore} updateMaxScore={updateMaxScore} cardsData={pokemonArray}/>
        </div>

      </div>

    </>
  )
}

export default App
