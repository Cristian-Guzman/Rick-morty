import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import styles from "./CharacterDetail.module.scss";

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
  const { loading, error, data } = useQuery<CharacterData>(
    GET_CHARACTER_DETAILS,
    {
      variables: { id },
    }
  );

  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (!data || !data.character) return <p>No character data found</p>;

  const character = data.character;

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment("");
    }
  };

  return (
    <div className={styles.detailContainer}>
      <img src={character.image} alt={character.name} />
      <h1>{character.name}</h1>
      <p>Species: {character.species}</p>
      <p>Status: {character.status}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>

      <div className={styles.commentsSection}>
        <h2>Comments</h2>
        <div className={styles.commentsList}>
          {comments.map((comment, index) => (
            <div key={index} className={styles.comment}>
              {comment}
            </div>
          ))}
        </div>
        <div className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          />
          <button onClick={handleAddComment}>Add Comment</button>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetail;
