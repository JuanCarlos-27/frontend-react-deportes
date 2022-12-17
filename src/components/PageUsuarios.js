import React, { Component } from "react";
import axios from "axios"
import { Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";
import Cookies from 'universal-cookie'

const cookies = new Cookies();
const url = 'http://127.0.0.1:9000/api/usuarios';
const field_id = '/usu_id/'

class PageUsuarios extends Component {
    state = {
        data: [],
        modalInsertar: false,
        tipoModal: '',
        form: {
            usu_id: '',
            usu_nombres: '',
            usu_apellidos: '',
            usu_email: '',
            usu_clave: '',
        },
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
        axios.put(url + field_id + this.state.form.usu_id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: "Usuario actualizado!",
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
            confirmButtonText: '¡Si!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(url + field_id + id).then(response => {
                    this.peticionGet();
                })
                Swal.fire(
                    '¡Eliminado!',
                    'Registro eliminado',
                    'success'
                )
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

    seleccionarUsuario = (usuario) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                usu_id: usuario.usu_id,
                usu_email: usuario.usu_email,
                usu_clave: usuario.usu_clave,
                usu_nombres: usuario.usu_nombres,
                usu_apellidos: usuario.usu_apellidos
            }
        })
    }
    componentDidMount() {
        this.peticionGet();
    }
    render() {
        const form = this.state.form
        if (!cookies.get("usu_nombres")) {
            window.location.href="/PageLogin"
            return
        }
        return (
            <div className="container p-3">
                <button className="btn btn-success my-3 shadow fw-bold" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Usuario</button>
                <table className="table table-striped shadow table-light text-center">
                    <thead className="table-secondary">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Email</th>
                            <th>Clave</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.data.map(usuario => {
                                return (
                                    <tr key={usuario.usu_id}>
                                        <td>{usuario.usu_id}</td>
                                        <td>{usuario.usu_nombres}</td>
                                        <td>{usuario.usu_apellidos}</td>
                                        <td>{usuario.usu_email}</td>
                                        <td>{(usuario.usu_clave).slice(0, 2) + "*".repeat((usuario.usu_clave).length)}</td>
                                        <td>
                                            <button className='btn btn-primary mx-2' onClick={() => { this.seleccionarUsuario(usuario); this.modalInsertar(); }}><FontAwesomeIcon icon={faEdit} /></button>
                                            <button className="btn btn-danger" onClick={() => { this.peticionDelete(usuario.usu_id) }}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        {
                            this.state.tipoModal === 'insertar' ?
                                <p className="text-center h4">Agregar Usuario</p> :
                                <p className="text-center h4">Editar Usuario</p>
                        }
                    </ModalHeader>

                    <ModalBody>
                        <form id="modalFormulario">
                            {this.state.tipoModal === 'actualizar' ?
                                <>
                                    <label htmlFor="usu_id">Id</label>
                                    <input className="form-control" type="text" name="usu_id" onChange={this.handleChange} disabled value={form ? form.usu_id : this.state.length + 1} />
                                </> : ""}
                            <label htmlFor="usu_nombres">Nombre</label>
                            <input className="form-control" type="text" name="usu_nombres" id="usu_nombres" onChange={this.handleChange} value={form ? form.usu_nombres : ''} />
                            <label htmlFor="usu_apellidos">Apellido</label>
                            <input className="form-control" type="text" name="usu_apellidos" id="usu_apellidos" onChange={this.handleChange} value={form ? form.usu_apellidos : ''} />
                            <label htmlFor="usu_email">Email</label>
                            <input className="form-control" type="email" name="usu_email" id="usu_email" onChange={this.handleChange} value={form ? form.usu_email : ''} />
                            <label htmlFor="usu_clave">Clave</label>
                            <input className="form-control" type="password" name="usu_clave" id="usu_clave" onChange={this.handleChange} value={form ? form.usu_clave : ''} />
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
        );
    };
}

export default PageUsuarios