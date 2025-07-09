export default function ScoreBoard(props) {
  return (
    <div>
      <b>Score Board</b>
      <p>Current Score: <strong className="color-primary">{props.score}</strong></p>
      <p>Max Score: <strong className="color-primary">{props.maxScore}</strong></p>
    </div>
  )
}