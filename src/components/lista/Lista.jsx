import React, { useEffect, useState } from "react";
import axios from "axios";

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]); // Guarda la lista de pokemones
    const [pokemonImages, setPokemonImages] = useState({}); // Guarda las URLs de las imágenes de los pokemones
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const [totalPages, setTotalPages] = useState(0); // Total de páginas
    const [loading, setLoading] = useState(false);
    const limit = 20; // Número de pokemones por página

    // Función para obtener los Pokémon
    useEffect(() => {
        const fetchPokemons = async () => {
            setLoading(true);
            const offset = (currentPage - 1) * limit; // Calcular el offset
            try {
                const response = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
                );
                setPokemons(response.data.results);
                setTotalPages(Math.ceil(response.data.count / limit)); // Calcular total de páginas
            } catch (error) {
                console.error("Error fetching pokemons:", error);
            }
            setLoading(false);
        };

        fetchPokemons();
    }, [currentPage]); // Se ejecuta cuando cambia currentPage

    // Función para obtener la imagen de cada Pokémon
    useEffect(() => {
        const fetchPokemonImages = async () => {
            const newImages = {};
            for (let pokemon of pokemons) {
                const response = await axios.get(pokemon.url);
                newImages[pokemon.name] = response.data.sprites.front_default;
            }
            setPokemonImages(newImages); // Guardar las imágenes de los pokemones
        };

        if (pokemons.length > 0) {
            fetchPokemonImages();
        }
    }, [pokemons]); // Se ejecuta cuando cambia la lista de pokemones

    // Funciones para cambiar de página
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    return (
        <div className="max-w-screen-md w-full bg-blue-100 rounded-xl shadow-xl">
            <div>
                <h1 className="font-bold text-center text-2xl py-4">Lista de pokemones</h1>
                {loading ? (
                    <p className="text-xs text-center  text-green-500">Cargando pokemones...</p>
                ) : (
                    <div className="p-4 flex flex-wrap justify-center gap-4 max-h-96 overflow-auto">
                        {pokemons.map((pokemon, index) => (
                            <div key={index} className="p-2 bg-gray-300 rounded-lg text-center">
                                <p className="font-bold">{pokemon.name}</p>
                                {pokemonImages[pokemon.name] ? (
                                    <img src={pokemonImages[pokemon.name]} alt={pokemon.name} />
                                ) : (
                                    <p className="text-xs text-green-500">Cargando imagen...</p>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="p-4 flex items-center justify-around">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className={currentPage === 1 ? "px-4 py-2 bg-gray-400 rounded-lg cursor-not-allowed" : "px-4 py-2 bg-red-500 rounded-lg hover:bg-red-600 text-white transition-all duration-100 cursor-pointer"}>
                    Anterior
                </button>
                <span className="text-sm font-bold">
                    Página {currentPage} de {totalPages}
                </span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={currentPage === totalPages ? "px-4 py-2 bg-gray-400 rounded-lg cursor-not-allowed": "px-4 py-2 bg-green-400 rounded-lg hover:bg-green-600 text-black transition-all duration-100 cursor-pointer"}>
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default PokemonList;
