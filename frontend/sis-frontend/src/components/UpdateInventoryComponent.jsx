/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react'
import { createItem, getItem, updateItem } from '../services/ItemService';
import { useNavigate, useParams } from 'react-router-dom';
import { createItemAndInventory } from '../services/InventoryService';
import InventoryFormFragment from '../form/InventoryFormFragment';
import { categoryArray } from '../DummyData/DummyCatData';
import { listCategories } from '../services/CategoryService';

const UpdateInventoryComponent = () => {
    const {id} = useParams();
  
    const [name, setName] = useState('');
    const [url, setURL] = useState('');
    
    const [categories, setCategories] = useState([]);
    const [catName, setCatName] = useState('');
    const [catId, setCatId] = useState('');
    
    const [unitOfMeasure, setUnitOfMeasure] = useState('');
    const [quantity, setQuantity] = useState('');
    const [maxQuantity, setMaxQuantity] = useState('');
    const [minQuantity, setMinQuantity] = useState('');

    console.log(id);
    
  
    return (
    <div>UpdateInventoryComponent</div>
  )
}

export default UpdateInventoryComponent