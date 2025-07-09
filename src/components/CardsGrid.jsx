import { useEffect, useState } from 'react';

import './CardsGrid.css'

export default function CardsGrid(props) {
  let cardData = props.cardsData;

  const [cardsArray, setCardsArray] = useState(cardData);
  const [clickedCardIds, setClickedCardIds] = useState([]);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  const handleCardClick = (cardId) => {
    if (!clickedCardIds.includes(cardId)) {
      setClickedCardIds([...clickedCardIds, cardId]);
      const shuffled = shuffleArray(cardsArray);
      setCardsArray(shuffled)
      props.updateScore();
    } else {
      setClickedCardIds([]);
      console.log('Duplicate click - resetting score.');
      props.updateMaxScore();
      props.resetScore();
    }
  }

  const shuffleCards = () => {
    const shuffled = shuffleArray(cardsArray);
    setCardsArray(shuffled);
  }

  const renderCardElements = (cardsData) => cardsData.map((card) => {
    return (
      <div className="card" key={card.id} onClick={() => handleCardClick(card.id)}>
        <div className="picture">
          <img src={card.picture} />
        </div>
        <div className="card-title">
          {card.name}
        </div>
        <div className="stats">
          <p>Experience: <strong>{card.experience}</strong></p>
          <p>Height: <strong>{card.height}</strong></p>
          <p>Weight: <strong>{card.weight}</strong></p>
        </div>
      </div>
    )
  })

  useEffect(() => {
    if (props.cardsData && props.cardsData.length > 0) {
      setCardsArray([...props.cardsData]);
    }
  }, [props.cardsData]);

  let cardsElements = renderCardElements(cardsArray);

  return (
    <>
      {/* <div className="controls">
        <button onClick={props.updateScore}>Update score</button>
        <button onClick={props.resetScore}>Reset score</button>
        <button onClick={props.updateMaxScore}>Update max score</button>
        <button onClick={shuffleCards}>Shuffle</button>
      </div> */}

      <div className="cards">
        {cardsElements}
      </div>
    </>
  )

}