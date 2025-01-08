-- Welcome drink @ 50
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Jal Jeera', 'Other', 'Welcome Drink', 'Veg', 50.00),
    ('Fresh Lime Juice', 'Other', 'Welcome Drink', 'Veg', 50.00),
    ('Lemon Mint Cooler', 'Other', 'Welcome Drink', 'Veg', 50.00);

-- Starter-Veg @ 40
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Veg Cutlet', 'Bengali', 'Starter', 'Veg', 40.00),
    ('Gobi Manchurian', 'Non-Bengali', 'Starter', 'Veg', 40.00),
    ('Veg Manchurian', 'Non-Bengali', 'Starter', 'Veg', 40.00),
    ('Potato Chilli', 'Non-Bengali', 'Starter', 'Veg', 40.00),
    ('French Fries', 'Non-Bengali', 'Starter', 'Veg', 40.00),
    ('Green Peas Garlic Fry', 'Non-Bengali', 'Starter', 'Veg', 40.00),
    ('Beguni (Brinjal) Pakoda', 'Bengali', 'Starter', 'Veg', 40.00),
    ('Pyaji (Onion) Pakoda', 'Bengali', 'Starter', 'Veg', 40.00),
    ('Kach Kolar (Raw Banana) Cutlet', 'Bengali', 'Starter', 'Veg', 40.00),
    ('Babycorn Manchurian', 'Non-Bengali', 'Starter', 'Veg', 40.00),
    ('Aloo Chop', 'Bengali', 'Starter', 'Veg', 40.00),
    ('Aloo Samosa', 'Bengali', 'Starter', 'Veg', 40.00),
    ('Dahi Bara', 'Bengali', 'Starter', 'Veg', 40.00),
    ('Ghugni', 'Bengali', 'Starter', 'Veg', 40.00);

-- Starter-Veg @ 80
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Paneer Cutlet', 'Non-Bengali', 'Starter', 'Veg', 80.00),
    ('Paneer Chilly', 'Non-Bengali', 'Starter', 'Veg', 80.00),
    ('Mushroom Manchurian', 'Non-Bengali', 'Starter', 'Veg', 80.00),
    ('Mushroom Pepper', 'Non-Bengali', 'Starter', 'Veg', 80.00),
    ('Paneer 65', 'Non-Bengali', 'Starter', 'Veg', 80.00);

-- Starter-Non Veg @ 50
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Diimer (Egg) Devil', 'Bengali', 'Starter', 'Non-Veg', 50.00),
    ('Keema Ghugni', 'Bengali', 'Starter', 'Non-Veg', 50.00),
    ('Jeera Aloo', 'Non-Bengali', 'Starter', 'Non-Veg', 50.00),
    ('Dhaniya Aloo', 'Non-Bengali', 'Starter', 'Non-Veg', 50.00),
    ('Egg Chilli', 'Non-Bengali', 'Starter', 'Non-Veg', 50.00);

-- Starter-Non Veg @ 75
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Chicken Cutlet', 'Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Fish Cutlet', 'Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Chicken Manchurian', 'Non-Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Chicken Chilli', 'Non-Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Pepper Chicken', 'Non-Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Chicken Lolly Pop', 'Non-Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Chicken Pakora', 'Non-Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Fish Chilli', 'Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Fish Fry', 'Bengali', 'Starter', 'Non-Veg', 75.00),
    ('Garlic Chicken', 'Non-Bengali', 'Starter', 'Non-Veg', 75.00);

-- Bhaja @ 40 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Aloo', 'Bengali', 'Bhaja', 'Veg', 40.00),
    ('Begun', 'Bengali', 'Bhaja', 'Veg', 40.00),
    ('Potoler (Parwal)', 'Bengali', 'Bhaja', 'Veg', 40.00),
    ('Kumro', 'Bengali', 'Bhaja', 'Veg', 40.00),
    ('Bhindi Kurkure', 'Non-Bengali', 'Bhaja', 'Veg', 40.00);

