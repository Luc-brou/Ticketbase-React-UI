import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";
import PurchasePage from "./pages/PurchasePage";

export default function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/purchase/:id" element={<PurchasePage />} />
        </Routes>
      </div>
    </Router>
  );
}