import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Main from './components/MainComponent';
import { ConfigureStore } from './redux/configureStore';

const store = ConfigureStore()

export class App extends React.Component {

    render() {
      return (
        <Provider store={store}>
          <BrowserRouter>
            <div className='App'>
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      )
         }
       }

export default App


