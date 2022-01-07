import {
  BrowserRouter,
  Routes as Switch,
  Route
} from 'react-router-dom'

import { Root } from './pages/Root';
import { Movie } from './pages/Movie'

export function Routes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" element={<Root />} />
        <Route path="/movie/:movieId" element={<Movie />} />
      </Switch>
    </BrowserRouter>
  )
}