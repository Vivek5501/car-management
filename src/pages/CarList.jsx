import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Search, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCars = async (query = '') => {
    try {
      let supabaseQuery = supabase
        .from('cars')
        .select('*')
        .order('created_at', { ascending: false });

      if (query) {
        supabaseQuery = supabaseQuery.or(
          `title.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`
        );
      }

      const { data, error } = await supabaseQuery;

      if (error) throw error;
      setCars(data || []);
    } catch (error) {
      toast.error('Error fetching cars');
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars(searchQuery);
  }, [searchQuery]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setCars(cars.filter(car => car.id !== id));
      toast.success('Car deleted successfully');
    } catch (error) {
      toast.error('Error deleting car');
      console.error('Error:', error.message);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search cars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {cars.length === 0 ? (
        <div className="text-center text-gray-500">
          No cars found. {' '}
          <Link to="/cars/new" className="text-blue-600 hover:text-blue-500">
            Add your first car
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {car.images[0] && (
                <img
                  src={car.images[0]}
                  alt={car.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{car.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {car.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    to={`/cars/${car.id}`}
                    className="text-blue-600 hover:text-blue-500"
                  >
                    View Details
                  </Link>
                  <div className="flex space-x-2">
                    <Link
                      to={`/cars/${car.id}/edit`}
                      className="p-2 text-gray-600 hover:text-blue-600"
                    >
                      <Edit className="w-5 h-5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="p-2 text-gray-600 hover:text-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
