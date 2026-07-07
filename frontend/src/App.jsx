// In your App.jsx or router
import { Routes, Route } from "react-router-dom";
import SahayakSignIn from "./Login";
import SahayakSignUp from "./Signup";
import Dashboard from "./dashboard";
import Chat from "./Chat";
import History from "./History";
import Profile from "./Profile";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SahayakSignIn />} />
      <Route path="/signup" element={<SahayakSignUp/>}/>
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
      <Route path="/dashboard/chat" element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
      <Route path="/dashboard/chat/:chat_id" element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
      <Route path="/dashboard/history" element={<ProtectedRoute><History/></ProtectedRoute>}/>
      <Route path="/dashboard/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
    </Routes>
  );
}

export default App;