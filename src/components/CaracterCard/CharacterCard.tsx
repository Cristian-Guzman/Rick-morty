import FavoriteIcon from '../FavoriteIcon/FavoriteIcon';
import styles from './CharacterCard.module.scss';

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
}

interface CharacterCardProps {
  character: Character;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

function CharacterCard({ character, isFavorite, onToggleFavorite }: CharacterCardProps) {
  return (
    <div className={styles.card}>
      <img src={character.image} alt={character.name} />
      <div className={styles.header}>
        <h2>{character.name}</h2>
        <p>{character.species}</p>
      </div>
      <FavoriteIcon
        isFavorite={isFavorite}
        onClick={() => onToggleFavorite(character.id)}
      />
    </div>
  );
}

export default CharacterCard;