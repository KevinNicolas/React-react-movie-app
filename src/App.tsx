import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import { Root } from './pages/Root';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/other" element={<span>In other page</span>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
