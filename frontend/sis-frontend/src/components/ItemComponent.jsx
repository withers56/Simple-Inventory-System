/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { createItem, getItem, updateItem } from '../services/ItemService';
import { useNavigate, useParams } from 'react-router-dom';

const ItemComponent = () => {

const [name, setName] = useState('');
const [url, setURL] = useState('');
const [category, setCategory] = useState('');
const {id} = useParams();
const [errors, setErrors] = useState({
    name: ''
});
const navigator = useNavigate();

useEffect(() => {
    if(id) {
        getItem(id).then((response) => {
            setName(response.data.name);
        }).catch(error => {
            console.error(error);
        })
    }
}, [id]);

function handleName(e) {
    setName(e.target.value);
}

function handleURL(e) {
    setURL(e.target.value);
}

//axios api call
function saveOrUpdateItem(e) {
    e.preventDefault();

    const item = {name};
    console.log(item);

    if(validateForm()) {
        if(id) {
            updateItem(id, item).then((response) => {
                console.log(response.data);
                navigator('/items');
            }).catch(error => {
                console.error(error);
            })
        } else {
            createItem(item).then((response) => {
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

//dynamically checks if id is passed, which means its an update
function pageTitle() {
    if(id) {
        return <h2 className='text-center'>Update Item</h2>
    } else {
        <h2 className='text-center'>Add Item</h2>
    }
}

  return (
    <div className='container'>
        <div className='row'>
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