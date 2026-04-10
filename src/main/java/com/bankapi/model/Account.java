package com.bankapi.model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Getter
@Setter
@Table(name = "accounts")
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "account_number", nullable = false, unique = true, length=9)
    private String accountNumber;

    @Column(name = "user_name", nullable = false)
    private String userName;

    @Column(name = "account_type")
    private String accountType;

    @Column(name = "balance", precision = 10, scale = 2, nullable = false)
    private BigDecimal balance;

    @Column(name = "status")
    private String status;


    @PrePersist
    public void generateAccountNumber() {
        if (this.accountNumber == null || this.accountNumber.isEmpty()) {
            this.accountNumber = generateUniqueAccountNumber();
        }
    }

    private String generateUniqueAccountNumber() {
        long min = 100000000L; // 9-digit minimum
        long max = 999999999L; // 9-digit maximum

        long randomNum = min + (long) (Math.random() * (max - min + 1));
        return String.valueOf(randomNum);
    }
    
}
