import Camera from "./components/Camera";
import AccessibleDataForm from "./components/AccessibleDataForm";
import BottomNavBar from "./components/BottomNavBar";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Camera />
      <AccessibleDataForm />
      <BottomNavBar />
    </div>
  );
}

export default App;
