import { useState, useEffect } from 'react'


const URL_DEFAULT = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
const URL_ENPOINT = 'https://pokeapi.co/api/v2/pokemon/'

function usePokemones() {
  
  const [pokemones, setPokemones] = useState([])

  const [ siguenteUrl, setSiguenteUrl ] = useState('')

  const [ verMas, setVerMas ] = useState(true)


  const fletchPokemon = async (url) => {
    const response = await fetch(url);
    const poke = await response.json();

    const abilities = poke.abilities.map(a => a.ability.name)
    const stats = poke.stats.map(s => { return { name: s.stat.name, base: s.base_stat } })
    const types = poke.types.map(t => t.type.name)
  
    return {
      id: poke.id,
      nombre: poke.name,
      imagen: poke.sprites.other.dream_world.front_default,
      abilities,
      stats,
      types
    };
  }

  const getPokemones = async (url = URL_DEFAULT) => {
    //recuperamos el listado de los pokemones
    const response = await fetch(url)
    const listaPokemones = await response.json()
    const { next, results } = listaPokemones

    const newPokemones = results.map((pokemon) => fletchPokemon(pokemon.url));
    
    const resolvedPokemones = await Promise.all(newPokemones);
    
    return{ resolvedPokemones, next }
    
  }

  const obtenerPokemones = async () =>{
    const { resolvedPokemones, next } = await getPokemones()
    setPokemones(resolvedPokemones)
    setSiguenteUrl(next)
  }

  const masPokemones = async () => {
    const { next, resolvedPokemones} = await getPokemones(siguenteUrl)
    setPokemones(prev => [...prev, ...resolvedPokemones])
    next === null && setVerMas(false)
    setSiguenteUrl(next)
    
  }

  const searchPokemon = async (busqueda) =>{
    const url = `${URL_ENPOINT}${busqueda.toLocaleLowerCase()}`
    return await fletchPokemon(url) 
  }

  
  useEffect(() => { obtenerPokemones() }, [])

  return { pokemones, masPokemones, verMas, searchPokemon }
}

export default usePokemones;