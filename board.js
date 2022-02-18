import React, {Component} from "react";
import Square from "./square";
import '../styles.css';
import styles from '../'

const calculateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for(let i=0; i<lines.length; i++) {
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
            return squares[a];
    }
    return null;
}

class Board extends Component{
    state = {
        started: false,
        error: '',
        squares: Array(9).fill(null),
        xIsNext: true,
        players: {
            playerX:{
                value: ''
            },
            playerO:{
                value: ''
            }
        },
        nullValues: 9
    }

    handleClick = (i) => {
        if(!this.state.started){
            this.setState({
                error: 'You must start the game first!'
            })
            return;
        }
        this.setState({
            error: ''
        })
        const squares = this.state.squares.slice();
        if(calculateWinner(squares) || squares[i])
            return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares,
            xIsNext: !this.state.xIsNext,
            nullValues: this.state.nullValues - 1
        })
    }

    renderSquare = (i) => {
        return <Square 
                    value={this.state.squares[i]}
                    onClick={() => this.handleClick(i)}
                />
    }

    changeValue = (event, player) => {
        if(this.state.started){
            this.setState({
                error: "Cannot update names while the game is on"
            })
            return;
        }
        let players = this.state.players
        players[player].value = event.target.value
        this.setState({
            players
        })
    }

    resetGame = () => {
        this.setState({
            squares: Array(9).fill(null),
            xIsNext: true,
            players: {
                playerX:{
                    value: ''
                },
                playerO:{
                    value: ''
                }
            },
            nullValues: 9,
            started: false,
            error: ''
        })
    }

    startGame = () => {
        if(this.state.players.playerX.value === '' || this.state.players.playerO.value === ''){
            this.setState({
                error: 'Players must enter their names!'
            })
            return;
        }
        this.setState({
            started: true,
            error: ''
        })
    }

    render(){
        const winner = calculateWinner(this.state.squares);
        let winnerName = winner === 'X' ? this.state.players.playerX.value : this.state.players.playerO.value;
        let status = "";
        if(this.state.nullValues === 9)
            status = 'Player X plays first'
        else if(winner)
            status = `Winner: ${winnerName}`;
        else if(this.state.nullValues === 0)
            status = 'Draw'
        else
            status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`;
    
        return(
            <div className="container">
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
                <div className="playerInfo">
                    <div className="left">
                        Player X
                        <input type="text" onChange={(event) => this.changeValue(event, 'playerX')} value={this.state.players.playerX.value} className="player1" placeholder="Enter your name"></input>
                    </div>
                    <div className="right">
                        Player O
                        <input type="text" onChange={(event) => this.changeValue(event, 'playerO')} value={this.state.players.playerO.value} className="player2" placeholder="Enter your name"></input>
                    </div>
                </div>

                <button className="reset" onClick={this.resetGame}>
                    Reset
                </button>
                <button className="start" onClick={this.startGame}>
                    Start Game
                </button>
                <div className="error">
                    {this.state.error}
                </div>
            </div>
        )
    }
}

export default Board;