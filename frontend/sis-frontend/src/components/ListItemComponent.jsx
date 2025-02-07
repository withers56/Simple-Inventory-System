/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { listItems, deleteItem } from '../services/ItemService'
import { useNavigate } from 'react-router-dom'

const ListItemComponent = () => {

   const [items, setItems] = useState([])

   const navigator = useNavigate();

   useEffect(() => {

        getAllItems();
   }, [])

   function getAllItems() {

    listItems().then((response) => {
        setItems(response.data);
        console.log(response.data);
        console.log(response.data[1].category.name);

        response.data.forEach(element => {
            // console.log(element.category);

            // element.category != null ? console.log(element.category.name) : console.log('no category');
            
            
        });
    }).catch(error => {
        console.error(error);
    })
   }

   function addNewItem (){
        navigator('/add-item');
   }

   function updateItem(id) {
        navigator(`/edit-item/${id}`); 
   }

   function removeItem(id) {
        console.log(id);

        deleteItem(id).then((response) => {
            getAllItems();
        }).catch( error => {
            console.log(error);
        })
   }

  return (
    <div className='container'>

        <h2 className='text-center'>List of Items</h2>
        <button className='btn btn-dark mb-2' onClick={addNewItem}>Add Item</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Item Id</th>
                    <th>Item Name</th>
                    <th>Item URL</th>
                    <th>Item Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    items.map(item => 
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.url != null ? item.url : 'no url'}</td>
                            <td>{item.category != null ? item.category.name : 'Uncategorized'}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateItem(item.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeItem(item.id)}>Delete</button>
                            </td>
                        </tr>)
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListItemComponent