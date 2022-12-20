import React, { Component } from "react";
import { faArrowAltCircleLeft, faArrowAltCircleRight, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
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
            eve_imagen_e1: '',
            eve_imagen_e2: '',
        }
    }
    peticionGetEventos = () => {
        axios.get(url + '/consulta').then(response => {
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
        await axios.post(url, this.state.form).then(res => {
            this.modalInsertar(); /// para cerrar la modal
            this.peticionGetEventos(); /// para actualizar el listado

            Swal.fire({      /// Muestra mensaje de confirmado.
                position: 'center',
                icon: 'success',
                title: "¡Se ha registrado correctamente!",
                showConfirmButton: false,
                timer: 1500
            })
            console.log(res)
        }).catch(error => {
            Swal.fire({      /// Muestra mensaje de confirmado.
                position: 'center',
                icon: 'error',
                title: "Debe llenar todos los campos",
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    peticionDelete = (id) => {
        Swal.fire({
            title: '¿Esta segur@?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si!',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            console.log(result.isConfirmed)
            if (result.isConfirmed) {
                axios.delete(url + '/eve_id/' + id).then(res => {
                    this.peticionGetEventos();
                    Swal.fire(
                        '¡Eliminado!',
                        'Eventos eliminado',
                        'success'
                    )
                })

            }
        })
    }
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar })
    }
    seleccionarEvento = (evento) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                eve_id: evento.eve_id,
                eve_equipo1: evento.equipo1,
                eve_equipo2: evento.equipo2,
                eve_marcador_equipo1: evento.eve_marcador_equipo1,
                eve_marcador_equipo2: evento.eve_marcador_equipo2,
                eve_tipo_deporte: evento.dep_nombre,
                eve_fecha: evento.eve_fecha,
                eve_hora: evento.eve_hora,
                eve_imagen_e1: evento.equipo1_img,
                eve_imagen_e2: evento.equipo2_img
            }
        })
        console.log(this.state.form)
        console.log(evento)
    }
    handleChange = async (e) => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
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
        return <div className="container-image container p-3">
            <button className="btn btn-success my-2 fw-bold shadow" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Crear Evento</button>
            <div className="row d-flex justify-content-around mb-5">
                {
                    this.state.dataEventos.map(evento => {
                        return (
                            <div className="card card-sports-initial col-md-5 col-12 border border-dark my-3 card-sports" key={evento.eve_id} >
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
                                        <div className="col-12 mt-3 mb-2" >
                                            <button className="btn btn-warning mx-1" onClick={() => { this.seleccionarEvento(evento); this.modalInsertar() }} ><FontAwesomeIcon icon={faEdit} /></button>
                                            <button className="btn btn-danger mx-1" onClick={() => { this.peticionDelete(evento.eve_id) }} ><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>
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
                                    {this.state.tipoModal === 'actualizar' ?
                                        <img className="img-team" src={form.eve_imagen_e1} alt="team1" />
                                        :
                                        <select className="text-center rounded-bottom border border-dark shadow-lg" name="eve_equipo1" onChange={this.handleChange}>
                                            <option value="default" >Equipo 1</option>
                                            {this.state.dataEquipos.map(equipo => {
                                                return (
                                                    <option value={equipo.equ_id} key={equipo.equ_id}>{equipo.equ_nombre}</option>
                                                )
                                            })}
                                        </select>
                                    }
                                </div>
                                <h2>{this.state.tipoModal === 'actualizar' ? form.eve_equipo1 : "Equipo 1"}</h2>
                            </div>
                            <div className="col-md-4 col-12 d-flex justify-content-center flex-wrap">
                                <div className="">
                                    <select className="col-12 text-center h5 bg-info rounded-bottom border-top-0 border border-dark shadow-lg" name="eve_tipo_deporte" onChange={this.handleChange}>
                                        <option value="default">Seleccionar</option>
                                        {this.state.dataDeportes.map(deporte => {
                                            return (
                                                <option value={deporte.dep_id} key={deporte.dep_id}>{deporte.dep_nombre}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Fecha</label>
                                    <input type="date" className="fw-bold text-center" id="date" name="eve_fecha" onChange={this.handleChange} value={form ? form.eve_fecha.slice(0, 10) : ""} />
                                    <label>Hora</label>
                                    <input type="time" className="fw-bold text-center" id="time" name="eve_hora" onChange={this.handleChange} value={form ? form.eve_hora : ""} />
                                </div>
                                <div className="col-12">
                                    {this.state.tipoModal === 'actualizar' ?
                                        <>
                                            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="align-items-center h4" />
                                            <span className="">0</span>
                                            <span className="">:</span>
                                            <span className="">0</span>
                                            <FontAwesomeIcon icon={faArrowAltCircleRight} className="align-items-center h4" />
                                        </> :
                                        <>
                                            <span className="match-score-number">0</span>
                                            <span className="match-score-divider">:</span>
                                            <span className="match-score-number">0</span>
                                        </>
                                    }
                                </div>
                                {/* <div className="col-12 match-time-lapsed w-100">
                                    00'
                                </div> */}
                            </div>
                            <div className="col-md-4 col-12 d-flex justify-content-center flex-wrap">
                                <div className="team-logo col-12">
                                    {this.state.tipoModal === 'actualizar' ?
                                        <img className="img-team" src={form.eve_imagen_e2} alt="team2" />
                                        :
                                        <select className="text-center rounded-bottom border border-dark shadow-lg" name="eve_equipo2" onChange={this.handleChange}>
                                            <option value="default" >Equipo 2</option>
                                            {this.state.dataEquipos.map(equipo => {
                                                return (
                                                    <option value={equipo.equ_id} key={equipo.equ_id}>{equipo.equ_nombre}</option>
                                                )
                                            })}
                                        </select>
                                    }
                                </div>
                                <h2>{this.state.tipoModal === 'actualizar' ? form.eve_equipo2 : "Equipo 2"}</h2>
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