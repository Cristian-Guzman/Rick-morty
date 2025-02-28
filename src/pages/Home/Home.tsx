import { useQuery, gql } from '@apollo/client';
import styles from './Home.module.scss';
import CharacterCard from 'src/components/CaracterCard/CharacterCard';

// Definir el tipo para un personaje
interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
}

// Definir el tipo para los datos de la consulta
interface CharactersData {
  characters: {
    results: Character[];
  };
}

// Consulta GraphQL para obtener los personajes
const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
        species
      }
    }
  }
`;

function Home() {
  // Usar useQuery con los tipos definidos
  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className={styles.characterList}>
      {data?.characters.results.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}

export default Home;