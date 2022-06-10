import {Component} from 'react'

//import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component'; 

class App extends Component {

  constructor(){
    super();
    this.state = {
      monsters:[],
      searchField: ''
    }
  }

  //primera vez que el componente se crea, primera vez que se crea la instnacia de este
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(
      (users)=> this.setState(
        ()=>
      {
        return {monsters:users}
      }
      ))
  }

  onSearchChange = (event)=>{

    const searchField = event.target.value.toLowerCase();
    this.setState(()=>{return {searchField};})
    }

  render(){

    const { monsters, searchField} = this.state;
    const { onSearchChange} = this;

    const filteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className='app-title'>Monster rolodex</h1>
        <SearchBox className='monsters-search-box' placeholder='Monster search placeholder' onChangeHandler = {onSearchChange}></SearchBox>
        <CardList monsters = {filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
