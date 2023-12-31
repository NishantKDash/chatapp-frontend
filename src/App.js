
import './App.css';
import Register from './components/Register';
import {BrowserRouter , Routes , Route, Navigate} from 'react-router-dom'
import Home from './components/Home'
import Logout from './components/Logout'
import Login from './components/Login'
import CreateGroup from './components/CreateGroup';
import Error from './components/Error';
import { MessageProvider } from './contexts/MessageContext';
import Room from './components/Room';

function App() {
  function AuthenticatedRoute({children})
  {
   if(localStorage.getItem('username') != null || localStorage.getItem('token') != null)
        return children
        else
       return  <Navigate to = '/login'></Navigate>
  }
  return (
    <div className="App">
        <BrowserRouter>
        <MessageProvider>
        <Routes>
          
          <Route path ='/' element={<Register></Register>}></Route>
          <Route path ='/login' element={<Login></Login>}></Route>
          <Route path ='/logout' element={<AuthenticatedRoute><Logout></Logout></AuthenticatedRoute>}></Route>
          <Route path ='/home' element={
          <AuthenticatedRoute><Home></Home></AuthenticatedRoute>}></Route>
          <Route path = 'room/:id' element={<AuthenticatedRoute><Room></Room></AuthenticatedRoute>}></Route>
          <Route path ='/createGroup' element={
          <AuthenticatedRoute><CreateGroup></CreateGroup></AuthenticatedRoute>}></Route>
          <Route path ='/*' element={<Error></Error>}></Route>
          
        </Routes>
        </MessageProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
