import logo from './logo.svg';
import './App.css';
import Dummy from './dummy.json'

function App() {
  return (
    <div>
      <div style={{backgroundColor:'#B1B2FF',height:'3.5rem',width:'100%',marginBottom:'1rem'}}>Header Placeholder</div>
      <div style={{display:'flex'}}>

        <div style={{flex:3,padding:'3rem'}}>
          <div>
            Profile
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
          Right
        </div>
      </div>
    </div>
  );
}

export default App;
