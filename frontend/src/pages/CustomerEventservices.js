import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EventServices() {
  const [selectedSubService, setSelectedSubService] = useState(null);
  const navigate = useNavigate();

  const subServices = [
    { id: 8, name: 'Event Planning', description: 'Comprehensive event planning services.' },
    { id: 9, name: 'Photography', description: 'Professional photography for events.' },
    { id: 10, name: 'Catering', description: 'Catering services for all kinds of events.' }
  ];

  const handleSubServiceSelect = (subServiceId) => {
    setSelectedSubService(subServiceId);
    navigate('/Taskers', { state: { serviceId: subServiceId } });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800">Event Services</h1>
      <p className="mt-4 text-gray-600">
        Choose from the following event services:
      </p>

      <div className="flex flex-col gap-6 mt-8">
        {subServices.map(subService => (
          <div
            key={subService.id}
            onClick={() => handleSubServiceSelect(subService.id)}
            className={`cursor-pointer border border-gray-200 rounded-lg p-4 shadow-md transition-transform transform hover:scale-105 ${selectedSubService === subService.id ? 'border-blue-500' : 'border-transparent'}`}
          >
            <h3 className="text-xl font-bold text-gray-800">{subService.name}</h3>
            <p className="mt-2 text-gray-600">{subService.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventServices;
