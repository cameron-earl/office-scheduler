import React, { Component } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Main className="main" />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
