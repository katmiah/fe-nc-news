import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="nav">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/topics/coding">Coding</Link>
          </li>
          <li>
            <Link to="/topics/football">Football</Link>
          </li>
          <li>
            <Link to="/topics/cooking">Cooking</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
