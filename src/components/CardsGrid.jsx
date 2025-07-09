import { useEffect, useState } from 'react';

import './CardsGrid.css'

function shuffleArray(array) {
  console.log(array);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export default function CardsGrid(props) {

  const cardData = props.cardsData;

  const renderCardElements = (cardsData) => cardsData.map((card) => {
    return (
      <div className="card" key={card.id}>
        <div className="picture">
          <img src={card.picture} />
        </div>
        <div className="card-title">
          {card.name}
        </div>
        <div className="stats">
          <p>Experience: <strong>{card.experience}</strong>,</p>
          <p>Height: <strong>{card.height}</strong>,</p>
          <p>Weight: <strong>{card.weight}</strong></p>
        </div>
      </div>
    )
  })

  const [cardsArray, setCardsArray] = useState(cardData);
  console.log(cardsArray);
  let cardsElements = renderCardElements(cardsArray);
  
  useEffect(() => {
    cardsElements = renderCardElements(cardsArray);

  }, [cardsArray])


  let clickedCardIds = [];

  const shuffleCards = () => {
    shuffleArray(cardData);
    console.log(cardData);
    setCardsArray(cardData);
  }

  const handleCardClick = (cardId) => {}

  return (
    <>
      CardGrid
      <button onClick={props.updateScore}>Update score</button>
      <button onClick={props.resetScore}>Reset score</button>
      <button onClick={props.updateMaxScore}>Update max score</button>

      <div className="cards">
        {cardsElements}
      </div>

      <div className="controls">
        <button onClick={shuffleCards}>Shuffle</button>
      </div>

    </>
  )

}