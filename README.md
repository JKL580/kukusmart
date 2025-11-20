# 🐔 KukuSmart - Modern Poultry Management Platform

![KukuSmart Banner](https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&h=300&fit=crop)

**Empowering Kenyan Poultry Farmers with Digital Tools for Success**

KukuSmart is a comprehensive digital ecosystem designed to modernize poultry farming in Kenya. The platform provides a marketplace for buying and selling poultry products, disease management guides, and educational resources—all in one beautiful, easy-to-use application.

---

## 🌟 Features

### 🛒 Marketplace

- Browse and purchase day-old chicks, mature chickens, feeds, and equipment
- Advanced filtering by category, breed, price, and location
- Shopping cart with M-Pesa integration
- Direct WhatsApp contact with sellers
- Simple seller registration (phone-based, no complex authentication)

### 🏥 Disease Management

- Comprehensive guides on 7+ common poultry diseases
- Vaccination schedules with downloadable PDFs
- Biosecurity best practices
- Symptoms, causes, treatments, and prevention strategies
- When to call a vet guidelines

### 📚 Learning Centre

- Educational articles on brooding, feeding, housing, and water management
- Step-by-step guides from industry experts
- Categorized content for easy navigation
- Read time estimates and view counters

### 💳 Payment Integration

- M-Pesa STK Push for instant payments
- Cash on delivery option
- Order tracking system

---

## 🛠️ Tech Stack

### Backend

- **Node.js** + **Express** - RESTful API
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **Axios** - M-Pesa API integration

### Frontend

- **React 18** - UI library
- **Vite** - Fast build tool
- **React Router v6** - Client-side routing
- **TailwindCSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **Axios** - HTTP client

---

## 📁 Project Structure

```
kukusmart/
├── backend/                # Node.js + Express API
│   ├── src/
│   │   ├── config/        # Database configuration
│   │   ├── models/        # Mongoose schemas
│   │   ├── routes/        # API endpoints
│   │   ├── middleware/    # Authentication & validation
│   │   ├── utils/         # Helper functions & seeders
│   │   └── server.js      # Express app entry point
│   ├── .env               # Environment variables (not in git)
│   ├── .env.example       # Environment template
│   ├── package.json
│   └── README.md
│
├── frontend/              # React + Vite application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components (10 pages)
│   │   ├── context/       # React Context (Cart state)
│   │   ├── App.jsx        # Main app component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── public/            # Static assets
│   ├── .env               # Environment variables (not in git)
│   ├── .env.example       # Environment template
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md
│
├── .gitignore
└── README.md              # This file
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- **Node.js** v18 or higher
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB)
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/kukusmart.git
cd kukusmart
```

2. **Setup Backend**

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run seed          # Seed database with sample data
npm run dev           # Start backend server
```

Backend runs on: `http://localhost:5001`

3. **Setup Frontend** (in a new terminal)

```bash
cd frontend
npm install
cp .env.example .env
# Edit .env with backend URL
npm run dev           # Start frontend server
```

Frontend runs on: `http://localhost:3000`

4. **Open your browser**
   Navigate to `http://localhost:3000`

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` from `backend/.env.example` and configure:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development

# M-Pesa (optional for development)
MPESA_CONSUMER_KEY=your_key
MPESA_CONSUMER_SECRET=your_secret
MPESA_PASSKEY=your_passkey
MPESA_SHORTCODE=your_shortcode
MPESA_CALLBACK_URL=your_callback_url
```

### Frontend Environment Variables

Create `frontend/.env` from `frontend/.env.example` and configure:

```env
VITE_API_URL=http://localhost:5001/api
```

**Note:** Never commit `.env` files to version control. They are already in `.gitignore`.

---

## 📊 Database Seeding

To populate your database with sample data (products, diseases, articles):

```bash
cd backend
npm run seed
```

This creates:

- 4 sample sellers
- 12 products (chicks, feeds, equipment)
- 7 disease guides
- 4 learning articles

---

## 🧪 Testing

### Backend API Testing

```bash
# Health check
curl http://localhost:5001/

# Get all products
curl http://localhost:5001/api/products

# Get all diseases
curl http://localhost:5001/api/diseases

# Get all articles
curl http://localhost:5001/api/articles
```

### Frontend Testing

1. Navigate through all pages
2. Add items to cart
3. Test filters and search
4. View product/disease/article details
5. Submit seller form
6. Complete checkout process

---

## 🚀 Deployment

### Backend Deployment (Render)

1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Connect GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add environment variables from your `.env` file
6. Deploy!

### Frontend Deployment (Vercel)

1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to frontend: `cd frontend`
3. Update `.env` with production API URL
4. Deploy: `vercel --prod`
5. Add environment variable `VITE_API_URL` in Vercel dashboard

