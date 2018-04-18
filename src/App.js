import React, { Component } from 'react';
import UploadPage from './components/UploadPage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import appReducer from './reducers';
import loadedState from './initialState';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = (sessionStorage["redux-store"]) ?
    JSON.parse(sessionStorage["redux-store"]) :
    loadedState;

let store = applyMiddleware(thunk)(createStore)(rootReducer, initialState);
const saveState = () => {
  sessionStorage["redux-store"] = JSON.stringify(store.getState());
};

store.subscribe(function(){console.log(store.getState())});
store.subscribe(saveState);
window.store = store;

class App extends Component {
  render() {
    return (
    		<Provider store={store}>
    			<UploadPage/>
    		</Provider>
    );
  }
}

export default App;
