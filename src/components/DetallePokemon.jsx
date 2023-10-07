import './detallepokemon.css'

function DetallePokemon({ mostrar, cerrar, pokemon }) {
  return (
    <div className='modal-container' onClick={cerrar} style={{ display: mostrar ? 'grid' : 'none' }}>
      <section className='modal-body'>
        <div className='imagen-container'>
          <img className='imagen-detalle' src={pokemon.imagen} alt={pokemon.nombre} />
          <section>
            {pokemon.types?.map(type => <span className='tag'>{type}</span> )} 
          </section>
        </div>
        <div className='data'>
          <h2 className='titulo'>{pokemon.nombre} (#{pokemon.id})</h2>

          <h3 className='titulo-seccion'>Habilidades</h3>
          {pokemon.abilities?.map(ability => <span className='tag'>{ability}</span> )}

          <h3 className='titulo-seccion'>Estaditicas</h3>
          <div className='stats'>
            {pokemon.stats?.map(stat =>
              <section>
                <span className='puntos'>{stat.base}</span>
                <span>{stat.name}</span>
              </section>
            )}

          </div>


        </div>

      </section>
    </div>
  )
}

export default DetallePokemon