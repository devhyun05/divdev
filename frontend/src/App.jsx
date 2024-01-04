import './App.css';

import { LoginProvider } from './context/LoginContext';  
import { Route, Routes} from "react-router-dom"; 
import NavigationComponent from './components/NavigationComponent';
import Welcome from './pages/Welcome'; 
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword'; 
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate'; 
import Project from './pages/Project'; 
import ProjectAdd from './pages/ProjectAdd'; 
import PostAdd from './pages/PostAdd'; 
import PostDetails from './pages/PostDetails';
import PostUpdate from './pages/PostUpdate'; 

function App() {

  return (
    <>
        <div className="App" >
            <LoginProvider>
              <NavigationComponent/>
              <Routes>
                <Route path="/" element={<Welcome />}/>
                <Route path="/:username" element={<Home />}/>
                <Route path="/:username/addpost" element={<PostAdd/>}/>  
                <Route path="/:username/:postname" element={<PostDetails/>}/> 
                <Route path="/:username/:id/postupdate" element={<PostUpdate/>}/> 
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/forgotpassword" element={<ForgotPassword/>}/> 
                <Route path="/resetpassword" element={<ResetPassword/>}/> 
                <Route path="/profile" element={<Profile/>}/> 
                <Route path="/:username/profile" element={<Profile/>}/>
                <Route path="/:username/profileupdate" element={<ProfileUpdate/>}/> 
                <Route path="/:username/project" element={<Project/>}/> 
                <Route path="/:username/projectadd" element={<ProjectAdd/>}/> 
              </Routes>
            </LoginProvider>
        </div>
    </>
  );
}

export default App;
