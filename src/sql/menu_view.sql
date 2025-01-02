-- View for Welcome drink @ 50
CREATE VIEW WelcomeDrink50 AS
SELECT * FROM Menu
WHERE type = 'Welcome Drink' AND price = 50.00;

-- View for Starter-Veg @ 40
CREATE VIEW StarterVeg40 AS
SELECT * FROM Menu
WHERE type = 'Starter' AND diet = 'Veg' AND price = 40.00;

-- View for Starter-Veg @ 80
CREATE VIEW StarterVeg80 AS
SELECT * FROM Menu
WHERE type = 'Starter' AND diet = 'Veg' AND price = 80.00;

-- View for Starter-Non Veg @ 50
CREATE VIEW StarterNonVeg50 AS
SELECT * FROM Menu
WHERE type = 'Starter' AND diet = 'Non-Veg' AND price = 50.00;

-- View for Starter-Non Veg @ 75
CREATE VIEW StarterNonVeg75 AS
SELECT * FROM Menu
WHERE type = 'Starter' AND diet = 'Non-Veg' AND price = 75.00;

-- View for Bhaja @ 40
CREATE VIEW Bhaja40 AS
SELECT * FROM Menu
WHERE type = 'Bhaja' AND price = 40.00;

-- View for Rice @ 60
CREATE VIEW Rice60 AS
SELECT * FROM Menu
WHERE type = 'Rice' AND price = 60.00;

-- View for Rice @ 100
CREATE VIEW Rice100 AS
SELECT * FROM Menu
WHERE type = 'Rice' AND price = 100.00;

-- View for Bread @ 20
CREATE VIEW Bread20 AS
SELECT * FROM Menu
WHERE type = 'Bread' AND price = 20.00;

-- View for Main Course Gravy - Veg @ 100
CREATE VIEW MainCourseGravyVeg100 AS
SELECT * FROM Menu
WHERE type = 'Main Course Gravy' AND diet = 'Veg' AND price = 100.00;

-- View for Main Course Gravy - Non Veg @ 125
CREATE VIEW MainCourseGravyNonVeg125 AS
SELECT * FROM Menu
WHERE type = 'Main Course Gravy' AND diet = 'Non-Veg' AND price = 125.00;

-- View for Main Course Gravy - Veg @ 80
CREATE VIEW MainCourseGravyVeg80 AS
SELECT * FROM Menu
WHERE type = 'Main Course Gravy' AND diet = 'Veg' AND price = 80.00;

-- View for Main Course Gravy - Non Veg @ 150
CREATE VIEW MainCourseGravyNonVeg150 AS
SELECT * FROM Menu
WHERE type = 'Main Course Gravy' AND diet = 'Non-Veg' AND price = 150.00;

-- View for Main Course Gravy - Non Veg @ 250
CREATE VIEW MainCourseGravyNonVeg250 AS
SELECT * FROM Menu
WHERE type = 'Main Course Gravy' AND diet = 'Non-Veg' AND price = 250.00;

-- View for Main Course Dal - Veg @ 70
CREATE VIEW MainCourseDalVeg70 AS
SELECT * FROM Menu
WHERE type = 'Main Course Dal' AND diet = 'Veg' AND price = 70.00;

-- View for Chutney & Sides @ 50
CREATE VIEW ChutneySides50 AS
SELECT * FROM Menu
WHERE type = 'Chutney & Sides' AND price = 50.00;

-- View for Dessert @ 50
CREATE VIEW Dessert50 AS
SELECT * FROM Menu
WHERE type = 'Dessert' AND price = 50.00;

-- View for Dessert @ 30
CREATE VIEW Dessert30 AS
SELECT * FROM Menu
WHERE type = 'Dessert' AND price = 30.00;