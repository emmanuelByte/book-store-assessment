import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import routes from "./routes";

function App() {
  return (
    <div className="bg-white h-screen text-blue-950">
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.name}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
