import { useState,useEffect } from 'react';

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component'; 

const App = () =>{
console.log('render')
  const [searchField,setSearchField] = useState('');
  const [monsters,setMonsters] = useState([]);
  const [filteredMonsters,setFilteredMonsters] = useState(monsters);

  //primer valor es la funcion que crea ddependencias, el segunddo array son las dependdencias de cuando quiero qeu se vuelva
  //a ejecutar la funcion, el [] vacio implica nunca mas quiero que se vuelva a ejecutar, es el equivalente a componentDidMount
  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then(
      (users)=> setMonsters(users))
  },[])

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((monster)=>{
      return monster.name.toLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters)
  },[monsters,searchField])

  const onSearchChange = (event)=>{
      const searchFieldString = event.target.value.toLowerCase();
      setSearchField(searchFieldString);
    }

  

  return(<div className="App">
    <h1 className='app-title'>Monster rolodex</h1>
    <SearchBox className='monsters-search-box' placeholder='Monster search placeholder' onChangeHandler = {onSearchChange}></SearchBox>
    <CardList monsters = {filteredMonsters}></CardList>
</div>)
}

/*class App extends Component {

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
}*/

export default App;