-- Rice @ 60 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('White Rice', 'Bengali', 'Rice', 'Veg', 60.00),
    ('Veg Pulao', 'Bengali', 'Rice', 'Veg', 60.00),
    ('Peas Pulao', 'Bengali', 'Rice', 'Veg', 60.00),
    ('Jeera Rice', 'Non-Bengali', 'Rice', 'Veg', 60.00),
    ('Ghee Rice', 'Non-Bengali', 'Rice', 'Veg', 60.00),
    ('Veg Fried Rice', 'Non-Bengali', 'Rice', 'Veg', 60.00),
    ('Khichuri', 'Bengali', 'Rice', 'Veg', 60.00);

-- Rice @ 100 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Basanti Pulao', 'Bengali', 'Rice', 'Veg', 100.00),
    ('Veg Biryani', 'Bengali', 'Rice', 'Veg', 100.00),
    ('Kashmiri Pulao', 'Non-Bengali', 'Rice', 'Veg', 100.00);

-- Bread @ 20 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Paratha', 'Bengali', 'Bread', 'Veg', 20.00),
    ('Phulka', 'Bengali', 'Bread', 'Veg', 20.00),
    ('Aloo Paratha', 'Non-Bengali', 'Bread', 'Veg', 20.00),
    ('Gobi Paratha', 'Non-Bengali', 'Bread', 'Veg', 20.00),
    ('Paneer Paratha', 'Non-Bengali', 'Bread', 'Veg', 20.00),
    ('Ghee Roti', 'Bengali', 'Bread', 'Veg', 20.00),
    ('Luchi', 'Bengali', 'Bread', 'Veg', 20.00),
    ('Kadai Sutir Kachori (Green peas)', 'Bengali', 'Bread', 'Veg', 20.00),
    ('Hing Kachori', 'Bengali', 'Bread', 'Veg', 20.00),
    ('Mix Paratha', 'Non-Bengali', 'Bread', 'Veg', 20.00),
    ('Palak Paratha', 'Non-Bengali', 'Bread', 'Veg', 20.00),
    ('Methi Paratha', 'Non-Bengali', 'Bread', 'Veg', 20.00);

-- Main Course Gravy - Veg @ 100 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Potoler (Parwal) Dorma', 'Bengali', 'Gravy', 'Veg', 100.00),
    ('Aloo Potoler Dalna', 'Bengali', 'Gravy', 'Veg', 100.00),
    ('Paneer Butter Masala', 'Non-Bengali', 'Gravy', 'Veg', 100.00),
    ('Matar Paneer', 'Non-Bengali', 'Gravy', 'Veg', 100.00),
    ('Palak Paneer', 'Non-Bengali', 'Gravy', 'Veg', 100.00),
    ('Paneer Kofta', 'Non-Bengali', 'Gravy', 'Veg', 100.00),
    ('Shahi Paneer', 'Non-Bengali', 'Gravy', 'Veg', 100.00),
    ('Chole Masala', 'Bengali', 'Gravy', 'Veg', 100.00),
    ('Mushroom Masala', 'Non-Bengali', 'Gravy', 'Veg', 100.00),
    ('Rajma Masala', 'Non-Bengali', 'Gravy', 'Veg', 100.00);

-- Main Course Gravy - Non Veg @ 125 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Chicken Kosha', 'Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Rui Macher Kalia', 'Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Katla Macher Kalia', 'Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Doi (curd) Katla', 'Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Doi (curd) Rui', 'Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Katla Macher Jhal (Sorse)', 'Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Rui Macher Jhal (Sorse)', 'Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Mudi Ghonto', 'Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Chicken Do Pyaza', 'Non-Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Chicken Butter Masala', 'Non-Bengali', 'Gravy', 'Non-Veg', 125.00),
    ('Chicken Kadhai', 'Non-Bengali', 'Gravy', 'Non-Veg', 125.00);

