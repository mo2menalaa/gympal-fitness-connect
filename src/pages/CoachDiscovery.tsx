
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CoachCard from '@/components/CoachCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  Star, 
  ChevronDown, 
  X 
} from 'lucide-react';

// Mock coach data
const mockCoaches = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: ['Competition Prep', 'Strength Training', 'Nutrition'],
    rating: 4.9,
    reviews: 87,
    price: '$120',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    experience: '8 Years'
  },
  {
    id: '2',
    name: 'Mike Reynolds',
    specialty: ['Elderly Training', 'Rehabilitation', 'Low Impact'],
    rating: 4.7,
    reviews: 62,
    price: '$90',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    experience: '15 Years'
  },
  {
    id: '3',
    name: 'Elena Martinez',
    specialty: ['Women-Focused', 'Weight Loss', 'HIIT'],
    rating: 4.8,
    reviews: 103,
    price: '$110',
    image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    experience: '6 Years'
  },
  {
    id: '4',
    name: 'David Chen',
    specialty: ['General Fitness', 'Muscle Building', 'Calisthenics'],
    rating: 4.6,
    reviews: 49,
    price: '$95',
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    experience: '5 Years'
  },
  {
    id: '5',
    name: 'Jessica Williams',
    specialty: ['Disabled Support', 'Adaptive Fitness', 'Mobility'],
    rating: 5.0,
    reviews: 36,
    price: '$130',
    image: 'https://images.unsplash.com/photo-1609863513899-1a612d14e3f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80',
    experience: '10 Years'
  },
  {
    id: '6',
    name: 'Marcus Johnson',
    specialty: ['Competition Prep', 'Bodybuilding', 'Nutrition'],
    rating: 4.5,
    reviews: 78,
    price: '$150',
    image: 'https://images.unsplash.com/photo-1594398901394-4e34939a4fd0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    experience: '12 Years'
  },
];

// Categories and specialties for filtering
const categories = [
  'Competition Prep',
  'Disabled Support',
  'Women-Focused',
  'Elderly Training',
  'General Fitness'
];

const specialties = [
  'Strength Training',
  'Weight Loss',
  'Bodybuilding',
  'Rehabilitation',
  'Nutrition',
  'HIIT',
  'Muscle Building',
  'Calisthenics',
  'Adaptive Fitness',
  'Mobility',
  'Low Impact'
];

const CoachDiscovery = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter coaches based on selected filters
  const filteredCoaches = mockCoaches.filter((coach) => {
    // Filter by search query
    if (searchQuery && !coach.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !coach.specialty.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Filter by selected categories
    if (selectedCategories.length > 0 && 
        !coach.specialty.some(s => selectedCategories.includes(s))) {
      return false;
    }
    
    // Filter by selected specialties
    if (selectedSpecialties.length > 0 && 
        !coach.specialty.some(s => selectedSpecialties.includes(s))) {
      return false;
    }
    
    // Filter by price range
    const coachPrice = parseInt(coach.price.replace('$', ''));
    if (coachPrice < priceRange[0] || coachPrice > priceRange[1]) {
      return false;
    }
    
    // Filter by minimum rating
    if (coach.rating < minRating) {
      return false;
    }
    
    return true;
  });

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const toggleSpecialty = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedSpecialties([]);
    setPriceRange([0, 200]);
    setMinRating(0);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-gympal-blue/10 py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Your Perfect Coach</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our certified fitness professionals and find the one that best matches your goals and preferences
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search by name or specialty..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                variant="outline" 
                className="ml-2 flex items-center"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={18} className="mr-1" />
                Filters
                <ChevronDown 
                  size={16} 
                  className={`ml-1 transition-transform ${showFilters ? 'rotate-180' : ''}`} 
                />
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-gympal-blue flex items-center h-8"
                    onClick={clearFilters}
                  >
                    <X size={14} className="mr-1" />
                    Clear All
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Categories */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Categories</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div className="flex items-center" key={category}>
                          <Checkbox 
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => toggleCategory(category)}
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="ml-2 text-sm"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Specialties */}
                  <div>
                    <h4 className="text-sm font-medium mb-2">Specialties</h4>
                    <div className="grid grid-cols-2 gap-y-2">
                      {specialties.map((specialty) => (
                        <div className="flex items-center" key={specialty}>
                          <Checkbox 
                            id={`specialty-${specialty}`}
                            checked={selectedSpecialties.includes(specialty)}
                            onCheckedChange={() => toggleSpecialty(specialty)}
                          />
                          <label 
                            htmlFor={`specialty-${specialty}`}
                            className="ml-2 text-sm"
                          >
                            {specialty}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Price Range & Rating */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">Price Range</h4>
                        <span className="text-sm text-gray-600">
                          ${priceRange[0]} - ${priceRange[1]}
                        </span>
                      </div>
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={200}
                        step={10}
                        onValueChange={(value) => setPriceRange(value as number[])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium">Minimum Rating</h4>
                        <span className="text-sm text-gray-600 flex items-center">
                          {minRating.toFixed(1)}
                          <Star size={14} className="ml-1 text-yellow-500" fill="currentColor" />
                        </span>
                      </div>
                      <Slider
                        defaultValue={[minRating]}
                        min={0}
                        max={5}
                        step={0.5}
                        onValueChange={(value) => setMinRating(value[0])}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container-custom">
          {/* Results Count */}
          <div className="mb-6 flex justify-between items-center">
            <p className="text-gray-600">
              {filteredCoaches.length} {filteredCoaches.length === 1 ? 'coach' : 'coaches'} found
            </p>
            {(searchQuery || selectedCategories.length > 0 || selectedSpecialties.length > 0 || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 200) && (
              <Button 
                variant="ghost" 
                className="text-gympal-blue h-8"
                onClick={clearFilters}
              >
                <X size={14} className="mr-1" />
                Clear Filters
              </Button>
            )}
          </div>

          {/* Coaches Grid */}
          {filteredCoaches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCoaches.map((coach) => (
                <CoachCard
                  key={coach.id}
                  id={coach.id}
                  name={coach.name}
                  specialty={coach.specialty}
                  rating={coach.rating}
                  reviews={coach.reviews}
                  price={coach.price}
                  image={coach.image}
                  experience={coach.experience}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No coaches found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results</p>
              <Button 
                className="mt-4 bg-gympal-blue hover:bg-gympal-blue/90"
                onClick={clearFilters}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CoachDiscovery;
