const Testimonials = () => {
    const reviews = [
        {
            id: 1,
            name: "Priya Raman",
            role: "Startup Founder",
            content: "We found our dream office space in OMR through RentSpace in less than 24 hours. The process was seamless and professional.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
            id: 2,
            name: "Karthik Raja",
            role: "Retail Manager",
            content: "The variety of high-traffic retail spots available in T Nagar is unmatched. Boosted our sales by 40% after moving.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
            id: 3,
            name: "Anitha Suresh",
            role: "Freelance Designer",
            content: "As a creative, I needed an inspiring studio. Found the perfect place in Besant Nagar that fits my budget perfectly.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg"
        }
    ];

    return (
        <section className="bg-slate-50 py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Trusted by Businesses Everywhere</h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">See what our community has to say about finding their perfect workspace.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                            <div className="flex items-center gap-4 mb-6">
                                <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                                    <p className="text-xs text-slate-500 uppercase tracking-wide">{review.role}</p>
                                </div>
                            </div>
                            <p className="text-slate-600 italic">"{review.content}"</p>
                            <div className="mt-6 flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
