import {Route,Routes} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Home from './page/Home';
import About from './page/About';
import Product from './page/Product';
import Cart from './page/Cart';
import Collection from './page/Collection';
import PlaceOrder from './page/PlaceOrder';
import Login from './page/Login';
import Orders from './page/Orders';
import Contact from './page/Contact';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import NotImplemented from './page/NotImplemented';
function App() {

  return (
    <div className='px-4 sm:px-[5vw] lg:px-[9vw] md:px-[7vw]'>
      <ToastContainer/>
    <Navbar/>
    <SearchBar/>
  <Routes>
    <Route  path='/' element={<Home/>} />
    <Route  path='/about' element={<About/>} />
    <Route  path='/product'  element={<Product/>} />
    <Route path='/cart' element={<Cart/>} />
    <Route  path='/collection' element={<Collection/>} />
    <Route  path='/place-order' element={<PlaceOrder />} />
   <Route  path='/login' element={<Login />} />
   <Route  path='/orders' element={<Orders />} />
   <Route  path='/product/:productId' element={<Product />} />
   <Route path='/contact' element={<Contact />} />
   <Route path='/not-implemented' element={<NotImplemented />} />
   </Routes>
   <Footer />
  </div>

  
  )
}

export default App
