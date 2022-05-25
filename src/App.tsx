import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/layout";

function App() {

    return (
        //路由配置
        <BrowserRouter>
            <div className="App">
                <Routes>
                    //创建路由对应关系
                    <Route path="/" element={<Layout/>}/>
                    <Route path="/login" element={<Login/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App
