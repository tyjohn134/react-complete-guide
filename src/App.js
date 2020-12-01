import './App.css';
import uuid from 'uuid-random';
import Person from './Person/Person'
import React, { Component } from 'react';

class App extends Component {
  state = {
    persons: [
      { id: uuid(), name: 'Max', age: 28 },
      { id: uuid(), name: 'Manu', age: 29 },
      { id: uuid(), name: 'Stephanie', age: 26 }
    ],
    showPersons: false
  }
  deletePersonHandler = ((personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  })
  nameChangedHandler = ((event, id) => {
    const personIndex = this.state.persons.findIndex((person) => {
      return person.id === id
    });
    const person = {
      ...this.state.persons[personIndex]
    };
    person.name = event.target.value;
    const persons = [...this.state.persons]
    persons[personIndex] = person;
    console.log([persons])
    this.setState({persons: persons})
})

  togglePersonsHandler = () => {
    const doesShow =  this.state.showPersons;
    this.setState({showPersons: !doesShow})
  }
  
  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      fontSize: '12px',
      border: '1px solid blue',
      padding: '8px',
      borderRadius: '20px',
      cursor: 'pointer'
    };

    let persons = null;

    if(this.state.showPersons){
      
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)} 
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}/>
          })}
        </div> 
      );
    }
    
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
        style={style}
        onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
