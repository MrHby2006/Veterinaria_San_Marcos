import { Routes, Route } from 'react-router-dom'
import NavBar from './components/organism/Navbar'
import Inicio from './components/pages/Inicio'
import Nosotros from './components/pages/Nosotros'
import Servicios from './components/pages/Servicios'
import Consejos from './components/pages/Consejos'
import Contacto from './components/pages/Contacto'
import Medicamentos from './components/pages/Medicamentos'
import Footer from './components/organism/Footer'
import DetalleMedicamento from './components/pages/DetalleMedicamento'
import DetalleConsejo from './components/pages/DetalleConsejo'
import Carrito from './components/pages/Carrito'
import Citas from './components/pages/Citas'
import Login from './components/pages/Login'
import Registro from './components/pages/Registro'
import ReservarHora from './components/pages/ReservarHora'
import Admin from './components/pages/Admin'
import Admin_servicios from './components/pages/Admin_servicios'
import Admin_usuarios from './components/pages/Admin_usuarios'
import Recepcionista from './components/pages/Recepcionista'


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

        <Route 
          path='/medicamento/:id'
          element={<DetalleMedicamento />}
        />

        <Route
          path = '/consejo/:id'
          element = {<DetalleConsejo />}
        />

        <Route
          path = '/carrito'
          element = {<Carrito />}
        />

        <Route
          path = '/citas'
          element = {<Citas />}
        />

        <Route
          path = '/login'
          element = {<Login />}
        />

        <Route
          path = '/registro'
          element = {<Registro />}
        />

        <Route
          path = '/reservar/:servicio'
          element = {<ReservarHora />}
        />

        <Route
          path = '/admin'
          element = {<Admin />}
        />

        <Route
          path = '/admin/servicios'
          element = {<Admin_servicios />}
        />

        <Route
          path = '/admin/usuarios'
          element = {<Admin_usuarios />}
        />

        <Route
          path = '/recepcionista'
          element = {<Recepcionista />}
        />
      </Routes>

      <Footer />
    </>
  )
}

export default App