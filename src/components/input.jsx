export const Input = ({ type = "text", placeholder }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className="input input-bordered w-full"
      />
    );
  };
  