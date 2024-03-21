// Node-modules
import React, { useEffect } from 'react';
// Styling 
import logo from './logo.svg';
import './App.css';
// Custom Components
import Loading from './components/loading/Loading'
import Register from './components/register/Register';

function App() {

  // useEffect(() => {

  //   fetch('http://127.0.0.1:5000/', {
  //     method: 'PUT',
  //     body: new FormData(),
  //   });
  // }
  //   , [])

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <Register/>
       
      </header>
    </div>
  );
}

export default App;
