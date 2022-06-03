import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Login";
import Layout from "@/pages/layout";
import { AuthComponent } from "@/components/AuthComponent";
import "./App.scss";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

function App() {
  return (
    //路由配置
    <BrowserRouter>
      <div className="App">
        <Routes>
          //创建路由对应关系
          <Route
            path="/"
            element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }
          >
            <Route index element={<Home />} />
            <Route path="article" element={<Article />} />
            <Route path="publish" element={<Publish />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
