# Natural-Shop-App

A complete mobile e-commerce application built with React Native and Expo. This app provides a platform for users to browse, search, and purchase natural and organic products, featuring a clean user interface, robust state management, and essential e-commerce functionalities.

## Features

-   **User Authentication**: Secure login and registration flow for users.
-   **Dynamic Product Catalog**: Browse products with search and category filtering capabilities.
-   **Shopping Cart**: Fully functional cart to add, update quantities, and remove products.
-   **Wishlist**: Users can add or remove products from a personal wishlist.
-   **Product Details**: A detailed view for each product, including an image carousel and product recommendations.
-   **Theming**: Seamlessly switch between a light and dark mode across the entire application.
-   **User Profile Management**: Users can view and edit their profile information, including their name and avatar.
-   **Checkout Process**: A simple, multi-step checkout process starting with an address form.
-   **Custom Alerts**: Interactive and context-aware alerts for a better user experience.

## Tech Stack

-   **Framework**: React Native with Expo
-   **Navigation**: React Navigation (Bottom Tab & Native Stack)
-   **State Management**: React Context API (for Auth, Cart, Wishlist, and Theme)
-   **HTTP Client**: Axios for handling API requests
-   **Styling**: React Native StyleSheet with dynamic theming

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (LTS version recommended)
-   Yarn or npm
-   Expo Go app on your mobile device or an Android/iOS emulator

### Installation

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/your-username/NaturalShopApp.git](https://github.com/your-username/NaturalShopApp.git)
    cd NaturalShopApp
    ```

2.  **Install dependencies**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

3.  **Run the application**
    ```sh
    npx expo start
    ```
    This will open the Metro Bundler in your browser. You can then scan the QR code with the Expo Go app on your phone to run the application.

## Project Structure

The project is organized into several key directories:
```
NaturalShopApp/
├── assets/             # Static assets like images and fonts
├── components/         # Reusable components (Product card, Alerts, etc.)
│   └── common/
├── constants/          # Application constants (API endpoints, session keys)
├── contexts/           # React Context providers for global state management
├── screens/            # Top-level screen components
│   └── navigation/
├── services/           # Modules for interacting with external APIs
├── styles/             # Reusable style sheets
├── utils/              # Utility functions (e.g., axios client)
├── App.js              # Root component with navigation setup
└── package.json        # Project dependencies and scripts
```
