import React, { Component } from 'react';
import MainPage from './components/MainPage';
import Oops from './components/Error/Oops';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import loadedState from './initialState';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Route, Switch, HashRouter } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';

window.sessionStorage.clear();
const cacheStore = window.sessionStorage.getItem("redux-store");
const initialState = cacheStore ?
    JSON.parse(cacheStore) :
    loadedState;
const store = applyMiddleware(thunk)(createStore)(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const saveState = () => {
  window.sessionStorage.setItem("redux-store", JSON.stringify(store.getState()));
};
const GA_TRACKING_ID = 'UA-124331187-2';

store.subscribe(function(){console.log(store.getState())});
store.subscribe(saveState);

ReactGA.initialize(GA_TRACKING_ID);
function logPageView(location, action) {
	ReactGA.set({ page: location.pathname + location.search });
	ReactGA.pageview(location.pathname + location.search);
}
const history = createHistory();
history.listen((location, action) => {
	logPageView(location, action);
});

class App extends Component {
  
	componentWillMount() {
		logPageView(window.location, "");
	}
	
	render() {
	    return (
	    		<Provider store={store}>
	    			<HashRouter>
	    				<Switch>
	    					<Route exact path="/" component={MainPage} store={store}/>
							<Route exact path="/oops" component={Oops} />
						</Switch>
	    			</HashRouter>
	    		</Provider>
	    );
	  }
}

export default App;
