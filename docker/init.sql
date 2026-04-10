SET search_path = public;

CREATE TABLE IF NOT EXISTS accounts (
    user_id        BIGSERIAL PRIMARY KEY,
    account_number VARCHAR(9) NOT NULL UNIQUE,
    user_name      VARCHAR(255) NOT NULL,
    account_type   VARCHAR(50),
    balance        NUMERIC(10,2),
    status         VARCHAR(20)
);

INSERT INTO accounts (account_number, user_name, account_type, balance, status)
VALUES
('123456789', 'Mpho', 'SAVINGS', 15000.50, 'ACTIVE'),
('987654321', 'Lin',   'CHEQUE',  8200.00,  'ACTIVE'),
('012345678', 'Goku', 'SAVINGS', 0.00,     'FROZEN'),
('098765432', 'Mark','BUSINESS',250000.75,'ACTIVE');


SELECT setval(pg_get_serial_sequence('public.accounts', 'user_id'), (SELECT MAX(user_id) FROM public.accounts));
    