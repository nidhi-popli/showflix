import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ShowDetail from "./pages/ShowDetail";
import Regions from "./pages/Regions";

function App() {
  return (
    <BrowserRouter>
      {/* ✅ SINGLE NAVBAR (GLOBAL) */}

      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* EXPLORE (alias: streaming) */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/streaming" element={<Explore />} />

        {/* SHOW DETAILS */}
        <Route path="/show/:id" element={<ShowDetail />} />

        {/* REGIONS */}
        <Route path="/regions/:code" element={<Regions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