-- Main Course Gravy - Veg @ 80 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Mix Veg', 'Bengali', 'Gravy', 'Veg', 80.00),
    ('Aloo Soya Torkari (Dry)', 'Bengali', 'Gravy', 'Veg', 80.00),
    ('Aloo Dum (Large)', 'Bengali', 'Gravy', 'Veg', 80.00),
    ('Dhokar (Chana Dal) Dalna', 'Bengali', 'Gravy', 'Veg', 80.00),
    ('Aloo Kofir Dalna', 'Bengali', 'Gravy', 'Veg', 80.00),
    ('Aloo Bandha Kofir (Cabbage) Torkari', 'Bengali', 'Gravy', 'Veg', 80.00),
    ('Shukto', 'Bengali', 'Gravy', 'Veg', 80.00),
    ('Aloo Gobi', 'Bengali', 'Gravy', 'Veg', 80.00),
    ('Corn Palak', 'Non-Bengali', 'Gravy', 'Veg', 80.00),
    ('Aloo Palak', 'Non-Bengali', 'Gravy', 'Veg', 80.00),
    ('Veg Kofta', 'Non-Bengali', 'Gravy', 'Veg', 80.00);

-- Main Course Gravy - Non Veg @ 150 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Aloo Potol Chingri (Prawns) Curry', 'Bengali', 'Gravy', 'Non-Veg', 150.00),
    ('Prawns Malai Curry', 'Bengali', 'Gravy', 'Non-Veg', 150.00),
    ('Mutton Kosha', 'Bengali', 'Gravy', 'Non-Veg', 150.00),
    ('Chingri Sorse', 'Bengali', 'Gravy', 'Non-Veg', 150.00),
    ('Pabda Jhal', 'Bengali', 'Gravy', 'Non-Veg', 150.00),
    ('Bhetki Fry', 'Bengali', 'Gravy', 'Non-Veg', 150.00);

-- Main Course Gravy - Non Veg @ 250 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Illish Macher Jhal (Sorse Diye)', 'Bengali', 'Gravy', 'Non-Veg', 250.00),
    ('Doi (curd) Illish', 'Bengali', 'Gravy', 'Non-Veg', 250.00);

-- Main Course Dal - Veg @ 70 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Bhaja Moonger Dal', 'Bengali', 'Dal', 'Veg', 70.00),
    ('Cholar Dal', 'Bengali', 'Dal', 'Veg', 70.00),
    ('Dal Tadka', 'Bengali', 'Dal', 'Veg', 70.00),
    ('Dal Fry', 'Bengali', 'Dal', 'Veg', 70.00),
    ('Dal Palak', 'Bengali', 'Dal', 'Veg', 70.00),
    ('Dal Makhani', 'Non-Bengali', 'Dal', 'Veg', 70.00);

-- Chutney @ 50 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Mango', 'Bengali', 'Chutney', 'Veg', 50.00),
    ('Tomato', 'Bengali', 'Chutney', 'Veg', 50.00),
    ('Khejur', 'Bengali', 'Chutney', 'Veg', 50.00),
    ('Khejur Tomato', 'Bengali', 'Chutney', 'Veg', 50.00),
    ('Green chutney', 'Bengali', 'Chutney', 'Veg', 50.00),
    ('Grapes chutney', 'Bengali', 'Chutney', 'Veg', 50.00),
    ('Pineapple', 'Bengali', 'Chutney', 'Veg', 50.00);

-- Dessert @ 50 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Gajar Halwa', 'Non-Bengali', 'Dessert', 'Veg', 50.00),
    ('Caramel Kheer', 'Bengali', 'Dessert', 'Veg', 50.00),
    ('Chenapoda', 'Bengali', 'Dessert', 'Veg', 50.00),
    ('Kheer or Payesh', 'Bengali', 'Dessert', 'Veg', 50.00);

-- Dessert @ 30 additional
INSERT INTO Menu (name, category, type, diet, price)
VALUES
    ('Sooji Halwa', 'Bengali', 'Dessert', 'Veg', 30.00),
    ('Gulab Jamoon', 'Bengali', 'Dessert', 'Veg', 30.00),
    ('Rasogolla', 'Bengali', 'Dessert', 'Veg', 30.00),
    ('Jilebi', 'Bengali', 'Dessert', 'Veg', 30.00);
