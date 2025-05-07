import React from "react";
import Membership from './components/Membership';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";

function App() {

  return (
    <div className="bg-binhi min-h-screen font-sans">

      <Router>
      <Routes>
        <Route path="/membership" element={<Layout><Membership/></Layout>} />
      </Routes>
    </Router>
    </div>
    
  )
}

export default App;
