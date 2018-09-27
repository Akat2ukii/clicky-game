import React, { Component } from 'react';
import './App.css';
import MatchCard from "./components/MatchCard";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import pokemon from "./pokecards.json";

let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Do you have what it takes to catch'em all? Give it a shot, but remember you can't catch two of a kind or you'll have to try over.";

class App extends Component {
    
    // Setting this.state.pokemon to the json array
    state = {
        pokemon,
        correctGuesses,
        bestScore,
        clickMessage
    };

    setClicked = id => {

        
        const pokemon = this.state.pokemon;

    
        const clickedMatch = pokemon.filter(pokemon => pokemon.id === id);

        if (clickedMatch[0].clicked){

            console.log ("Correct Guesses: " + correctGuesses);
            console.log ("Best Score: " + bestScore);

            correctGuesses = 0;
            clickMessage = "Dang! You already caught that one! Now you have to start over!"

            for (let i = 0 ; i < pokemon.length ; i++){
                pokemon[i].clicked = false;
            }

            this.setState({clickMessage});
            this.setState({correctGuesses });
            this.setState({pokemon});

        } else if (correctGuesses < 11) {

            clickedMatch[0].clicked = true;

            correctGuesses++;
            
            clickMessage = "Sweet! You haven't caught that one yet! Keep going!";

            if (correctGuesses > bestScore){
                bestScore = correctGuesses;
                this.setState({ bestScore });
            }

            pokemon.sort(function(a, b){return 0.5 - Math.random()});

            this.setState({ pokemon });
            this.setState({correctGuesses});
            this.setState({clickMessage});
        } else {

            // Set its value to true
            clickedMatch[0].clicked = true;

            // restart the guess counter
            
            correctGuesses = 0;
            clickMessage = "Hey, you caught them all. Feel like trying again?";
            bestScore = 12;
            this.setState({ bestScore });
            
            for (let i = 0 ; i < pokemon.length ; i++){
                pokemon[i].clicked = false;
            }

            // Shuffle the array to be rendered in a random order
            pokemon.sort(function(a, b){return 0.5 - Math.random()});

            this.setState({ pokemon });
            this.setState({correctGuesses});
            this.setState({clickMessage});

        }
    };

    render() {
        return (
            <Wrapper>
                <Title>Gatta Catch'em All!</Title>
        
                <h3 className="scoreSummary">
                    {this.state.clickMessage}
                </h3>
                
                <h3 className="scoreSummary">
                    Correct Guesses: {this.state.correctGuesses} 
                    <br />
                    Best Score: {this.state.bestScore} 
                </h3>

                {this.state.pokemon.map(match => (
                    <MatchCard
                        setClicked={this.setClicked}
                        id={match.id}
                        key={match.id}
                        image={match.image}
                    />
                ))}
            </Wrapper>
        );
    }
}

export default App;