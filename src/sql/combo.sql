CREATE TABLE IF NOT EXISTS Combo (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each combo
    name VARCHAR(255) NOT NULL,                 -- Name of the combo
    price DECIMAL(9, 2) NOT NULL CHECK (price >= 0), -- Price of the combo, ensures no negative values
    rice INT DEFAULT 0,                         -- Quantity of rice items in the combo
    roti INT DEFAULT 0,                         -- Quantity of roti items in the combo
    starter INT DEFAULT 0,                      -- Quantity of starter items in the combo
    gravy INT DEFAULT 0,                        -- Quantity of gravy items in the combo
    dal INT DEFAULT 0,                          -- Quantity of dal items in the combo
    salad INT DEFAULT 0,                        -- Quantity of salad items in the combo
    sweet INT DEFAULT 0,                        -- Quantity of sweet items in the combo
    papad INT DEFAULT 0,                        -- Quantity of papad items in the combo
    chutney INT DEFAULT 0                       -- Quantity of chutney items in the combo
);

DROP TABLE IF EXISTS Combo;


