import './App.css';
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home/Home.tsx";
import ShowPage from "./components/showPage/ShowPage.tsx";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/show/:id' element={<ShowPage />} />
        </Routes>
    );
}

export default App;
