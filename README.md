# Bakery Store E-Commerce Application

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Folder Structure](#folder-structure)
4. [Getting Started](#getting-started)
    - [Setup and Run](#setup-and-run)
5. [Client Application](#client-application)
6. [Server Application](#server-application)
7. [Usage](#usage)
    - [Public Part](#public-part)
    - [Private Part](#private-part)
8. [Technologies Used](#technologies-used)
9. [Future Improvements](#future-improvements)

---

## Project Overview

This is a full-stack e-commerce web application for a bakery store. It allows users to browse products, view product details, read and write reviews, add products to a cart. Registered users have access to additional features such as adding products to the cart and managing their reviews.

The application consists of two main parts:

-   **Client:** Built with React and Vite for a fast, responsive UI.
-   **Server:** Built with Node.js for handling APIs and user authentication.

---

## Features

**Public Features (Accessible to all visitors):**

-   View homepage with featured products
-   View Login and Register pages
-   View About us page
-   Browse product catalog
-   View product details
-   Read product reviews

**Private Features (Accessible only to registered users):**

-   View user profile with their reviews
-   View user cart
-   Add products to cart
-   Write, edit, and delete reviews
-   Review manipulation only for the user's own reviews

---

## Folder Structure

```
root
│
├── client/ # React + Vite frontend
│ ├── public/
│ │ ├── images/
│ ├── src/
│   ├── components
│   ├── contexts
│   ├── hooks
│   ├── utils
├── server/ # Node.js backend
│ ├── data/
└── README.md
```

---

## Getting Started

### Setup and Run

#### Client

```bash
cd client
npm install
npm run dev
```

#### Server

```bash
cd server
node ./server.js
```

---

## Client Application

The client is a React application built with Vite.

**Key components:**

-   View homepage with featured products
-   View login and register pages
-   View about us page
-   View product catalog
-   View product details
-   View product reviews
-   View profile page

---

## Server Application

The server is built with Node.js and handles:

**Key components:**

-   User authentication (register, login, token-based sessions)
-   Review management (CRUD operations)
-   Cart management (add, remove, update items)

---

## Usage

### Public Part

-   Browse products without creating an account
-   View product details and reviews

#### Private Part

-   Register or login to access full functionality
-   Add products to cart
-   Write new reviews or edit existing ones
-   View your reviews and past activity

---

## Technologies Used

-   Frontend: React, Vite, Tailwind CSS
-   Backend: Node.js
-   Authentication: session-based auth with access token

---

## Future Improvements

-   Product search and filtering
-   Admin panel for managing products and orders
-   Responsive mobile design
-   Email notifications for orders
