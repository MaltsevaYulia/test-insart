import React from 'react';
import logo from './logo.svg';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import BuySellTable from './components/BuySellTable/BuySellTable';
import "bootstrap/dist/css/bootstrap.min.css";
import CurrencyConvertor from './components/CurrencyConvertor/CurrencyConvertor';

function App() {
  return (
    <div className="App">
      <Header />
      <BuySellTable />
      <CurrencyConvertor/>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Footer />
    </div>
  );
}

export default App;
