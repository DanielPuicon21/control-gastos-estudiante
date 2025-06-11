import { useState, useEffect } from 'react'
import type { Gasto } from '../types/Gasto'
import GastoItem from '../components/GastoItem'

function ListaGastos() {
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  useEffect(() => {
    const gastosGuardados = localStorage.getItem('gastos')
    if (gastosGuardados) {
      setGastos(JSON.parse(gastosGuardados))
    }
  }, [])

  const eliminarGasto = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este gasto?')) {
      const nuevosGastos = gastos.filter(gasto => gasto.id !== id)
      setGastos(nuevosGastos)
      localStorage.setItem('gastos', JSON.stringify(nuevosGastos))
    }
  }
  

  const ordenarGastos = (criterio: 'fecha' | 'cantidad') => {
    const gastosOrdenados = [...gastos].sort((a, b) => {
      if (criterio === 'fecha') {
        return new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
      } else {
        return b.cantidad - a.cantidad
      }
    })
    setGastos(gastosOrdenados)
  }

  const limpiarTodosLosGastos = () => {
    if (confirm('¿Estás seguro de eliminar *todos* los gastos? Esta acción no se puede deshacer.')) {
      localStorage.removeItem('gastos')
      setGastos([])
    }
  }

  const gastosFiltrados = gastos.filter(
    gasto => categoriaFiltro === 'todas' || gasto.categoria === categoriaFiltro
  )

  const categorias = ['todas', ...Array.from(new Set(gastos.map(g => g.categoria)))]

  return (
    <div className="lista-gastos-container">
      <h2>Lista de Gastos</h2>

      {gastos.length > 0 && (
        <button onClick={limpiarTodosLosGastos} className="boton-peligro">
          Limpiar Todos los Gastos
        </button>
      )}

      {gastos.length === 0 ? (
        <div className="sin-gastos">
          <p>No hay gastos registrados todavía.</p>
          <p>¡Comienza agregando tu primer gasto!</p>
        </div>
      ) : (
        <>
          <div className="controles-lista">
            <p>Total de gastos: {gastos.length}</p>

            <div className="botones-orden">
              <button onClick={() => ordenarGastos('fecha')} className="boton-pequeño">
                Ordenar por fecha
              </button>
              <button onClick={() => ordenarGastos('cantidad')} className="boton-pequeño">
                Ordenar por cantidad
              </button>
            </div>

            <div className="filtro-categoria">
              <label htmlFor="filtro">Filtrar por categoría: </label>
              <select
                id="filtro"
                value={categoriaFiltro}
                onChange={(e) => setCategoriaFiltro(e.target.value)}
              >
                {categorias.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="lista-gastos">
            {gastosFiltrados.map(gasto => (
              <GastoItem 
                key={gasto.id}
                gasto={gasto}
                onEliminar={eliminarGasto}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default ListaGastos
