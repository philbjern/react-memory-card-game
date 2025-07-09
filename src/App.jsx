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

  const [isLoading, setIsLoading] = useState(true);

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
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          console.error('API call failed')
          return;
        }

        const data = await response.json();

        const detailedPokemonArray = await Promise.all(data.results.map(async (item) => {
          const res = await fetch(item.url);
          if (!res.ok) {
            console.error(`Failed to fetch details for ${item.name}`)
            return null;
          }

          const data = await res.json();

          let name = data.name.charAt(0).toUpperCase() + data.name.slice(1);
          const id = data.id;
          const pictureUrl = data.sprites.front_default;
          const baseExperience = data.base_experience;
          const height = data.height;
          const weight = data.weight;

          return new PokemonCardData(id, name, pictureUrl, baseExperience, height, weight);

        }));

        // Filter out nulls (in case some fetches failed)
        setPokemonArray(detailedPokemonArray.filter(Boolean));
        setIsLoading(false);
      } catch (error) {
        console.error('Something went wrong:', error);
      }
    };
    fetchData();
  }, []);


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
          {isLoading ? <p>Loading cards...</p> : <CardsGrid updateScore={updateScore} resetScore={resetScore} updateMaxScore={updateMaxScore} cardsData={pokemonArray} />}
        </div>

      </div>

    </>
  )
}

export default App
