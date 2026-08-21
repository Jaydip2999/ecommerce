# ShopEase Ecommerce Storefront

Client-ready ecommerce frontend built with React, Vite, React Router, Context API, and localStorage persistence.

## Quick Start

```bash
npm install
npm run dev
```

The development server opens the storefront locally. Use `npm run build` to create a production bundle and `npm run preview` to inspect that bundle locally.

## Features

- Responsive home page with hero, category sections, and featured products
- Product listing with search, category filters, sorting, product badges, and ratings
- Product details page with quantity selector, stock count, wishlist, and cart actions
- Persistent shopping cart with quantity update, remove item, totals, shipping, tax, and demo checkout
- Wishlist page with saved products and cart actions
- Login/register demo account flow
- Customer account page with saved activity and order history
- Admin dashboard with revenue, order, customer, conversion, and low-stock stats
- Admin product management with add-product form and editable stock levels
- Demo orders stored in localStorage, including new checkout orders
- Production build verified with `npm run build`

## Admin

Open `/admin` to view the admin panel.

Use any login email to create a demo customer account. Use an email containing `admin` if you want the account label to represent an admin user.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Storefront home page |
| `/products` | Searchable and filterable catalog |
| `/products/:id` | Product details and purchase actions |
| `/cart` | Cart review and demo checkout |
| `/wishlist` | Saved products |
| `/account` | Customer profile and order history |
| `/admin` | Protected admin dashboard |

Cart, wishlist, login state, and demo orders are persisted in the browser with `localStorage`.

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## Production Notes

This project is a polished frontend/demo package. For a live client store, connect these frontend flows to a backend API, database, payment gateway such as Stripe or Razorpay, real authentication, file upload/image hosting, and server-side order email notifications.
