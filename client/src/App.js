import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Search from './components/Search';
import BookFlight from './components/BookFight'
import theme from "./utility/CustomTheme"

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import { ThemeProvider } from "@material-ui/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/search" exact component={Search} />
          <Route path="/book_flight" exact component={BookFlight} />
        </Switch>
      </Router>

      {/* testing */}

    </ThemeProvider>
  );
}

export default App;
