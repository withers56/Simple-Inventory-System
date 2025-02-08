/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { createItem, getItem, updateItem } from '../services/ItemService';
import { useNavigate, useParams } from 'react-router-dom';
import { createItemAndInventory } from '../services/InventoryService';
import InventoryFormFragment from '../form/InventoryFormFragment';
import { categoryArray } from '../DummyData/DummyCatData';
import { getAllCategories } from '../services/CategoryService';

const ItemComponent = () => {

const [name, setName] = useState('');
const [url, setURL] = useState('');

const [categories, setCategories] = useState([]);
const [catName, setCatName] = useState('');
const [catId, setCatId] = useState('');

const [unitOfMeasure, setUnitOfMeasure] = useState('');
const [quantity, setQuantity] = useState('');
const [maxQuantity, setMaxQuantity] = useState('');
const [minQuantity, setMinQuantity] = useState('');


// const [category, setCategory] = useState({});
const {id} = useParams();
const [errors, setErrors] = useState({
    name: ''
});
const navigator = useNavigate();

useEffect(() => {
    if(id) {
        getItem(id).then((response) => {
            console.log(response.data);
            

            setName(response.data.name);
            setURL(response.data.url);

            //construct category


            // if (response.data.category != null) {

            //     let cat = {
            //         'id': response.data.category.id,
            //         'name': response.data.category.name
            //     }

            //     setCategory(cat);

            //     console.log(cat);
                
            // } else {
            //     setCategory('Uncategorized');
            // }

            // console.log(category);
            
            
            
        }).catch(error => {
            console.error(error);
        })
    }
}, [id]);

useEffect(() => {
    //fetch categories and set vars

    getAllCategories().then((response) => {
        console.log(response.data);

        setCategories(response.data);
        
        
    }).catch(error => {
        console.error(error);
    })
}, [])

function handleName(e) {
    setName(e.target.value);
}

function handleURL(e) {
    setURL(e.target.value);
}

//axios api call
function saveOrUpdateItem(e) {
    e.preventDefault();

    let category = {
        'id': catId,
        'name': catName
    }

    let item = {}

    console.log(catId == '');
    
    
    if (catId == '') {
       item = {name, url} 

    } else {
        item = {name, url, category}
    }

    console.log(category);
    
    console.log(item);

    const inventoryObject = {
        quantity,
        maxQuantity,
        minQuantity,
        unitOfMeasure,
        item
    }

    console.log('inventory data to be sent ot backend: ' + JSON.stringify(inventoryObject));


    if(validateForm()) {
        if(id) {
            updateItem(id, item).then((response) => {
                console.log(response.data);
                navigator('/items');
            }).catch(error => {
                console.error(error);
            })
        } else {
            createItemAndInventory(inventoryObject).then((response) => {
                console.log(response.data);
                navigator('/items');
            }).catch(error => {
                console.error(error);
            })
        }
        
    }
    
    
}

//validation to make sure name isnt blank
function validateForm() {
    let valid = true;

    const errorsCopy = {... errors};

    console.log(errorsCopy);
    console.log(name.trim());

    if(name.trim()) {
        errorsCopy.name = '';
    } else {
        errorsCopy.name = 'Name is required';
        valid = false;
    }

    setErrors(errorsCopy);
    return valid;
}

function parseCategorySelect(selectValue) {

    if (selectValue == 'uncategorized') {
        setCatId(null);
        setCatName(null);

        return;
    }

    console.log(selectValue);
    
    const parsedArray = selectValue.split(',');

    console.log(parsedArray[0]);
    console.log(parsedArray[1]);
    
    setCatId(parsedArray[1]);
    setCatName(parsedArray[0]);
    
}

//dynamically checks if id is passed, which means its an update
function pageTitle() {
    if(id) {
        return <h2 className='text-center'>Update Item</h2>
    } else {
        <h2 className='text-center'>Add Item</h2>
    }
}

function checkIfCreatingOrUpdating(id) {
    if (!id) {
        console.log('create item');
        
        return  <div>
                            <label className='form-label'>Unit of Measure: </label>
                            <input type="text"
                                   placeholder='Enter item quantity'
                                   name='unit of measure'
                                   value={unitOfMeasure} 
                                   className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setUnitOfMeasure(e.target.value)}
                            />

                            <label className='form-label'>Quantity: </label>
                            <input type="number"
                                   placeholder='Enter item quantity'
                                   name='quantity'
                                   value={quantity} 
                                   className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setQuantity(e.target.value)}
                            />
                            
                            <label className='form-label'>Max Quantity: </label>
                            <input type="number"
                                   placeholder='Enter item max quantity'
                                   name='max quantity'
                                   value={maxQuantity} 
                                   className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setMaxQuantity(e.target.value)}
                            />

                            <label className='form-label'>Min Quantity: </label>
                            <input type="number"
                                   placeholder='Enter item minimum quantity'
                                   name='min quantity'
                                   value={minQuantity} 
                                   className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setMinQuantity(e.target.value)}
                            />
        </div>   
    }

    console.log('edit item');
    
    return ''
}

  return (
    <div className='container'>
        <div className=''>
            <div className='card mt-2'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            
                            <label className='form-label'>Item Name: </label>
                            <input type="text"
                                   placeholder='Enter item name'
                                   name='name'
                                   value={name} 
                                   className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setName(e.target.value)}
                            />
                            { errors.name && <div className='invalid-feedback'> { errors.name }</div>}

                            <label className='form-label'>Item URL: </label>
                            <input type="text"
                                   placeholder='Enter item url'
                                   name='url'
                                   value={url == null ? '' : url} 
                                   className={`form-control ${ errors.name ? 'is-invalid': ''}`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setURL(e.target.value)}
                            />
                            <label className='form-label'>Item Category: </label>
                            <select className='form-select' name="categories" id="item_categories" onChange={(e) => parseCategorySelect(e.target.value)}>
                                <option value="uncategorized">Uncategorized</option>
                                {
                                    categories.map(category => 
                                        <option 
                                            key={category.id}
                                            value={category.name + ',' + category.id}>{category.name}</option>
                                    )
                                }
                            </select>
                            {checkIfCreatingOrUpdating(id)}

                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateItem}>Submit</button>
                    </form>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ItemComponent