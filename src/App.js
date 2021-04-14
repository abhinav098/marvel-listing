import { BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
import ResourceListing from './components/ResourceListing';
import NotFound from './components/NotFound'
import ResourceShow from './components/ResourceShow';
import Home from './components/Home';
import logo from './images/marvel-logo.png';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className='App-logo' alt='logo' />
          <NavLink exact className='App-link' to='/'>
            Home
          </NavLink>
          <NavLink className='App-link' activeClassName="active" to='/comics/page/1'>
            Comics
          </NavLink>
          <NavLink className='App-link' activeClassName="active" to='/characters/page/1'>
            Characters
          </NavLink>
          <NavLink className='App-link' activeClassName="active" to='/series/page/1'>
            Series
          </NavLink>
        </header>
        <div className='App-body'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact
              path='/characters/page/:page'
              render={(props) => (
                <ResourceListing {...props} resource='characters' />
              )}
            />
            <Route exact
              path='/comics/page/:page'
              render={(props) => (
                <ResourceListing {...props} resource='comics' />
              )}
            />
            <Route exact
              path='/series/page/:page'
              render={(props) => (
                <ResourceListing {...props} resource='series' />
              )}
            />
            <Route exact
              path='/characters/:id'
              render={(props) => (
                <ResourceShow {...props} resource='characters' />
              )}
            />
            <Route exact
              path='/comics/:id'
              render={(props) => (
                <ResourceShow {...props} resource='comics' />
              )}
            />
            <Route exact
              path='/series/:id'
              render={(props) => (
                <ResourceShow {...props} resource='series' />
              )}
            />
            <Route exact path="/404" component={NotFound}/>
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
