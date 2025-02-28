import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import styles from "./Home.module.scss";
import CharacterCard from "../../components/CaracterCard/CharacterCard";

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
  query GetCharacters($status: String, $species: String, $gender: String) {
    characters(
      filter: { status: $status, species: $species, gender: $gender }
    ) {
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
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [filters, setFilters] = useState<{
    status: string;
    species: string;
    gender: string;
  }>({
    status: "",
    species: "",
    gender: "",
  });
  const { loading, error, data } = useQuery<CharactersData>(GET_CHARACTERS, {
    variables: filters,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.characters) return <p>No character data found</p>;

  const sortedCharacters = [...data.characters.results].sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div>
      <div className={styles.filterContainer}>
        <select
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Statuses</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          name="species"
          value={filters.species}
          onChange={handleFilterChange}
        >
          <option value="">All Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
        </select>
        <select
          name="gender"
          value={filters.gender}
          onChange={handleFilterChange}
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <div className={styles.sortContainer}>
        <label htmlFor="sortOrder">Sort by name:</label>
        <select
          id="sortOrder"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
      <div className={styles.characterList}>
        {sortedCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isFavorite={favorites.includes(character.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
