/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { mockInventory } from '../DummyData/DummyCatData';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { listInventories } from '../services/InventoryService';
import CardText from 'react-bootstrap/esm/CardText';
import { createCategory, listCategories, removeCategory } from '../services/CategoryService';
import classnames from 'classnames';
import LoadingScreen from './LoadingScreen';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const ListCategoryComponent = () => {

    const navigator = useNavigate();

    const [categories, setCategories] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');

    useEffect(() => {
        getCategories()
    }, [])


    function getCategories() {
        listCategories().then((reponse) => {
            setCategories(reponse.data);  
        }).catch(error => {
            console.error(error); 
        })
    }


    function deleteCategory(id) {
        console.log('clicked delete on cat with id: ' + id);

        removeCategory(id).then((response) => {
            getCategories();
        }).then(error => {
            
        })
    }

    function addCatBtn(e) {
        e.preventDefault();
    
        console.log('clicked btn to add category: ' + newCategoryName);
    
        const categoryObject = {
            'name': newCategoryName
        }
    
        createCategory(categoryObject).then((response) => {
            console.log(response.data);
    
            getCategories();
            
        }).catch(error => {
            console.error(error);
            
        })
        
    }


  return (
    <div className='container'>
        <h2 className='text-center'>List of Categories</h2>
        <Row>
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

        <p className='mt-2'>All items apart of a category that gets deleted will be set to Uncategorized.</p>

        {categories.map(category => 
            <Card key={category.id} className='my-3'>
                <Card.Body className='d-flex justify-content-between'>
                    <Card.Title>{category.name}</Card.Title>
                    <Button variant='danger' onClick={() => {deleteCategory(category.id)}}>Delete</Button>
                </Card.Body>
            </Card>
        )}
    </div>
  )
}

export default ListCategoryComponent