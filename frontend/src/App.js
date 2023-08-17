import {
  BrowserRouter as Router,
  Route,
  Routes,
}from "react-router-dom";

import WarmUpGoogleCloudRun from "./common/WarmUpGoogleCloudRun";
import BottomNavBar from "./common/BottomNavBar";
import Home from "./home";
import Storefront from "./storefront";
import Navigation from './navigation';
import Account from "./account";

function App() {

  return (
    <Router>
      {/* This component is used to warm up the Google Cloud Run instance.
      It is used to prevent the cold start problem. */}
      <WarmUpGoogleCloudRun />

      <div className="flex flex-col min-h-screen">
        {/* `pb-32` is used to add padding (space) at the bottom of the container
        and prevent the `BottomNavBar` from obscuring the content. */}
        <div className="flex-grow pb-32">
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
