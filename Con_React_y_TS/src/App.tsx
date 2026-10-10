import { Routes, Route } from 'react-router-dom'
import NavBar from './components/organism/Navbar'
import Inicio from './components/pages/Inicio'
import Nosotros from './components/pages/Nosotros'
import Servicios from './components/pages/Servicios'
import Consejos from './components/pages/Consejos'
import Contacto from './components/pages/Contacto'
import Medicamentos from './components/pages/Medicamentos'


function App() {

  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path = '/'
          element = {<Inicio />}
        />

        <Route
          path = '/nosotros'
          element = {<Nosotros />}
        />

        <Route
          path = '/servicios'
          element = {<Servicios />}
        />

        <Route
          path = '/consejos'
          element = {<Consejos />}
        />

        <Route
          path = '/contacto'
          element = {<Contacto />}
        />

        <Route
          path = '/medicamentos'
          element = {<Medicamentos />}
        />
      </Routes>
    </>
  )
}

export default App