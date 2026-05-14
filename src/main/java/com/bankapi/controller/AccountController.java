package com.bankapi.controller;

import java.math.BigDecimal;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.bankapi.model.Account;
import com.bankapi.model.AccountType;
import com.bankapi.repository.AccountRepository;


import java.util.Random;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;


@CrossOrigin("*")
@RestController
@RequestMapping("")
@Tag(name = "Account", description = "Account management api")
public class AccountController {

    @Autowired
    private AccountRepository accountRepository;


    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @GetMapping("/")
    @Operation(summary = "Home endpoint", description = "Welcome message for the Bank API")
    public String home() {
        logger.info("Accessed home endpoint");
        return "Welcome to the Bank API!";
    }

    @GetMapping("/users")
    @Operation(summary = "Get all users", description = "Fetch a list of all users with their account details")
    public ResponseEntity<List<Account>> getAllUsers() {
        logger.info("Fetching all users");

        List<Account> accounts = accountRepository.findAll().stream()
            .filter(account -> account.getUserName() != null && !account.getUserName().isEmpty())
            .toList();

        if(accounts.isEmpty()) {
            logger.warn("No users found");
            return ResponseEntity.noContent().build();
        }else {
            logger.debug("Found {} users", accounts.size());
            return ResponseEntity.ok(accounts);
        }
    }

    @GetMapping("/user/{id}")
    @Operation(summary = "Get user by ID", description = "Fetch a user by their unique ID")
    public ResponseEntity<Account> getUserById(@PathVariable Long id) {
        logger.info("Fetching user with ID: {}", id);

        return accountRepository.findById(id)
            .map(account -> {
                logger.debug("User found: {}", account);
                return ResponseEntity.ok(account);
            })
            .orElseGet(() -> {
                logger.warn("User with ID {} not found", id);
                return ResponseEntity.notFound().build();
            });
    }

    @GetMapping("/account-number")
    @Operation(summary = "Get user by account number", description = "Fetch a user by their unique account number")
    public ResponseEntity<Account> getUserByAccountNumber(@RequestParam String accountNumber) {
        logger.info("Fetching user with account number: {}", accountNumber);

        return accountRepository.findByAccountNumber(accountNumber)
            .map(account -> {
                logger.debug("User found: {}", account);
                return ResponseEntity.ok(account);
            })
            .orElseGet(() -> {
                logger.warn("User with account number {} not found", accountNumber);
                return ResponseEntity.notFound().build();
            });
    }

    @PostMapping("/create-account")
    @Operation(summary = "Create a new account", description = "Create a new account with the provided user name, account type, and initial deposit")
    public ResponseEntity<Account> createAccount(@RequestParam String userName, @RequestParam BigDecimal deposit) {
        logger.info("Creating account for user: {}", userName);


        Random random = new Random();
        int number;
        
        do{
            number = 100000000 + random.nextInt(900000000);
        }while(accountRepository.existsByAccountNumber(String.valueOf(number)));

        Account newAccount = new Account();        
        newAccount.setUserName(userName);
        newAccount.setAccountNumber(String.valueOf(number));
        newAccount.setAccountType(AccountType.SAVINGS);
        newAccount.setBalance(deposit);
        newAccount.setStatus("ACTIVE");

        Account savedAccount = accountRepository.save(newAccount);
        logger.debug("Account created: {}", savedAccount);

        return ResponseEntity.ok(savedAccount);
    }

    @DeleteMapping("/delete-account/{id}")
    @Operation(summary = "Delete an account", description = "Delete a specific account by its ID")
    public ResponseEntity<String> deleteAccount(@PathVariable Long id) {
        logger.info("Deleting account with ID: {}", id);

        return accountRepository.findById(id)
            .map(account -> {
                accountRepository.delete(account);
                logger.debug("Account with ID {} deleted", id);
                return ResponseEntity.ok("Account deleted successfully");
            })
            .orElseGet(() -> {
                logger.warn("Account with ID {} not found for deletion", id);
                return ResponseEntity.notFound().build();
            });
    }

    @PutMapping("/update-account/{id}")
    @Operation(summary = "Update account details", description = "Update the account type and balance for a specific account")
    public ResponseEntity<Account> updateAccount(@PathVariable Long id, @RequestParam BigDecimal balance) {
        logger.info("Updating account with ID: {}", id);

        return accountRepository.findById(id)
            .map(account -> {
                //account.setAccountType(accountType.toUpperCase());
                account.setBalance(account.getBalance().add(balance));
                Account updatedAccount = accountRepository.save(account);
                logger.debug("Account updated: {}", updatedAccount);
                return ResponseEntity.ok(updatedAccount);
            })
            .orElseGet(() -> {
                logger.warn("Account with ID {} not found for update", id);
                return ResponseEntity.notFound().build();
            });
    }



}
