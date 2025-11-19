# KukuSmart Backend API

RESTful API for the KukuSmart poultry management platform built with Node.js, Express, and MongoDB.

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Create `.env` file:

```bash
cp .env.example .env
```

3. Configure environment variables in `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://kukusmart:lagat@kukusmart.xqacyhf.mongodb.net/kukusmart?retryWrites=true&w=majority&appName=kukusmart
NODE_ENV=development

# Optional: M-Pesa Integration
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
MPESA_SHORTCODE=174379
MPESA_CALLBACK_URL=http://localhost:5000/api/mpesa/callback
```

4. Seed the database:

```bash
npm run seed
```

5. Start development server:

```bash
npm run dev
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── models/
│   │   ├── Product.js         # Product schema
│   │   ├── Seller.js          # Seller schema
│   │   ├── Disease.js         # Disease schema
│   │   ├── Article.js         # Article schema
│   │   └── Order.js           # Order schema
│   ├── routes/
│   │   ├── products.js        # Product endpoints
│   │   ├── sellers.js         # Seller endpoints
│   │   ├── diseases.js        # Disease endpoints
│   │   ├── articles.js        # Article endpoints
│   │   ├── orders.js          # Order endpoints
│   │   └── mpesa.js           # M-Pesa integration
│   ├── middleware/
│   │   └── auth.js            # Authentication middleware
│   ├── utils/
│   │   └── seed.js            # Database seeder
│   └── server.js              # Express application
├── .env                        # Environment variables (create this)
├── .env.example               # Environment template
├── .gitignore
├── package.json
└── README.md
```

## 🔌 API Endpoints

### Health Check

```
GET /                          # API health status
```

### Products

```
GET    /api/products           # Get all products (with filters)
GET    /api/products/:id       # Get single product
POST   /api/products           # Create product
PUT    /api/products/:id       # Update product
DELETE /api/products/:id       # Delete product
```

**Query Parameters:**

- `category` - Filter by category (day-old-chicks, mature-chickens, feeds, equipment, supplements, other)
- `breed` - Filter by breed name
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `location` - Filter by location
- `search` - Search in name and description

### Sellers

```
GET    /api/sellers            # Get all sellers
GET    /api/sellers/:id        # Get seller with products
POST   /api/sellers/auth       # Simple seller authentication
```

### Diseases

```
GET    /api/diseases           # Get all diseases
GET    /api/diseases/:id       # Get single disease
POST   /api/diseases           # Create disease
```

**Query Parameters:**

- `severity` - Filter by severity (low, medium, high, critical)
- `search` - Search in name and description

### Articles

```
GET    /api/articles           # Get all articles
GET    /api/articles/:id       # Get article by ID
GET    /api/articles/slug/:slug # Get article by slug
POST   /api/articles           # Create article
```

**Query Parameters:**

- `category` - Filter by category (brooding, feeding, housing, water-management, incubation, health, business, other)
- `search` - Search in title, excerpt, and content

### Orders

```
POST   /api/orders             # Create order
GET    /api/orders/:orderNumber # Get order details
PATCH  /api/orders/:orderNumber/payment # Update payment status
```

### M-Pesa

```
POST   /api/mpesa/stkpush      # Initiate STK Push payment
POST   /api/mpesa/callback     # M-Pesa callback webhook
```

## 📝 Example Requests

### Create Product

```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "sellerInfo": {
      "name": "John Kamau",
      "phone": "254712345678",
      "location": "Kiambu"
    },
    "productInfo": {
      "name": "Broiler Chicks",
      "category": "day-old-chicks",
      "breed": "Cobb 500",
      "price": 80,
      "quantity": 500,
      "description": "Quality broiler chicks from certified hatchery",
      "images": ["https://images.unsplash.com/photo-..."],
      "location": "Kiambu"
    }
  }'
```

### Get Products with Filters

```bash
curl "http://localhost:5000/api/products?category=day-old-chicks&location=Nairobi&minPrice=50&maxPrice=150"
```

### Create Order

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "buyerName": "Mary Wanjiku",
    "buyerPhone": "254723456789",
    "buyerLocation": "Nairobi",
    "items": [
      {
        "product": "product_id_here",
        "name": "Broiler Chicks",
        "price": 80,
        "quantity": 100
      }
    ],
    "totalAmount": 8000,
    "paymentMethod": "mpesa"
  }'
```

## 🗄️ Database Models

### Product

- name, category, breed, price, quantity
- description, images[], seller (ref)
- location, status, timestamps

### Seller

- name, phone, whatsapp, location
- verified, timestamps

### Disease

- name, description, symptoms[], causes[]
- treatment, prevention[], images[]
- whenToCallVet, severity, timestamps

### Article

- title, slug, category, thumbnail
- excerpt, content, author, readTime
- views, timestamps

### Order

- orderNumber, buyerName, buyerPhone, buyerLocation
- items[], totalAmount, paymentMethod, paymentStatus
- mpesaReceiptNumber, orderStatus, timestamps

## 🛠️ Scripts

```bash
npm run dev        # Start development server with nodemon
npm start          # Start production server
npm run seed       # Seed database with sample data
```

## 🔐 Environment Variables

| Variable              | Description                          | Required           |
| --------------------- | ------------------------------------ | ------------------ |
| PORT                  | Server port                          | No (default: 5000) |
| MONGODB_URI           | MongoDB connection string            | Yes                |
| NODE_ENV              | Environment (development/production) | No                 |
| MPESA_CONSUMER_KEY    | Daraja API consumer key              | No                 |
| MPESA_CONSUMER_SECRET | Daraja API consumer secret           | No                 |
| MPESA_PASSKEY         | M-Pesa passkey                       | No                 |
| MPESA_SHORTCODE       | M-Pesa business shortcode            | No                 |
| MPESA_CALLBACK_URL    | M-Pesa callback URL                  | No                 |

## 🚀 Deployment (Render)

1. Push code to GitHub
2. Go to [render.com](https://render.com) and create account
3. Create new Web Service
4. Connect GitHub repository
5. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add environment variables from `.env`
7. Deploy!

Your API will be live at: `https://your-app-name.onrender.com`

## 🧪 Testing

### Manual Testing

```bash
# Health check
curl http://localhost:5000/

# Get all products
curl http://localhost:5000/api/products

# Get all diseases
curl http://localhost:5000/api/diseases

# Get all articles
curl http://localhost:5000/api/articles
```

### Testing with Postman

Import these endpoints into Postman for easier testing.

## 🐛 Troubleshooting

### MongoDB Connection Failed

- Check MongoDB Atlas allows connections from `0.0.0.0/0`
- Verify connection string has correct password
- Check if MongoDB Atlas cluster is active

### CORS Errors

- Verify CORS configuration in `server.js`
- Check frontend URL is allowed

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9
```

## 📚 Dependencies

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **cors**: Enable CORS
- **dotenv**: Environment variables
- **axios**: HTTP client (M-Pesa)
- **morgan**: HTTP request logger

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

MIT License

## 👥 Authors

KukuSmart Team

## 📞 Support

For issues or questions:

- Email: info@kukusmart.co.ke
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

---

**Made with ❤️ for Kenyan Farmers**

```

```
