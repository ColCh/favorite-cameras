import React, {
  Component,
} from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';


import './app.css';
import CameraList from './containers/camera-list';
import rootReducer from './redux/';
import MoreButton from './containers/more-button';
import ToTopButton from './containers/to-top-button';


const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="App__header">
            <h1 className="Main-Header">Favorite Cameras</h1>
          </div>
          <div className="App__body">
            <CameraList />
          </div>
          <div className="App__buttons">
            <ToTopButton />
            <MoreButton />
          </div>
        </div>
      </Provider>
    );
  }
}


export default App;
