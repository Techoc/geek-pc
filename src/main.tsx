import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Toaster} from "react-hot-toast";
//导入antd css
import 'antd/dist/antd.min.css';
import "./index.scss"

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Toaster/>
        <App/>
    </React.StrictMode>
)
