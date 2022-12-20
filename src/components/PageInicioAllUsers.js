import React, { Component } from "react";
import axios from "axios";

const url = 'http://127.0.0.1:9000/api/eventos'

class PageInicioAllUsers extends Component {
    state = {
        dataEventos: [],
    }
    peticionGetEventos = () => {
        axios.get(url + '/consulta').then(response => {
            this.setState({ dataEventos: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }
    componentDidMount() {
        this.peticionGetEventos();
    }
    render() {
        return <div className="container p-2 bg-warning container-image">
            <div className="scroll-left h1 mt-4 p-2 title-main fw-bold text-danger rounded bg-white text-center">
                <span>Principales eventos =)</span>
            </div>
            <div className="row d-flex justify-content-around mb-5">
                {
                    this.state.dataEventos.map(evento => {
                        return (
                            <div className="card col-md-5 col-12 border border-dark my-3 card-sports-initial" key={evento.eve_id} >
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
        </div>
    }
}
export default PageInicioAllUsers