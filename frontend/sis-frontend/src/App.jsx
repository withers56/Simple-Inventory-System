/* eslint-disable no-unused-vars */
import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import InventoryComponent from './components/InventoryComponent'
import ItemComponent from './components/ItemComponent'
import ListInventoryComponent from './components/ListInventoryComponent'
import ListItemComponent from './components/ListItemComponent'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UpdateInventoryComponent from './components/UpdateInventoryComponent'
import ListCategoryComponent from './components/ListCategoryComponent'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          <Route path='/' element= { <ListInventoryComponent /> }></Route> 
          <Route path='/edit-inventory/:id' element = { <InventoryComponent /> }></Route>
          <Route path='/items' element = { <ListItemComponent /> }></Route>
          <Route path='/add-item' element = { <ItemComponent /> }></Route>
          <Route path='/edit-item/:id' element = { <ItemComponent /> }></Route> 
          <Route path='/edit-inventory-settings/:id' element = { <UpdateInventoryComponent /> }></Route>
          <Route path='/categories' element = { <ListCategoryComponent /> }></Route>
        </Routes>
        {/* <FooterComponent /> */}
      </BrowserRouter> 
    </>
  )
}

export default App
