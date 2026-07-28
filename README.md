# Cyber Hunt Platform

This is the central React application for the **Cyber Hunt** puzzle platform.

## 📂 Code Structure (Where to find what)

All the important code you will be working on is inside the `src/components/` folder.

Here is what each file does:

*   **`App.jsx`**: The main entry point. It manages routing between the login screen, gates, and the main hunt dashboard.
*   **`LoginScreen.jsx`**: The first screen users see where they enter their 6-digit access code (which determines their Universe).
*   **`HuntScreen.jsx`**: The main dashboard where users can see all the missions, their current score, and select which mission to tackle.
*   **`Mission1.jsx`**: The UI for Mission 1 (Social Engineering). Includes the interactive puzzle elements for this specific mission.
*   **`Mission2.jsx`** & **`Mission2.css`**: The UI for Mission 2 (Hidden Data / Inspect Element). This renders the fake "Nexora Technologies" corporate website.
*   **`Mission3.jsx`** & **`Mission3.css`**: The UI for Mission 3 (Broken Access Control). This is the fake Premium Member Portal.
*   **`Mission5.jsx`**: The UI for Mission 5 (Brute Force / Steganography). This dynamically shows the puzzle image based on the user's Universe.
*   **`SpideyEasterEgg.jsx`**: A hidden easter egg component!

## 🖼️ Images

All the puzzle images (like the steganography photos for Mission 5) are located in the `public/images/` folder. Any image placed here can be accessed in the code via `/images/filename.png`.

## 🚀 How to Run Locally

To run this project on your own computer so you can edit the code and test changes:

1.  Make sure you have [Node.js](https://nodejs.org/) installed on your computer.
2.  Open your terminal inside this folder and run:
    ```bash
    npm install
    ```
    *(This downloads all the required dependencies into a `node_modules` folder).*
3.  Start the local development server by running:
    ```bash
    npm run dev
    ```
4.  Open the link it gives you (usually `http://localhost:5173`) in your browser. Whenever you save a file in VS Code, the browser will automatically update!
