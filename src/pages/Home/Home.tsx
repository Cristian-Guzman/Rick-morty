import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import styles from './Home.module.scss';
import CharacterCard from '../../components/CaracterCard/CharacterCard';

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
}

interface CharactersData {
  characters: {
    results: Character[];
  };
}

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
  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.characters) return <p>No character data found</p>;

  const sortedCharacters = [...data.characters.results].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  return (
    <div>
      <div className={styles.sortContainer}>
        <label htmlFor="sortOrder">Sort by name:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div className={styles.characterList}>
        {sortedCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  );
}

export default Home;