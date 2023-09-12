import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  Link,
} from "react-router-dom";
import DetailsPage from "./detailspage";
import Home from "./Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/details/:name" element={<DetailsPage />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
  
export default App;
