# My-pet-project
An online store of sweets and ice cream was chosen as the pet project.
Pet project contains unit tests. To run them, you need to download the project and do the following:

Use a terminal for next steps:

1) Go to back-end folder and install back-end side of the project: 
  1.1. cd back-end
  1.2. npm install
2) Go to front-end/shop folder and install front-end side of project:
  2.1. cd front-end/shop
  2.2. npm install
  
After installing the project, using the IDE, open the folder with the database settings, and change the data to your database:

3) Go to back-end/server/sequelize/config/coonfig.json
  3.1 Change data for "test" db to your local db
  
All the preparations are completed, now run the tests for the project using the terminal:

4) For back-end 
  4.1. cd back-end
  4.2. npm test
5)
  5.1 cd front-end/shop
  5.2. npm test
