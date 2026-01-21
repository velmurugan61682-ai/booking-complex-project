import { createContext, useState, useContext, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

// Initial Mock Data to populate if empty
const INITIAL_SHOPS = [
    {
        id: 1,
        name: "Luxury IT Park Office in OMR",
        location: "OMR, Chennai",
        price: 85000,
        category: "IT Office",
        rating: 4.9,
        images: [
            "https://images.unsplash.com/photo-1497215728101-856f4ea42174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Premium office space in the heart of Chennai's IT corridor. Fully furnished with conference rooms and high-speed internet.",
        amenities: ["Central AC", "Server Room", "Cafeteria", "24/7 Power", "Security"]
    },
    {
        id: 2,
        name: "Tidel Park Worksphere",
        location: "Taramani, Chennai",
        price: 120000,
        category: "IT Office",
        rating: 5.0,
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1554469384-e58fac16e23a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "State-of-the-art office complex in the iconic Tidel Park. Ideal for software startups and established MNCs.",
        amenities: ["Metro Access", "Food Court", "Auditorium", "Gym", "Parking"]
    },
    {
        id: 3,
        name: "Elite Men's Hostel",
        location: "Peelamedu, Coimbatore",
        price: 8000,
        category: "Hostel",
        rating: 4.5,
        images: [
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1522771753035-7a5887592a84?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Comfortable and affordable hostel for students and working professionals near TIDEL Park Coimbatore. Hygienic food provided.",
        amenities: ["WiFi", "3 Times Food", "Hot Water", "Washing Machine", "CCTV"]
    },
    {
        id: 4,
        name: "Tech Hub Coworking",
        location: "Thillai Nagar, Trichy",
        price: 15000,
        category: "Coworking",
        rating: 4.6,
        images: [
            "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Modern coworking space for freelancers and remote teams. Located in the commercial center of Trichy.",
        amenities: ["High-Speed WiFi", "Unlimited Coffee", "Meeting Rooms", "Printer"]
    },
    {
        id: 5,
        name: "Serene Women's Hostel",
        location: "Sholinganallur, Chennai",
        price: 9500,
        category: "Hostel",
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Safe and secure hostel for working women in OMR. Close to major IT companies like Infosys and TCS.",
        amenities: ["Biometric Entry", "AC Rooms", "Homemade Food", "Security Guard", "Transport"]
    },
    {
        id: 6,
        name: "Startup Studio Space",
        location: "Anna Nagar, Madurai",
        price: 25000,
        category: "IT Office",
        rating: 4.4,
        images: [
            "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Creative office studio for design and tech startups. Inspiring environment with breakout zones.",
        amenities: ["Lounge Area", "Projector", "Gaming Zone", "Pantry"]
    },
    {
        id: 7,
        name: "Green View PG",
        location: "Perungalathur, Chennai",
        price: 7500,
        category: "Hostel",
        rating: 4.3,
        images: [
            "https://images.unsplash.com/photo-1596276020587-8d4e6e6a17b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Budget-friendly PG accommodation near Zoho Corporation. Clean rooms and friendly atmosphere.",
        amenities: ["RO Water", "Housekeeping", "Bike Parking", "TV Hall"]
    },
    {
        id: 8,
        name: "Cyber Park Tower",
        location: "Electronic City, Bangalore (TN Border)",
        price: 150000,
        category: "IT Office",
        rating: 4.9,
        images: [
            "https://images.unsplash.com/photo-1486325212027-8081648a82eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1517502884422-41e157d2ed44?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "World-class IT infrastructure for large enterprises. LEED certified green building.",
        amenities: ["Concierge", "Helipad", "Gym", "Food Court", "Conference Hall"]
    },
    {
        id: 9,
        name: "Sea View Corporate Suite",
        location: "ECR, Chennai",
        price: 95000,
        category: "IT Office",
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1577412647305-991150c7d163?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1497215842964-222b430dc094?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1519642918688-7e43b19245d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Luxurious office space with a stunning view of the Bay of Bengal on East Coast Road.",
        amenities: ["Sea View", "Valet Parking", "Meeting Lounge", "Private Lift"]
    },
    {
        id: 10,
        name: "Temple City Guest House",
        location: "Simmakkal, Madurai",
        price: 12000,
        category: "Hostel",
        rating: 4.2,
        images: [
            "https://images.unsplash.com/photo-1596276020587-8d4e6e6a17b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1505691938895-1cd5860c1d8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Traditional yet modern guest house in the heart of Madurai. Close to Meenakshi Amman Temple.",
        amenities: ["AC", "Veg Meals", "Temple View", "Travel Desk"]
    },
    {
        id: 11,
        name: "Kongu Co-Works",
        location: "Gandhipuram, Coimbatore",
        price: 18000,
        category: "Coworking",
        rating: 4.5,
        images: [
            "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Vibrant coworking community in the industrial hub of Tamil Nadu's Manchester.",
        amenities: ["Open Desk", "Private Cabin", "Event Space", "Café"]
    },
    {
        id: 12,
        name: "Emerald Event Hall",
        location: "Adyar, Chennai",
        price: 200000,
        category: "Event",
        rating: 4.7,
        images: [
            "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Grand banquet hall suitable for corporate events, weddings, and parties. Located in prime Adyar.",
        amenities: ["500 Seater", "Dining Hall", "Stage", "Audio System", "Changing Rooms"]
    },
    {
        id: 13,
        name: "Velachery Tech Park",
        location: "Velachery, Chennai",
        price: 90000,
        category: "IT Office",
        rating: 4.6,
        images: [
            "https://images.unsplash.com/photo-1504384308090-c54be385363d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1531973576160-7125cd663d86?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Conveniently located office space near Phoenix Mall. Great connectivity and amenities.",
        amenities: ["Mall Access", "Food Court", "Parking", "Power Backup"]
    },
    {
        id: 14,
        name: "Salem Steel Towers",
        location: "Fairlands, Salem",
        price: 60000,
        category: "IT Office",
        rating: 4.3,
        images: [
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1556761175-4b46a8911a31?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1504384764586-bb4cdc1707b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Premium office space in the steel city. Ideal for regional offices and bank branches.",
        amenities: ["Central Location", "Guest Parking", "Security", "Lift"]
    },
    {
        id: 15,
        name: "Marina Photography Studio",
        location: "Mylapore, Chennai",
        price: 30000,
        category: "Studio",
        rating: 4.9,
        images: [
            "https://images.unsplash.com/photo-1596524430615-b46476ddff6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Fully equipped photography and videography studio near Marina Beach. Natural light and green screen available.",
        amenities: ["Lights", "Green Screen", "Makeup Room", "Prop Store"]
    }
];

export const BookingProvider = ({ children }) => {
    const [shops, setShops] = useState([]);
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Load shops from local storage or set initial
        const storedShops = localStorage.getItem('shops');
        if (storedShops) {
            setShops(JSON.parse(storedShops));
        } else {
            setShops(INITIAL_SHOPS);
            localStorage.setItem('shops', JSON.stringify(INITIAL_SHOPS));
        }

        // Load bookings
        const storedBookings = localStorage.getItem('bookings');
        if (storedBookings) {
            setBookings(JSON.parse(storedBookings));
        }
    }, []);

    const addBooking = (booking) => {
        const newBookings = [...bookings, { ...booking, id: Date.now(), status: 'Confirmed' }];
        setBookings(newBookings);
        localStorage.setItem('bookings', JSON.stringify(newBookings));
    };

    const cancelBooking = (bookingId) => {
        const newBookings = bookings.map(b =>
            b.id === bookingId ? { ...b, status: 'Cancelled' } : b
        );
        setBookings(newBookings);
        localStorage.setItem('bookings', JSON.stringify(newBookings));
    };

    const addShop = (shop) => {
        const newShops = [...shops, { ...shop, id: Date.now() }];
        setShops(newShops);
        localStorage.setItem('shops', JSON.stringify(newShops));
    };

    const deleteShop = (shopId) => {
        const newShops = shops.filter(s => s.id !== shopId);
        setShops(newShops);
        localStorage.setItem('shops', JSON.stringify(newShops));
    };

    const updateShop = (updatedShop) => {
        const newShops = shops.map(s => s.id === updatedShop.id ? updatedShop : s);
        setShops(newShops);
        localStorage.setItem('shops', JSON.stringify(newShops));
    }

    return (
        <BookingContext.Provider value={{ shops, bookings, addBooking, cancelBooking, addShop, deleteShop, updateShop }}>
            {children}
        </BookingContext.Provider>
    );
};
