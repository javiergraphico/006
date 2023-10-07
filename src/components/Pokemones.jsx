import usePokemones from '../hooks/usePokemones'
import InfiniteScroll from 'react-infinite-scroll-component'
import Cargando from './Cargando'
import './pokemones.css'
import { Buscador } from './Buscador'
import DetallePokemon from './DetallePokemon'
import { useState, useEffect } from 'react'



function Pokemon({ nombre, imagen, id, verPokemon }) {
  return (
    <div className='pokemon_card' onClick={verPokemon}>
      <img className='pokemon_img' src={imagen} alt={nombre} />
      <p className='pokemon_title'>
        <span>#{id}</span>
        <span>{nombre}</span>
      </p>
    </div>
  )
}

function Pokemones() {

  const { pokemones, masPokemones, verMas, searchPokemon } = usePokemones()

  const [ mostrar, setMostrar ] = useState({ mostrar: false, pokemon: {} })

  const [ busqueda, setBusqueda ] = useState('')

  const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon })

  const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {} })
    setBusqueda('')
  }

  const buscarPokemon = async (e) => {
    e.preventDefault()

    if (!busqueda) return

    const pokemon = await searchPokemon(busqueda)

    setMostrar({ mostrar: true, pokemon })
  }
  
  return (

    <>
      <DetallePokemon {...mostrar} cerrar={noVerPokemon} />
      <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon} />
      <InfiniteScroll
        dataLength={pokemones.length}
        next={masPokemones}
        hasMore={verMas}
        loader={<Cargando />}
        endMessage={
          <h3 className='title' style={{ gridColumn: '1/6'}}>Lo siento, no hay mas pokemones por mostrar</h3>
        }
        className='pokemon-container'
      >
        {pokemones.map(pokemon => (
          <Pokemon key={pokemon.id} {...pokemon} verPokemon={() => verPokemon(pokemon)} />
        ))}
      
      </InfiniteScroll>
    </>
  )
}

export default Pokemones
