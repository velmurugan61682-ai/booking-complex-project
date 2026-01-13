import { createContext, useState, useContext, useEffect } from 'react';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

// Initial Mock Data to populate if empty
const INITIAL_SHOPS = [
    {
        id: 1,
        name: "Modern 2BHK in Anna Nagar",
        location: "Anna Nagar, Chennai",
        price: 25000,
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Spacious 2BHK apartment in the prime locality of Anna Nagar. Close to metro station and shopping malls.",
        amenities: ["WiFi", "Car Parking", "24/7 Water", "Security", "Lift"]
    },
    {
        id: 2,
        name: "Independent House in Gandhipuram",
        location: "Gandhipuram, Coimbatore",
        price: 18000,
        rating: 4.7,
        images: [
            "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1599619351208-3e6c839d6828?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1560444586-4f3661ecd64c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Beautiful independent house with a small garden. Ideal for families looking for a peaceful neighborhood.",
        amenities: ["Garden", "RO Water", "Power Backup", "Covered Parking"]
    },
    {
        id: 3,
        name: "Traditional Chettinad Home",
        location: "KK Nagar, Madurai",
        price: 22000,
        rating: 4.9,
        images: [
            "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1512918760532-3edbed13588e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Experience the heritage of Madurai in this Chettinad style home with modern amenities. Near Meenakshi Temple.",
        amenities: ["Veranda", "Traditional Courtyard", "AC", "WiFi"]
    },
    {
        id: 4,
        name: "Apartment near Rockfort",
        location: "Thillai Nagar, Trichy",
        price: 15000,
        rating: 4.5,
        images: [
            "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Centrally located flat in Thillai Nagar. Easy access to bus stand and railway station.",
        amenities: ["Lift", "Security", "CCTV", "Water Heater"]
    },
    {
        id: 5,
        name: "Hill View Villa",
        location: "Yercaud Foot Hills, Salem",
        price: 28000,
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1449156493391-d2cfa28e468b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Luxury villa with stunning hill views. Perfect for a relaxing stay with high-end facilities.",
        amenities: ["Private Pool", "Gym", "Landscaped Garden", "WiFi"]
    },
    {
        id: 6,
        name: "Cozy Home for Family",
        location: "Perundurai Road, Erode",
        price: 12000,
        rating: 4.4,
        images: [
            "https://images.unsplash.com/photo-1580587771525-78b9dba3b91d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1484154218962-a1c002085d2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Affordable and cozy home in Erode, perfect for small families. Quiet neighborhood.",
        amenities: ["Borewell Water", "Car Parking", "Near School", "Terrace"]
    },
    {
        id: 7,
        name: "Smart City Apartment",
        location: "Palayamkottai, Tirunelveli",
        price: 16000,
        rating: 4.6,
        images: [
            "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Modern apartment in the educational hub of South India. Close to colleges and hospitals.",
        amenities: ["WiFi", "Lift", "Security", "Power Backup"]
    },
    {
        id: 8,
        name: "Temple View Residency",
        location: "Near Big Temple, Thanjavur",
        price: 14000,
        rating: 4.7,
        images: [
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1600596542815-22502385a987?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Stay close to history with this comfortable residency near the Brihadeeswarar Temple.",
        amenities: ["AC", "TV", "Hot Water", "Room Service"]
    },
    {
        id: 9,
        name: "Fort City Bungalow",
        location: "Sathuvachari, Vellore",
        price: 24000,
        rating: 4.5,
        images: [
            "https://images.unsplash.com/photo-1600596542815-22502385a987?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Spacious bungalow near VIT university. Ideal for professors or large families.",
        amenities: ["Garden", "Garage", "Study Room", "WiFi"]
    },
    {
        id: 10,
        name: "Coastal Breeze Home",
        location: "Kottar, Nagercoil",
        price: 19000,
        rating: 4.8,
        images: [
            "https://images.unsplash.com/photo-1512918760532-3edbed13588e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80",
            "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
        ],
        description: "Enjoy the pleasant climate of Nagercoil in this well-ventilated home. Close to Kanyakumari highway.",
        amenities: ["Balcony", "Garden", "Well Water", "CCTV"]
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
