// scr/App.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './router';

import Header from './Header.jsx';

const App = () => {
  return (
    <div className='container'>
      <Header/>
      <AppRouter />
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));

export default App;
