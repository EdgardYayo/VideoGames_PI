import './App.css';
import Home from './components/Home/Home';
import {Route} from 'react-router-dom' 
import Detail from './components/Detail/Detail';
import Landing from './components/Landing/Landing';
import Form from './components/Form/Form';



function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Landing />
      </Route>
      <Route exact path='/home'>
        <Home />
      </Route>
      <Route exact path='/game/:id' component={Detail} />
      <Route exact path='/form'>
        <Form />
      </Route>
    </div>
  );
}

export default App;
