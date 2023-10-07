import './buscador.css'
import { BuscadorIcons } from './Icons'

export const Buscador = ({ busqueda, setBusqueda, buscarPokemon }) => {
  return (
    <>
      <h3 className='titulo'>Mas de 800 pokemones, elige tu favorito</h3>
      <form className='container-buscador' onSubmit={buscarPokemon}>
        <input type="text" placeholder="Buscar un pokemon" className='input-buscador' 
         value={busqueda}
         onChange={(e) => setBusqueda(e.target.value)}/>
        <button className='btn-buscador' type='submit'>
          <BuscadorIcons />
          Buscar Pokenon</button>
      </form>
    </>
  )
}