Alternatively, use Vercel's GitHub integration for automatic deployments.

---

## 📖 API Documentation

### Products

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (seller)

### Diseases

- `GET /api/diseases` - Get all diseases
- `GET /api/diseases/:id` - Get disease details

### Articles

- `GET /api/articles` - Get all articles
- `GET /api/articles/slug/:slug` - Get article by slug

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders/:orderNumber` - Get order details

### M-Pesa

- `POST /api/mpesa/stkpush` - Initiate payment
- `POST /api/mpesa/callback` - Payment callback (webhook)

For detailed API documentation, see `backend/README.md`

---

## 🎨 Design System

### Color Palette

- Primary: Brown/Amber tones (`#d97706`)
- Secondary: Orange (`#ea580c`)
- Accent: Green for success, Red for errors
- Neutral: Grays for text and backgrounds

### Typography

- Font: System fonts (optimized for performance)
- Headings: Bold, large sizes
- Body: Regular weight, comfortable reading size

### Components

- Cards with shadows and rounded corners
- Smooth transitions and hover effects
- Mobile-first responsive design
- Consistent spacing and layout

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Use ESLint and Prettier
- Follow React best practices
- Write clean, readable code
- Add comments for complex logic
- Test your changes thoroughly

---

## 🐛 Troubleshooting

### Backend won't start

- Check MongoDB connection string in `.env`
- Ensure MongoDB Atlas allows connections from your IP
- Verify port 5001 is not in use

### Frontend can't connect to backend

- Check `VITE_API_URL` in `frontend/.env`
- Restart frontend dev server after changing `.env`
- Ensure backend is running on port 5001

### CORS errors

- Verify CORS configuration in `backend/src/server.js`
- Check API URL doesn't have trailing slash

### Build fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

**KukuSmart Team**

- Lead Developer: Joachim Kiplimo
- Contributors:

---

## 🙏 Acknowledgments

- Kenyan poultry farmers for inspiration and feedback
- Safaricom for M-Pesa Daraja API
- MongoDB Atlas for database hosting
- Render and Vercel for deployment platforms
- Unsplash for placeholder images
- Open source community for amazing tools

---

## 📞 Support

For issues, questions, or suggestions:

- 📧 Email: info@kukusmart.co.ke
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/kukusmart/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/kukusmart/discussions)

---

## 🗺️ Roadmap

### Phase 1 (Current - MVP) ✅

- [x] Marketplace with product listings
- [x] Disease management guides
- [x] Learning centre
- [x] Shopping cart
- [x] M-Pesa integration
- [x] Seller portal

### Phase 2 (Next)

- [ ] User authentication (JWT)
- [ ] Seller dashboard
- [ ] Order management system
- [ ] Product reviews and ratings
- [ ] Advanced search with filters
- [ ] Email notifications
- [ ] SMS integration

### Phase 3 (Future)

- [ ] Mobile app (React Native)
- [ ] Real-time chat with sellers
- [ ] Analytics dashboard
- [ ] Multi-language support (Swahili)
- [ ] Community forum
- [ ] Veterinary consultation booking
- [ ] Farm management tools

---

## 📊 Project Stats

- **Lines of Code:** ~10,000+
- **API Endpoints:** 20+
- **React Components:** 15+
- **Pages:** 10
- **Database Models:** 5
- **Development Time:** ~40 hours

---

## 🌍 Live Demo

- **Frontend:** [https://kukusmart.vercel.app](https://kukusmart.vercel.app)
- **Backend API:** [https://kukusmart-backend.onrender.com](https://kukusmart-backend.onrender.com)

**Note:** Demo uses sample data. Real production deployment may vary.

---

## 📸 Screenshots

### Landing Page

![Landing Page](./docs/screenshots/landing.png)

### Marketplace

![Marketplace](./docs/screenshots/marketplace.png)

### Disease Management

![Disease Management](./docs/screenshots/diseases.png)

### Learning Centre

![Learning Centre](./docs/screenshots/learning.png)

---

## 🔒 Security

- Environment variables stored securely (not in git)
- MongoDB connection over TLS
- HTTPS in production (automatic with Render/Vercel)
- Input validation on all forms
- Secure M-Pesa integration

**Never commit sensitive data like API keys, passwords, or connection strings!**

---

## 📚 Additional Documentation

- [Backend API Documentation](./backend/README.md)
- [Frontend Documentation](./frontend/README.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)
- [Contributing Guidelines](./CONTRIBUTING.md)

---

**Made with ❤️ for Kenyan Farmers**

🐔 **Happy Farming with KukuSmart!** 🐔
