# InventoryPro - Modern Inventory Management System

A full-stack inventory management application built with Next.js, Redux Toolkit, MongoDB, and modern UI components.

## Features

### Authentication

- JWT-based authentication
- Secure password hashing with bcrypt
- Protected routes and API endpoints
- User registration and login

### Product Management

- Create, read, update, and delete products
- Image upload support
- Stock tracking with low-stock alerts
- Advanced search and filtering
- Sorting capabilities

### Modern UI/UX

- Responsive design with Tailwind CSS
- Toast notifications
- Loading states and error handling
- Modern glassmorphism effects
- Accessible components

### Performance

- Efficient data structures and algorithms
- RTK Query for optimized data fetching
- Server-side rendering with Next.js
- Optimized images and assets

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **State Management**: Redux Toolkit, RTK Query
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/jakariamasum/inventory-manager.git
   cd inventory-manager

   ```

2. **Install dependencies**

   ```bash
   npm install

   ```

3. **Set up environment variables**

   ```bash
   touch .env.local

   ```

   Update the `.env.local` file with your values:

   ```env
   NEXT_PUBLIC_JWT_SECRET=<your jwt secret>
   NEXT_PUBLIC_DATABASE_URL= <your db url>
   NEXT_PUBLIC_BCRYPT_SALT_ROUNDS= your salt rounds
   NEXT_PUBLIC_URL= "http://localhost:3000"
   NEXT_PUBLIC_CLOUDINARY_PRESET= <your cloudinary preset>
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME= <your cloudinary cloud name>

   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

5. **Run the development server**

   ```bash
   npm run dev

   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Test Credentials

For testing purposes, you can use these credentials:

**Demo admin Account:**

- Email: `admin@gmail.com`
- Password: `123456`

**Demo user Account:**

- Email: `user@gmail.com`
- Password: `123456`

Or create a new account using the registration form.

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Products (Protected)

- `GET /api/products` - Get all products (with pagination and search)
- `POST /api/products` - Create a new product
- `GET /api/products/[id]` - Get a specific product
- `PUT /api/products/[id]` - Update a product
- `DELETE /api/products/[id]` - Delete a product

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [Tailwind CSS](https://tailwindcss.com/) for styling

---

**Built with ❤️ by Jakaria Masum**
