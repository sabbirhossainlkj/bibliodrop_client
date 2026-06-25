# 📚 BiblioDrop – Online Book Delivery Management System

BiblioDrop is a modern web-based platform designed to simplify book management and delivery operations. The system allows users to browse books, request deliveries, make payments, and track delivery status, while librarians and administrators can efficiently manage books, approvals, and delivery workflows.

## 🚀 Features

### 👤 User Features

* Browse and search published books
* View detailed book information
* Request book deliveries
* Pay delivery fees securely
* Track delivery status in real-time
* View delivery history
* Manage personal profile

### 📚 Librarian Features

* Add new books
* Edit book information
* Manage book inventory
* Toggle book publish/unpublish status
* Manage delivery requests
* Update delivery status:

  * Pending
  * Dispatched
  * Delivered

### 🛡️ Admin Features

* Approve pending books
* Publish approved books
* Delete inappropriate books
* Manage users and librarians
* Monitor system activities
* View analytics dashboard

### 📊 Dashboard Features

* Full-width responsive dashboard
* Interactive charts and graphs
* Book statistics overview
* Delivery analytics
* User profile section
* Consistent UI color theme

---

## 🛠️ Technology Stack

### Frontend

* Next.js 15
* React.js
* Tailwind CSS
* Lucide React
* React Hooks

### Backend

* Node.js
* Express.js
* MongoDB

### Authentication

* NextAuth.js / Auth.js

### Payment Integration

* Stripe Payment Gateway

### Deployment

* Vercel (Frontend)
* Render / Railway / VPS (Backend)

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── dashboard/
│   ├── books/
│   ├── payment/
│   └── profile/
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── books/
│   └── shared/
│
├── lib/
├── hooks/
├── services/
└── utils/
```

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/bibliodrop.git
```

Move to the project directory:

```bash
cd bibliodrop
```

Install dependencies:

```bash
npm install
```

Create a `.env.local` file and configure environment variables:

```env
MONGODB_URI=your_mongodb_connection_string

AUTH_SECRET=your_auth_secret


STRIPE_SECRET_KEY=your_stripe_secret_key

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_publishable_key
```

Run the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

---

## 🔄 Delivery Workflow

1. User requests a book delivery.
2. User pays the delivery fee.
3. Delivery request is created with **Pending** status.
4. Librarian updates status to **Dispatched**.
5. Librarian updates status to **Delivered**.
6. User can track delivery progress from the dashboard.

---

## 📖 Book Approval Workflow

1. Librarian adds a new book.
2. Book status becomes **Pending Approval**.
3. Admin reviews the book.
4. Admin clicks **Approve & Publish**.
5. Book becomes publicly visible.
6. Admin may delete rejected books.

---

## 🌟 Future Improvements

* Email notifications
* SMS delivery updates
* Advanced filtering and search
* Wishlist functionality
* Book recommendation system
* PDF eBook support
* Multi-language support

---

## 👨‍💻 Author

**Sabbir Hossain**

### Contact

* Email: [your-email@example.com](mailto:your-email@example.com)
* GitHub: https://github.com/your-github-username

---

## 📜 License

This project is licensed under the MIT License.

---

### ⭐ If you like this project, don't forget to star the repository!
