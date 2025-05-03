import React from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import Tabs from "./components/Tabs";


function App() {
  return (
    <div className="bg-binhi min-h-screen font-sans">
      <SideBar />
      <div className="ml-64">
        <TopBar />
        <Tabs />
      </div>
    </div>
  );
}

export default App;
