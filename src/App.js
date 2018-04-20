import React, { Component } from 'react';
import UploadPage from './components/UploadPage';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import loadedState from './initialState';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const cacheStore = window.sessionStorage.getItem("redux-store");
const initialState = cacheStore ?
    JSON.parse(cacheStore) :
    loadedState;

const store = applyMiddleware(thunk)(createStore)(rootReducer, initialState);
const saveState = () => {
  window.sessionStorage["redux-store"] = JSON.stringify(store.getState());
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
