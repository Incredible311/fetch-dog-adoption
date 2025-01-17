import React, { useState, useEffect } from "react";
import { getMatch, fetchDogs } from "../services/api";
import { useNavigate } from "react-router-dom";

function Match({ favoriteDogIds }) {
  const [favorites, setFavorites] = useState([]); // To store details of favorite dogs
  const [match, setMatch] = useState(null); // To store matched dog details
  const navigate = useNavigate();

  // Fetch details of favorite dogs
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await fetchDogs(favoriteDogIds);
        setFavorites(data);
      } catch (error) {
        alert("Failed to fetch favorite dogs. Please try again.");
      }
    };
    if (favoriteDogIds.length) fetchFavorites();
  }, [favoriteDogIds]);

  // Generate matched dog
  const generateMatch = async () => {
    try {
      const { data } = await getMatch(favoriteDogIds);
      const { data: matchedDog } = await fetchDogs([data.match]);
      setMatch(matchedDog[0]);
    } catch (error) {
      alert("Failed to generate a match. Please try again.");
    }
  };

  return (
    <div className="match-page">
      <h1>Your Perfect Match</h1>
      <button className="back-button" onClick={() => navigate("/search")}>
        Back to Search
      </button>
      {!match ? (
        <div className="match-container">
          <h2>Your Favorite Dogs</h2>
          <div className="dog-results">
            {favorites.map((dog) => (
              <div key={dog.id} className="dog-card">
                <img src={dog.img} alt={dog.name} />
                <h3>{dog.name}</h3>
                <p>Breed: {dog.breed}</p>
                <p>Age: {dog.age}</p>
                <p>Location: {dog.zip_code}</p>
              </div>
            ))}
          </div>
          <p>Click the button below to find your perfect dog match!</p>
          <button
            className="generate-match-button"
            onClick={generateMatch}
            disabled={!favoriteDogIds.length}
          >
            Generate Match
          </button>
        </div>
      ) : (
        <div className="dog-card">
          <h2>Your Matched Dog</h2>
          <img src={match.img} alt={match.name} />
          <h3>{match.name}</h3>
          <p>Breed: {match.breed}</p>
          <p>Age: {match.age}</p>
          <p>Location: {match.zip_code}</p>
        </div>
      )}
    </div>
  );
}

export default Match;
