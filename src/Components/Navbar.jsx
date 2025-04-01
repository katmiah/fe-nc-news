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
            <Link to="/topics">All topics</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
export default Navbar;
