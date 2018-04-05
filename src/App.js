import React, { Component } from 'react';
import UploadPage from './components/UploadPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import appReducer from './reducers';
import initialState from './initialState';

const store = createStore(appReducer, initialState);

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
