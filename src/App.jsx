import React from "react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Tabs from "./components/Tabs";


function App() {
  return (
    <div className="bg-binhi min-h-screen font-sans">
      <Sidebar />
      <div className="ml-64">
        <Topbar />
        <Tabs />
      </div>
    </div>
  );
}

export default App;
