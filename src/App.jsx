import { Routes,Route } from "react-router-dom";
import Search from "./pages/Search";
import SearchResult from "./pages/SearchResult";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/search" element={<Search/>}/>
        <Route path="/searchResult" element={<SearchResult/>}/>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;