import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCamera, faUser } from '@fortawesome/free-solid-svg-icons';


export default function BottomNavBar() {
  return (
    <div className="fixed bottom-0 left-0 w-full h-20 pb-4 bg-white border-t border-gray-200">
      <ul className="flex flex-row justify-between items-center h-full">
        <li className="flex-1 text-center">
          <button className="focus:outline-none">
            <FontAwesomeIcon icon={faHome} size="lg" />
          </button>
        </li>
        <li className="flex-1 text-center">
          <button className="focus:outline-none">
            <FontAwesomeIcon icon={faCamera} size="lg" />
          </button>
        </li>
        <li className="flex-1 text-center">
          <button className="focus:outline-none">
            <FontAwesomeIcon icon={faUser} size="lg" />
          </button>
        </li>
      </ul>
    </div>
  );
};
