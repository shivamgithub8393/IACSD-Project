import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Home from './components/Navbar';
import About from './components/About';
import Contact from './components/Contact';
import Search from './components/Search';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <div>
        <Router>
        <Header />
          <Switch>
            <Route path="/home" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/contact" exact component={Contact} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/search" exact component={Search} />
          </Switch>
        </Router>
      </div>
      
    </div>
  );
}

export default App;
