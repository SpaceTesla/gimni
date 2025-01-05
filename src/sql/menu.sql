CREATE TABLE IF NOT EXISTS Menu (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique identifier for each menu item
    name VARCHAR(255) NOT NULL,                 -- Name of the dish
    category ENUM('Bengali', 'Non-Bengali', 'Birthday Snack-Up', 'Other') NOT NULL, -- Cuisine category
    type ENUM(
        'Welcome Drink',
        'Starter',
        'Bhaja',
        'Rice',
        'Bread',
        'Gravy',
        'Dal',
        'Chutney & Sides',
        'Dessert'
      ) NOT NULL,                                 -- Type of dish
    diet ENUM('Veg', 'Non-Veg') NOT NULL, -- Dietary classification
    price DECIMAL(6, 2) NOT NULL CHECK (price >= 0) -- Price of the dish, ensures no negative values
);

DESC Menu;
