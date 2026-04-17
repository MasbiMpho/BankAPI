package com.bankapi.service;

import com.bankapi.repository.AccountRepository;

public class AccountNumber {

    private final AccountRepository accountRepository;

    public AccountNumber(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public String generateUniqueAccountNumber() {
        long min = 100000000;
        long max = 900000000;

        String accountNumber;
        do {
            long randomNum = min + (long)(Math.random() * max);
            accountNumber = String.valueOf(randomNum);
        } while (accountRepository.existsByAccountNumber(accountNumber));

        return accountNumber;
    }
    
}
