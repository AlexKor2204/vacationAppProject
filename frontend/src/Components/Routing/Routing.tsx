
import { Route, Routes } from "react-router-dom";
import Add from "../Add/Add";
import Admin from "../Admin/Admin";
import Favorites from "../Favorites/Favorites";
import Main from "../Main/Main";
import Registration from "../Registration/Registration";
import Statistic from "../Statistic/Statistic";
import User from "../User/User";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>
                <Route path="/" element={<Main/>}/>
                <Route path="/registration" element={<Registration/>}/>
                {/* <Route path="/user" element={<User/>}/> */}
                <Route path="/user/:id" element={<User/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/add" element={<Add/>}/>
                <Route path="/add/:id" element={<Add/>}/>
                <Route path="/statistic" element={<Statistic/>}/>
                <Route path="/favorites/:id" element={<Favorites/>}/>
                <Route path="*" element={<Main/>}/>
            </Routes>
        </div>
    );
}

export default Routing;
