// Optimized image paths with WebP support
import { getOptimizedImagePath } from './imageOptimizer';

const getImagePaths = (filename) => {
  const paths = getOptimizedImagePath(filename);
  return {
    src: paths.fallback,
    webpSrc: paths.webp
  };
};

// GPS coordinates and dates extracted from image EXIF data
export const imageLocations = [
  {
    ...getImagePaths('4Kanpe-the-whole-night.jpeg'),
    title: '4Kanpe - The Whole Night',
    coordinates: { lat: 30.842744444444442, lng: -83.28402777777778 }, // Valdosta, GA
    description: 'Dancing the night away at 4Kanpe! 💃 Doing the simplest things with you brings me the greatest of joys. I love when we can be ourselves, enjoy each other\'s cultures, pastimes; My desire to learn who you are every day burns with the emotions I feel towards you and allows me to love you more every day.',
    date: 'May 5, 2025'
  },
  {
    ...getImagePaths('Apartment.jpeg'),
    title: 'Our Apartment',
    coordinates: { lat: 37.20643888888889, lng: -80.39548611111111 }, // Blacksburg, VA
    description: 'Home sweet home 🏠, I appreciate all that you do for me my love; I never take for granted the time, effort, and resources you put into fostering our relationship.',
    date: 'September 24, 2025'
  },
  {
    ...getImagePaths('Beach-trip.jpeg'),
    title: 'Beach Trip',
    coordinates: { lat: 30.180633333333333, lng: -85.81552222222221 }, // Panama City Beach, FL
    description: "Sun, sand, and us ☀️🏖️. This day was one of the most beautiful I've spent with you. Your smile was just as bright as the sun over the horizon.",
    date: 'May 14, 2025'
  },
  {
    ...getImagePaths('Birthday-trip.jpeg'),
    title: 'Birthday Trip',
    coordinates: { lat: 27.993380555555557, lng: -82.37041388888888 }, // Tampa, FL
    description: 'Celebrating another year of life 🎂. You made this trip the most special; Out of all the gifts you gave me, having quality time with you is what I cherish the most.',
    date: 'July 24, 2025'
  },
  {
    ...getImagePaths('escaperoom.jpeg'),
    title: 'Escape Room Adventure',
    coordinates: { lat: 30.866255555555558, lng: -83.28556944444445 }, // Valdosta, GA
    description: 'Solving puzzles together 🧩. Our "first" date, the employee was right; We do look good together.',
    date: 'April 26, 2025'
  },
  {
    ...getImagePaths('First-trip-panama.jpeg'),
    title: 'First Trip to Panama',
    coordinates: { lat: 30.209197222222222, lng: -85.62031666666665 }, // Panama City Beach, FL
    description: "Meeting your people for the first time 🤝. Even though it wasn't smooth; I knew I wanted to be with you and would do anything to make that happen.",
    date: 'May 14, 2025'
  },
  {
    ...getImagePaths('jacksonville-lock.jpeg'),
    title: 'Walk to Lock',
    coordinates: { lat: 30.323533333333334, lng: -81.66711388888889 }, // Jacksonville, FL
    description: "“Locking our love forever 🔒💕. Even if the bridge beneath us isn’t complete, I know we are — and our connection will always find its way.”",
    date: 'June 19, 2025'
  },
  {
    ...getImagePaths('Jacksonville.jpeg'),
    title: 'Jacksonville',
    coordinates: { lat: 30.436977777777777, lng: -81.72753888888889 }, // Jacksonville, FL
    description: 'My first time there 😉. Meeting your immediate family for the first time, herb crusted salmon, and sleeping beauty.',
    date: 'August 7, 2025'
  },
  {
    ...getImagePaths('konmpa-and-line-dancing-at-ARJs.jpeg'),
    title: 'Konmpa & Line Dancing at ARJs',
    coordinates: { lat: 30.842744444444442, lng: -83.28409444444445 }, // Valdosta, GA
    description: 'Dancing to the rhythm of our hearts 💃🕺. A night to remember, filled with laughter, sober spirits, and the joy of having fun with my person.',
    date: 'June 7, 2025'
  },
  {
    ...getImagePaths('myroom.jpeg'),
    title: 'My Room',
    coordinates: { lat: 30.928066666666666, lng: -83.32229722222222 }, // Valdosta, GA
    description: '21 days later, you met my mom 💖. The first and the last.',
    date: 'May 25, 2025'
  },
  {
    ...getImagePaths('Painting-park.jpeg'),
    title: 'Painting in the Park',
    coordinates: { lat: 30.91326388888889, lng: -83.24971111111111 }, // Valdosta, GA
    description: 'Creating art and memories 🎨. An artist was born. As we can see the artist was me. This smile says it all, I want to see it everyday. ',
    date: 'May 4, 2025'
  },
  {
    ...getImagePaths('Panama-wine-tasting.jpeg'),
    title: 'Panama Wine Tasting',
    coordinates: { lat: 30.187997222222222, lng: -85.7803888888889 }, // Panama City Beach, FL
    description: 'Sipping wine and falling deeper in love 🍷',
    date: 'May 28, 2025'
  },
  {
    ...getImagePaths('when-i-asked-you-to-be-my-girlfriend.jpeg'),
    title: 'When I Asked You to Be My Girlfriend',
    coordinates: { lat: 30.91326388888889, lng: -83.24968611111112 }, // Valdosta, GA
    description: 'The moment that changed everything 💍✨. Where it became official and I promised to do everything to make you the happiest girl in the world.',
    date: 'May 4, 2025'
  }
];