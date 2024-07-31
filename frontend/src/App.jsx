import { BrowserRouter,Routes,Route } from "react-router-dom"
import HeroSection from "./components/HomePage"
import PublicNavbar from "./components/PublicNavbar"
import LoginForm from "./components/Login"
import RegistrationForm from "./components/Register"
import PrivateNavbar from "./components/PrivateNavbar"
import { useSelector } from "react-redux"
import AddCategory from "./components/Category/AddCategory"
import CategoriesList from "./components/Category/CategoriesList"
import UpdateCategory from "./components/Category/UpdateCategory"
import TransactionForm from "./components/transaction/TransactionForm"
import Dashboard from "./components/Dashboard"
import UserProfile from "./components/UserProfile"
import AuthRoute from "./components/Auth/AuthRoute"
import UpdateTransaction from "./components/transaction/UpdateTransaction"
function App() {
  const user=useSelector((state)=>state?.auth?.user)
  return (
    <>
    <BrowserRouter>
    {user ? <PrivateNavbar/>:<PublicNavbar/>}
    <Routes>
      <Route path="/"  element={<HeroSection/>}/>
      <Route path="/register" element={<RegistrationForm/>}/>
      <Route path="/login" element={<LoginForm/>}/>
      <Route path="/add-category" element={<AuthRoute><AddCategory/></AuthRoute>}/>
      <Route path="/categories" element={<AuthRoute><CategoriesList/></AuthRoute>}/>
      <Route path="/update-category/:id" element={<AuthRoute><UpdateCategory/></AuthRoute>}/>
      <Route path="/update-transaction/:id" element={<AuthRoute><UpdateTransaction/></AuthRoute>}/>
      <Route path="/add-transaction" element={<AuthRoute><TransactionForm/></AuthRoute>}/>
      <Route path="/dashboard" element={<AuthRoute><Dashboard/></AuthRoute>}/>
      <Route path="/profile" element={<AuthRoute><UserProfile/></AuthRoute>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
