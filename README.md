Project Overview

This application uses React Context API along with localStorage to store and manage user data created during registration. The combination of Context and localStorage ensures that user information persists even after page reloads while maintaining centralized state management.

Application Flow

The application consists of three main pages from a user perspective:

Login Page

Registration Page

Home (Account) Page

Login Page

The application starts on the Login page.

Users can log in using their registered email and password.

Upon successful login, the user is redirected to the Home page.

A Register link is provided for users who do not have an account, allowing navigation to the Registration page.

Registration Page

Users can create a new account by filling in the required details.

Form validations ensure that all inputs meet the required criteria.

A Login link is available for users who already have an account, allowing them to navigate back to the Login page.

After successful registration, users can log in using their credentials.

Home (Account) Page

Displays the same fields as the Registration page.

Users can edit and update their personal information.

The email field is read-only, as it serves as the unique identifier for the user.

Changes can be saved using the Update button.

A Logout button is provided, which logs the user out and redirects them back to the Login page.

Route Protection

A Protected Route (Route Guard) is implemented to prevent unauthorized access.

Users cannot access the Home page without logging in.

If a user attempts to access the Home page directly, they are redirected to the Login page.

Notes

This project uses client-side storage for authentication and user management.

Passwords are stored in plain text for demonstration purposes only.

This implementation is intended for learning and internship evaluation purposes, not for production use.

Contact

For any questions or clarifications, feel free to contact:

📧 kushankmistry@gmail.com
