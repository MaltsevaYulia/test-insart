import React from 'react'
import { BsCurrencyExchange } from "react-icons/bs";

const Header = () => {
    return (
      <header>
        <div className="d-flex align-items-center gap-2">
          <BsCurrencyExchange size="40" color="#45a049"/>

          <span className="logo ">Currency converter</span>
        </div>
      </header>
    );
}

export default Header