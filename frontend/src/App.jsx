import './App.css';
import { LoginProvider } from './context/LoginContext';  
import { Route, Routes} from "react-router-dom"; 
import NavigationComponent from './components/NavigationComponent';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate'; 
import Posts from './pages/Posts';
import Project from './pages/Project'; 
import Privacy from './pages/Privacy';
import Terms from './pages/Terms'; 


function App() {

  return (
    <>
        <div className="App">
            <LoginProvider>
              <NavigationComponent/>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/:username" element={<Home />}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/> 
                <Route path="/:username/profile" element={<Profile/>}/>
                <Route path="/:username/profileupdate" element={<ProfileUpdate/>}/> 
                <Route path="/posts" element={<Posts/>}/> 
                <Route path="/project" element={<Project/>}/> 
                <Route path="/privacy" element={<Privacy />}/>
                <Route path="/terms" element={<Terms/>}/>
              </Routes>
            </LoginProvider>
        </div>
    </>
  );
}

export default App;
