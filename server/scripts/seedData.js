import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Event from '../models/Event.js';
import Blog from '../models/Blog.js';
import User from '../models/User.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

        // Replace the admin creation section:
        let admin = await User.findOne({ email: 'admin@tks.com' });
        if (!admin) {
        const bcrypt = (await import('bcryptjs')).default;
        const hashedPassword = await bcrypt.hash('TKS@Admin2026!Secure', 10);
        
        admin = await User.create({
            name: 'TKS Admin',
            email: 'admin@tks.com',
            password: hashedPassword,
            role: 'admin'
        });
        console.log('Admin user created');
        console.log('⚠️  IMPORTANT: Change admin password after first login!');
        }

    // Clear existing data
    await Event.deleteMany({});
    await Blog.deleteMany({});

    // Seed Events
    const events = [
      {
        title: 'Bosphorus Sunset Cruise',
        description: 'Join us for a magical sunset cruise along the Bosphorus. Experience Istanbul from the water with stunning views of palaces, mosques, and bridges.',
        date: new Date('2026-03-15T17:00:00'),
        location: 'Eminönü Pier, Istanbul',
        price: 0,
        capacity: 30,
        currentAttendees: 8,
        imageUrl: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800',
        status: 'upcoming',
        createdBy: admin._id
      },
      {
        title: 'Princes Islands Day Trip',
        description: 'Escape the city bustle with a day trip to the beautiful Princes Islands. Enjoy biking, swimming, and delicious seafood.',
        date: new Date('2026-03-22T09:00:00'),
        location: 'Kabataş Ferry Terminal',
        price: 0,
        capacity: 25,
        currentAttendees: 12,
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
        status: 'upcoming',
        createdBy: admin._id
      },
      {
        title: 'Turkish Cooking Workshop',
        description: 'Learn to cook authentic Turkish dishes with a local chef. Make börek, manti, and baklava from scratch!',
        date: new Date('2026-03-28T14:00:00'),
        location: 'Kadıköy Cultural Center',
        price: 0,
        capacity: 15,
        currentAttendees: 7,
        imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
        status: 'upcoming',
        createdBy: admin._id
      },
      {
        title: 'Cappadocia Hot Air Balloon Weekend',
        description: '3-day adventure to Cappadocia including hot air balloon ride, cave hotels, and guided tours of ancient sites.',
        date: new Date('2026-04-05T06:00:00'),
        location: 'Departure from Istanbul Airport',
        price: 0,
        capacity: 20,
        currentAttendees: 15,
        imageUrl: 'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800',
        status: 'upcoming',
        createdBy: admin._id
      },
      {
        title: 'Hiking in Belgrad Forest',
        description: 'Morning hike through Istanbul\'s beautiful Belgrad Forest. Perfect for nature lovers and fitness enthusiasts.',
        date: new Date('2026-04-12T08:00:00'),
        location: 'Belgrad Forest Entrance',
        price: 0,
        capacity: 40,
        currentAttendees: 18,
        imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
        status: 'upcoming',
        createdBy: admin._id
      },
      {
        title: 'Photography Walk: Old Istanbul',
        description: 'Explore the historic neighborhoods of Balat and Fener with a professional photographer. Learn tips and tricks!',
        date: new Date('2026-04-18T10:00:00'),
        location: 'Balat Square',
        price: 0,
        capacity: 12,
        currentAttendees: 5,
        imageUrl: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800',
        status: 'upcoming',
        createdBy: admin._id
      }
    ];

    await Event.insertMany(events);
    console.log('Events seeded successfully');

    // Seed Blogs
    const blogs = [
      {
        title: 'Top 10 Hidden Gems in Istanbul',
        content: '<p>Istanbul is full of surprises beyond the usual tourist spots. Here are our favorite hidden gems that locals love...</p><h2>1. Balat Neighborhood</h2><p>This colorful historic neighborhood is perfect for photography and authentic local experiences.</p><h2>2. Çukurcuma Antique District</h2><p>Get lost in time browsing vintage treasures and antique shops.</p>',
        excerpt: 'Discover Istanbul\'s best-kept secrets that most tourists miss.',
        author: admin._id,
        imageUrl: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800',
        published: true
      },
      {
        title: 'A Guide to Turkish Coffee Culture',
        content: '<p>Turkish coffee is more than just a drink - it\'s a centuries-old tradition and art form...</p><h2>The History</h2><p>Turkish coffee arrived in Istanbul in the 16th century and became an integral part of social life.</p><h2>How to Drink It</h2><p>Never stir Turkish coffee after it\'s served! The grounds should settle at the bottom.</p>',
        excerpt: 'Everything you need to know about Turkey\'s most beloved beverage.',
        author: admin._id,
        imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
        published: true
      },
      {
        title: 'Best Breakfast Spots in Kadıköy',
        content: '<p>Kadıköy on the Asian side is famous for its incredible breakfast scene. Here are our top picks...</p><h2>Çiya Sofrası</h2><p>Traditional Turkish breakfast with regional specialties.</p><h2>Fazıl Bey</h2><p>Famous for their Turkish coffee and menemen.</p>',
        excerpt: 'Start your day right with these amazing breakfast restaurants.',
        author: admin._id,
        imageUrl: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800',
        published: true
      },
      {
        title: 'Weekend Getaways from Istanbul',
        content: '<p>Need a break from the city? These destinations are perfect for a quick weekend escape...</p><h2>Bursa</h2><p>Historic city at the foot of Uludağ mountain, famous for İskender kebab.</p><h2>Şile</h2><p>Peaceful Black Sea beach town just 2 hours away.</p>',
        excerpt: 'Easy weekend trips within a few hours of Istanbul.',
        author: admin._id,
        imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
        published: true
      }
    ];

    await Blog.insertMany(blogs);
    console.log('Blogs seeded successfully');

    console.log('✅ Seed data created successfully!');
    console.log('Admin credentials: admin@tks.com / admin123');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedData();