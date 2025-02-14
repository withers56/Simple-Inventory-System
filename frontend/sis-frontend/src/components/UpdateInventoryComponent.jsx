/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { createItem, getItem, updateItem } from '../services/ItemService';
import { useNavigate, useParams } from 'react-router-dom';
import { createItemAndInventory, getInventory } from '../services/InventoryService';
import InventoryFormFragment from '../form/InventoryFormFragment';
import { categoryArray } from '../DummyData/DummyCatData';
import { listCategories } from '../services/CategoryService';
import LoadingScreen from './LoadingScreen';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const UpdateInventoryComponent = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState(true);
  
    const [itemId, setItemId] = useState('');
    const [itemName, setItemName] = useState('');
    const [itemURL, setItemURL] = useState('');
    
    const [categories, setCategories] = useState([]);
    const [catName, setCatName] = useState('');
    const [catId, setCatId] = useState('');
    const [originalCatId, setOriginalCatId] = useState('');
    const [originalCatName, setOriginalCatName] = useState('');
    
    const [unitOfMeasure, setUnitOfMeasure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [maxQuantity, setMaxQuantity] = useState('');
    const [minQuantity, setMinQuantity] = useState('');

    const navigator = useNavigate();


    useEffect(() => {
      
      getSelectedInventory(id);
      
    }, [id])

    useEffect(() => {
        //fetch categories and set vars
    
        listCategories().then((response) => {
            console.log(response.data);
    
            setCategories(response.data);
            
            
        }).catch(error => {
            console.error(error);
        })
    }, [])

    function getSelectedInventory(inventoryId) {
      getInventory(inventoryId).then((response) => {
        console.log(response.data);

        setItemId(response.data.item.id);
        setItemName(response.data.item.name);
        setItemURL(response.data.item.url);

        setMaxQuantity(response.data.maxQuantity);
        setMinQuantity(response.data.minQuantity);
        setUnitOfMeasure(response.data.unitOfMeasure);

        setOriginalCatName(response.data.item.category.name);
        setOriginalCatId(response.data.item.category.id);
        setIsLoading(false);
        
      }).catch(error => {
        console.error(error);
      })
    }

    function handleSubmitBtn(e) {
      e.preventDefault();

      const categoryObject = {
        'id': catId,
        'name': catName
      }

      const itemObject = {
        'id': itemId,
        'name': itemName,
        'url': itemURL,
        'category': categoryObject
      }

      const inventoryObject = {
        id,
        maxQuantity,
        minQuantity,
        unitOfMeasure,
        'item': itemObject
      }

      console.log('inventory object ready to be sent to backend for update: ');
      
      console.log(inventoryObject);
      
      navigator(`/edit-inventory/${id}`);
      
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
    
  
    return (

      

    <div className='container'>

      {isLoading ? (<LoadingScreen /> ) : (
        <div>
          <Row>
            <Col className='text-center mt-2'><h1>{itemName}</h1></Col>
          </Row>
          <Row>
            <Col className='text-center'><h3>{unitOfMeasure}(s)</h3></Col>
          </Row>
          <Row>
            <Col className='text-center'><h3>{originalCatName != null ? originalCatName : 'Uncategorized'}</h3></Col>
          </Row>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridMinQuan">
                <Form.Label>Minimum Quantity</Form.Label>
                <Form.Control 
                  type="number" 
                  value={minQuantity}
                  onChange={(e) => setMinQuantity(e.target.value)}/>
              </Form.Group>
              
              <Form.Group as={Col} controlId="formGridMaxQuan">
                <Form.Label>Maximum Quantity</Form.Label>
                <Form.Control 
                  type="number" 
                  value={maxQuantity}
                  onChange={(e) => setMaxQuantity(e.target.value)}/>
              </Form.Group>  
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridUOM">
                <Form.Label>Unit of Measure</Form.Label>
                <Form.Control 
                  type="text" 
                  value={unitOfMeasure}
                  onChange={(e) => setUnitOfMeasure(e.target.value)}/>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCategoy">
                <Form.Label>Category</Form.Label>
                <Form.Select name="categories" id="item_categories" onChange={(e) => parseCategorySelect(e.target.value)}>
                  <option value={originalCatName} key={originalCatId}>{originalCatName}</option>  
                  {
                    categories.map(category => 
                      <option 
                      key={category.id}
                      value={category.name + ',' + category.id}>{category.name}</option>)
                  }
                  <option value="uncategorized">Uncategorized</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={(e) => {handleSubmitBtn(e)}}>
              Submit
            </Button>
          </Form>
        </div>
      )}

      
    </div>
  )
}

export default UpdateInventoryComponent