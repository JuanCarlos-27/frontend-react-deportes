import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/js/dist/collapse'
import 'bootstrap/js/dist/offcanvas'
import 'bootstrap/js/dist/dropdown'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightFromBracket, faCalendarDays, faFootball, faHouse, faPeopleGroup, faRightToBracket, faUser } from '@fortawesome/free-solid-svg-icons'

import Cookies from 'universal-cookie'
const cookies = new Cookies();


class MenuInicial extends Component {

  state = {
    estaLoguin: false
  }

  componentDidMount() {
    if (cookies.get("usu_nombres")) {
      this.setState({ estaLoguin: true })
    } else {
      this.setState({ estaLoguin: false })
      // window.location.href="./" /// redirigir al inicio
    }
  }

  cerrarSesion() {
    cookies.remove("usu_id", { path: "/" })
    cookies.remove("usu_email", { path: "/" })
    cookies.remove("usu_nombres", { path: "/" })
    cookies.remove("usu_apellidos", { path: "/" })
    //window.location.href="./"
    this.setState({ estaLoguin: false })
  }

  render() {
    return <nav className="navbar navbar-expand-lg bg-light">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link className="navbar-brand col-xl-7 d-flex align-items-center p-0" to={!this.state.estaLoguin?'/':'inicio'}>
          <img src="https://image.winudf.com/v2/image/cmVmZXJlZS5jYXJkcy55ZWxsb3cucmVkX2ljb25fMTU0MDExNzg0Ml8wODA/icon.png?w=184&fakeurl=1" width={50} alt='logo' />
          <span className="h3 m-0 p-0 fw-bold">Eventos deportivos</span>
        </Link>
        <div className="collapse navbar-collapse text-center col-xl-5" id="navbarTogglerDemo03">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" to='/inicio'><FontAwesomeIcon icon={faHouse} /> Inicio</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" to='/PageUsuarios'><FontAwesomeIcon icon={faUser} /> Usuarios</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" to='/PageEventos'><FontAwesomeIcon icon={faCalendarDays} /> Eventos</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" to='/PageDeportes'><FontAwesomeIcon icon={faFootball} /> Deportes</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link" to='/PageEquipos'><FontAwesomeIcon icon={faPeopleGroup} /> Equipos</Link>
            </li>
            <li className="nav-item" hidden={!this.state.estaLoguin}>
              <Link className="nav-link fw-bold text-danger"  onClick={()=> this.cerrarSesion()} to='/PageLogin' ><FontAwesomeIcon icon={faArrowRightFromBracket} /> Salir</Link>
            </li>
            <li className="nav-item" hidden={this.state.estaLoguin} >
              <Link className="nav-link fw-bold" to='/PageLogin'>Iniciar Sesión <FontAwesomeIcon icon={faRightToBracket} /> </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  }
}
export default MenuInicial;