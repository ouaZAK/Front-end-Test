# Task Management Application - Front-End Coding Exercise

A role-aware React application that consumes a Tasks API to deliver a clean, intuitive user experience for task management with different permissions for admins and regular users.

## Challenge Overview

This project was built as a response to a front-end coding exercise that required:
- Building a React application consuming a public Tasks API
- Implementing role-aware functionality
- Delivering a clean, user-friendly interface

## Live Demo
https://github.com/ouaZAK/Front-end-Test/blob/main/task-manager/src/assets/outDemo.mp4

### Installation
1. Clone the repository
2. Install dependencies:
	npm install

3. Start the development server:
	npm run dev
4. Open http://localhost:5173 in your browser

## Features

- **Authentication System**: Secure login with role-based access
- **Role-Based UI**: Different experiences for admin and regular users
- **Task Management**: Create, edit, delete, and update task status
- **Responsive Design**: Works seamlessly across devices
- **Real-time Updates**: Immediate feedback on task operations

## Technology Stack

- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Context API** - State management for authentication
- **Lucide React** - Icon library
- **React Toastify** - User notifications
- **CSS3** - Custom styling
- **Fetch API** - HTTP requests

## Development Process

### 1. Planning & Analysis
- Carefully broke down the API documentation
- trying to understand available endpoints and authentication requirements
- Identified two distinct user roles (admin, user)
- Sketched component hierarchy diagrams to visualize data flow and component relationships

### 2. Design Decisions
- **Authentication Flow**: Chose Context API for global auth state
- **Role Management**: Implemented role-based component rendering

### 3. Architecture Decisions
- **Component Structure**: Separated concerns with dedicated components
- **State Management**: Used React Context for auth, local state for tasks
- **API Layer**: Created custom hook for API operations
- **Routing**: Implemented protected routes for secure access

### 4. Implementation Journey

**Phase 1: Authentication Foundation**
- Set up routing structure
- Implemented login form with validation
- Created authentication context

**Phase 2: Core Task Management**
- Implemented CRUD operations
- Added real-time status updates

**Phase 3: User Experience Enhancement**
- Added loading states and error handling
- Implemented toast notifications
- Enhanced form validation

### 5. Challenges & Solutions

**Challenge**: Role-based task filtering
**Solution**: Used useMemo to efficiently filter tasks based on user role

**Challenge**: State synchronization after API operations
**Solution**: Implemented optimistic updates with error rollback

## What I Learned
- Advanced React patterns with Context API
- Role-based access control implementation
- API integration best practices
- User experience considerations for different user types

## Future Enhancements
- Real-time updates with WebSocket
- Task filtering and sorting options
- Drag-and-drop task management
- Task assignment notifications


## Project Structure

task-manager/
├── src/
|	├── assets
|	│   ├── addTask.svg
|	│   ├── adminIcon.svg
|	│   ├── check.svg
|	│   ├── delete.svg
|	│   ├── done.svg
|	│   ├── edit.svg
|	│   ├── outDemo.mp4
|	│   ├── passwordEye.svg
|	│   ├── react.svg
|	│   └── userIcon.svg
|	├── css
|	│   ├── App.css
|	│   ├── Login.css
|	│   ├── TaskForm.css
|	│   ├── TaskManager.css
|	│   └── index.css
|	├── components
|	│   ├── Header.jsx
|	│   ├── PrivateRoute.jsx
|	│   ├── TaskForm.jsx
|	│   ├── TaskItem.jsx
|	│   └── TaskManager.jsx
|	├── context
|	│   └── AuthContext.jsx
|	├── hooks
|	│   └── useAuth.jsx
|	├── pages
|	│   ├── Login.jsx
|	│   └── Tasks.jsx
|	└── services
|		└── api.jsx
├── App.jsx
├── main.jsx
├── index.html
├── package.json
└── README.md