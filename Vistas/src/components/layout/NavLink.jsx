import PropTypes from "prop-types";

const NavLink = ({ label, path }) => (
  <a
    href={path}
    className="text-gray-900 text-nowrap hover:text-blue-400 transition-colors duration-200 font-medium"
  >
    {label}
  </a>
);

NavLink.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default NavLink;
