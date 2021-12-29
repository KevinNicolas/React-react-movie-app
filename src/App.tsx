import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import { Root } from './pages/Root';
import { Movies } from './pages/Movies'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/movies" element={<Movies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
