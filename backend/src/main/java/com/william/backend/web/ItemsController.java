package com.william.backend.web;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.william.backend.data.CategoryRepository;
import com.william.backend.data.Inventory;
import com.william.backend.data.InventoryRepository;
import com.william.backend.data.Item;
import com.william.backend.data.Category;
import com.william.backend.data.ItemRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@SuppressWarnings("unused")
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/items", headers = "Accept=application/json")
public class ItemsController {

    public ItemsController(ItemRepository itemRepository, CategoryRepository categoryRepository, InventoryRepository inventoryRepository) {
        this.itemRepository = itemRepository;
        this.categoryRepository = categoryRepository;
        this.inventoryRepository = inventoryRepository;
    }
    
    private ItemRepository itemRepository;
    private InventoryRepository inventoryRepository;
    private CategoryRepository categoryRepository;
    
    @GetMapping
    private List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    @GetMapping("{id}")
    private Item getItem(@PathVariable Long id) {
        return itemRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Item Not Found"));
    }

    @PostMapping("create")
    private void createItem(@RequestBody Item newItem) {

        Item itemToAdd = new Item();
        itemToAdd.setName(newItem.getName());
        itemToAdd.setUrl(newItem.getUrl());

        System.out.print("Adding item: " + itemToAdd.toString());
        itemRepository.save(itemToAdd);
    }
    

    @PutMapping("{id}")
    private void updateItem(@PathVariable Long id, @RequestBody Item item){
        Item itemToUpdate = itemRepository.getReferenceById(id);
        itemToUpdate.setName(item.getName());
        itemToUpdate.setUrl(item.getUrl());
        

        if (item.getCategory().getId() != null) {
            Category itemCategory = categoryRepository.getReferenceById(item.getCategory().getId());
            itemToUpdate.setCategory(itemCategory);
        } else {
            itemToUpdate.setCategory(null);
        }
        

        itemRepository.save(itemToUpdate);
        System.out.println("Updating item with id of: " + id);
    }

    @DeleteMapping("{id}")
    private void deleteItem(@PathVariable Long id) {
        Item itemToDelete = itemRepository.getReferenceById(id);
        


        //delete foreign keys to category and inventory
        if (itemToDelete.getCategory() != null) {

            Category parentCategory = categoryRepository.getReferenceById(itemToDelete.getCategory().getId());
            parentCategory.getItems().remove(itemToDelete);
            categoryRepository.save(parentCategory);
        }

        if (inventoryRepository.findByItemId(id) != null) {
            //delete inventory in futrure vs setting null
            Inventory itemsInventory = inventoryRepository.findByItemId(id);
            inventoryRepository.delete(itemsInventory);
        }

        System.out.println(inventoryRepository.findByItemId(id));

        itemRepository.deleteById(id);
        System.out.println("Deleted item with id of: " + id);
    }
}
