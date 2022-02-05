import React, { useEffect, useState } from 'react';

import './App.css';

function App() {
  const [icons, setIcons] = useState([]);
  
  useEffect(()=>{
    fetch('http://localhost:5000/icons')
      .then(response => response.json())
      .then(setIcons);
    }, []);

  return (
    <div className="App">
      <div>
        {icons.map(icon =>
          <div>
            <img src={'http://localhost:5000/icons/files/' + icon.name} className="icon" alt={icon.name} />
            <p>{icon.alias} ({icon.name})</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
