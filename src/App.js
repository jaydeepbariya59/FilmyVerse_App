import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cards from "./pages/Cards";
import NewMovie from "./pages/NewMovie";
import MovieDetail from "./pages/MovieDetail";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { createContext, useState } from "react";
import { getCurrentUserInfo } from "./services/helper-service";
import { useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AppState = createContext();

function App() {

  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [reviews, setReviews] = useState([]); 

  useEffect(()=>{
    if(getCurrentUserInfo()){
      setLogin(true);
      setUsername(getCurrentUserInfo().name);
    }
  },[]);

  return (
    <AppState.Provider value={{ login, setLogin, username, setUsername,reviews, setReviews}}>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Cards />} />
          <Route path="/add-new-movie" element={<NewMovie />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/movie-detail/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>


    </AppState.Provider>
  );
}

export default App;
export {AppState};
