import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "@/pages/Login"
import Loyout from '@/pages/Layout'
import { AuthRoute } from "./components/AuthCompotent"
import Home from "./pages/Home"
import FilesUpload from "./pages/FilesUpload"
import FormsUpload from "./pages/FormsUpload"
import DataFilter from "./pages/DataFilter"
import FilesBI from "./pages/FilesBI"
import DataAdd from "./pages/DataAdd"
import DataEdit from "./pages/DataEdit"
import CPTN from "./pages/CPTN"
import OCR from "./pages/OCR"
import BERT from "./pages/BERT"
import './index.scss'
import { HistoryRouter, history } from './utils/history'

function App () {
  return (
    // 路由配置
    <HistoryRouter history={history}>
      <div
        className="App"
        style={{
          height: window.innerHeight,
        }}>
        <Routes>
          {/* 创建路由Path与组件对应关系 */}
          <Route path="/" element={
            <AuthRoute>
              < Loyout />
            </AuthRoute>
          }>
            <Route index element={<Home />}></Route>
            <Route path="/data/filter" element={<DataFilter />}></Route>
            <Route path="/data/edit" element={<DataEdit />}></Route>
            <Route path="/data/add" element={<DataAdd />}></Route>
            <Route path="/upload/files" element={<FilesUpload />}></Route>
            <Route path="/upload/forms" element={<FormsUpload />}></Route>
            <Route path="/data/bi" element={<FilesBI />}></Route>
            <Route path="/cptn" element={<CPTN />}></Route>
            <Route path="/ocr" element={<OCR />}></Route>
            <Route path="/bert" element={<BERT />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </HistoryRouter>
  )
}

export default App
