import React, { Component } from 'react';
import Oops from './components/Error/Oops';
import PackagesPaneContainer from './components/Packages/PackagesPaneContainer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import loadedState from './initialState';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Route, Switch, Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import AboutPaneContainer from "./components/About/AboutPaneContainer";
import DynamicFormContainer from "./components/Upload/Forms/DynamicFormContainer";
import NavBarContainer from "./components/Nav/NavBarContainer";
import NavFooter from "./components/Nav/NavFooter";
import ErrorBoundaryContainer from "./components/Error/ErrorBoundaryContainer";

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

// store.subscribe(function(){console.log(store.getState())});
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
  
	componentDidMount() {
		logPageView(window.location, "");
	}

    render() {
	    return (
			<Provider store={store}>
				<Router history={history}>
					<div>
						<NavBarContainer />
						<Switch>
							<Route exact path="/" component={PackagesPaneContainer} store={store} />
							<Route exact path="/packages" component={PackagesPaneContainer} store={store} />
							<Route exact path="/upload" component={DynamicFormContainer} store={store} />
							<Route exact path="/about" component={AboutPaneContainer} store={store} />
							<Route exact path="/oops" component={Oops} />
						</Switch>
						<NavFooter />
					</div>
				</Router>
			</Provider>
	    );
	  }
}

export default App;
