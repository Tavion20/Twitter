import logo from './logo.svg';
import './App.css';
import Dummy from './dummy.json'
import { FaUserCircle } from "react-icons/fa";
import Select from 'react-select'

function App() {
  const options = [
    { value: 'history', label: 'History' },
    { value: 'american', label: 'American' },
    { value: 'crime', label: 'Crime' },
    { value: 'horror', label: 'Horror' },
    { value: 'sarcasm', label: 'Sarcasm' }
  ]
  return (
    
    <div>
      <div style={{backgroundColor:'#B1B2FF',width:'100%',marginBottom:'1rem'}}>
        <div class="search-container">
          <input type="text" placeholder="Search"/>
        </div>
      </div>
      <div style={{display:'flex'}}>

        <div style={{flex:3,padding:'3rem'}}>
          <div>
          
            <div class = "profile-card">
            <div className="profile-picture">
            <FaUserCircle size={100} color="#007bff" />
            </div>
              <div class = "followers-following">
                <div class = "followers">
                  <h4>Followers</h4>
                  <p>1000</p>
                </div>
                <div class = "following">
                  <h4>Following</h4>
                  <p>500</p>
                </div>
              </div>
            </div>
          </div>
          <div style={{marginTop:'1rem',backgroundColor:'#EEF1FF',borderRadius:20}}>
            <div style={{backgroundColor:'#B1B2FF',padding:'1rem',borderRadius:20}}>
              Suggestion
            </div>
            <div>
              
            </div>
          </div>
        </div>


        <div style={{flex:7}}>
        
          <div className="add-post">
              <FaUserCircle size={70} color="#007bff" />
              <div className="text-containers">
              <input type="text" placeholder="What's in your mind Peter?" />
              <input type="text-area" placeholder="hi" />
              <Select
          closeMenuOnSelect={true}
          defaultValue={[options[0]]}
          isMulti
          options={options}
        />
      </div>
    </div>
    </div>
    </div>
  </div>
  );
}

export default App;
