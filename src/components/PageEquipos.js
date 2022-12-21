import React, { Component } from "react";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const url = 'http://141.148.53.245:9000/api/equipos';
const field_id = '/equ_id/'

class PageEquipos extends Component {
    state = {
        data: [],
        modalInsertar: false,
        tipoModal: '',
        form: {
            equ_id: '',
            equ_nombre: '',
            equ_imagen: '',
        }
    }
    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }
    peticionPost = async (e) => {
        //delete this.state.form.usu_id
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
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: "Debe llenar todos los campos",
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    peticionPut = () => {
        // console.log(Object.keys(this.state.form)[0])
        axios.put(url + field_id + this.state.form.equ_id, this.state.form).then(res => {
            this.modalInsertar();
            this.peticionGet();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "¡Actualizado correctamente!",
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
            if (result.isConfirmed) {
                axios.delete(url + field_id + id).then(res => {
                    this.peticionGet();
                    Swal.fire(
                        '¡Eliminado!',
                        'Registro eliminado',
                        'success'
                    )
                }).catch(e =>{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: "No puedes eliminarlo ya que hay eventos asociados",
                    })
                })

            }
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
    }

    seleccionarEquipo = (equipo) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                equ_id: equipo.equ_id,
                equ_nombre: equipo.equ_nombre,
                equ_imagen: equipo.equ_imagen
            }
        })
    }

    componentDidMount() {
        this.peticionGet();
    }
    render() {
        const form = this.state.form;
        if (!cookies.get("usu_nombres")) {
            window.location.href="/PageLogin"
            return
        }
        return <div className="container container-image p-3">
            <button className="btn btn-success my-2 fw-bold shadow" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Nuevo</button>
            <div className="row g-4 shadow">
                {
                    this.state.data.map(equipo => {
                        return (
                            <div className="col-md-3 col-sm-12" key={equipo.equ_id}>
                                <div className="card card-sports-initial border-dark p-3 d-flex justify-content-center">
                                    <img src={equipo.equ_imagen ? equipo.equ_imagen : "https://www.control.vg/wp-content/themes/crystalskull/img/defaults/default.jpg"} height="200" width="200" className="card-img-top" alt="equipo-imagen" />
                                    <div className="card-body">
                                        <p className="card-title h5 text-center">{equipo.equ_nombre}</p>
                                    </div>
                                    <div className="card-footer border-dark d-flex justify-content-center align-items-center">
                                        {/* <small className="text-muted m-0 p-0">Last updated 3 mins ago</small> */}
                                        <div className="text-center">
                                            <button className='btn btn-primary mx-2'onClick={() => { this.seleccionarEquipo(equipo); this.modalInsertar(); }}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button className="btn btn-danger" onClick={() => { this.peticionDelete(equipo.equ_id) }} ><FontAwesomeIcon icon={faTrash} /></button>
                                        </div>
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
                            <p className="text-center h4">Agregar Equipo</p> :
                            <p className="text-center h4">Editar Equipo</p>
                    }
                </ModalHeader>

                <ModalBody>
                    <form id="modalFormulario">
                        {this.state.tipoModal === 'actualizar' ?
                            <>
                                <label htmlFor="equ_id">Id</label>
                                <input className="form-control" type="text" name="equ_id" onChange={this.handleChange} disabled value={form ? form.equ_id : this.state.length + 1} />
                            </> : ""}
                        <label htmlFor="equ_nombre">Nombre</label>
                        <input className="form-control" type="text" name="equ_nombre" id="equ_nombre" onChange={this.handleChange} value={form ? form.equ_nombre : ''} required />
                        
                        <label htmlFor="equ_imagen">Imagen</label>
                        <div className="input-group my-3">
                            <span className="input-group-text fw-bold" id="equ_imagen">URL</span>
                            <input className="form-control" type="text" name="equ_imagen" id="equ_imagen" placeholder="https://bestimagesintheworld/nbaimage.png" onChange={this.handleChange} value={form ? form.equ_imagen : ''} required />
                        </div>
                        <span className=" text-danger fw-bold">* Formato recomendado: png</span>
                    </form>
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

export default PageEquipos