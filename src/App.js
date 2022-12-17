import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import { Component } from 'react';
import Menu from './components/Menu';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageDeportes from './components/PageDeportes';
import PageEquipos from './components/PageEquipos';
import PageUsuarios from './components/PageUsuarios';
import PageEventos from './components/PageEventos';
import MenuInicial from './components/MenuInicial';
import PageLogin from './components/PageLogin';
import PageLogout from './components/PageLogout';
import Page404 from './components/Page404';
import PageInicioAdmin from './components/PageInicioAdmin';
import PageInicioAllUsers from './components/PageInicioAllUsers';

class App extends Component {
  render() {
    return (
      <>
      <Router>
        <MenuInicial />
        <Routes>
          <Route path='/' element={<PageInicioAllUsers />} />
          <Route path='/inicio' element={<PageInicioAdmin />} />
          <Route path='/PageLogin' element={<PageLogin/>} />
          <Route path='/PageLogout' element={<PageLogout />} />
          <Route path='/PageDeportes' element={<PageDeportes />} />
          <Route path='/PageEquipos' element={<PageEquipos />} />
          <Route path='/PageEventos' element={<PageEventos />} />
          <Route path='/PageUsuarios' element={<PageUsuarios />} />
          <Route path='/logout' element={<PageLogout />} />
          <Route path='*' element={<Page404 />}/>
        </Routes>
        
      </Router>
      {/* <Router>
        <Menu />

        <Routes>
          <Route path='/' element={<PageInicio />} />

        </Routes>
        
      </Router> */}
  
      </>
    );
  }
}

export default App;