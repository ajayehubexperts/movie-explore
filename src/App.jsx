import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import appRoutes from "./routes/appRoutes";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {appRoutes.map((route, idx) => (
          <Route key={idx} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
