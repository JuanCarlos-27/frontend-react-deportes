import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from "sweetalert2";
import axios from "axios";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const url = 'http://127.0.0.1:9000/api/deportes';
const field_id = '/dep_id/'

class PageDeportes extends Component {
    state = {
        data: [],
        modalInsertar: false,
        tipoModal: '',
        form: {
            dep_id: '',
            dep_nombre: '',
            dep_descripcion: '',
            dep_imagen: ''
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
            console.log(error.message);
        })
    }
    peticionPut = () => {
        // console.log(Object.keys(this.state.form)[0])
        axios.put(url + field_id + this.state.form.dep_id, this.state.form).then(response => {
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
            title: '¿Esta seguro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si!',
            cancelButtonText: 'Cancelar'
        }).then(result => {
            console.log(result.isConfirmed)
            if (result.isConfirmed) {
                axios.delete(url + field_id + id).then(res => {
                    this.peticionGet();
                    Swal.fire(
                        '¡Eliminado!',
                        'Registro eliminado',
                        'success'
                    )
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

    seleccionarDeporte = (deporte) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                dep_id: deporte.dep_id,
                dep_nombre: deporte.dep_nombre,
                dep_descripcion: deporte.dep_descripcion,
                dep_imagen: deporte.dep_imagen,
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
        if (!cookies.get("usu_nombres")) {
            window.location.href="/PageLogin"
            return
        }
        return <div className="container p-3">
            <button className="btn btn-success shadow my-2 fw-bold" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Nuevo</button>
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {
                    this.state.data.map(deporte => {
                        return (
                            <div className="col" key={deporte.dep_id}>
                                <div className="card h-100">
                                    <img src={deporte.dep_imagen ? deporte.dep_imagen : "https://www.control.vg/wp-content/themes/crystalskull/img/defaults/default.jpg"} height="240" className="card-img-top" alt="deporte-imagen" />
                                    <div className="card-body">
                                        <p className="card-title h5">{deporte.dep_nombre}</p>
                                        <p className="card-text">
                                            {deporte.dep_descripcion}
                                        </p>
                                    </div>
                                    <div className="card-footer d-flex justify-content-between align-items-center">
                                        <small className="text-muted m-0 p-0">Last updated 3 mins ago</small>
                                        <div className="">
                                            <button className='btn btn-primary mx-2'onClick={() => { this.seleccionarDeporte(deporte); this.modalInsertar(); }}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button className="btn btn-danger" onClick={() => { this.peticionDelete(deporte.dep_id) }} ><FontAwesomeIcon icon={faTrash} /></button>
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
                            <p className="text-center h4">Agregar Deporte</p> :
                            <p className="text-center h4">Editar Deporte</p>
                    }
                </ModalHeader>

                <ModalBody>
                    <form id="modalFormulario">
                        {this.state.tipoModal === 'actualizar' ?
                            <>
                                <label htmlFor="dep_id">Id</label>
                                <input className="form-control" type="text" name="dep_id" onChange={this.handleChange} disabled value={form ? form.dep_id : this.state.length + 1} />
                            </> : ""}
                        <label htmlFor="dep_nombre">Nombre</label>
                        <input className="form-control" type="text" name="dep_nombre" id="dep_nombre" onChange={this.handleChange} value={form ? form.dep_nombre : ''} required />
                        <div className="mb-3">
                            <label htmlFor="dep_descripcion" className="form-label">Descripción </label>
                            <textarea className="form-control" type="text" name="dep_descripcion" id="dep_descripcion" placeholder="Hasta 200 caracteres" onChange={this.handleChange} value={form ? form.dep_descripcion : ''} rows={5} maxLength={199} required ></textarea>
                        </div>
                        <label htmlFor="dep_imagen">Imagen</label>
                        <div className="input-group mb-3">
                            <span className="input-group-text fw-bold" id="dep_imagen">URL</span>
                            <input className="form-control" type="text" name="dep_imagen" id="dep_imagen" placeholder="https://imagenesfutbol/soccer-ball.jpg" onChange={this.handleChange} value={form ? form.dep_imagen : ''} required />
                        </div>
                        <span className=" text-danger fw-bold">* Formato recomendado: jpg</span>
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

export default PageDeportes