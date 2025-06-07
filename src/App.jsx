import React from "react";
import Membership from './components/Membership';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Financial from "./components/FinancialTracker/Financial";
import Document from "./components/DocumentProcessing/Document";
import Marketplace from "./components/Marketplace/Marketplace";
import Inventory from './components/Inventory';
import SignUp from './components/SignUp/SignUpPage';
import Login from './components/SignUp/Login';
import NextStep from './components/SignUp/NextStep';
import SetPassword from './components/SignUp/SetPassword';
import SetUp from './components/SignUp/SetUp';
import Association from './components/AdminView/Association';
import LayoutAdmin from "./components/LayoutAdmin/LayoutAdmin";
import Machinery from './components/AdminView/Machinery';

function App() {

  return (
    <div className="bg-binhi min-h-screen font-sans">

      <Router>
      <Routes>
        <Route path="/financial" element={<Layout><Financial/></Layout>} />
        <Route path="/membership" element={<Layout><Membership/></Layout>} />
        <Route path="/document" element={<Layout><Document/></Layout>} />
        <Route path="/marketplace" element={<Layout><Marketplace/></Layout>} />
        <Route path="/machinery" element={<Layout><Inventory/></Layout>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/LogIn" element={<Login/>} />
        <Route path="/verification" element={<NextStep />} />
        <Route path="/password" element={<SetPassword />} />
        <Route path="/setup" element={<SetUp />} />
        <Route path="/AdminAssociation" element={<LayoutAdmin><Association /></LayoutAdmin>} />
        <Route path="/AdminMachinery" element={<LayoutAdmin><Machinery /></LayoutAdmin>} />
      </Routes>
    </Router>
    </div>
    
  )
}

export default App;

