/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { mockInventory } from '../DummyData/DummyCatData';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { listInventories } from '../services/InventoryService';
import CardText from 'react-bootstrap/esm/CardText';

const ListInventoryComponent = () => {

const [inventories, setInventories] = useState([]);
const navigator = useNavigate();


useEffect(() => {

    getAllInventories();
}, [])

function getAllInventories() {

    listInventories().then((response) =>{
        setInventories(response.data)
        console.log(response.data);
        
    }).catch(error => {
        console.error(error);
        
    })

}

function cardClickEvent(id) {
    console.log('clicked card');
    console.log(id);

    navigator(`/edit-inventory/${id}`)
}


  return (
    <div className='container'>
        {inventories.map(inventory => 
           <Card key={inventory.id} className='my-3' onClick={() => cardClickEvent(inventory.id)}>
           <Card.Body className='d-flex justify-content-between align-items-center'>
            <div>
                <Card.Title>{inventory.item.name}</Card.Title>
                <Card.Text className='mb-2'>{inventory.item.category != null ? inventory.item.category.name : 'Uncategorized'}</Card.Text>
                <Card.Text>{inventory.item.url != '' ? <a href={inventory.item.url} target='_tab'>Link</a> : ''}</Card.Text>
            </div>
            <div className='d-flex flex-column align-items-end'>
                <Card.Title>{inventory.quantity}</Card.Title>
                <Card.Text>{inventory.unitOfMeasure}</Card.Text>
            </div>
             
             {/* <Button variant="primary">Go somewhere</Button> */}
           </Card.Body>
         </Card> 
        )}
    </div>
  )
}

export default ListInventoryComponent