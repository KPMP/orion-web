import React, { Component } from 'react';
import UploadPageContainer from './components/UploadPageContainer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory';
import loadedState from './initialState';
import thunk from 'redux-thunk';
import ReactGA from 'react-ga';
import rootReducer from './reducers';
import { viewUploadedFiles } from './actions/UploadForm/uploadTabActions';

window.sessionStorage.clear();
const cacheStore = window.sessionStorage.getItem("redux-store");
const initialState = cacheStore ?
    JSON.parse(cacheStore) :
    loadedState;
const store = applyMiddleware(thunk)(createStore)(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const saveState = () => {
  window.sessionStorage.setItem("redux-store", JSON.stringify(store.getState()));
};

let GA_TRACKING_ID = 'UA-124331187-2';
if (process.env.REACT_APP_ENVIRONMENT === 'production') {
	GA_TRACKING_ID = 'UA-124331187-2';
} else if (process.env.REACT_APP_ENVIRONMENT === 'dev') {
	GA_TRACKING_ID = 'UA-124331187-1';
}

ReactGA.initialize(GA_TRACKING_ID);

function logPageView(location, action) {
	ReactGA.set({ page: location.pathname + location.search });
	ReactGA.pageview(location.pathname + location.search);
}

const history = createHistory();
history.listen((location, action) => {
	logPageView(location, action);
});

store.subscribe(function(){console.log(store.getState())});
store.subscribe(saveState);

class App extends Component {
  
	componentWillMount() {
		logPageView(window.location, "");
		viewUploadedFiles()(store.dispatch);
	}
	
	render() {
	    return (
	    		<Provider store={store}>
	    			<UploadPageContainer/>
	    		</Provider>
	    );
	  }
}

export default App;
