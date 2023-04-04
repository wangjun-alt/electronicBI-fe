import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import Loyout from '@/pages/Layout'
import { AuthRoute } from "./components/AuthCompotent"
import Home from "./pages/Home"
import Data from "./pages/Data"
import './index.scss'

function App () {
  return (
    // 路由配置
    <BrowserRouter>
      <div
        className="App"
        style={{
          height: window.innerHeight,
        }}>
        <Routes>
          {/* 创建路由Path与组件对应关系 */}
          <Route path="/" element={
            //<AuthRoute>
            < Loyout />
            //</AuthRoute>
          }>
            <Route index element={<Home />}></Route>
            <Route path="data" element={<Data />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
