import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface Service {
  name: string;
  description: string;
  image: string;
}

interface XrayServiceProps {
  services: Service[];
}

export default function XrayService({ services }: XrayServiceProps) {
  const navigate = useNavigate();

  const handleServiceClick = (serviceName: string) => {
    const formattedServiceName = encodeURIComponent(serviceName.replace(/\s+/g, '-'));
    navigate(`/services/${formattedServiceName}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {services.map((service, index) => (
        <div
          key={index}
          className="bg-white rounded p-4 shadow-md mt-4 mx-auto cursor-pointer"
          style={{ width: '80%' }}
          onClick={() => handleServiceClick(service.name)}
        >
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-40 object-cover mb-4 rounded"
          />
          <h2 className="text-xl font-bold mb-2">{service.name}</h2>
          <p className="text-gray-600">{service.description}</p>
        </div>
      ))}
    </div>
  );
}

