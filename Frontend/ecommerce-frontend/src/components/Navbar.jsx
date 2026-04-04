import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-6 py-4 flex justify-between">

      <Link to="/" className="font-bold text-lg">
        NEXUS STORE
      </Link>

      <div className="flex gap-6">
        <Link to="/cart">Cart</Link>
        <Link to="/login">Login</Link>
      </div>

    </nav>
  );
};

export default Navbar;