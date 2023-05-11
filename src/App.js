import {
  BrowserRouter as Router,
  Route,
  Routes,
}from "react-router-dom";

import BottomNavBar from "./common/BottomNavBar";
import Home from "./home";
import Navigation from './navigation';
import Account from "./account";
import { useAuthentication } from "./common/useAuthentication";

function App() {
  const {user} = useAuthentication();

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/navigation" element={<Navigation />} />
            <Route path="/account" element={<Account/>}/>
          </Routes>
        </div>
        <BottomNavBar />
      </div>
    </Router>
  );
}

export default App;
