package com.bankapi.service;

import com.bankapi.repository.AccountRepository;
import java.util.Random;

public class AccountNumber {

    private final AccountRepository accountRepository;

    public AccountNumber(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public String generateUniqueAccountNumber() {
        // long min = 100000000L;
        // long max = 900000000L;

        // String accountNumber;
        // do {
        //     long randomNum = min + (long)(Math.random() * max);
        //     accountNumber = String.valueOf(randomNum);
        // } while (accountRepository.existsByAccountNumber(accountNumber));

        // return accountNumber;

        Random random = new Random();
        int number = 100000000 + random.nextInt(900000000);
        return String.valueOf(number);
    }
    
}
