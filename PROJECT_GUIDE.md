# NEXUS Jerseys — project notes

This is a React + Vite frontend demo store. Cart, wishlist, and order history use browser `localStorage`; there is no backend database and no real payment processing.

## Run locally

1. Install Node.js if it is not already installed.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite (usually http://localhost:5173/).

On Windows, if PowerShell blocks `npm.ps1`, switch the VS Code terminal to **Command Prompt (cmd)** and run the commands there.

## Main demo flow

Home → Shop → Product details → Add to cart → Cart → Checkout → Order confirmation → Orders.

Use **DESIGN** in the navbar to open the jersey configurator. Configured jerseys save the chosen name, number, color, and size in the cart.

## Current scope / limitations

- Checkout is a simulated Cash on Delivery demo; it does not collect payment.
- Customer details and order history are stored locally in the current browser only. They are not synced across devices or users.
- Product images reference `/images/*.jpg`; those files were not included in the uploaded project archive, so the current jersey mockup visuals remain placeholders until images are added to `public/images/`.
- No real authentication, stock management, email confirmation, or shipping integration is implemented.
