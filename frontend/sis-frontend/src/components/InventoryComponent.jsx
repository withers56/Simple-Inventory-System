/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { mockInventory, mockSingleInventory } from '../DummyData/DummyCatData';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Badge from 'react-bootstrap/Badge';
import { getInventory, listInventories, updateInventoryQuantity } from '../services/InventoryService';
import CardText from 'react-bootstrap/esm/CardText';
import LoadingScreen from './LoadingScreen';
import { dateFormatter } from '../utils/utils';

const InventoryComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    const navigator = useNavigate();
    const {id} = useParams();

    const [inventory, setInventory] = useState('');

    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    
    const [category, setCategory] = useState('');
    const [catName, setCatName] = useState('');
    const [catId, setCatId] = useState('');

    const [quantity, setQuantity] = useState('');
    const [maxQuantity, setMaxQuantity] = useState('');
    const [minQuantity, setMinQuantity] = useState('');
    const [unitOfMeasure, setUnitOfMeasure] = useState('');
    const [lastModifiedDate, setLastModifiedDate] = useState('');
    
    

    console.log('passed id: ' + id);
    
    //useState variables for each field becuase it will run once before useEffect and will be undefined

    useEffect(() => {

        if(id) {
            getInventory(id).then((response) => {
                console.log(response.data);

                setInventory(response.data);

                setName(response.data.item.name);
                setURL(response.data.item.url);

                setQuantity(response.data.quantity);
                setMaxQuantity(response.data.maxQuantity);
                setMinQuantity(response.data.minQuantity);
                setUnitOfMeasure(response.data.unitOfMeasure);
                setLastModifiedDate(response.data.lastModifiedDate);

                setCategory(response.data.item.category);

                console.log(response.data);

                setIsLoading(false);

                
            }).catch(error => {
                console.error(error);
                
            })
        }

        
        
    }, [id]);

    function onMinusButton() {
        console.log('clicked minus');

        if(quantity - 1 < 0) {
            return;
        }

        setQuantity(quantity - 1);

        console.log(quantity);
        
        
    }

    function onPlusButton() {
        console.log('clicked plus');
        
        setQuantity(quantity + 1);

        console.log(quantity);
    }

    function updateQuantity() {
        console.log('quanity to be passed to back end: ' + quantity);
        console.log('id of iventory: ' + id);
        
        updateInventoryQuantity(quantity, id).then((response) => {
            console.log(response.data);

            navigator('/');
            
        }).catch(error => {
            console.error(error);          
        })
        
    }

  return (
    <div className='container'>

        {isLoading ? (<LoadingScreen /> ) : (
            <div>
                <Row>
                    <Col className='text-center'>Date Last Modified: {dateFormatter(lastModifiedDate)}</Col>
                </Row>
                <Row className='mt-3'>
                    <Col xs={3} className='d-flex justify-content-center flex-column-reverse'>
                        <Button variant="dark" onClick={() => onMinusButton()}>-</Button>
                    </Col>
                    <Col xs={6} className='d-flex justify-content-center flex-column-reverse'>
                        <Button variant="dark">{quantity}</Button>
                    </Col>
                    <Col xs={3} className='d-flex justify-content-center flex-column-reverse'> 
                        <Button variant="dark" onClick={() => onPlusButton()}>+</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className='text-center mt-2'><h1>{name}</h1></Col>
                </Row>
                <Row>
                    <Col className='text-center'><h3>{unitOfMeasure}</h3></Col>
                </Row>
                <Row>
                    <Col className='text-center'><h3>{category != null ? category.name : 'Uncategorized'}</h3></Col>
                </Row>
                <Row>
                    <Col className='d-flex flex-column-reverse'>
                        <Button variant="dark" onClick={() => updateQuantity(quantity, id)}>Submit</Button>
                    </Col>
                </Row>
            </div>
        )}
        
            
        
    </div>
  )
}

export default InventoryComponent