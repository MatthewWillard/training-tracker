# Training Tracker
[Link to Training Tracker](https://trainingtracker.mwillard.now.sh/) 

---

## Motivation
---
I spent the last 6 years in management and had to train several new employees each month.  I used a worksheet to keep track of completed trainings and what training needed to be done next.  Unfortunately sometimes other employees would do the trainings but wouldn't fill out the worksheet.  My idea was to digitize this process to make it easier for managers to keep up with whose been trained on what.  

---

## Screenshots
---
### Landing Page

![Landing Page screenshot](https://github.com/MatthewWillard/training-tracker/blob/master/ScreenShots/LandingPage.png)

### Log In Page

##### User Test Login
+ <b>username</b> - Demo
+ <b>password</b> - Password0!

![Log In Page Screenshot](https://github.com/MatthewWillard/training-tracker/blob/master/ScreenShots/LogIn.png)

### Sign Up Page

![Sign up Page Screenshot](https://github.com/MatthewWillard/training-tracker/blob/master/ScreenShots/SignUp.png)

### Add Employees Page

![Add employees screenshot](https://github.com/MatthewWillard/training-tracker/blob/master/ScreenShots/Add.png)

### Employee List Page

![Employee list screenshot](https://github.com/MatthewWillard/training-tracker/blob/master/ScreenShots/List.png)

---

## API Documentation
API endpoints for the back end include:
* POST - When User signs up adds user to database (/signup)
* GET - Gets all employees that belong to specific user id (/main)
* POST - Inserts new employee into database when created (/add)
* DELETE - Removes employee from database when deleted (/add)
* PATCH - Updates employee(the trainings) in database (/main)

---

## Technical
Training Tracker is a full-stack website.

<h3>Front End</h3>
<ul>
  <li>HTML5</li>
  <li>CSS3</li>
  <li>JavaScript</li>
  <li>React</li>
</ul>
<h3>Back End</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>PostgreSQL</li>
  <li>Knex</li>
  <li>Heroku</li>
  <li>superTest</li>
  <li>jsonwebtoken<li>
</ul>

## Development Roadmap
Planned additional features and improvements
* Add individual pages per employee
* Expand information tracked
* Create employee accounts so they can be assigned trainings
* Add ability for managers to create checkoff lists of their own trainings so they don't have to write them each time
* Create logo