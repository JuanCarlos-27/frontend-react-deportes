import React, { Component } from "react";
import Cookies from 'universal-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays, faPeopleGroup, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const cookies = new Cookies();

class PageInicioAdmin extends Component {
    state = {
        totalEventos: 0,
        totalUsuarios: 0,
        totalEquipos: 0
    }

    peticionGetEventos = () => {
        axios.get('http://141.148.53.245:9000/api/eventos/').then(response => {
            this.setState({ totalEventos: response.data.length })
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionGetEquipos = () => {
        axios.get('http://141.148.53.245:9000/api/equipos/').then(response => {
            this.setState({ totalEquipos: response.data.length })
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionGetUsuarios= () => {
        axios.get('http://141.148.53.245:9000/api/usuarios/').then(response => {
            this.setState({ totalUsuarios: response.data.length })
        }).catch(error => {
            console.log(error.message);
        })
    }
    componentDidMount(){
        this.peticionGetEquipos();
        this.peticionGetEventos();
        this.peticionGetUsuarios();
    }
    
    render() {
        if (!cookies.get("usu_nombres")) {
            window.location.href = "/PageLogin"
            return
        }
        return (
            <div className="container-image container p-5">
                <h1 className="bg-white text-center p-3">Bienvenid@ {cookies.get("usu_nombres")}</h1>
                <div className="row d-flex flex-wrap justify-content-around text-center rounded">
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4 card-sports-initial rounded" style={{backgroundColor: "#FDA849"}}>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-4 bg-success d-flex align-items-center p-0 justify-content-center ">
                                <FontAwesomeIcon icon={faUser} className="h1" />
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-8 col-8">
                                <h4>Usuarios</h4>
                                <h2>{this.state.totalUsuarios}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4 card-sports-initial rounded" style={{backgroundColor: "#49AEFD"}}>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-4 bg-success d-flex align-items-center p-0 justify-content-center ">
                                <FontAwesomeIcon icon={faCalendarDays} className="h1" />
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-8 col-8">
                                <h4>Eventos</h4>
                                <h2>{this.state.totalEventos}</h2>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6 col-12 mb-2 mt-4 card-sports-initial rounded" style={{backgroundColor: "#F8FD49"}}>
                        <div className="row">
                            <div className="col-lg-3 col-md-4 col-sm-4 col-4 bg-success d-flex align-items-center p-0 justify-content-center ">
                                <FontAwesomeIcon icon={faPeopleGroup} className="h1" />
                            </div>
                            <div className="col-lg-9 col-md-8 col-sm-8 col-8">
                                <h4>Equipos</h4>
                                <h2>{this.state.totalEquipos}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default PageInicioAdmin