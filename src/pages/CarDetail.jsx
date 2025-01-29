import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CarDetail() {
  const { id } = useParams(); // Remove type annotation
  const navigate = useNavigate();
  const [car, setCar] = useState(null); // Initializing car as null
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      const { data, error } = await supabase
        .from('cars')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCar(data);
    } catch (error) {
      toast.error('Error fetching car details');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this car?')) return;

    try {
      const { error } = await supabase
        .from('cars')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Car deleted successfully');
      navigate('/');
    } catch (error) {
      toast.error('Error deleting car');
    }
  };

  const nextImage = () => {
    if (car?.images.length) {
      setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
    }
  };

  const previousImage = () => {
    if (car?.images.length) {
      setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!car) {
    return <div className="text-center">Car not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {car.images.length > 0 && (
          <div className="relative h-96">
            <img
              src={car.images[currentImageIndex]}
              alt={car.title}
              className="w-full h-full object-cover"
            />
            {car.images.length > 1 && (
              <>
                <button
                  onClick={previousImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        )}

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold">{car.title}</h1>
            <div className="flex space-x-2">
              <Link
                to={`/cars/${car.id}/edit`}
                className="p-2 text-gray-600 hover:text-blue-600"
              >
                <Edit className="w-5 h-5" />
              </Link>
              <button
                onClick={handleDelete}
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          <p className="text-gray-600 mb-6">{car.description}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Car Type</h3>
              <p className="mt-1">{car.car_type || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Company</h3>
              <p className="mt-1">{car.company || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Dealer</h3>
              <p className="mt-1">{car.dealer || 'Not specified'}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {car.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-500"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Cars
          </Link>
        </div>
      </div>
    </div>
  );
}
