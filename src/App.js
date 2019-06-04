import React, { Component } from 'react';
import Oops from './components/Error/Oops';
import PackagesPaneContainer from './components/Packages/PackagesPaneContainer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import loadedState from './initialState';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { Route, Switch, Router } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import createHistory from 'history/createBrowserHistory';
import ReactGA from 'react-ga';
import HelpPaneContainer from "./components/Help/HelpPaneContainer";
import DynamicFormContainer from "./components/Upload/Forms/DynamicFormContainer";
import NavBarContainer from "./components/Nav/NavBarContainer";
import NavFooter from "./components/Nav/NavFooter";
import ErrorBoundaryContainer from "./components/Error/ErrorBoundaryContainer";
import { applyRouteClass } from './helpers/routeClassUtil';
import detectIEAndNotify from './helpers/detectBrowser';

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
    window.scrollTo(0, 0);
	applyRouteClass();
});

detectIEAndNotify();

class App extends Component {

	componentDidMount() {
		logPageView(window.location, "");
		applyRouteClass();
	}

    render() {
	    return (
			<Provider store={store}>
				<Router history={history}>
					<ErrorBoundaryContainer>
						<NavBarContainer />
						<Switch>
							<PrivateRoute  exact path="/" component={PackagesPaneContainer} store={store} />
							<PrivateRoute  exact path="/packages" component={PackagesPaneContainer} store={store} />
							<PrivateRoute  exact path="/upload" component={DynamicFormContainer} store={store} />
							<Route  exact path="/help" component={HelpPaneContainer} store={store} />
							<Route  exact path="/oops" component={Oops} />
						</Switch>
						<NavFooter />
					</ErrorBoundaryContainer>
				</Router>
			</Provider>
	    );
	  }
}

export default App;
