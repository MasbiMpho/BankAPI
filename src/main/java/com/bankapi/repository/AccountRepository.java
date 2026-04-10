package com.bankapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.bankapi.model.Account;

import lombok.NonNull;

public interface AccountRepository extends JpaRepository<Account, Long> {
    
    @NonNull
    @Override
    Optional<Account> findById(Long id);
    
    boolean existsByAccountNumber(String accountNumber);
    Optional<Account> findByAccountNumber(String accountNumber);
    
}
