import { Link } from 'react-router-dom';
import styles from './CharacterCard.module.scss';

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
}

interface CharacterCardProps {
  character: Character;
}

function CharacterCard({ character }: CharacterCardProps) {
  return (
    <Link to={`/character/${character.id}`} className={styles.card}>
      <img src={character.image} alt={character.name} />
      <h2>{character.name}</h2>
      <p>{character.species}</p>
    </Link>
  );
}

export default CharacterCard;