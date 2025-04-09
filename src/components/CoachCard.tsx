
import React from 'react';
import { Star, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

interface CoachCardProps {
  id: string;
  name: string;
  specialty: string[];
  rating: number;
  reviews: number;
  price: string;
  image: string;
  experience: string;
}

const CoachCard = ({
  id,
  name,
  specialty,
  rating,
  reviews,
  price,
  image,
  experience,
}: CoachCardProps) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg border border-gray-100 group">
      <div className="relative h-60">
        <img
          src={image}
          alt={`Coach ${name}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <div className="flex items-center bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="text-yellow-500 mr-1" size={16} fill="currentColor" />
            <span className="font-medium text-sm">{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold text-lg">{name}</h3>
            <p className="text-gray-600 text-sm mb-2">{experience} Experience</p>
          </div>
          <div className="text-right">
            <span className="block font-bold text-gympal-blue">{price}</span>
            <span className="text-gray-500 text-xs">/month</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-3">
          {specialty.slice(0, 3).map((item, index) => (
            <Badge key={index} variant="outline" className="bg-gympal-blue/10 text-gympal-blue border-none">
              {item}
            </Badge>
          ))}
          {specialty.length > 3 && (
            <Badge variant="outline" className="bg-gray-100 text-gray-600 border-none">
              +{specialty.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center text-gray-500 text-sm mb-5">
          <Star className="text-yellow-500 mr-1" size={14} fill="currentColor" />
          <span>{rating.toFixed(1)} ({reviews} reviews)</span>
        </div>

        <Link to={`/coaches/${id}`}>
          <Button className="w-full bg-gympal-blue hover:bg-gympal-blue/90">
            View Profile
            <ChevronRight size={16} className="ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CoachCard;
