import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
// import {Button} from 'react-bootstrap';

import EventDetail from 'components/eventDetail/container';
import EventList from 'components/eventList/container';
import AddShow from 'components/addShow/container'
import Underground from 'components/underground/component';

// import WikiListBands from 'components/wiki/wikiListBands/container';
// import WikiBandDetail from 'components/wiki/wikiBandDetail/container';
// import WikiListVenues from 'components/wiki/wikiListVenues/container';

import Header from 'components/header/component';
import Footer from 'components/footer/component';

import PageNotFound from 'components/errors/component/pageNotFound'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
          <div className="main-container">
            <Switch>
              <Route exact path="/" render={() => (
                <Redirect from="/" to="/EventList" />
              )} />
              <Route exact path="/EventList" component={EventList} />
              <Route exact path="/EventDetail/:id" component={EventDetail} />
              <Route exact path='/AddShow' component={AddShow} />
              {/* <Route exact path="/WikiBands" component={WikiListBands} /> */}
              {/* <Route exact path="/WikiBands/:id" component={WikiBandDetail} /> */}
              {/* <Route exact path="/WikiVenues" component={WikiListVenues} /> */}

              <Route exact path="/Underground" component={Underground} />
              <Route path='*' component={PageNotFound} />
            </Switch>
          </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
