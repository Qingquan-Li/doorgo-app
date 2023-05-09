import Camera from "./components/Camera";
import Location from "./components/Location";
import BottomNavBar from "./components/BottomNavBar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Camera />
      <Location />

      <BottomNavBar />
    </div>
  );
}

export default App;
