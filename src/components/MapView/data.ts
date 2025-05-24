
// Urban areas data mapped to their main regions
export const urbanAreas = {
  india: {
    'Mumbai': ['South Mumbai', 'Andheri', 'Bandra'],
    'Delhi': ['New Delhi', 'Connaught Place', 'Nehru Place'],
    'Bangalore': ['Electronic City', 'Whitefield', 'MG Road'],
    'Chennai': ['T Nagar', 'Anna Nagar', 'Mylapore'],
    'Kolkata': ['Park Street', 'Salt Lake', 'New Town'],
    'Hyderabad': ['Hitech City', 'Banjara Hills', 'Jubilee Hills']
  },
  usa: {
    'New York': ['Manhattan', 'Brooklyn', 'Queens'],
    'California': ['Los Angeles', 'San Francisco', 'San Diego'],
    'Texas': ['Houston', 'Dallas', 'Austin'],
    'Florida': ['Miami', 'Orlando', 'Tampa'],
    'Illinois': ['Chicago', 'Aurora', 'Naperville'],
    'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown']
  }
} as const;

// Rural areas data mapped to their main regions
export const ruralAreas = {
  india: {
    'Mumbai': ['Palghar', 'Thane Rural', 'Raigad Villages'],
    'Delhi': ['Najafgarh Rural', 'Alipur', 'Narela'],
    'Bangalore': ['Doddaballapura', 'Nelamangala', 'Anekal'],
    'Chennai': ['Tiruvallur Villages', 'Kanchipuram Rural', 'Chengalpattu Rural'],
    'Kolkata': ['South 24 Parganas Rural', 'Howrah Rural', 'Hooghly Villages'],
    'Hyderabad': ['Rangareddy Rural', 'Medchal Villages', 'Sangareddy Rural']
  },
  usa: {
    'New York': ['Adirondack Region', 'Finger Lakes Rural', 'Catskill Villages'],
    'California': ['Central Valley Towns', 'Northern California Rural', 'Eastern Sierra Communities'],
    'Texas': ['West Texas Rural', 'East Texas Villages', 'Rio Grande Valley Towns'],
    'Florida': ['Panhandle Rural', 'Central Florida Farmlands', 'Everglades Communities'],
    'Illinois': ['Southern Illinois Rural', 'Western Illinois Farmlands', 'Central Illinois Villages'],
    'Pennsylvania': ['Appalachian Communities', 'Rural Poconos', 'Central PA Farmlands']
  }
} as const;

// Main regions data with accurate coordinates
export const getMainRegionsData = (country: 'india' | 'usa') => {
  return country === 'india' 
    ? [
        { name: 'Mumbai', score: 78, x: 125, y: 280 },
        { name: 'Delhi', score: 82, x: 170, y: 120 },
        { name: 'Bangalore', score: 75, x: 175, y: 340 },
        { name: 'Chennai', score: 68, x: 200, y: 360 },
        { name: 'Kolkata', score: 72, x: 225, y: 200 },
        { name: 'Hyderabad', score: 80, x: 185, y: 300 }
      ]
    : [
        { name: 'New York', score: 85, x: 380, y: 150 },
        { name: 'California', score: 88, x: 100, y: 200 },
        { name: 'Texas', score: 76, x: 220, y: 280 },
        { name: 'Florida', score: 82, x: 340, y: 330 },
        { name: 'Illinois', score: 79, x: 260, y: 180 },
        { name: 'Pennsylvania', score: 81, x: 350, y: 170 }
      ];
};
