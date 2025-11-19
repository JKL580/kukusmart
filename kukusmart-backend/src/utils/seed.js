import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';
import Seller from '../models/Seller.js';
import Disease from '../models/Disease.js';
import Article from '../models/Article.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Promise.all([
      Product.deleteMany({}),
      Seller.deleteMany({}),
      Disease.deleteMany({}),
      Article.deleteMany({})
    ]);
    console.log('✅ Cleared existing data');

    // Create Sellers
    console.log('👥 Creating sellers...');
    const sellers = await Seller.create([
      {
        name: 'John Kamau',
        phone: '254712345678',
        whatsapp: '254712345678',
        location: 'Kiambu'
      },
      {
        name: 'Mary Wanjiku',
        phone: '254723456789',
        whatsapp: '254723456789',
        location: 'Nakuru'
      },
      {
        name: 'Peter Otieno',
        phone: '254734567890',
        whatsapp: '254734567890',
        location: 'Eldoret'
      },
      {
        name: 'Grace Achieng',
        phone: '254745678901',
        whatsapp: '254745678901',
        location: 'Kisumu'
      }
    ]);
    console.log(`✅ Created ${sellers.length} sellers`);

    // Create Products
    console.log('📦 Creating products...');
    const products = await Product.create([
      {
        name: 'Broiler Day-Old Chicks (Cobb 500)',
        category: 'day-old-chicks',
        breed: 'Cobb 500',
        price: 80,
        quantity: 500,
        description: 'High-quality broiler chicks from certified hatchery. Fast growth rate, excellent feed conversion. Ready for delivery. Minimum order: 50 chicks.',
        images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500'],
        seller: sellers[0]._id,
        location: 'Kiambu',
        status: 'active'
      },
      {
        name: 'Kienyeji Indigenous Chicks',
        category: 'day-old-chicks',
        breed: 'Kienyeji',
        price: 120,
        quantity: 300,
        description: 'Pure indigenous Kienyeji chicks. Disease resistant, dual purpose (meat and eggs). Hardy birds suitable for free-range farming.',
        images: ['https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500'],
        seller: sellers[1]._id,
        location: 'Nakuru',
        status: 'active'
      },
      {
        name: 'Kenbro Layer Chicks',
        category: 'day-old-chicks',
        breed: 'Kenbro',
        price: 100,
        quantity: 400,
        description: 'Kenbro improved kienyeji. Dual purpose - good for both meat and eggs. Better feed conversion than traditional kienyeji.',
        images: ['https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=500'],
        seller: sellers[2]._id,
        location: 'Eldoret',
        status: 'active'
      },
      {
        name: 'Layer Pullets (16 weeks old)',
        category: 'mature-chickens',
        breed: 'Rhode Island Red',
        price: 850,
        quantity: 150,
        description: 'Ready-to-lay pullets at 16 weeks. Fully vaccinated, excellent egg production potential. Will start laying in 2-3 weeks.',
        images: ['https://images.unsplash.com/photo-1603074197253-563a6dc7f321?w=500'],
        seller: sellers[0]._id,
        location: 'Kiambu',
        status: 'active'
      },
      {
        name: 'Broiler Starter Feed 50kg',
        category: 'feeds',
        price: 3200,
        quantity: 80,
        description: 'Premium broiler starter feed with 22% protein. Suitable for chicks 0-3 weeks. Contains essential vitamins and minerals. Manufactured by reputable feed mill.',
        images: ['https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=500'],
        seller: sellers[2]._id,
        location: 'Eldoret',
        status: 'active'
      },
      {
        name: 'Layer Mash 70kg',
        category: 'feeds',
        price: 4000,
        quantity: 60,
        description: 'Complete layer feed with optimal calcium and minerals for maximum egg production. 16% protein. Suitable for layers from 18 weeks onwards.',
        images: ['https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500'],
        seller: sellers[1]._id,
        location: 'Nakuru',
        status: 'active'
      },
      {
        name: 'Grower Feed 50kg',
        category: 'feeds',
        price: 3000,
        quantity: 70,
        description: 'Balanced grower feed for birds 4-8 weeks. 18% protein. Supports optimal growth and development.',
        images: ['https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=500'],
        seller: sellers[3]._id,
        location: 'Kisumu',
        status: 'active'
      },
      {
        name: 'Automatic Drinkers (10 pieces)',
        category: 'equipment',
        price: 1500,
        quantity: 40,
        description: 'Automatic bell drinkers for poultry. Reduces water wastage, keeps water clean. Easy to install. Pack of 10 drinkers.',
        images: ['https://images.unsplash.com/photo-1628519906081-f046c1c12f8c?w=500'],
        seller: sellers[2]._id,
        location: 'Eldoret',
        status: 'active'
      },
      {
        name: 'Battery Cage System (120 birds capacity)',
        category: 'equipment',
        price: 85000,
        quantity: 5,
        description: 'Complete battery cage system with feeders and automatic drinkers. Galvanized steel construction. 4 tiers, holds 120 birds. Easy egg collection.',
        images: ['https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500'],
        seller: sellers[0]._id,
        location: 'Kiambu',
        status: 'active'
      },
      {
        name: 'Feeders (Round, 10kg capacity) - 5pcs',
        category: 'equipment',
        price: 2500,
        quantity: 30,
        description: 'Round feeders with anti-waste design. 10kg capacity each. Durable plastic. Pack of 5 feeders.',
        images: ['https://images.unsplash.com/photo-1582554869443-b0f18f3516a4?w=500'],
        seller: sellers[1]._id,
        location: 'Nakuru',
        status: 'active'
      },
      {
        name: 'Multi-Vitamin Supplement 1kg',
        category: 'supplements',
        price: 800,
        quantity: 100,
        description: 'Multi-vitamin powder for stress management and improved immunity. Water-soluble. Suitable for all poultry types.',
        images: ['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500'],
        seller: sellers[1]._id,
        location: 'Nakuru',
        status: 'active'
      },
      {
        name: 'Calcium Supplement (Oyster Shell) 25kg',
        category: 'supplements',
        price: 1200,
        quantity: 50,
        description: 'Crushed oyster shell calcium supplement for layers. Improves eggshell strength. 25kg bag.',
        images: ['https://images.unsplash.com/photo-1587146429560-520fff64fe0c?w=500'],
        seller: sellers[3]._id,
        location: 'Kisumu',
        status: 'active'
      }
    ]);
    console.log(`✅ Created ${products.length} products`);

    // Create Diseases
    console.log('🦠 Creating disease guides...');
    const diseases = await Disease.create([
      {
        name: 'Newcastle Disease',
        description: 'Highly contagious viral disease affecting the respiratory, nervous, and digestive systems. One of the most serious poultry diseases in Kenya.',
        symptoms: [
          'Greenish watery diarrhea',
          'Gasping and coughing',
          'Twisted neck and paralysis',
          'Sudden death without prior symptoms',
          'Significant drop in egg production',
          'Soft-shelled or misshapen eggs',
          'Swelling around eyes and head'
        ],
        causes: [
          'Newcastle Disease Virus (NDV)',
          'Direct contact with infected birds',
          'Contaminated feed, water, or equipment',
          'Wild birds carrying the virus',
          'Airborne transmission over short distances'
        ],
        treatment: 'No specific treatment available. Focus on supportive care: provide clean water with electrolytes, maintain proper temperature, use antibiotics to prevent secondary bacterial infections. Most important is prevention through vaccination.',
        prevention: [
          'Vaccinate all birds at day 1 with Hitchner B1',
          'Booster vaccination at week 3 with Lasota',
          'Regular booster every 3 months for layers',
          'Strict biosecurity measures',
          'Quarantine new birds for minimum 2 weeks',
          'Control wild bird access to farm',
          'Disinfect equipment and vehicles'
        ],
        images: ['https://images.unsplash.com/photo-1589526124654-398f29c40e11?w=500'],
        whenToCallVet: 'Call veterinarian immediately if you notice sudden deaths, twisted necks, or respiratory distress in multiple birds. Early diagnosis can help contain the outbreak.',
        severity: 'critical'
      },
      {
        name: 'Coccidiosis',
        description: 'Parasitic disease caused by Eimeria protozoa affecting the intestinal tract. Most common in young chicks but can affect birds of any age.',
        symptoms: [
          'Bloody diarrhea (red or brown droppings)',
          'Drooping wings and ruffled feathers',
          'Pale combs and wattles (anemia)',
          'Reduced appetite and water intake',
          'Huddling together for warmth',
          'Poor growth rate in young birds',
          'Weakness and lethargy'
        ],
        causes: [
          'Eimeria parasites present in litter',
          'Wet, damp bedding materials',
          'Overcrowding of birds',
          'Poor ventilation',
          'Contaminated water sources',
          'Stress factors'
        ],
        treatment: 'Anticoccidial drugs: Amprolium (5-7 days), Sulfaquinoxaline (3-5 days), or combination drugs. Maintain dry litter. Provide clean water with electrolytes. Separate sick birds if possible.',
        prevention: [
          'Keep litter dry and clean at all times',
          'Use coccidiostats in feed (if not vaccinated)',
          'Vaccinate day-old chicks if available',
          'Avoid overcrowding - maintain proper stocking density',
          'Ensure excellent ventilation',
          'Regular cleaning and disinfection',
          'Use feeders and drinkers off the ground'
        ],
        images: ['https://images.unsplash.com/photo-1612170153139-6f881ff067e0?w=500'],
        whenToCallVet: 'If bloody diarrhea persists after 2 days of treatment, mortality rate increases, or you notice severe dehydration in affected birds.',
        severity: 'high'
      },
      {
        name: 'Infectious Bronchitis',
        description: 'Highly contagious viral respiratory disease that also affects the reproductive organs of layers. Spreads rapidly through the flock.',
        symptoms: [
          'Coughing and sneezing',
          'Nasal discharge and watery eyes',
          'Difficulty breathing and gasping',
          'Significant drop in egg production',
          'Misshapen, soft-shelled, or wrinkled eggs',
          'Wet droppings',
          'Reduced feed consumption'
        ],
        causes: [
          'Infectious Bronchitis Virus (IBV)',
          'Airborne transmission between birds',
          'Contaminated equipment and clothing',
          'Poor ventilation increasing viral load',
          'Stress factors weakening immunity'
        ],
        treatment: 'No specific cure for viral infection. Provide supportive care: maintain warmth (increase temperature by 2-3°C), ensure good ventilation, provide clean water with vitamins (especially vitamin C), use antibiotics to prevent secondary bacterial infections.',
        prevention: [
          'Vaccinate at day 1 with H120 vaccine',
          'Booster vaccination at week 4',
          'Use spray or drinking water vaccines',
          'Maintain good ventilation (avoid drafts)',
          'Implement strict biosecurity measures',
          'Proper temperature management',
          'All-in, all-out management system'
        ],
        images: ['https://images.unsplash.com/photo-1587146429560-520fff64fe0c?w=500'],
        whenToCallVet: 'If respiratory symptoms spread to more than 20% of flock within 48 hours, egg production drops below 50%, or secondary bacterial infections develop.',
        severity: 'high'
      },
      {
        name: 'Fowl Pox',
        description: 'Viral disease causing skin lesions and respiratory problems. Spread primarily by mosquitoes. Two forms: dry (skin) and wet (diphtheritic).',
        symptoms: [
          'Wart-like lesions on comb, wattles, and face',
          'Scabs around eyes and beak',
          'Yellow lesions in mouth and throat (diphtheritic form)',
          'Difficulty eating and breathing if mouth affected',
          'Reduced egg production in layers',
          'Slower growth in broilers',
          'Secondary bacterial infections of lesions'
        ],
        causes: [
          'Fowl Pox Virus',
          'Mosquito bites (primary transmission)',
          'Direct contact with infected birds',
          'Contaminated surfaces and equipment',
          'Fighting or pecking injuries'
        ],
        treatment: 'Disease is usually self-limiting (2-4 weeks). Remove and disinfect scabs with iodine solution. Apply antibiotic ointment to prevent secondary infections. Provide nutritious feed. Isolate severely affected birds. Ensure birds can eat and drink.',
        prevention: [
          'Vaccinate all birds at 6-8 weeks old (wing web stab)',
          'Control mosquito population aggressively',
          'Use mosquito nets on windows',
          'Remove stagnant water around farm',
          'Apply mosquito repellent in poultry house',
          'Isolate infected birds immediately',
          'Disinfect equipment regularly'
        ],
        images: ['https://images.unsplash.com/photo-1568640277810-8eda1bb92360?w=500'],
        whenToCallVet: 'If lesions become severely infected with pus, birds stop eating completely, or the diphtheritic form (mouth/throat) is suspected.',
        severity: 'medium'
      },
      {
        name: 'Marek\'s Disease',
        description: 'Viral disease causing tumors and paralysis in chickens. Very common in unvaccinated flocks. Affects birds between 6-20 weeks of age most commonly.',
        symptoms: [
          'Paralysis of legs, wings, or neck',
          'Grey iris and irregular pupil (eye damage)',
          'Twisted neck position',
          'Progressive weight loss',
          'Tumors in internal organs',
          'Sudden death in apparently healthy birds',
          'Inability to stand or walk'
        ],
        causes: [
          'Marek\'s Disease Virus (herpesvirus)',
          'Airborne transmission through feather dust',
          'Extremely contagious - spreads rapidly',
          'Infected birds shed virus for life',
          'Virus can survive in environment for months'
        ],
        treatment: 'No treatment available. Cull severely affected birds to prevent suffering. Focus entirely on prevention through early vaccination. Maintain good hygiene. Reduce stress factors.',
        prevention: [
          'Vaccinate chicks at day 1 (at hatchery is best)',
          'Vaccine protects against disease but not infection',
          'Maintain strict biosecurity',
          'All-in, all-out management system',
          'Reduce stress factors (overcrowding, heat, etc.)',
          'Select genetically resistant breeds when possible',
          'Depopulate and thoroughly disinfect between batches'
        ],
        images: ['https://images.unsplash.com/photo-1606567595334-d39972c85dbe?w=500'],
        whenToCallVet: 'If you observe paralysis or a sudden increase in mortality in birds aged 6-20 weeks. Early culling decisions are important.',
        severity: 'critical'
      },
      {
        name: 'Infectious Coryza',
        description: 'Bacterial respiratory disease causing facial swelling and foul-smelling nasal discharge. Common in multi-age farms with poor biosecurity.',
        symptoms: [
          'Swollen face and wattles (characteristic sign)',
          'Foul-smelling nasal discharge',
          'Sneezing and coughing',
          'Swollen and closed eyes',
          'Drop in egg production (10-40%)',
          'Reduced appetite',
          'Conjunctivitis (red, watery eyes)'
        ],
        causes: [
          'Avibacterium paragallinarum bacteria',
          'Direct contact with infected birds',
          'Contaminated water systems',
          'Mixing different age groups',
          'Stress and poor ventilation',
          'Carrier birds that appear healthy'
        ],
        treatment: 'Antibiotics are effective: Sulfadimethoxine (0.1% in water for 5-7 days), Erythromycin, or Tetracycline. Isolate infected birds. Improve ventilation. Provide supportive care. Complete full antibiotic course even if symptoms improve.',
        prevention: [
          'All-in, all-out management system',
          'Never mix birds of different ages',
          'Maintain good ventilation without drafts',
          'Clean and disinfect water systems regularly',
          'Vaccination available in endemic areas',
          'Quarantine new birds for 3 weeks minimum',
          'Maintain biosecurity at all entry points'
        ],
        images: ['https://images.unsplash.com/photo-1580933073521-dc49ac0d4e6a?w=500'],
        whenToCallVet: 'If facial swelling becomes severe and affects breathing, response to treatment is poor after 3 days, or disease spreads despite antibiotic use.',
        severity: 'medium'
      },
      {
        name: 'Fowl Cholera',
        description: 'Acute bacterial disease that can cause sudden death in chickens. More common in older birds and can become chronic in some flocks.',
        symptoms: [
          'Sudden death without prior symptoms (acute form)',
          'Dark red or purple comb and wattles',
          'Greenish or yellowish diarrhea',
          'Difficulty breathing and mucus from mouth',
          'Swollen joints (chronic form)',
          'Drop in egg production',
          'Fever and depression'
        ],
        causes: [
          'Pasteurella multocida bacteria',
          'Contaminated water and feed',
          'Wild birds and rodents as carriers',
          'Poor sanitation',
          'Injuries and wounds',
          'Stress and overcrowding'
        ],
        treatment: 'Antibiotics: Sulfadimethoxine, Tetracycline, or Penicillin. Treatment must start early. Injectable antibiotics work faster in acute cases. Isolate sick birds. Cull severely affected birds. Improve sanitation immediately.',
        prevention: [
          'Control rodents and wild birds strictly',
          'Maintain excellent farm hygiene',
          'Vaccination in endemic areas',
          'Provide clean, uncontaminated water',
          'Remove dead birds immediately',
          'Disinfect equipment and housing regularly',
          'Reduce stress factors',
          'All-in, all-out system'
        ],
        images: ['https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=500'],
        whenToCallVet: 'Immediately if you experience sudden deaths or find multiple birds dead without prior symptoms. This is an emergency requiring rapid response.',
        severity: 'critical'
      }
    ]);
    console.log(`✅ Created ${diseases.length} disease guides`);

    // Create Articles
    console.log('📚 Creating learning articles...');
    const articles = await Article.create([
      {
        title: 'Complete Guide to Brooding Day-Old Chicks',
        slug: 'complete-guide-brooding-day-old-chicks',
        category: 'brooding',
        thumbnail: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800',
        excerpt: 'Learn the essential steps for successfully raising healthy chicks from day one. This comprehensive guide covers temperature management, feeding schedules, vaccination, and common mistakes to avoid during the critical first month.',
        content: `The first 3 weeks of a chick's life are the most critical period in poultry farming. Success during brooding largely determines the overall performance of your flock. This guide provides everything you need to know for successful brooding.

**Pre-Arrival Preparation**

Before your chicks arrive, proper preparation is essential:

1. Clean the brooder house thoroughly, removing all old litter and debris
2. Disinfect with approved disinfectants (Virkon, Tek-Trol, or bleach solution)
3. Allow 3-5 days for complete drying
4. Set up heat source 48 hours before arrival to stabilize temperature
5. Test temperature at chick level, not room temperature

**Temperature Management - The Most Critical Factor**

Week 1: 32-35°C (90-95°F)
Week 2: 29-32°C (85-90°F)
Week 3: 26-29°C (80-85°F)
Week 4+: 21-24°C (70-75°F)

Reduce temperature by 3°C every week. How to know the temperature is right: If chicks huddle together under heat and chirp loudly, they're too cold. If they stay far from the heat source with wings spread, they're too hot. When temperature is just right, chicks are evenly distributed and quiet.

**First 24 Hours - Critical Actions**

1. Check chicks for dead on arrival (DOA) and document
2. Place chicks gently in the warm brooder
3. Dip beaks in water with glucose (50g per liter)
4. Start feeding after 2-3 hours
5. Use shallow drinkers to prevent drowning

**Feeding Program**

Weeks 1-3: Starter feed (20-22% protein)
- Serve 4-5 times per day
- Always keep feed available
- Use 1 feeder per 50 chicks

Weeks 4-8: Grower feed (18-20% protein)
- Transition gradually over 3 days
- Mix starter and grower in changing ratios

**Space Requirements**

0-2 weeks: 50 chicks per square meter
3-4 weeks: 25 chicks per square meter
5+ weeks: 10-15 chicks per square meter

**Common Problems and Solutions**

High mortality: Check temperature every 2 hours, buy from certified hatcheries, ensure clean water
Pasting: Remove gently with warm water, check brooder temperature
Cannibalism: Provide adequate space, reduce light intensity after week 1

Remember: A good start is half the battle won. The effort you put into proper brooding will pay dividends throughout the birds' productive life.`,
        author: 'KukuSmart Team',
        readTime: 12,
        views: 0
      },
      {
        title: 'Proper Feeding Management for Maximum Profits',
        slug: 'proper-feeding-management-maximum-profits',
        category: 'feeding',
        thumbnail: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
        excerpt: 'Feed costs account for 70% of poultry production expenses. Learn how to optimize feeding for better growth, egg production, and profitability while minimizing waste.',
        content: `Feed represents 65-70% of total poultry production costs. Proper feeding management is often the difference between profit and loss in poultry farming.

**Understanding Feed Costs**

For 100 broilers to market weight (2.5kg):
- Feed needed: 500 kg
- At Ksh 60/kg: Ksh 30,000
- That's 60-70% of total production cost

**Broiler Feed Program**

Starter (0-3 weeks): 20-23% protein, ~1.2 kg per bird
Grower (3-5 weeks): 19-20% protein, ~1.8 kg per bird
Finisher (5-7 weeks): 18-19% protein, ~2.0 kg per bird

Target Feed Conversion Ratio (FCR): 2.0:1
(2 kg feed produces 1 kg chicken)

**Layer Feed Program**

Chick Mash (0-6 weeks): 20-22% protein
Grower (7-16 weeks): 16-17% protein
Pre-lay (17-20 weeks): 17-18% protein, 2.5% calcium
Layer (20+ weeks): 16-17% protein, 3.5-4% calcium

Daily consumption: 110-120g per bird

**Feed Quality Indicators**

Visual inspection checklist:
- Uniform color (no dark or pale patches)
- No mold or lumps
- Fresh smell (not rancid or musty)
- No dust separation at bottom
- Consistent particle size

Always check manufacturing date - use feed within 3 months.

**Feed Storage Best Practices**

- Store in cool, dry place away from sunlight
- Use pallets to keep bags off ground
- First in, first out (FIFO) system
- Keep away from chemicals and pesticides
- Don't stack more than 10 bags high

**Preventing Feed Wastage**

Feed wastage typically ranges from 10-15% but can be reduced to under 5%:

1. Fill feeders only 1/3 full
2. Use feeders with anti-waste lips
3. Hang feeders at bird's back height
4. Use 1 feeder per 25 layers or 50 broilers
5. Choose pellets over mash when possible

Financial impact: For 1000 broilers, reducing wastage from 10% to 5% saves Ksh 15,000!

**Alternative Feed Ingredients**

For Kienyeji/Free-range systems:
- Kitchen scraps (cooked vegetables, ugali)
- Termites and insects (excellent protein)
- Fresh grass and weeds
- Food processing waste

**Homemade Feed Formula (Layers)**

Maize: 60%
Wheat/maize bran: 10%
Fishmeal/omena: 10%
Soya/sunflower cake: 15%
Limestone: 4%
Salt: 0.3%
Premix: 0.7%

Cost: Ksh 40-45/kg (vs. Ksh 57-60/kg commercial)
Savings: 25-30%

**Water Management**

Often forgotten but crucial:
- Chickens drink 1.5-2x their feed weight in water
- 100 birds eating 12kg feed need 18-24 liters water daily
- Hot weather: up to 3x feed weight
- No water = 40% drop in feed intake within hours

**Monitoring Feed Efficiency**

Calculate these weekly:

Feed Conversion Ratio (FCR):
FCR = Total feed (kg) / Weight gained (kg)
Target for broilers: 1.8-2.0

Feed Cost per Kg Gain:
Cost = (Feed consumed × Price) / Weight gained
Target: Ksh 120-140 per kg

For layers:
Feed Cost per Egg:
Cost = Daily feed × Price / Eggs laid
Target: Ksh 4-6 per egg

**Common Feeding Mistakes**

1. Sudden feed changes - causes digestive upset
Solution: Transition over 5-7 days

2. Using old feed - vitamin loss, poor performance
Solution: Check dates, use within 2-3 months

3. Poor feeder management - 15% wastage
Solution: Correct height, 1/3 full

4. Inconsistent feeding times - stress, reduced intake
Solution: Feed same times daily (morning and evening)

5. Ignoring water quality and availability
Solution: Clean water always available, 2-3x feed weight

**Seasonal Feeding Adjustments**

Hot Season: Reduce energy by 5%, birds eat less. Increase vitamins for heat stress. Provide cold water. Feed during cool hours (early morning, late evening).

Cold Season: Increase energy by 5%, birds need more warmth. May need 10-15% more feed overall.

**Key Takeaways**

- Feed is your biggest cost - manage it carefully
- Quality matters more than price
- Prevent wastage aggressively
- Monitor FCR every 2 weeks
- Water is as important as feed
- Calculate costs regularly

Remember: Never compromise on feed quality to save money. Poor feed equals poor profits. A bird that doesn't grow or lay eggs is still costing you money every day.`,
        author: 'Dr. James Mwangi',
        readTime: 10,
        views: 0
      },
      {
        title: 'Building the Perfect Poultry House',
        slug: 'building-perfect-poultry-house',
        category: 'housing',
        thumbnail: 'https://images.unsplash.com/photo-1563281577-a7be47e20db9?w=800',
        excerpt: 'A well-designed poultry house is the foundation of successful farming. Learn about location selection, design principles, ventilation, and cost-effective construction methods.',
        content: `Good housing protects your investment and maximizes productivity. A well-designed poultry house can make management easier and significantly reduce disease problems.

**Why Good Housing Matters**

- Protection from weather and predators
- Optimal temperature and humidity control
- Disease prevention through biosecurity
- Easier flock management
- Better growth and egg production
- Higher profits

Poor housing = High mortality + Low productivity = Financial losses

**Site Selection**

Choose your location carefully. Look for:

MUST HAVE:
- Well-drained land (never build in swampy areas)
- Road access for feed delivery and product collection
- Reliable water source
- Electricity if possible
- Minimum 30 meters from residential areas

CONSIDER:
- Direction of prevailing winds
- Gentle slope for natural drainage
- Distance from other farms (biosecurity)
- Room for future expansion
- Good security

**Orientation: East-West is Best**

Build your house with the long axis running east-west. This means short sides face north-south. Benefits: Reduces direct sun exposure inside the house, better temperature control, less heat stress on birds.

**Housing Systems**

1. DEEP LITTER SYSTEM
Best for: Broilers, Kienyeji chickens

Features:
- Birds on floor with bedding (wood shavings, rice husks)
- Litter depth: 10-15cm
- Most economical system
- Good for beginners

Stocking Density:
- Broilers: 8-10 birds per m²
- Layers: 5-7 birds per m²
- Kienyeji: 4-5 birds per m²

Advantages: Low initial cost, birds can exhibit natural behaviors, excellent for meat production

Disadvantages: Higher disease risk if hygiene is poor, more labor needed for litter management, eggs get dirty (if using for layers)

2. BATTERY CAGE SYSTEM
Best for: Commercial layers

Features:
- Wire cages arranged in tiers (usually 3-4 levels)
- Slanted floor allows eggs to roll out
- Droppings fall through to collection area
- Automatic watering systems

Capacity: 120-480 birds per unit, typically 3-4 birds per cage

Advantages: Maximum space utilization (more birds per m²), clean eggs, easier disease control, less feed wastage, individual bird monitoring possible

Disadvantages: High initial cost (Ksh 1,800-2,500 per bird capacity), welfare concerns from critics, requires skilled management, can cause cage fatigue over time

3. FREE RANGE SYSTEM
Best for: Kienyeji, organic production

Features:
- Birds roam freely in fenced outdoor area during day
- House provides night shelter and nesting
- Natural foraging reduces feed costs
- Requires significant land

Space Requirements:
- 2-4 m² per bird outside
- 0.3 m² per bird inside house

Advantages: Lowest feed costs (30-40% reduction), healthier birds, premium prices for products, birds express natural behaviors

Disadvantages: Requires more land, higher predator risk, lower productivity per bird, harder disease control

**Design Specifications for 500 Broilers**

House Size: 50-60 m² (example: 10m × 6m)
Height: 2.5-3m at peak, 2m at eaves
Roof: Iron sheets or tiles with insulation

ESSENTIAL FEATURES:

1. Ventilation (Critical!)
- Ridge ventilation: 5cm gap along roof peak
- Side windows: 30% of wall area, adjustable with curtains
- Avoid drafts at chick level
- Good air flow but no direct wind

2. Flooring
- Concrete is best (easy to clean and disinfect)
- Raised 30cm above ground level
- Sloped slightly for drainage
- Smooth finish for easy cleaning

3. Walls
- Chicken wire or strong mesh
- Brick or block to 1 meter height
- Mesh or curtains above for ventilation
- Predator-proof construction

4. Roof
- Iron sheets (30-gauge minimum)
- Overhang of 60-90cm to keep rain out
- Insulation highly recommended (reduces heat)
- Light colored sheets reflect heat better

5. Doors
- Minimum 2 entry points (emergency exit)
- 1.5m wide for equipment
- Footbath at entrance (mandatory)
- Lockable for security

**Ventilation - The Most Important Factor**

Poor ventilation causes:
- High ammonia levels (respiratory problems)
- Heat stress and mortality
- Disease spread
- Poor growth and production

Good ventilation provides:
- Fresh air supply
- Moisture removal
- Temperature control
- Ammonia and dust removal

Types of Ventilation:

Natural Ventilation (most common):
- Windows with adjustable curtains
- Ridge ventilation openings
- No cost to operate
- Works well in most climates

Mechanical Ventilation (advanced):
- Exhaust fans for air exchange
- Cooling pads in hot areas
- Higher cost but precise control
- Needed for large commercial farms

**Lighting Requirements**

Broilers: 23 hours light, 1 hour darkness (for first 3 days), then reduce gradually to 18 hours light

Layers: 16 hours light daily for optimal production, use timer for consistency, natural light supplemented with bulbs

Rule of thumb: One 60-watt bulb per 15 m² floor space

**Equipment Placement**

Feeders: Hang at bird's back height, 1 feeder per 25-50 birds, space evenly around house

Drinkers: One per 50-100 birds, keep away from feeders (reduces wetness), clean and refill daily

Nesting Boxes (for layers): 1 nest per 4-5 hens, dark, quiet location, raised 50cm off floor

Perches (optional): 20cm per bird, 40cm above floor

**Cost Estimation: 500-Bird Capacity House**

Basic Deep Litter System:
- Site preparation: Ksh 10,000
- Foundation and floor: Ksh 40,000
- Walls (partial brick/mesh): Ksh 35,000
- Roof with iron sheets: Ksh 45,000
- Doors and windows: Ksh 15,000
- Equipment (feeders, drinkers): Ksh 20,000
TOTAL: Ksh 165,000

Can be reduced by using local materials, doing own labor, and phased construction.

**Biosecurity Features to Include**

1. Footbath at entrance (always filled with disinfectant)
2. Separate entrance for people and equipment
3. Hand washing station
4. No windows facing other farms
5. Mesh to prevent wild bird entry
6. Rodent-proof construction
7. Proper waste disposal area away from house

**Common Housing Mistakes**

1. Wrong location - Too close to residential areas
Solution: Minimum 30m distance, check local regulations

2. Poor ventilation - Causes 50% of health problems
Solution: Windows = 30% of wall area, ridge ventilation

3. Wrong orientation - House gets too hot
Solution: Long axis east-west

4. Overcrowding - Trying to fit too many birds
Solution: Follow stocking density guidelines strictly

5. No biosecurity - Disease enters easily
Solution: Footbath, restricted access, proper design

**Maintenance Schedule**

Daily: Remove dead birds, check ventilation, clean waterers
Weekly: Disinfect equipment, check for repairs needed
Monthly: Deep clean areas, repair damages, pest control
Between Batches: Complete cleanout, disinfection, rest period (minimum 2 weeks)

**Key Success Factors**

1. Location is permanent - choose carefully
2. Ventilation saves lives - don't compromise
3. Size for your target, not current flock
4. Build quality, not cheaply - saves money long-term
5. Biosecurity built-in from start
6. Plan for expansion from day one

Remember: Your poultry house is a long-term investment. Building it right the first time costs less than fixing problems later. A well-designed house makes daily management easier and significantly improves your profits.

Pro Tip: Visit successful farms in your area before building. Learn from their designs and mistakes. Every region has unique challenges - learn from local experience.`,
        author: 'KukuSmart Team',
        readTime: 15,
        views: 0
      },
      {
        title: 'Water Management in Poultry Farming',
        slug: 'water-management-poultry-farming',
        category: 'water-management',
        thumbnail: 'https://images.unsplash.com/photo-1582554869443-b0f18f3516a4?w=800',
        excerpt: 'Water is often overlooked but is as important as feed. Learn about water quality, consumption patterns, treatment methods, and how proper water management improves production.',
        content: `Water is the most important nutrient, yet it's often the most neglected. A chicken can survive weeks without food but only days without water. Proper water management can improve growth by 20% and egg production by 15%.

**Why Water Matters**

- Essential for all body functions
- Regulates body temperature
- Carries nutrients to cells
- Removes waste products
- Required for digestion
- Makes up 70% of egg content

Without adequate clean water, birds will not eat properly, and production drops dramatically.

**Water Consumption Patterns**

General Rule: Birds drink 1.5-2 times their feed weight in water

For 100 Broilers:
- Week 1: 2-3 liters per day
- Week 4: 12-15 liters per day
- Week 7: 20-25 liters per day

For 100 Layers:
- Daily consumption: 25-30 liters
- Hot weather: up to 40 liters
- During production: higher than during growth

Factors Affecting Consumption:
- Temperature (hot weather = 2-3x more water)
- Feed type (mash requires more water than pellets)
- Humidity levels
- Health status
- Age and size of birds

**Water Quality Standards**

Your water must be clean enough for humans to drink. Test for:

Physical Quality:
- Clear, colorless appearance
- No smell or unusual taste
- No visible particles or sediment
- Temperature: cool, not warm

Chemical Quality:
- pH: 6.5-8.5 (neutral)
- Total dissolved solids: <1000 ppm
- No heavy metals
- Chlorine: 3-5 ppm if chlorinated

Biological Quality:
- Bacteria count: <100 CFU/ml
- No E. coli or Salmonella
- No algae growth

Signs of Poor Water Quality:
- Birds avoid drinking
- Wet droppings
- Decreased feed intake
- Poor growth or egg production
- Increased disease outbreaks

**Water Sources**

1. Municipal/Tap Water
Pros: Usually safe, tested regularly, reliable supply
Cons: May have high chlorine, bills to pay
Best for: Urban/peri-urban farms

2. Borehole Water
Pros: Independent supply, no bills, usually clean
Cons: May have high minerals, needs testing, pump costs
Best for: Rural farms with electricity

3. Well Water
Pros: Traditional, low cost, accessible
Cons: Can be contaminated, seasonal variations, labor intensive
Best for: Small-scale farms

4. Rainwater Harvesting
Pros: Free, sustainable, soft water (low minerals)
Cons: Seasonal availability, needs storage, can get contaminated
Best for: Supplementary source

AVOID: Stagnant ponds, streams near settlements, untreated surface water

**Water Treatment Methods**

1. Chlorination (Most Common)
- Add 3-5 ppm chlorine to water
- Use calcium hypochlorite or bleach
- Dosage: 1ml household bleach per 10 liters water
- Leave for 30 minutes before use
- Kills bacteria and viruses

2. Boiling (Small Scale)
- Boil water for 10 minutes
- Cool before giving to birds
- Practical for chick water in brooding
- Labor intensive for large flocks

3. UV Treatment (Advanced)
- Uses UV light to kill pathogens
- No chemical taste
- Equipment cost: Ksh 15,000+
- Good for medium-large farms

4. Filters
- Remove particles and sediment
- Sand filters, ceramic filters
- Must be cleaned regularly
- Doesn't remove bacteria without additional treatment

**Water System Design**

For 500 Birds, you need:

Storage: Minimum 200 liters per day capacity (allow for 2-day reserve = 400 liters)

Drinkers:
- 1 automatic drinker per 100 birds (5 drinkers total)
- Or 1 manual drinker per 50 birds (10 drinkers)
- Height: Adjusted to bird's back level
- Space evenly throughout house

Piping:
- 1-inch pipes for main line
- ½-inch for distribution
- Slope pipes for drainage
- Use UV-resistant plastic pipes

**Water Additives for Health**

Week 1 (Arrival): Glucose/sugar (50g per liter) for energy

Stress Periods: Multivitamins, especially vitamin C

Monthly Routine: Apple cider vinegar (10ml per liter for 3 consecutive days) - improves gut health

During Vaccination: Skim milk powder (prevents chlorine from killing vaccine)

Disease Prevention: Probiotics in water weekly

Heat Stress: Electrolytes (1g per liter)

NOTE: Never mix medications with vitamins. Give them at different times.

**Common Water Problems & Solutions**

Problem 1: Green Algae in Drinkers
Cause: Sunlight + nutrients in water
Solution: Keep drinkers in shade, clean daily, add 3ppm chlorine

Problem 2: Low Water Consumption
Cause: Poor water quality, wrong temperature, drinker problems
Solution: Check water taste, ensure cool water, fix/add drinkers

Problem 3: Wet Litter
Cause: Leaking drinkers, too many drinkers, poor drainage
Solution: Fix leaks, adjust drinker height, improve ventilation

Problem 4: High Mortality After Vaccination
Cause: Chlorine in water killed vaccine virus
Solution: Remove chlorine 24hrs before vaccination

Problem 5: Mineral Buildup in Pipes
Cause: Hard water deposits
Solution: Flush system weekly, use vinegar to clean pipes

**Daily Water Management Routine**

Morning (6 AM):
- Check all drinkers are working
- Clean drinkers (remove dirt, algae)
- Refill with fresh, cool water
- Add any required medications/vitamins

Midday (12 PM):
- Check water levels (top up if needed)
- Verify birds are drinking
- Adjust drinker height for growing birds
- In hot weather, add cool water

Evening (6 PM):
- Final top-up of water
- Check no drinkers are leaking
- Ensure enough water overnight
- In hot season, check water temperature

**Cost Analysis**

Water costs are minimal but impact is huge:

For 500 Broilers (7 weeks):
- Total water needed: ~2,500 liters
- Municipal water cost: ~Ksh 250
- Treatment (chlorine): Ksh 50
- Total: Ksh 300

But: Inadequate water reduces feed efficiency by 20-30%, which means Ksh 6,000-9,000 lost on 500 birds!

Investment in good water system: Ksh 10,000-20,000
Returns: Improved growth, lower mortality, better FCR

**Water and Feed Relationship**

Critical relationship: No water = No feed intake

- 4 hours without water: Feed intake drops 25%
- 8 hours without water: Feed intake drops 50%
- 12 hours without water: Feed intake drops 75%

Recovery takes 48-72 hours even after water is restored!

This is why: Always check water first when birds aren't eating well. Water problems show up as feeding problems.

**Emergency Water Supply**

Always have backup:
- 2-day water reserve in tanks
- Backup water source
- Manual override for automatic systems
- Emergency contact for water supplier

**Monitoring Water Quality**

Weekly Checks:
- Visual inspection (clarity, color)
- Smell test
- Taste test (if safe)
- Check bacteria growth in drinkers

Monthly Checks:
- pH testing (use pH strips, Ksh 200)
- TDS testing (digital meter, Ksh 2,000)

Yearly Checks:
- Complete laboratory testing (Ksh 3,000)
- Test for chemicals and heavy metals
- Bacterial culture

**Key Takeaways**

1. Water is MORE important than feed
2. Quality matters as much as quantity
3. Clean drinkers daily without fail
4. Birds need 1.5-2x their feed weight in water
5. Cool water in hot weather is critical
6. Check water FIRST when production drops
7. Invest in good water system upfront
8. Test water quality regularly
9. Have emergency backup always
10. Never run out of clean water

Remember: You can save money on many things in poultry farming, but clean water is NOT one of them. The cost of poor water quality far exceeds the cost of treating water properly.

Pro Tip: In hot weather (above 30°C), add ice blocks to water tanks in the afternoon. Cool water encourages drinking, which maintains feed intake and production.`,
        author: 'Dr. Sarah Mutua',
        readTime: 12,
        views: 0
      }
    ]);
    console.log(`✅ Created ${articles.length} learning articles`);

    // Summary
    console.log('\n🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!\n');
    console.log('📊 Summary:');
    console.log(`   👥 Sellers: ${sellers.length}`);
    console.log(`   📦 Products: ${products.length}`);
    console.log(`   🦠 Diseases: ${diseases.length}`);
    console.log(`   📚 Articles: ${articles.length}`);
    console.log('\n✅ Your KukuSmart database is ready to use!');
    console.log('🚀 Start your backend server: npm run dev');
    console.log('🌐 Start your frontend: cd frontend && npm run dev\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeder
seedDatabase();