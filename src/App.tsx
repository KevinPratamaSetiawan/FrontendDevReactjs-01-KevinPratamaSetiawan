import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import RestaurantMain from './components/RestaurantMain';
import RestaurantDetail from './components/RestaurantDetails';

export default function App() {

  return (
    <Router>
      <Routes>
          <Route path="/" element={<RestaurantMain />} />
          <Route path="/detail/:id" element={<RestaurantDetail />} />
      </Routes>
    </Router>
  )
}