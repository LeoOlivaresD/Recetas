import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import RecipePage from '../pages/RecipePage';
import Footer from './Footer';

export default function AppRoutes() {
  return (
    <Router basename="/Recetas/">
      <div className="d-flex flex-column min-vh-100">
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/receta/:id" element={<RecipePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
