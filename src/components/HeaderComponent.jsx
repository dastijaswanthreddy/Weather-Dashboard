import React from 'react';

function HeaderComponent() {

  return (
    <header className="header navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: '#323232' }}>
      <a className="navbar-brand ms-3" href="/"> <h2> <img src='icon.png' alt=''/> Weather Dashboard</h2></a>
    </header>
  );
}

export default HeaderComponent;
