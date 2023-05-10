import { useState } from 'react';
import Search from "./Search";
import FitermanHallImage from "./FitermanHallImage";
import AccessibleData from "./AccessibleData";
import NavigateToThere from "./NavigateToThere";

export default function Navigation() {
  const [showComponents, setShowComponents] = useState(false);

  // Pass a handleSearchClick function as a prop to the SearchComponent.
  // Set the showComponents state to true when the search icon is clicked.
  const handleSearchClick = () => {
    setShowComponents(true);
  };

  return (
    <>
      <Search onSearchClick={handleSearchClick}/>
      {showComponents && <FitermanHallImage />}
      {showComponents && <AccessibleData />}
      {showComponents && <NavigateToThere />}
    </>
  );
}
