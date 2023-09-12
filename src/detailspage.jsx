import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function DetailsPage() {
    const [activePokemon, setActivePokemon] = useState(null);
    const { name } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        function fetchPokemon() {
            fetch(
              "https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json"
            )
              .then((res) => res.json())
              .then((pokemon) => {
                const active = pokemon.pokemon.find(pokemon => pokemon.name === name);
                setActivePokemon(active);
              })
        
              .catch((err) => console.error(err));
          }

        fetchPokemon();
    }, []);

    function handleBack () {
        navigate(-1);
    }
    
  return (
    <div>
        <p>
            {activePokemon?.name}
        </p>
      <img src={activePokemon?.img} />
      <button onClick={handleBack}>Back</button>
    </div>
  );
}
