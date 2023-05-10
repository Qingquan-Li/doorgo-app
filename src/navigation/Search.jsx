import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMicrophone } from '@fortawesome/free-solid-svg-icons';

export default function Search({ onSearchClick }) {
  return (
    <div className="bg-gray-100">
      <div className="py-4 px-4">
        <div className="bg-white flex items-center rounded-full shadow-xl">
          <input
            className="rounded-l-full w-full py-2 px-6 text-gray-700 text-lg leading-tight focus:outline-none"
            id="search"
            type="text"
            placeholder="Fiterman Hall"
          />
          <div className="p-4">
            <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-10 h-10 flex items-center justify-center">
              <FontAwesomeIcon icon={faMicrophone} />
            </button>
          </div>
          <div className="p-4">
            <button
              onClick={onSearchClick}
              className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-10 h-10 flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
