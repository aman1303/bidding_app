import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import CustomerDetails from './components/CustomerDetails';
import { Route, Switch } from 'react-router-dom';
import BidDetails from './components/BidDetails';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={CustomerDetails} />
      <Route exact path="/:id" component={BidDetails} />
    </Switch>
  );
}

export default App;
