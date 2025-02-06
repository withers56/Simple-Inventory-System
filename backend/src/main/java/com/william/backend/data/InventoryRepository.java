package com.william.backend.data;

import org.springframework.data.jpa.repository.JpaRepository;



public interface InventoryRepository extends JpaRepository<Inventory, Long>{
    Inventory findByItemId(Long id);
}
