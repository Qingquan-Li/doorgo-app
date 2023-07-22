import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faMapMarkedAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 inset-x-0 pb-4 bg-white border-t shadow-md">
      <nav className="flex items-center justify-around py-2">
        <NavLink
          to="/"
          className="text-gray-500 hover:text-black flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faHome} size="lg" />
          <span className="text-xs">Home</span>
        </NavLink>
        <NavLink
          to="/navigation"
          className="text-gray-500 hover:text-black flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faMapMarkedAlt} size="lg" />
          <span className="text-xs">Navigation</span>
        </NavLink>
        <NavLink
          to="/account"
          className="text-gray-500 hover:text-black flex flex-col items-center"
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
          <span className="text-xs">Account</span>
        </NavLink>
      </nav>
    </div>
  );
};

export default BottomNavBar;