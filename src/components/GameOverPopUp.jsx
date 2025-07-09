import './GameOverPopUp.css'

export default function GameOverPopUp(props) {

  const handlePlayAgainClick = () => {
    props.resetIsGameOver();
  }

  return (
    <div className="game-over-popup-container">
      <div className="game-over-popup">
        <h1>Game Over!</h1>
        <p>Your score is <strong>{props.score}</strong></p>
        <div className="controls">
          <button onClick={handlePlayAgainClick}>Play Again</button>
          <button className="muted">End Game</button>
        </div>
      </div>
    </div>
  )
}