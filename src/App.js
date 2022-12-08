import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Component } from 'react';

function sumar(x,y){
  return <h1 className='text-center fw-bold'>SUMA: {x+y}</h1>
}

class App extends Component {
  render() {
    return (
      <div className="container">
        <div class="match bg-success">
          <div class="match-header">
            <div class="match-status">Live</div>
            <div class="match-actions">
              <button class="btn-icon"><i class="material-icons-outlined">grade</i></button>
              <button class="btn-icon"><i class="material-icons-outlined">add_alert</i></button>
            </div>
          </div>
          <div class="match-content">
            <div class="column">
              <div class="team team--home">
                <h2 class="team-name bg-white p-3">Chelsea</h2>
              </div>
            </div>
            <div class="column">
              <div class="match-details">
                <div class="">
                  <h3 className='fw-bold text-white'>3 May at 17:30</h3>
                </div>
                <div class="match-score text-white">
                  <span class="match-score-number match-score-number--leading">3</span>
                  <span class="match-score-divider">:</span>
                  <span class="match-score-number">1</span>
                </div>
                <div class="match-time-lapsed">
                  72'
                </div>
                {/* <div class="match-bet-options">
                  <button class="match-bet-option">1.48</button>
                  <button class="match-bet-option">7.84</button>
                  <button class="match-bet-option">3.24</button>
                </div> */}
                <button class="btn btn-primary mt-2">Editar Marcador</button>
              </div>
            </div>
            <div class="column">
              <div class="team team--away">
                <h2 class="team-name bg-white p-3"> Man Utd</h2>
              </div>
            </div>
          </div>
        </div>
        {sumar(10,20)}
      </div>
    );
  }
}

export default App;
