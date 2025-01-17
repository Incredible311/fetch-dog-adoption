import React from "react";
function DogCard({ dog, isFavorite, toggleFavorite }) {
    return (
        <div className="dog-card">
            <img src={dog.img} alt={dog.name} />
            <h3>{dog.name}</h3>
            <p>Breed: {dog.breed}</p>
            <p>Age: {dog.age}</p>
            <p>Location: {dog.zip_code}</p>
            <button className={isFavorite && "favorite-btn"} onClick={() => toggleFavorite(dog.id)}>
                {isFavorite ? "Unfavorite" : "Favorite"}
            </button>
        </div>
    );
}
export default DogCard;
