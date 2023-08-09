import {
  BrowserRouter as Router,
  Route,
  Routes,
}from "react-router-dom";

import BottomNavBar from "./common/BottomNavBar";
import Home from "./home";
import Storefront from "./storefront";
import Navigation from './navigation';
import Account from "./account";

function App() {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* `pb-20` is used to add padding (space) at the bottom of the container
        and prevent the `BottomNavBar` from obscuring the content. */}
        <div className="flex-grow pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/storefronts/:id" element={<Storefront />} />
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </div>
        <BottomNavBar />
      </div>
    </Router>
  );
}

export default App;
