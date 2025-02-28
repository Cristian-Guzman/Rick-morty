import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styles from './CharacterDetail.module.scss';

interface Character {
  id: string;
  name: string;
  image: string;
  species: string;
  status: string;
  gender: string;
  origin: {
    name: string;
  };
  location: {
    name: string;
  };
}

interface CharacterData {
  character: Character;
}

interface CharacterVars {
  id: string;
}

const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      id
      name
      image
      species
      status
      gender
      origin {
        name
      }
      location {
        name
      }
    }
  }
`;

function CharacterDetail() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <p>No character ID provided</p>;
  }

  const { loading, error, data } = useQuery<CharacterData, CharacterVars>(GET_CHARACTER_DETAILS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.character) return <p>No character data found</p>;

  const { character } = data;

  return (
    <div className={styles.detailContainer}>
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
    </div>
  );
}

export default CharacterDetail;