import React, { useState } from "react";
import AuthLabel from "../Auth/AuthLabel";
import { Link } from "react-router-dom";

const Header = () => {
  const [selectedLang, setSelectedLang] = useState("Tagalog");

  const handleLanguageChange = (e) => {
    setSelectedLang(e.target.value);
  };

  // Dynamically change flag image based on selected language

  const flagSrc = selectedLang === "Tagalog" ? "/Flags.png" : "/us_flag.png";

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
      {/* Left side (Logo + Title) */}
      <Link to="/">
        <div className="flex items-center font-inter">
          <img
            src="/Primary Logo w_ BG.png"
            alt="Binhi Logo"
            className="h-10 w-15"
          />
          <AuthLabel />
        </div>
      </Link>

      {/* Right side (Language Dropdown + Help) */}
      <div className="flex items-center gap-6">
        {/* Language Dropdown */}
        <div className="flex items-center gap-2">
          <img src={flagSrc} alt="Flag" className="w-5 h-4" />
          <select
            value={selectedLang}
            onChange={handleLanguageChange}
            className="text-sm text-gray-700 border rounded px-1 py-0.5"
          >
            <option value="Tagalog">Tagalog</option>
            <option value="English">English</option>
          </select>
        </div>

        {/* Help Link */}
        <a href="#" className="text-sm text-gray-700 hover:underline">
          Need Help?
        </a>
      </div>
    </header>
  );
};

export default Header;
