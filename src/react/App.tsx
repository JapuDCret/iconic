import React, { useEffect, useState } from 'react';

import { Icon } from '../types/common-types';

import './App.css';

interface IconInfo extends Icon {
  iconDivPosition: {
    x: number;
    y: number;
  }
}

function App() {
  const [icons, setIcons] = useState<Icon[]>([]);
  const [showIconInfo, setShowIconInfo] = useState<IconInfo | null>(null);
  const [searchString, setSearchString] = useState<string>('');
  
  useEffect(()=>{
    fetch('http://localhost:5000/icons')
      .then(response => response.json())
      .then(setIcons);
    }, []);

    const handleIconHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, icon: Icon) => {
      const target = e.target as HTMLElement;
      const div = target.classList.contains('iconWrapper') ? target : target.parentElement! as HTMLDivElement;
      const rect = div.getBoundingClientRect();
      setShowIconInfo({
        ...icon,
        iconDivPosition: {
          x: rect.left + 16,
          y: rect.bottom - 16
        },
      })
    };
    const handleIconHoverLeave = () => setShowIconInfo(null);

  return (
    <div className='App'>
      <h2>Options:</h2>
      <div className="optionContainer">
        <div>
          <p>Search: </p><input type="text" placeholder='Search the Icon properties' onInput={e => setSearchString((e.target as HTMLInputElement).value)} />
        </div>
      </div>
      <h2>Icons:</h2>
      <div className='iconContainer'>
        {icons.filter(icon => searchString === '' || icon.name.includes(searchString) || icon.directory.includes(searchString) || icon.alias?.includes(searchString)).map(icon =>
          <div key={icon.name} onMouseOver={e => handleIconHover(e, icon)} className='iconWrapper' onMouseOut={handleIconHoverLeave}>
            <img src={'http://localhost:5000/icons/files/' + icon.filePath} className='icon' alt={icon.name} />
            <p>{icon.alias ? `${icon.alias} (${icon.name})` : icon.name}</p>
          </div>
        )}
      </div>
      <div className={`iconInfo${showIconInfo ? ' show' : ''}`} style={{position: 'absolute', top: showIconInfo?.iconDivPosition.y, left: showIconInfo?.iconDivPosition.x}}>
          <ul>
            <li><b>Alias</b>: {showIconInfo?.alias ?? '<none>'}</li>
            <li><b>Name</b>: {showIconInfo?.name}</li>
            <li><b>Directory</b>: {showIconInfo?.directory}</li>
            <li><b>FilePath</b>: {showIconInfo?.filePath}</li>
            <li><b>Depth</b>: {showIconInfo?.depth}</li>
          </ul>
      </div>
    </div>
  );
}

export default App;
