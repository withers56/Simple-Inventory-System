/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { createItem, getItem, updateItem } from '../services/ItemService';
import { useNavigate, useParams } from 'react-router-dom';
import { createItemAndInventory } from '../services/InventoryService';
import InventoryFormFragment from '../form/InventoryFormFragment';
import { categoryArray } from '../DummyData/DummyCatData';
import { createCategory, listCategories } from '../services/CategoryService';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { checkIfMinQuantityBlank } from '../utils/utils';

const ItemComponent = () => {

const [name, setName] = useState('');
const [url, setURL] = useState('');

const [categories, setCategories] = useState([]);
const [catName, setCatName] = useState('');
const [catId, setCatId] = useState('');
const [originalCatId, setOriginalCatId] = useState('');
const [originalCatName, setOriginalCatName] = useState('');
    

const [newCategoryName, setNewCategoryName] = useState('');

const [unitOfMeasure, setUnitOfMeasure] = useState('');
const [quantity, setQuantity] = useState('');
const [maxQuantity, setMaxQuantity] = useState('');
const [minQuantity, setMinQuantity] = useState('');




// const [category, setCategory] = useState({});
const {id} = useParams();
const [errors, setErrors] = useState({
    name: '',
    unitOfMeasure: ''
});
const navigator = useNavigate();

useEffect(() => {
    fetchCategories();
    if(id) {
        getSelectedInventory(id);
    }

    
}, [id]);

// useEffect(() => {
//     //fetch categories and set vars
//     fetchCategories();
    
// }, [])

function getSelectedInventory(id) {
    getItem(id).then((response) => {
        console.log(response.data);
        
        setName(response.data.name);
        setURL(response.data.url);

        

        if (response.data.category == null) {
            console.log('category is null');
  
            setOriginalCatId(null);
            setOriginalCatName(null);
            
            parseCategorySelect('uncategorized');
          } else {

            setOriginalCatName(response.data.category.name);
            setOriginalCatId(response.data.category.id);

            parseCategorySelect(response.data.category.name + ',' + response.data.category.id);
          }
    }).catch(error => {
        console.error(error);
    })
}

function fetchCategories() {
    listCategories().then((response) => {
        console.log(response.data);

        setCategories(response.data);
        
        
    }).catch(error => {
        console.error(error);
    })
}

function handleName(e) {
    setName(e.target.value);
}

function handleURL(e) {
    setURL(e.target.value);
}

//axios api call
function saveOrUpdateItem(e) {
    e.preventDefault();

    if (catId == null) {
        setCatId(originalCatId);
        setCatName(originalCatName);
    }

    let categoryObject = {
        'id': catId,
        'name': catName
    }

    console.log(categoryObject);
    

    let itemObject = {}

    
    
    if (catId == '') {
       itemObject = {name, url} 

    } else {
        itemObject = {name, url, 'category': categoryObject}
    }

    console.log('Item data ready to be sent to update: ');
    console.log(itemObject);
    
    
    function checkIfQuantityBlank() {
        if (quantity == '') {
            return 0;
        }

        return quantity;
    }

    function checkIfUnitOfMeasureBlank() {
        if (unitOfMeasure == '') {
            return 'Unit'
        }

        return unitOfMeasure;
    }
    

    const inventoryObject = {
        quantity: checkIfQuantityBlank(),
        maxQuantity,
        minQuantity: checkIfMinQuantityBlank(minQuantity),
        unitOfMeasure: checkIfUnitOfMeasureBlank(),
        'item': itemObject
    }

    console.log('inventory data to be sent ot backend: ');
    console.log(inventoryObject);
    

    if(validateForm()) {
        if(id) {
            updateItem(id, itemObject).then((response) => {
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
    console.log(selectValue);

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

function addCatBtn(e) {
    e.preventDefault();

    console.log('clicked btn to add category: ' + newCategoryName);

    const categoryObject = {
        'name': newCategoryName
    }

    createCategory(categoryObject).then((response) => {
        console.log(response.data);

        fetchCategories();
        
    }).catch(error => {
        console.error(error);
        
    })
    
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
                                   className={`form-control`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setUnitOfMeasure(e.target.value)}
                            />

                            <label className='form-label'>Quantity: </label>
                            <input type="number"
                                   placeholder='Enter item quantity'
                                   name='quantity'
                                   value={quantity} 
                                   className={`form-control`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setQuantity(e.target.value)}
                            />
                            
                            <label className='form-label'>Max Quantity: </label>
                            <input type="number"
                                   placeholder='Enter item max quantity'
                                   name='max quantity'
                                   value={maxQuantity} 
                                   className={`form-control`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setMaxQuantity(e.target.value)}
                            />

                            <label className='form-label'>Min Quantity: </label>
                            <input type="number"
                                   placeholder='Enter item minimum quantity'
                                   name='min quantity'
                                   value={minQuantity} 
                                   className={`form-control`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setMinQuantity(e.target.value)}
                            />
        </div>   
    }

    console.log('edit item');
    
    return ''
}

function checkIfOrignalCategory(currentCategory) {
      
    if (currentCategory.id != originalCatId) {
      
      return <option 
              key={currentCategory.id}
              value={currentCategory.name + ',' + currentCategory.id}>{currentCategory.name}</option>
    }
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
                            
                            <label className='form-label'>*Item Name: </label>
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
                                   className={`form-control`}
                                   /*onChange={handleName}*/
                                   onChange={(e) => setURL(e.target.value)}
                            />

                            <Row>
                                <Col>
                                    <label className='form-label'>Item Category: </label>
                                    {/* <select className='form-select' name="categories" id="item_categories" onChange={(e) => parseCategorySelect(e.target.value)}>
                                        <option value={originalCatId != null ? originalCatName : 'Uncategorized'} key={originalCatId}>{originalCatName != null ? originalCatName : 'Uncategorized'}</option>
                                        {
                                            categories.map(category => checkIfOrignalCategory(category))
                                        }
                                    </select> */}

                                        <Form.Select name="categories" id="item_categories" onChange={(e) => parseCategorySelect(e.target.value)}>
                                        <option selected value={originalCatName != null ? originalCatName + ',' + originalCatId  : 'Uncategorized'} key={originalCatId}>{originalCatName != null ? originalCatName : 'Uncategorized'}</option>  
                                        {
                                            categories.map(category => checkIfOrignalCategory(category))
                                        }
                                        {originalCatName == null ? ('') : (<option value="uncategorized">Uncategorized</option>)}
                                        </Form.Select>
                                </Col>
                                <Col>
                                    <label className='form-label'>Add Category</label>    
                                    <div className='input-group'>    
                                        <input type="text" 
                                               className='form-control'
                                               value={newCategoryName}
                                               onChange={(e) => setNewCategoryName(e.target.value)}/>  
                                        <button className='btn btn-outline-secondary' onClick={addCatBtn}>Add</button>        
                                    </div>     
                                </Col>
                            </Row>

                            
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