import React from 'react'
import { render } from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App'
import store from './store'
import registerServiceWorker from './registerServiceWorker';

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'))

registerServiceWorker();
