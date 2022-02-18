import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import Board from './components/board';

class Game extends Component {
  render(){
    return (
      <div className='game'>
        <div className='game-board'>
          <Board />
        </div>
        <div className='game-info'>

        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Game/>,
  document.getElementById('root')
);