import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const urlLogin = "http://localhost:9000/api/usuarios";
const cookies = new Cookies();

class PageLogin extends Component {
    state = {
        form: {
            userEmail: '',
            userPassword: ''
        }
    }
    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
    }

    iniciarSesion = async () => {
        let name = this.state.form.userEmail
        let pwd = this.state.form.userPassword
        if (name.length <= 0 || pwd.length <= 0 || !name.trim() || !pwd.trim()) {
            Swal.fire({
                icon: 'error',
                title: 'Todos los campos son obligatorios',
            })
            return
        }

        await axios.get(urlLogin + "/" + name + "/" + pwd)
            .then(response => {
                //console.log(response.data)
                return response.data
            }).then(response => {
                if (response.length > 0) {
                    let resp = response[0] // para evitar llamados tan largos con corchetes
                    cookies.set("usu_id", resp.usu_id, { path: "/" })/// el path es para que se puedan acceder de cualquier pagina
                    cookies.set("usu_email", resp.usu_email, { path: "/" })
                    cookies.set("usu_nombres", resp.usu_nombres, { path: "/" })
                    cookies.set("usu_apellidos", resp.usu_apellidos, { path: "/" })
                    Swal.fire({      /// Muestra mensaje de bienvenida.
                        position: 'top-center',
                        icon: 'success',
                        title: `¡Bienvenid@ ${resp.usu_nombres}!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTimeout(() => {
                        window.location.href = './inicio'
                    }, 1500);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Email y/o contraseña incorrectos',
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })

    }
    render() {
        return (<div className="container p-3">
            <div className="card m-3">
                <div className="row g-0 d-flex align-items-center">
                    <div className="col-lg-4 col-sm-12 d-lg-flex">
                        <img src="https://img.freepik.com/vector-gratis/ilustracion-dia-nacional-deporte_23-2148995301.jpg?w=2000" alt="sports image"
                            className="w-100" />
                    </div>
                    <div className="col-lg-8">
                        <div className="card-body py-5 px-md-5">
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="userEmail">Correo Electrónico</label>
                                    <input type="email" onChange={this.handleChange} className="form-control" id="userEmail" name="userEmail" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="userPassword">Contraseña</label>
                                    <input type="password" onChange={this.handleChange} className="form-control" id="userPassword" name="userPassword" />
                                </div>
                                <button type="button" onClick={() => this.iniciarSesion()} className="btn btn-primary btn-block mb-4">Ingresar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default PageLogin