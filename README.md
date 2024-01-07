# SkillLab: E-commerce Platform for Courses

SkillLab is an innovative e-commerce web application tailored to provide a diverse array of courses. Users can seamlessly navigate through different course categories, add courses to their cart, and enroll without schedule conflicts. Admin users have the authority to manage categories, courses, and associated category images. Below, you'll find an overview of the primary features and technologies utilized in SkillLab.

## ScreenShots

![Landing Page](https://i.imgur.com/YpmcSCA.png)
![Categories Page](https://i.imgur.com/eilg8h0.png)


## Technologies Used:
- Nodejs
- Express
- MongoDB
- React
- Bootstrap


## Trello Link
[Trello Board](https://trello.com/b/wOMz7tZ5/sei7-project-3)

## Entity-Relationship Diagram (ERD)

![ERD Example](https://i.imgur.com/aKDpUTr.png)

## Wireframes


![Wireframe 1](https://i.imgur.com/rmWeTWl.png)


![Wireframe 2](https://i.imgur.com/wqIFSmy.png)


![Wireframe 2](https://i.imgur.com/4wRpTLk.png)


![Wireframe 2](https://i.imgur.com/vZj8hxb.png)


![Wireframe 2](https://i.imgur.com/M4HwSPJ.png)



# User Stories

## Admin Functionality
 **As an Administrator,**
   - I want to add new courses, provide comprehensive details, setting prices, and assigning relevant categories.
   - *Objective:* Expand the course offerings and maintain diversity.

 **As an Administrator,**
   - I aim to ensure authorized access during user sign-up, log-in, and log-out processes.
   - *Objective:* Uphold security measures for user accounts.

## User Experience
 **As a User,**
   - I seek a seamless browsing experience without page refresh when interacting with forms or other elements.
   - *Objective:* Enhance user interaction without interruptions.

 **As a Visitor,**
   - I desire a user-friendly interface to easily comprehend the website's purpose and details.
   - *Objective:* Provide intuitive navigation for new visitors.

 **As a User,**
   - I aim to effortlessly browse and search courses by category, facilitating the discovery of courses aligned with my interests.
   - *Objective:* Facilitate easy exploration based on user preferences.

 **As a User,**
   - I wish to manage courses in my cart, including the option to remove items as necessary, maintaining control over my shopping experience.
   - *Objective:* Grant users flexibility and control in their cart management.

 **As a User,**
   - I intend to add courses to my cart, simplifying the process of tracking and managing desired courses.
   - *Objective:* Enable efficient tracking of preferred courses for potential purchase.

 **As a User,**
   - I seek comprehensive course details such as title, description, price, and instructor information to make informed decisions regarding enrollment.
   - *Objective:* Provide necessary information for informed course selection.

## Administrator Account Management
 **As an Administrator,**
   - I need access to view and manage user accounts, including user information, to offer support and ensure a seamless user experience.
   - *Objective:* Facilitate user management for improved support and experience.


## Getting Started

- Clone the SkillLab repository to your local environment.
- Install required dependencies using `npm install`.
- Start the application by running `npm start` for the frontend and `nodemon` for backend.

## Key Features

### User Interface
- Explore diverse course categories and available courses within each category.
- Add multiple courses to the cart.
- Enroll in courses without conflicting schedules.
- Effortlessly edit personal profile details.

### Admin Control
- Create, edit, and remove course categories and individual courses.
- Utilize Multer to upload and manage category images for an enriched visual experience.

### Cart Functionality
- Intuitive cart system for adding and managing courses.
- Calculation of the total cost of selected courses at checkout.
- Confirmation page before finalizing course enrollment.
- Prevention of adding duplicate courses to the cart.


## Backend Dependencies

- **bcrypt**: Secure password hashing for enhanced data protection.
- **dayjs**: Efficient date and time manipulation library.
- **dotenv**: Simplified management of environment variables.
- **express**: Empowers the backend with the Node.js framework.
- **express-ejs-layouts**: Streamlined layout support for Express.
- **jsonwebtoken**: Implementation of JSON Web Tokens for user authentication.
- **jwt-decode**: Decoding of JWT tokens on the server-side.
- **method-override**: Middleware for HTTP method overriding.
- **mongoose**: Robust MongoDB object modeling.
- **multer**: Streamlining file uploads, particularly for images.

## Frontend Dependencies

- **axios**: Facilitates HTTP requests for browser and Node.js.
- **bootstrap**: Comprehensive UI framework ensuring responsive design.
- **bootstrap-icons**: Extensive library for seamless icon integration.
- **jwt-decode**: Aids in decoding JWT tokens on the client-side.
- **react**: Dynamic library for crafting user interfaces.
- **react-bootstrap**: React components aligned with Bootstrap standards.
- **react-dom**: Smooth integration of React elements into the DOM.
- **react-modal**: Provides an accessible modal dialog component for React.
- **react-router-dom**: Enables efficient routing in React applications.
- **react-scripts**: Configures and provides scripts for React applications.
- **web-vitals**: Measures and reports web performance metrics.


### Future Features

- **Course Review:** Implementing a system for users to review and rate courses, facilitating feedback and evaluation.

- **Payment:** Integration of a secure payment gateway to facilitate seamless and secure transactions for course enrollment.

- **Course Videos (Material):** Incorporation of multimedia learning materials, such as videos, to enhance the course content and learning experience.

- **1-1 Instructor Guidance:** Providing personalized guidance enabling direct interaction between users and instructors for individualized assistance.

- **Discussion:** Introduction of a discussion forum where users can engage in course-related discussions, promoting interaction and knowledge sharing.

- **Sign-in Options:** Offering users the convenience of signing in using popular social platforms like Google or other third-party authentication methods.

- **Wishlist:** Enable users to create a tailored collection of preferred courses, providing a practical way to bookmark and revisit courses for future consideration or when they become more aligned with the user's learning goals.