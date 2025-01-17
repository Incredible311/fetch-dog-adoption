import React, { useState, useEffect } from "react";
import { getBreeds, searchDogs, fetchDogs } from "../services/api";
import DogCard from "../components/DogCard";
import { useNavigate } from "react-router-dom";

function Search({ favorites, setFavorites }) {
  const navigate = useNavigate();

  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [dogs, setDogs] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0); // New state for total records
  const [pageSize] = useState(10); // Fixed page size for pagination

  useEffect(() => {
    setFavorites([]);
    const fetchBreedsList = async () => {
      const { data } = await getBreeds();
      setBreeds(data);
    };
    fetchBreedsList();
  }, []);

  const handleSearch = async () => {
    const { data } = await searchDogs({
      breeds: selectedBreed ? [selectedBreed] : undefined,
      sort: `breed:${sortOrder}`,
      size: pageSize,
      from: page * pageSize,
    });
    const dogData = await fetchDogs(data.resultIds);
    setDogs(dogData.data);
    setTotalRecords(data.total); // Update total records
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    handleSearch();
  }, [page, sortOrder, selectedBreed]);

  // Calculate total pages
  const totalPages = Math.ceil(totalRecords / pageSize);

  return (
    <div className="search-page">
      <h1>Find Your Perfect Dog</h1>

      <div className="filters">
        <select onChange={(e) => setSelectedBreed(e.target.value)}>
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
        <button onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          Sort: {sortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
        <button
          onClick={() => navigate("/match")}
          disabled={!favorites.length}
        >
          Go to Match
        </button>
      </div>
      <div className="pagination-info">
        <p>
          Showing {page * pageSize + 1} -{" "}
          {Math.min((page + 1) * pageSize, totalRecords)} of {totalRecords} records
        </p>
      </div>
      <div className="dog-results">
        {dogs.map((dog) => (
          <DogCard
            key={dog.id}
            dog={dog}
            isFavorite={favorites.includes(dog.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      <div className="pagination">
        <button
          disabled={page === 0}
          onClick={() => setPage((prev) => Math.max(0, prev - 1))}
        >
          {'<'}
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          {`>`}
        </button>
      </div>
    </div>
  );
}

export default Search;
