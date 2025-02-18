/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { mockInventory } from '../DummyData/DummyCatData';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { listInventories } from '../services/InventoryService';
import CardText from 'react-bootstrap/esm/CardText';
import { listCategories } from '../services/CategoryService';
import classnames from 'classnames';
import LoadingScreen from './LoadingScreen';

const ListInventoryComponent = () => {
const [isLoading, setIsLoading] = useState(true);

const[ALL_INVENTORIES, setALL_INVENTORIES] = useState([]);
const[ALL_CATEGORIZED_INVENTORIES, setALL_CATEGORIZED_INVENTORIES] = useState([]);
const [activeElement, setActiveElement] = useState(0);
    
const [inventories, setInventories] = useState([]);
const navigator = useNavigate();

const [categories, setCategories] = useState([]);


useEffect(() => {

    getAllInventories();
}, [])

useEffect(() => {
    
    getAllCategories();
    
}, [])

function getAllCategories() {
    listCategories().then((response) => {
        console.log(response.data);

        let allCategory = {
            'id': 'all',
            'name': 'All'
        }

        let catArray = response.data;

        catArray.unshift(allCategory);
        
        setCategories(catArray);
         
    }).catch(error => {
        console.error(error);
    })
}


function getAllInventories() {

    listInventories().then((response) =>{
        setInventories(response.data);
        setALL_INVENTORIES(response.data);

        let categorixedInvetories = [];


        response.data.forEach(inventory => {
            if (inventory.item.category != null) {
                categorixedInvetories.push(inventory)
            }
        });

        setALL_CATEGORIZED_INVENTORIES(categorixedInvetories);

        console.log(response.data);

        setIsLoading(false);
        
    }).catch(error => {
        console.error(error);
        
    })

}

function cardClickEvent(e, id) {

    console.log('clicked card');
    console.log(id);

    navigator(`/edit-inventory/${id}`)
}

function handleCategoryTabEvent(categoryId, index) {
    console.log(index);
    

    setActiveElement(index);
    
    console.log('clicked category tab with id: ' + categoryId);

    console.log('inventories prior to filter: ' + inventories);
    

    if(categoryId == 'all') {
        setInventories(ALL_INVENTORIES);

        return;
    }
    
    const filteredInventories = ALL_CATEGORIZED_INVENTORIES.filter((object) => object.item.category.id == categoryId);

    console.log(filteredInventories);

    setInventories(filteredInventories);
    
}


  return (

    <div>
        {isLoading ? (<LoadingScreen /> ) : (
        <div className='container'>
            <div className='outer'>
                {categories.map((category, index) =>
                    <div key={category.id}
                        onClick={() => handleCategoryTabEvent(category.id, index)}
                        className={activeElement === index ? 'bb' : ''}>
                        {category.name}
                    </div>
                )}
            </div>
            {inventories.map(inventory => 
            <Card key={inventory.id} className='my-3' onClick={(e) => cardClickEvent(e, inventory.id)}>
            <Card.Body className='d-flex justify-content-between align-items-center'>
                <div>
                    <Card.Title>{inventory.item.name}</Card.Title>
                    <Card.Text className='mb-2'>{inventory.item.category != null ? inventory.item.category.name : 'Uncategorized'}</Card.Text>
                    {/* <Card.Text>{inventory.item.url != '' ? <a href={inventory.item.url} target='_tab'>Link</a> : ''}</Card.Text> */}
                </div>
                <div className='d-flex flex-column align-items-end'>
                    <Card.Title>{inventory.quantity}</Card.Title>
                    <Card.Text>{inventory.unitOfMeasure}(s)</Card.Text>
                </div>
                
                {/* <Button variant="primary">Go somewhere</Button> */}
            </Card.Body>
            </Card> 
            )}
        </div>
    )}

    </div>
    

    
  )
}

export default ListInventoryComponent