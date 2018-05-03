import React, { Component } from 'react';
import UploadPageContainer from './components/UploadPageContainer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import loadedState from './initialState';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { viewUploadedFiles } from './actions/UploadForm/uploadTabActions';

window.sessionStorage.clear();
const cacheStore = window.sessionStorage.getItem("redux-store");
const initialState = cacheStore ?
    JSON.parse(cacheStore) :
    loadedState;
export const store = applyMiddleware(thunk)(createStore)(rootReducer, initialState);
const saveState = () => {
  window.sessionStorage.setItem("redux-store", JSON.stringify(store.getState()));
};

store.subscribe(function(){console.log(store.getState())});
store.subscribe(saveState);

class App extends Component {
  
	componentWillMount() {
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
