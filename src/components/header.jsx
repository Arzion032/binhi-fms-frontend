import { FaChevronDown } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      {/* Left: Logo + Text */}
      <div className="flex items-center space-x-2">
        <img src="/binhi-logo.png" alt="Binhi Logo" className="h-8 w-8" />
        <span className="text-2xl font-semibold text-green-700">Binhi</span>
        <span className="text-gray-400 text-md">Log In</span>
      </div>

      {/* Right: Language dropdown + Help */}
      <div className="flex items-center space-x-6">
        {/* Language Dropdown */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <img
            src="https://flagcdn.com/w40/ph.png"
            alt="Philippines Flag"
            className="h-4 w-6"
          />
          <span className="text-sm">Tagalog</span>
          <FaChevronDown className="text-xs mt-0.5" />
        </div>

        {/* Need Help */}
        <span className="text-sm text-gray-800 hover:underline cursor-pointer">
          Need Help?
        </span>
      </div>
    </header>
  );
}
