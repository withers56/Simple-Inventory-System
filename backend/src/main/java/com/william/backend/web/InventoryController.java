package com.william.backend.web;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.william.backend.data.Inventory;
import com.william.backend.data.InventoryRepository;
import com.william.backend.data.Item;
import com.william.backend.data.ItemRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@SuppressWarnings("unused")
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/inventory", headers = "Accept=application/json")
public class InventoryController {

    private InventoryRepository inventoryRepository;
    private ItemRepository itemRepository;
    
    public InventoryController(InventoryRepository inventoryRepository, ItemRepository itemRepository) {
        this.inventoryRepository = inventoryRepository;
        this.itemRepository = itemRepository;
    }

    @GetMapping
    private List<Inventory> getAllInventory() {
        return inventoryRepository.findAll();
    }

    @GetMapping("{id}")
    private Inventory getInventory(@PathVariable Long id) {
        return inventoryRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Item Not Found"));
    }

    @PostMapping("create")
    private void createInventory(@RequestBody Inventory newInventory) {

        Inventory inventoryToAdd = new Inventory();

        // Long itemId = newInventory.getItem().getId();
        // Item inventoryItem = itemRepository.findById(itemId).orElseThrow(() -> new NoSuchElementException("Item Not Found"));

        inventoryToAdd.setQuantity(newInventory.getQuantity());
        inventoryToAdd.setMaxQuantity(newInventory.getMaxQuantity());
        inventoryToAdd.setMinQuantity(newInventory.getMinQuantity());
        inventoryToAdd.setUnitOfMeasure(newInventory.getUnitOfMeasure());
        inventoryToAdd.setLastModifiedDate(LocalDateTime.now());
        inventoryToAdd.setItem(newInventory.getItem());

        // System.out.print("Adding item: " + itemToAdd.toString());
        inventoryRepository.save(inventoryToAdd);
    }

    @PostMapping("createItemAndInventory")
    private void createItemAndInventory(@RequestBody Inventory newInventory) {

        Item newItem = new Item();
        newItem.setName(newInventory.getItem().getName());
        newItem.setUrl(newInventory.getItem().getUrl());
        
        // check to see if item will have a category, if it does assign it
        if (newInventory.getItem().getCategory() != null) {
            newItem.setCategory(newInventory.getItem().getCategory());
        }
            
        Item savedItem = itemRepository.save(newItem);
        newInventory.setItem(savedItem);

        createInventory(newInventory);
    }

    @PutMapping("{id}")
    private void updateInventory(@PathVariable Long id, @RequestBody Inventory inventory){
        Inventory inventoryToUpdate = inventoryRepository.getReferenceById(id);
        inventoryToUpdate.setQuantity(inventory.getQuantity());
        inventoryToUpdate.setMaxQuantity(inventory.getMaxQuantity());
        inventoryToUpdate.setMinQuantity(inventory.getMinQuantity());
        inventoryToUpdate.setUnitOfMeasure(inventory.getUnitOfMeasure());
        inventoryToUpdate.setLastModifiedDate(LocalDateTime.now());
        

        inventoryRepository.save(inventoryToUpdate);
        System.out.println("Updating item with id of: " + id);
    }

    @PutMapping("/quantity/{id}")
    private void updateQuantity(@PathVariable Long id, @RequestParam(value = "quantity") Double quantity) {
        Inventory inventory = inventoryRepository.getReferenceById(id);

        inventory.setQuantity(quantity);
        inventory.setLastModifiedDate(LocalDateTime.now());

        inventoryRepository.save(inventory);
    }

    @DeleteMapping("{id}")
    private void deleteItem(@PathVariable Long id) {
        //remove foreign keys
        // Inventory inventoryBeingRemoved = inventoryRepository.getReferenceById(id);
        // Item attachedItem = itemRepository.getReferenceById(inventoryBeingRemoved.getItem().getId());

        //set items inv id to null

        // attachedItem.setInventory(null);
        // itemRepository.save(attachedItem);

        // System.out.println(attachedItem);

        // inventoryRepository.deleteById(id);
        System.out.println("Deleted inventory with id of: " + id);
    }
}
