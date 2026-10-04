// Enhanced Data for dynamic content with vibrant and colorful elements

// Blog posts data with enhanced content
const blogPosts = [
    {
        title: "The Future of Web Development: AI-Powered Design",
        excerpt: "Explore how artificial intelligence is revolutionizing web development, from automated design systems to intelligent user experiences that adapt in real-time.",
        date: "January 24, 2025",
        readTime: "8 min read",
        category: "Technology",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MSkiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0iZ3JhZGllbnQxIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzY2N0VFQTtzdG9wLW9wYWNpdHk6MSIvPgo8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6Izc2NEJBMjtzdG9wLW9wYWNpdHk6MSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGMDkzRkI7c3RvcC1vcGFjaXR5OjEiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8dGV4dCB4PSIyMDAiIHk9IjEyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9IjYwMCI+QUkgV2ViIERldjwvdGV4dD4KPHRleHQgeD0iMjAwIiB5PSIxNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC44KSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE2Ij5UaGUgRnV0dXJlIG9mIFdlYiBEZXNpZ248L3RleHQ+Cjwvc3ZnPgo=",
        content: `
            <h3>The AI Revolution in Web Development</h3>
            <p>Artificial Intelligence is no longer a futuristic concept—it's actively shaping how we build websites today. From automated design systems that create pixel-perfect layouts to intelligent chatbots that provide 24/7 customer support, AI is transforming every aspect of web development.</p>

            <h4>Key AI Technologies Impacting Web Development:</h4>
            <ul>
                <li><strong>Machine Learning Algorithms:</strong> For personalized user experiences</li>
                <li><strong>Automated Design Systems:</strong> Creating responsive layouts instantly</li>
                <li><strong>Natural Language Processing:</strong> For advanced search and content generation</li>
                <li><strong>Computer Vision:</strong> For automated image optimization and alt text generation</li>
            </ul>

            <p>The future belongs to developers who embrace these technologies while maintaining the human touch that makes great design truly exceptional.</p>
        `
    },
    {
        title: "Mastering CSS Grid & Flexbox: Modern Layout Techniques",
        excerpt: "Dive deep into the powerful combination of CSS Grid and Flexbox to create stunning, responsive layouts that work perfectly across all devices.",
        date: "January 20, 2025",
        readTime: "6 min read",
        category: "CSS",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MikpIi8+CjxkZWZzPgo8cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWRpZW50MiIgY3g9IjUwJSIgY3k9IjUwJSIgcj0iNTAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0YwOTNGQjtlc3RvcC1vcGFjaXR5OjEiLz4KPHN0b3Agb2Zmc2V0PSI1MCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGNTU3NkM7c3RvcC1vcGFjaXR5OjEiLz4KPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojNEZBNEZFO3N0b3Atb3BhY2l0eToxIi8+CjwvcmFkaWFsR3JhZGllbnQ+CjwvZGVmcz4KPHRleHQgeD0iMjAwIiB5PSIxMjUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZvbnQtd2VpZ2h0PSI2MDAiPkNTUyBHcmlkPC90ZXh0Pgo8dGV4dCB4PSIyMDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjgpIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiBmb250LXNpemU9IjE2Ij5Nb2Rlcm4gTGF5b3V0IFRlY2huaXF1ZXM8L3RleHQ+Cjwvc3ZnPgo=",
        content: `
            <h3>CSS Grid vs Flexbox: When to Use What</h3>
            <p>Modern CSS layout techniques have revolutionized how we approach web design. Understanding when to use CSS Grid versus Flexbox is crucial for creating efficient, maintainable layouts.</p>

            <h4>When to Use CSS Grid:</h4>
            <ul>
                <li>Two-dimensional layouts (rows AND columns)</li>
                <li>Complex grid-based designs</li>
                <li>Precise control over element placement</li>
                <li>Responsive design with named grid areas</li>
            </ul>

            <h4>When to Use Flexbox:</h4>
            <ul>
                <li>One-dimensional layouts (either rows OR columns)</li>
                <li>Simple alignment and distribution of items</li>
                <li>Dynamic content that needs to wrap</li>
                <li>Component-level layouts</li>
            </ul>

            <p>Mastering both techniques gives you the flexibility to create any layout imaginable with clean, semantic HTML and maintainable CSS.</p>
        `
    },
    {
        title: "The Psychology of Color in Web Design",
        excerpt: "Discover how color psychology influences user behavior and learn to create emotionally compelling websites that convert visitors into customers.",
        date: "January 15, 2025",
        readTime: "7 min read",
        category: "Design",
        image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSJ1cmwoI2dyYWRpZW50MykiLz4KPGRlZnM+CjxyYWRpYWxHcmFkaWVudCBpZD0iZ3JhZGllbnQzIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzRGQUZGRTtzdG9wLW9wYWNpdHk6MSIvPgo8c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzAwRjJGRTtzdG9wLW9wYWNpdHk6MSIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2NjdFRUE7c3RvcC1vcGFjaXR5OjEiLz4KPC9yYWRpYWxHcmFkaWVudD4KPC9kZWZzPgo8dGV4dCB4PSIyMDAiIHk9IjEyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIyNCIgZm9udC13ZWlnaHQ9IjYwMCI+Q29sb3IgUHN5Y2g8L3RleHQ+Cjx0ZXh0IHg9IjIwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuOCkiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiI+UG93ZXIgb2YgVmlzdWFsIENvbW11bmljYXRpb248L3RleHQ+Cjwvc3ZnPgo=",
        content: `
            <h3>The Emotional Impact of Color</h3>
            <p>Color is more than just aesthetics—it's a powerful psychological tool that influences emotions, decisions, and user behavior. Understanding color psychology can dramatically improve your design's effectiveness.</p>

            <h4>Color Psychology in Action:</h4>
            <ul>
                <li><strong>Blue (#667eea):</strong> Trust, reliability, professionalism</li>
                <li><strong>Green (#48bb78):</strong> Growth, harmony, financial success</li>
                <li><strong>Orange (#f093fb):</strong> Energy, enthusiasm, creativity</li>
                <li><strong>Purple (#764ba2):</strong> Luxury, wisdom, spirituality</li>
                <li><strong>Red (#f5576c):</strong> Urgency, passion, excitement</li>
            </ul>

            <p>Strategic use of color can increase user engagement by up to 40% and improve conversion rates significantly. Choose your palette wisely!</p>
        `
    }
];

