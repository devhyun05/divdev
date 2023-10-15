import './App.css';
import { LoginProvider } from './context/LoginContext';  
import { Route, Routes} from "react-router-dom"; 
import NavigationComponent from './components/NavigationComponent';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Profile from './pages/Profile';
import ProfileUpdate from './pages/ProfileUpdate'; 
import Project from './pages/Project'; 
import ProjectUpdate from './pages/ProjectUpdate'; 
import AddPost from './pages/AddPost'; 
import PostDetails from './pages/PostDetails';
import PostUpdate from './pages/PostUpdate'; 

function App() {

  return (
    <>
        <div className="App">
            <LoginProvider>
              <NavigationComponent/>
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/:username" element={<Home />}/>
                <Route path="/:username/addpost" element={<AddPost/>}/>  
                <Route path="/:username/:postname" element={<PostDetails/>}/> 
                <Route path="/:username/:postname/postupdate" element={<PostUpdate/>}/> 
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/profile" element={<Profile/>}/> 
                <Route path="/:username/profile" element={<Profile/>}/>
                <Route path="/:username/profileupdate" element={<ProfileUpdate/>}/> 
                <Route path="/:username/project" element={<Project/>}/> 
                <Route path="/:username/projectupdate" element={<ProjectUpdate/>}/> 
              </Routes>
            </LoginProvider>
        </div>
    </>
  );
}

export default App;
