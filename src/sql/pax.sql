CREATE TABLE IF NOT EXISTS ComboPax (
    id INT AUTO_INCREMENT PRIMARY KEY,        -- Unique identifier for each entry
    combo_id INT NOT NULL,                    -- Foreign key referencing the combo
    pax_range VARCHAR(20) NOT NULL,           -- Pax range (e.g., '10-20')
    price_per_pax DECIMAL(6, 2) NOT NULL,     -- Price per pax for this range
    FOREIGN KEY (combo_id) REFERENCES Combo(id) -- Foreign key constraint
);
