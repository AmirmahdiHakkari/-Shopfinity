# Shopfinity

> A lightweight, modern, multilingual e-commerce web app built with React + TypeScript. It includes a public storefront and an admin dashboard for product management and analytics.

---

## 🎯 Short description

Shopfinity is a single-page e-commerce application (SPA) focused on smooth UX, multilingual support, and an admin dashboard. Public-facing pages include a landing page, products listing, basket, checkout, contact, about, authentication pages, and a 404 page. The admin dashboard provides overview widgets, product lists, and forms for creating/editing products.

## ✨ Key features

* Public pages: Landing, Products, Basket, Checkout, Contact, About, Login/Forgot Password, 404.
* Admin dashboard: Overview (charts & metrics), Products table, Create Product, Edit Product.
* State management: Redux Toolkit for global state (e.g., cart).
* Context API: Theme (light/dark) and other app-level context.
* Internationalization (i18next): Persian (fa), English (en), French (fr).
* Fully responsive design with Tailwind CSS.
* Forms handled with React Hook Form.
* Fetching product data via Axios (example: `https://dummyjson.com/products`).
* Head management with `react-helmet-async` for SEO-friendly titles.
* Notifications with React Toastify.
* Dashboard charts using ApexCharts (or similar charting library).

## 🧭 Project structure (concise & clear)

```
Shopfinity/
├── public/                # Static files served directly (index.html, icons, ...)
├── src/
│   ├── app/               # App entry files (main/app), routing, AuthChecker
│   ├── components/        # Reusable components (buttons, cards, inputs, widgets)
│   ├── context/           # Custom React contexts (e.g., Theme-Context)
│   ├── i18n/              # i18next configuration and translation files
│   ├── layouts/           # Layouts (Navbar, DashboardLayout, Footer, ...)
│   ├── pages/             # Public and dashboard pages (public/, dashboard/)
│   ├── redux/             # Redux store, slices, and types
│   ├── styles/            # Styles (Tailwind overrides, variables)
│   └── types/             # TypeScript types and interfaces
├── .gitignore
├── package.json           # Dependencies and scripts
├── vite.config.ts         # Vite configuration
└── tsconfig.json          # TypeScript configuration
```

> Note: Each folder has a clear responsibility, which improves clarity and scalability.

## 🛠️ Tech stack
Core & Runtime
React ^19.1.1

TypeScript ~5.8.3

Vite ^7.1.2

Styling & UX
Tailwind CSS ^4.1.12

@tailwindcss/vite ^4.1.12

react-icons ^5.5.0

clsx ^2.1.1

State, Data & Networking
@reduxjs/toolkit ^2.8.2

react-redux ^9.2.0

axios ^1.11.0

Routing, Forms & i18n

react-router-dom ^7.8.0

react-hook-form ^7.62.0

i18next ^25.3.6

react-i18next ^15.6.1

i18next-browser-languagedetector ^8.2.0

Charts, Tables & Visual Data
apexcharts ^5.3.3

react-apexcharts ^1.7.0

@tanstack/react-table ^8.21.3

Misc & Utilities
react-helmet-async ^2.0.5 (head management)

react-country-flag ^3.1.0

react-toastify ^11.0.5

react-hot-toast ^2.6.0

Dev tooling & linting
vite ^7.1.2

@vitejs/plugin-react ^5.0.0

eslint ^9.33.0 and @eslint/js

eslint-plugin-react-hooks ^5.2.0

eslint-plugin-react-refresh ^0.4.20

types for React: @types/react / @types/react-dom

## 🚀 Local setup (Development)

**Prerequisites**:

* Node.js (recommended >=16)
* npm 

**Steps**:

1. Clone the repository

```bash
git clone <REPO_URL>
cd Shopfinity
```

2. Install dependencies

```bash
npm install
```

3. Environment variables

Create a `.env` file if needed and add sample variables:

```
VITE_API_BASE=https://dummyjson.com
# or your real API base URL
```

4. Start development server

```bash
npm run dev
```

5. Build for production

```bash
npm run build
```

## 🔧 Useful scripts (example)

Typical `package.json` scripts in this project:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx"
  }
}
```

(If your `package.json` differs, the real scripts will be used.)

## 🌐 Internationalization (i18n)

* All user-facing texts are managed by `react-i18next` with translation files located in `src/i18n/`.
* Suggested file layout:

  * `src/i18n/en.json` (English)
  * `src/i18n/fa.json` (Persian)
  * `src/i18n/fr.json` (French)
* To add a new language: create a translation JSON and register it in the i18n configuration.
* Make sure to set the document `dir` (LTR/RTL) depending on the current language (e.g., `dir="rtl"` for Persian).

## 🔁 State management & cart

* The shopping cart is stored in Redux (for example `redux/cartSlice.ts`).
* Actions manage add/remove/update quantity behavior.
* Total price is computed on the Checkout page from the cart items.

## 📡 API integration

* Axios is used to fetch products and other data. Example used in the products page: `https://dummyjson.com/products`.
* For a real backend provide endpoints for: Products, Product by ID, Auth, Orders.
* If authentication is required, include the JWT token in the `Authorization` header.

## 🧩 Important components & pages

* `components/`:

  * `product-Item`, `FilterNav`, `Basket-Sidebar`, `CheckoutForm`, `LoginForm`, `ForgotPassForm`, dashboard widgets, and chart components.
* `pages/public/`:

  * Landing, Products, Basket, Checkout, Contact, About, Login, ForgotPassword, NotFound
* `pages/dashboard/`:

  * Overview, DashboardProducts, DashboardCreateProduct, DashboardEditProduct

## ✅ Developer tips

* Use modern image formats (WebP) and lazy-loading for better performance.
* Break large components into smaller pieces to improve testability and maintainability.
* Use `React.memo`, `useCallback`, and `useMemo` when appropriate to prevent unnecessary re-renders.
* When supporting RTL languages, ensure the root element `dir` changes and UI components respond correctly.

## ✅ README checklist (optional enhancements)

* [ ] Add screenshots (upload images to the repo) to showcase key pages
* [ ] Insert the real `package.json` content for accurate dependencies & scripts
* [ ] Document API endpoints (routes and request/response examples)
* [ ] Add CI/CD hints (GitHub Actions or Vercel config) if desired

---

### Need more?

I can now:

* Translate this README into Persian and French (include multilingual sections)
* Insert screenshots or GIFs if you upload them
* Replace the sample scripts with your actual `package.json` content if you provide it
* Add API examples or a Postman collection if you share endpoint details

Tell me which of the above you want next and I’ll update the README accordingly.
