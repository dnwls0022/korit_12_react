import { BrowserRouter, Routes, Route,Link } from 'react-router-dom'
import Home from './components/Home'
import Contact from './components/Contact'
import './App.css'
import ContactBusan from './components/ContactBusan'
import ContactSeoul from './components/ContactSeoul'
import PageNotFound from './components/PageNotFound'

function App() {

  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to='/'>Home</Link>{' | '}
          <Link to='/contact'>contact</Link>
        </nav>
        <Routes>
          <Route path='/' element={<Home/>}/> 
          <Route path='contact' element={<Contact/>}>
          <Route path='seoul' element={<ContactSeoul/>}/>
          <Route path='busan' element={<ContactBusan/>}/>
          </Route>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
