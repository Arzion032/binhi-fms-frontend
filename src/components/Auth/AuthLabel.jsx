import { useLocation } from "react-router-dom";

const AuthLabel = () => {
  const path = useLocation().pathname;

  // Store paths and their labels in an array
  const pathLabels = [
    { path: "/login", label: "Log In" },
    { path: "/signup", label: "Sign Up" },
    // You can add more paths and labels as needed
  ];

  // Define paths that should still be treated as "Sign Up" even if the URL differs
  const signUpPaths = [
    "/set-up", 
    "/set-password", 
    // Add other paths you want to include as "Sign Up"
  ];

  // Check if the current path matches any of the sign-up paths
  const isSignUpPath = signUpPaths.some((item) => path.startsWith(item));

  // Find the label for the current path, or default to "Sign Up" if it's in the signUpPaths
  const currentLabel = 
    isSignUpPath ? "Sign Up" :
    pathLabels.find((item) => item.path === path)?.label || "";

  return (
    <span className="text-gray-300 text-lg font-semibold ml-2">
      {currentLabel}
    </span>
  );
};

export default AuthLabel;

