import { useState, useEffect, useRef } from 'react'
import dexFechada from '/dex_fechada.png';
import dexBotao1 from '/dex_botao1.png';
import dexBotao2 from '/dex_botao2.png';
import botaoFechar from '/close.png';
import botaoShiny from '/shiny.png';
import axios from "axios";
import './App.css'

type PokemonData = {
  name: string | null;
  id: number | null;
  image: string | null;
  shiny: string | null;
  type1: string | null;
  type2: string | null;
  cry: string | null;
};

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [dexBotao, setDexBotao] = useState('/dex_botao1.png');
  const intervalRef = useRef<number | null>(null);
  const [search, setSearch] = useState('');
  const [showyShiny, setShowyShiny] = useState(false);
  const [pokemon, setPokemon] = useState<PokemonData>({
    name: null,
    id: null,
    image: null,
    shiny: null,
    type1: null,
    type2: null,
    cry: null,
  });

  const openPokedex = () => {
    stopInterval();
    getPokemon('1');
    setIsOpen(true);

  }
  const closePokedex = () => {
    setIsOpen(false);
    startInterval();
  }
  const startInterval = () => {
    if (intervalRef.current === null) {
      intervalRef.current = window.setInterval(() => {
        setDexBotao(prev =>
          prev === dexBotao1
            ? dexBotao2
            : dexBotao1
        );
      }, 1000); // troca a cada 1 segundo
    }
  }

  const stopInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  const getPokemon = async (pokeSearch: string | number) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeSearch}`);
      const data = response.data;

      if (data.id <= 493) {
        const pokemonData: PokemonData = {
          name: data.name,
          id: data.id,
          image: data['sprites']['versions']['generation-iv']['heartgold-soulsilver']['front_default'] || "/notFound.png",
          shiny: data['sprites']['versions']['generation-iv']['heartgold-soulsilver']['front_shiny'] || "/notFound.png",
          type1: data.types[0]?.type.name || " ",
          type2: data.types[1]?.type.name || " ",
          cry: data['cries']['latest'] || null,
        };

        setPokemon(pokemonData);
        setShowyShiny(false);
      } else {
        alert('O último Pokémon da Pokédex Heartgold/SoulSilver é o 493-arceus !');
      }

    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      alert('Pokémon não localizado! Tente novamente.');
      setPokemon({
        name: null,
        id: null,
        image: "/notFound.png",
        shiny: "/notFound.png",
        type1: null,
        type2: null,
        cry: null,
      });
    }

  }


  const handleSearchChange = (e: React.FormEvent) => {
    e.preventDefault();
    getPokemon(search);
    setSearch('');

  }
  const getNextPokemon = () => {
    if (pokemon.id !== null) {
      const nextId = pokemon.id + 1;
      getPokemon(nextId);

    } else {
      getPokemon(1);
    }
  }

  const getPrevPokemon = () => {
    if (pokemon.id !== null && pokemon.id > 1) {
      const prevId = pokemon.id - 1;
      getPokemon(prevId);
    }
    else {
      getPokemon(1);
    }
  }

  useEffect(() => {

    if (pokemon.cry) {
      const audio = new Audio(pokemon.cry);
      audio.play();
    }

    intervalRef.current = window.setInterval(() => {
      setDexBotao(prev =>
        prev === dexBotao1
          ? dexBotao2
          : dexBotao1
      );
    }, 1000); // troca a cada 1 segundo

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };

  }, [pokemon]);

  const isShyne = () => {
    if (!showyShiny && pokemon.shiny) {
      setShowyShiny(true);

    } else {
      setShowyShiny(false);
    }
  }

  return (
    <>
      {!isOpen ? (
        <div className="main">
          <img className='pokedex' src={dexFechada} alt="Pokedex" />
          <button
            className="buttonOpen"
            onClick={() => openPokedex()}
          >
            <img src={dexBotao} className="buttonOpenImage" alt="" />
          </button>
          <h1 className='title'>
            Pokédex Pokémon HeartGold e SoulSilver
          </h1>

        </div>) : (
        <div className="main">
          <img className='pokedexAberta' src="/pokedex.png" alt="Pokedex" />
          <h1 className='pokemonName'>{pokemon.name}</h1>
          <p className='pokemonId'>#{pokemon.id}</p>

          <p className='pokemonType1'>{pokemon.type1}</p>
          <p className='pokemonType2'>{pokemon.type2}</p>

          {showyShiny ? (
            pokemon.shiny && (
              <img src={pokemon.shiny} alt="pokemon shiny" className='pokemon shiny' />
            )
          ) : (
            pokemon.image && (
              <img src={pokemon.image} alt="pokemon normal" className='pokemon' />
            )
          )}
          <form className='form'
            onSubmit={handleSearchChange}>
            <input
              className='search'
              type="search"
              placeholder='Name or Number'
              value={search}
              required
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className='buttons'>
            <button className='buttonPrev' onClick={getPrevPokemon}>&lt; </button> {/* Previous Button */}
            <button className='buttonPrev' onClick={getNextPokemon}> &gt;</button>{/* Next Button */}
          </div>
          <button onClick={isShyne} className='buttonShiny'>
            <img src={botaoShiny} alt="brilho" className='brilho' />
          </button>
          <button onClick={closePokedex} className='buttonClose'>
            <img src={botaoFechar} alt="brilho" className='fechar' />
          </button>
        </div>
      )}
    </>
  )
}

export default App
