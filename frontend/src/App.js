import './App.css';
import { Login } from './login-page';
import { Register } from './registration-page';
import { Homepage } from './homepage';
import { useState,useEffect,React } from 'react';
import { BrowserRouter,Routes,Route,useNavigate} from 'react-router-dom';
import {Error} from './Error';
import { Profile } from './Profile';
import { Followers } from './followers';
import { Following } from './following';
import { OthersInfo } from './otherUserProfile';
import { UpdateProfile } from './updateProfile';
import { Subgreddit } from './mysubgreddit';
import { NewSubgreddit } from './newsubgreddit';
import { ParticularSubgreddit } from './particularSubgreddit';
import { SubGredditFollowers } from './subgredditfollowers';
import { NewPost } from './newpost';
import { SavePosts } from './savePosts';
import { ReportInfo } from './reportInfo';
import { ParticularReport} from './reportedPosts';

function App() {
  const [currentForm,setCurrentForm] = useState('login');
  const formToggler = (formName)=>{
    setCurrentForm(formName);
  }
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path = "/" element = {currentForm === "login" ? <Login onFormSwitch ={formToggler}/>  : <Register onFormSwitch ={formToggler}/>}/>
        <Route path='/homepage' element={<Homepage/>}/>
        <Route path = '/Profile' element= {<Profile/>}/>
        <Route path = '/followers' element = {<Followers/>}/>
        <Route path='/following' element={<Following/>}/>
        <Route path='/otherUserProfile/:username' element={<OthersInfo/>}/>
        <Route path='/updateProfile' element={<UpdateProfile/>}/>
        <Route path='/mysubgreddit' element={<Subgreddit/>}/>
        <Route path='/newsubgreddit' element={<NewSubgreddit/>}/>
        <Route path='/particularSubgreddit/:name' element={<ParticularSubgreddit/>}/>
        <Route path='/subgredditfollowers' element={<SubGredditFollowers/>}/>
        <Route path='/newpost' element={<NewPost/>}/>
        <Route path='/savePosts' element={<SavePosts/>}/>
        <Route path='/reportInfo' element={<ReportInfo/>}/>
        <Route path='/reportedPosts' element={<ParticularReport/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
