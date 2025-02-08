# Task Manager Application

## 📌 Project Overview
The **Task Manager Application** is a modern, user-friendly task management tool built with **React, TypeScript, and React Bootstrap**. It features authentication using **Auth0**, session storage for task persistence, and a responsive UI with light/dark theme support.

## 🚀 Features
- **User Authentication:** Secure login and registration using **Auth0**.
- **Task Management:** Create, edit, and delete tasks with persistence in **session storage**.
- **Task Completion Tracking:** Tasks can be marked as **Completed** or **Pending**.
- **Dark/Light Mode Support:** Theme switching for an enhanced user experience.
- **Error Handling & Logging:** Clear error messages and logs for debugging.
- **Responsive Design:** Uses **React Bootstrap** for a seamless UI across devices.

## 📂 Project Architecture
```
📦 TaskManagerApp
 ┣ 📂 public
 ┃ ┗ 📜 index.html
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 NavBar.tsx
 ┃ ┃ ┣ 📜 TaskForm.tsx
 ┃ ┃ ┣ 📜 ThemeToggle.tsx
 ┃ ┃ ┣ 📜 LogoutButton.tsx
 ┃ ┃ ┣ 📜 RegisterButton.tsx
 ┃ ┃ ┗ 📜 LoginButton.tsx
 ┃ ┃
 ┃ ┣ 📂 pages
 ┃ ┃ ┣ 📜 HomePage.tsx
 ┃ ┃ ┣ 📜 TaskPage.tsx
 ┃ ┃ ┗ 📜 ProfilePage.tsx
 ┃ ┣ 📜 App.tsx
 ┃ ┣ 📜 main.tsx
 ┃ ┣ 📜 hooks/Types.ts
 ┃ ┗ 📜 context/ThemeContext.tsx
 ┣ 📜 package.json
 ┣ 📜 README.md
 ┗ 📜 tsconfig.json
```

## 🛠 Installation & Setup
### 1️⃣ Clone the Repository


### 2️⃣ Install Dependencies
Ensure you have **Node.js** and **npm** installed, then run:
```sh
npm install
npm i @auth0/auth0-react
npm install react-bootstrap
npm install react-router-dom
npm run dev

### 3️⃣ Set Up Auth0 Authentication
1. Sign up at [Auth0](https://auth0.com/) and create a new application.
2. Copy the **Domain** and **Client ID** from the Auth0 dashboard.

### 4️⃣ Start the Application
```sh
npm run dev
```
This will start the development server at **http://localhost:5173**.

## 📝 Usage Instructions
1. **Login/Register:** Click **Login** to authenticate with Auth0.
2. **Add a Task:** Fill in the task form and click **Add Task**.
3. **Edit a Task:** Click **Edit** to modify an existing task.
4. **Delete a Task:** Click **Delete** to remove a task.
5. **Mark Completion:** Toggle the checkbox to mark a task as **Completed** or **Pending**.
6. **Change Theme:** Click **Switch Theme** to toggle between light and dark mode.

## 📚 Technologies Used
- **React + TypeScript** – Frontend framework
- **React Bootstrap** – UI components & styling
- **Auth0** – Authentication and authorization
- **Session Storage** – Task persistence
- **React Context API** – Global state management

## 🔥 Future Enhancements
- ✅ **Database Integration**  Firebase for permanent task storage.
- ✅ **Drag & Drop Task Sorting**.
- ✅ **Task Prioritization & Categories**.


