import { Link } from 'react-router-dom'

function Inicio() {
  return (
    <div className="inicio-container">
      <h2>Mi Gestor de Gastos Personales</h2>
      <p>Esta aplicación te ayudará a llevar un registro de tus gastos como estudiante.</p>
      
      <div className="opciones">
        <h3>¿Qué deseas hacer?</h3>
        <div className="botones-inicio">
          <Link to="/agregar" className="boton-principal">
            Agregar un nuevo gasto
          </Link>
          <Link to="/lista" className="boton-secundario">
            Ver mis gastos
          </Link>
          <Link to="/resumen" className="boton-secundario">
            Ver resumen de gastos
          </Link>
        </div>
      </div>

      <div className="info-inicio">
        <h3>Características:</h3>
        <ul>
          <li>Registra tus gastos diarios</li>
          <li>Categoriza por tipo de gasto</li>
          <li>Visualiza tu historial</li>
          <li>Obtén un resumen de tus gastos</li>
        </ul>
      </div>
    </div>
  )
}

export default Inicio