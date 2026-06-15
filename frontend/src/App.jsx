// In your App.jsx or router
import { Routes, Route } from "react-router-dom";
import SahayakSignIn from "./Login";
import SahayakSignUp from "./Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SahayakSignIn />} />
      <Route path="/signup" element={<SahayakSignUp/>}/>
    </Routes>
  );
}

export default App;