import type { Gasto } from '../types/Gasto'

interface GastoItemProps {
  gasto: Gasto
  onEliminar: (id: string) => void
}

function GastoItem({ gasto, onEliminar }: GastoItemProps) {
  const formatearFecha = (fecha: string) => {
    const date = new Date(fecha)
    const dia = String(date.getDate()).padStart(2, '0')
    const mes = String(date.getMonth() + 1).padStart(2, '0')
    const anio = date.getFullYear()
    return `${dia}/${mes}/${anio}`
  }

  const obtenerEmoji = (categoria: string) => {
    const emojis = {
      comida: '🍔',
      transporte: '🚌',
      entretenimiento: '🎮',
      estudios: '📚',
      salud: '🩺',
      otros: '📌'
    }
    return emojis[categoria as keyof typeof emojis] || '📌'
  }

  const coloresCategoria: Record<Gasto['categoria'], string> = {
    comida: '#FFF3E0',
    transporte: '#E3F2FD',
    entretenimiento: '#FCE4EC',
    estudios: '#E8F5E9',
    salud: '#F3E5F5',
    otros: '#ECEFF1',
  }

  const estiloItem: React.CSSProperties = {
    backgroundColor: coloresCategoria[gasto.categoria],
    border: gasto.cantidad > 50 ? '2px solid #d32f2f' : '1px solid #ccc',
    borderRadius: '10px',
    padding: '12px',
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  }

  return (
    <div className="gasto-item" style={estiloItem}>
      <div className="gasto-info">
        <div className="gasto-header">
          <span className="gasto-emoji">{obtenerEmoji(gasto.categoria)}</span>
          <h3>{gasto.descripcion}</h3>
        </div>
        <div className="gasto-detalles">
          <span className="gasto-categoria">{gasto.categoria}</span>
          <span className="gasto-fecha">{formatearFecha(gasto.fecha)}</span>
        </div>
      </div>
      <div className="gasto-acciones">
        <span className="gasto-cantidad">S/. {gasto.cantidad.toFixed(2)}</span>
        <button
          onClick={() => onEliminar(gasto.id)}
          className="boton-eliminar"
          title="Eliminar gasto"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default GastoItem
