import React, { Component } from "react";
import Cookies from 'universal-cookie'

const cookies = new Cookies();

class PageInicioAdmin extends Component{
    render(){
        if (!cookies.get("usu_nombres")) {
            window.location.href="/PageLogin"
            return
        }
        return <h1 className="container">Bienvenido {cookies.get("usu_nombres")}</h1>
    }
}
export default PageInicioAdmin