// Enhanced Testimonials data with ratings and avatars
const testimonials = [
    {
        text: "Web Sondrya transformed our digital presence completely. Their attention to detail and innovative approach resulted in a 300% increase in user engagement. The particle effects and smooth animations make our site stand out from competitors.",
        author: "Kuldeep Singh",
        position: "CEO & Co-Founder",
        company: "TechFlow Solutions",
        avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiM2NjdlZWEiLz4KPHBhdGggZD0iTTMwIDMwQzMyLjc2MTQgMzAgMzUgMjcuNzYxNCAzNSAyNUMzNSAyMi4yMzg2IDMyLjc2MTQgMjAgMzAgMjBDMTcuMjM4NiAyMCAxNSAyMi4yMzg2IDE1IDI1QzE1IDI3Ljc2MTQgMTcgMzAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",
        rating: 5
    },
    {
        text: "The colorful design and dynamic animations exceeded our expectations. Our conversion rate improved by 180% within the first month. The team's creativity and technical expertise are unmatched.",
        author: "Arjun Mehta",
        position: "Marketing Director",
        company: "InnovateLabs",
        avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGMDkzRkIiLz4KPHBhdGggZD0iTTMwIDMwQzMyLjc2MTQgMzAgMzUgMjcuNzYxNCAzNSAyNUMzNSAyMi4yMzg2IDMyLjc2MTQgMjAgMzAgMjBDMTcuMjM4NiAyMCAxNSAyMi4yMzg2IDE1IDI1QzE1IDI3Ljc2MTQgMTcgMzAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",
        rating: 5
    },
    {
        text: "Outstanding work! The smooth animations and vibrant color scheme perfectly capture our brand personality. User engagement metrics have never been better. Highly recommend their services.",
        author: "Maya Patel",
        position: "Brand Manager",
        company: "CreativeMinds Agency",
        avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiNGNTU3NkMiLz4KPHBhdGggZD0iTTMwIDMwQzMyLjc2MTQgMzAgMzUgMjcuNzYxNCAzNSAyNUMzNSAyMi4yMzg2IDMyLjc2MTQgMjAgMzAgMjBDMTcuMjM4NiAyMCAxNSAyMi4yMzg2IDE1IDI1QzE1IDI3Ljc2MTQgMTcgMzAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",
        rating: 5
    },
    {
        text: "The particle background and dynamic effects create an immersive user experience. Our website now feels like a premium application rather than a static page. Exceptional work!",
        author: "Rohan Verma",
        position: "Product Manager",
        company: "NextGen Apps",
        avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiM0RkFGRkUiLz4KPHBhdGggZD0iTTMwIDMwQzMyLjc2MTQgMzAgMzUgMjcuNzYxNCAzNSAyNUMzNSAyMi4yMzg2IDMyLjc2MTQgMjAgMzAgMjBDMTcuMjM4NiAyMCAxNSAyMi4yMzg2IDE1IDI1QzE1IDI3Ljc2MTQgMTcgMzAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",
        rating: 5
    },
    {
        text: "From the initial concept to the final delivery, Web Sondrya demonstrated professionalism and creativity. The colorful gradients and smooth transitions make our site visually stunning.",
        author: "Chandrabhan",
        position: "Creative Director",
        company: "DesignForward",
        avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiMwMEYyRkUiLz4KPHBhdGggZD0iTTMwIDMwQzMyLjc2MTQgMzAgMzUgMjcuNzYxNCAzNSAyNUMzNSAyMi4yMzg2IDMyLjc2MTQgMjAgMzAgMjBDMTcuMjM4NiAyMCAxNSAyMi4yMzg2IDE1IDI1QzE1IDI3Ljc2MTQgMTcgMzAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",
        rating: 5
    },
    {
        text: "The enhanced animations and vibrant color palette perfectly represent our innovative brand. The interactive elements keep users engaged longer than ever before.",
        author: "Lakshyadeep Singh",
        position: "Founder & CEO",
        company: "FutureTech Innovations",
        avatar: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMzAiIGZpbGw9IiM3NjRCQTIiLz4KPHBhdGggZD0iTTMwIDMwQzMyLjc2MTQgMzAgMzUgMjcuNzYxNCAzNSAyNUMzNSAyMi4yMzg2IDMyLjc2MTQgMjAgMzAgMjBDMTcuMjM4NiAyMCAxNSAyMi4yMzg2IDE1IDI1QzE1IDI3Ljc2MTQgMTcgMzAgMzAiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+",
        rating: 5
    }
];