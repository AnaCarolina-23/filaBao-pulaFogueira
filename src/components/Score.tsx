import './Style.css';
interface ScoreProps {
  value: number;
}

export default function Score({ value }: ScoreProps) {
  return (
    <div className="score">
      Score: {value}
    </div>
  );
}
