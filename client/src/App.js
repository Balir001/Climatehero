import { Home } from './Components/Home/Home';
import { Header } from './Components/Header/Header';
import './App.css';
import { Grid, Paper } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EcoHall } from './Components/EcoHall/EcoHall';
import { SignUp } from './Components/User/SignUp/SignUp';
import { SignIn } from './Components/User/SignIn/SignIn';
import { EmailAuthenticator } from './Components/EmailAuthenticator/EmailAuthenticator';
import { ToastContainer} from 'react-toastify';
import { PasswordReset } from './Components/User/PasswordReset/PasswordReset';
import PasswordResetEmailRequest from './Components/User/PasswordResetEmailRequest/PasswordResetEmailRequest';

function App() {
  return (
    <Router>
      <div className="App">
        <Grid container spacing={1} style={{ padding: 10, backgroundColor: 'white' }}>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={2} container direction="column">
            <Grid item style={{ flexGrow: 1 }}>
              <Paper className="menu" style={{ padding: 20, height: '100%' }}>Menu</Paper>
            </Grid>
          </Grid>
          <Grid item xs={8} container direction="column">
            <Grid item>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/ecohall' element={<EcoHall />} />
                <Route path='/signup' element={<SignUp/>} />
                <Route path='/signin' element={<SignIn/>} />
                <Route path='/emailauthentication' element={<EmailAuthenticator/>} />
                <Route path='/passwordreset' element={<PasswordReset/>} />
                <Route path='/requestpasswordresetmail' element={<PasswordResetEmailRequest/>} />
                {/* Add other routes here */}
              </Routes>
            </Grid>
            <Grid item>
              <Paper className="footer" style={{ padding: 20, marginTop: 10 }}>Footer</Paper>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Paper className="right" style={{ padding: 20 ,height: '100%'  }}>Right</Paper>
          </Grid>
        </Grid>
       
      </div>
      <ToastContainer />
    </Router>
  );
}

export default App;