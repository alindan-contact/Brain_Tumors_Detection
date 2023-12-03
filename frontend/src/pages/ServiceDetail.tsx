import React, { DragEvent, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import NotFound from './NotFound';

export default function ServiceDetail() {
  const { serviceName } = useParams<{ serviceName?: string }>();
  const navigate = useNavigate();

  if (!serviceName) {
    return <NotFound />;
  }

  const formattedServiceName = serviceName.replace(/-/g, ' ');

  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const droppedFiles = event.dataTransfer.files;
    console.log('Dropped files:', droppedFiles);
  };

  return (
    <div className='bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 min-h-screen flex flex-col'>
      <Navbar />
      <h1 className='text-4xl text-center my-8'>Service Detail Page for {formattedServiceName}</h1>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`mx-auto p-8 border-dashed border-4 ${
          isDragging ? 'border-green-500 bg-green-100' : 'border-black'
        }`}
        style={{ width: 'max-content', cursor: 'pointer' }}
      >
        {isDragging ? 'Drop here!' : 'Drag and drop some files here'}
      </div>
    </div>
  );
}
