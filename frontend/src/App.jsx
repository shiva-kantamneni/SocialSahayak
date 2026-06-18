// In your App.jsx or router
import { Routes, Route } from "react-router-dom";
import SahayakSignIn from "./Login";
import SahayakSignUp from "./Signup";
import Dashboard from "./dashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SahayakSignIn />} />
      <Route path="/signup" element={<SahayakSignUp/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  );
}

export default App;