package com.william.backend.web;

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

import com.william.backend.data.CategoryRepository;
import com.william.backend.data.Category;
import com.william.backend.data.Item;
import com.william.backend.data.ItemRepository;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@SuppressWarnings("unused")
@CrossOrigin("*")
@RestController
@RequestMapping(value = "/api/categories", headers = "Accept=application/json")
public class CategoryController {

    private CategoryRepository categoryRepository;
    private ItemRepository itemRepository;
    
    public CategoryController(CategoryRepository categoryRepository, ItemRepository itemRepository) {
        this.categoryRepository = categoryRepository;
        this.itemRepository = itemRepository;
    }

    @GetMapping
    private List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("{id}")
    private Category getCategory(@PathVariable Long id) {
        return categoryRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Category Not Found"));
    }

    @PostMapping("create")
    private void createCategory(@RequestBody Category category) {
        Category newCategory = new Category();

        newCategory.setName(category.getName());
        newCategory.setItems(category.getItems());
        
        categoryRepository.save(newCategory);
    }

    @PutMapping("{id}")
    private void updateCategory(@PathVariable Long id, @RequestBody Category category) {
        
        Category categoryToUpdate = categoryRepository.getReferenceById(id);
        categoryToUpdate.setName(category.getName());
        categoryToUpdate.setItems(category.getItems());

        categoryRepository.save(categoryToUpdate);
    }

    @DeleteMapping("{id}")
    private void deleteCategory(@PathVariable Long id) {
        List<Item> itemsToSetNull = new ArrayList<>();


        Category category = categoryRepository.getReferenceById(id);

        for (Item item : category.getItems()) {
            item.setCategory(null);

            itemsToSetNull.add(item);
        }

        itemRepository.saveAll(itemsToSetNull);
        

        categoryRepository.deleteById(id);
    }
    
    
}
