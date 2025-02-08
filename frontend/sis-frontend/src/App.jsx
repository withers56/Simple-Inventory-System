/* eslint-disable no-unused-vars */
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ItemComponent from './components/ItemComponent'
import ListInventoryComponent from './components/ListInventoryComponent'
import ListItemComponent from './components/ListItemComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element= { <ListInventoryComponent /> }></Route> 
          <Route path='/items' element = { <ListItemComponent /> }></Route>
          <Route path='/add-item' element = { <ItemComponent /> }></Route>
          <Route path='/edit-item/:id' element = { <ItemComponent /> }></Route>  
        </Routes>
        <FooterComponent />
      </BrowserRouter> 
    </>
  )
}

export default App
