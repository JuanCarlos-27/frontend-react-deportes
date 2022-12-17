import React, { Component } from "react";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import axios from "axios";
import Cookies from 'universal-cookie'
import Swal from "sweetalert2";

const cookies = new Cookies();
const url = 'http://127.0.0.1:9000/api/eventos'
class PageEventos extends Component {
    state = {
        dataEventos: [],
        dataEquipos: [],
        dataDeportes: [],
        modalInsertar: false,
        tipoModal: '',
        form: {
            eve_id: '',
            eve_equipo1: '',
            eve_equipo2: '',
            eve_marcador_equipo1: '',
            eve_marcador_equipo2: '',
            eve_tipo_deporte: '',
            eve_fecha: '',
            eve_hora: '',
        }
    }
    peticionGetEventos = () => {
        axios.get(url+'/consulta').then(response => {
            this.setState({ dataEventos: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionGetEquipos = () => {
        axios.get('http://127.0.0.1:9000/api/equipos/').then(response => {
            this.setState({ dataEquipos: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionGetDeportes = () => {
        axios.get('http://127.0.0.1:9000/api/deportes/').then(response => {
            this.setState({ dataDeportes: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionPost = async (e) => {
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar(); /// para cerrar la modal
            this.peticionGet(); /// para actualizar el listado
            Swal.fire({      /// Muestra mensaje de confirmado.
                position: 'top-end',
                icon: 'success',
                title: "¡Se ha registrado correctamente!",
                showConfirmButton: false,
                timer: 1500
            })
        }).catch(error => {
            console.log(error.message);
        })
    }
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar })
    }
    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form);
    }
    handleSelect = e =>{
        console.log(e)
    }
    componentDidMount() {
        this.peticionGetEventos();
        this.peticionGetEquipos();
        this.peticionGetDeportes();
    }
    render() {
        const form = this.state.form;
        if (!cookies.get("usu_nombres")) {
            window.location.href = "/PageLogin"
            return
        }
        return <div className="container">
            <button className="btn btn-success my-2 fw-bold shadow" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Crear Evento</button>
            <div className="row d-flex justify-content-around">
                {
                    this.state.dataEventos.map(evento => {
                        return (
                            <div className="card col-md-5 col-12 border border-dark my-1" key={evento.eve_id} >
                                <div className="d-flex flex-wrap text-center px-1">
                                    <div className="col-md-4 col-12 d-flex justify-content-center flex-wrap">
                                        <div className="team-logo col-12">
                                            <img className="img-team" src={evento.equipo1_img} alt="team1" />
                                        </div>
                                        <h2 className="lh-1">{evento.equipo1}</h2>
                                    </div>
                                    <div className="col-md-4 col-12 d-flex justify-content-center flex-wrap">
                                        <div className="col-12 h4 bg-info rounded-bottom border-top-0 border border-dark shadow-lg">
                                            {evento.dep_nombre}
                                        </div>
                                        <div className="col-12">
                                            {(evento.eve_fecha).slice(0, 10)} <strong>{evento.eve_hora}</strong>
                                        </div>
                                        <div className="col-12">
                                            <span className="match-score-number">{evento.eve_marcador_equipo1}</span>
                                            <span className="match-score-divider">:</span>
                                            <span className="match-score-number">{evento.eve_marcador_equipo2}</span>
                                        </div>
                                        {/* <div className="col-12 match-time-lapsed">
                                            00'
                                        </div> */}
                                    </div>
                                    <div className="col-md-4 col-12 d-flex justify-content-center flex-wrap">
                                        <div className="team-logo col-12">
                                            <img className="img-team" src={evento.equipo2_img} alt="team2" />
                                        </div>
                                        <h2 className="lh-1">{evento.equipo2} </h2>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <Modal isOpen={this.state.modalInsertar}>
                <ModalHeader style={{ display: 'block' }}>
                    {
                        this.state.tipoModal === 'insertar' ?
                            <p className="text-center h4">Crear Evento</p> :
                            <p className="text-center h4">Modificar Evento</p>
                    }
                </ModalHeader>

                <ModalBody>
                    <div className="border border-dark">
                        <div className="d-flex flex-wrap text-center">
                            <div className="col-md-4 col-12 d-flex justify-content-center flex-wrap">
                                <div className="team-logo col-12">
                                    <select className="text-center rounded-bottom border border-dark shadow-lg">
                                        <option>Equipo 1 <FontAwesomeIcon icon={faPlus} /></option>
                                        {this.state.dataEquipos.map(equipo => {
                                            return (
                                                <option value={equipo.equ_id} key={equipo.equ_id} >{equipo.equ_nombre}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <h2 className="">Equipo 1</h2>
                            </div>
                            <div className="col-md-4 col-12 d-flex justify-content-center flex-wrap">
                                <div className="">
                                    <select className="col-12 text-center h5 bg-info rounded-bottom border-top-0 border border-dark shadow-lg" id="ddlEquipo1">
                                        <option >Seleccionar <FontAwesomeIcon icon={faPlus} /></option>
                                        {this.state.dataDeportes.map(deporte=>{
                                            return (
                                                <option value={deporte.dep_id} key={deporte.dep_id}>{deporte.dep_nombre}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Fecha</label>
                                    <input type="date" className="fw-bold text-center" id="time" />
                                    <label>Hora</label>
                                    <input type="time" className="fw-bold text-center" id="time" />
                                </div>
                                <div className="col-12">
                                    <span className="match-score-number">0</span>
                                    <span className="match-score-divider">:</span>
                                    <span className="match-score-number">0</span>
                                </div>
                                {/* <div className="col-12 match-time-lapsed w-100">
                                    00'
                                </div> */}
                            </div>
                            <div className="col-md-4 col-12 d-flex justify-content-center flex-wrap">
                                <div className="team-logo col-12">
                                    <select className="text-center rounded-bottom border border-dark shadow-lg">
                                        <option >Equipo 2 <FontAwesomeIcon icon={faPlus} /></option>
                                        {this.state.dataEquipos.map(equipo => {
                                            return (
                                                <option value={equipo.equ_id} key={equipo.equ_id} >{equipo.equ_nombre}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <h2 className="">Equipo 2</h2>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    {
                        this.state.tipoModal === 'insertar' ? <button className="btn btn-success" onClick={() => this.peticionPost()}>Insertar</button>
                            : <button className="btn btn-success" onClick={() => this.peticionPut()}>Modificar</button>
                    }
                    <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>
    }
}

export default PageEventos