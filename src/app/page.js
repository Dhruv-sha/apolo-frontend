"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';

export default function DoctorListing() {
  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({
    specialty: '',
    location: '',
    available: '',
    fee: '',
    language: '',
    page: 1,
  });

  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/list-doctor-with-filter', {
          params: filters,
        });
        setDoctors(data.doctors);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
      page: 1,
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Head>
        <title>Find the Best Doctors Near You | Apollo247 Clone</title>
        <meta
          name="description"
          content="Search and book appointments with verified doctors near you. Filter by specialty, location, availability, fee, and language."
        />
        <meta
          name="keywords"
          content="Doctor listing, find doctors, book appointment, online doctor consultation, healthcare India"
        />
        <link rel="canonical" href="http://localhost:3000/doctor-listing" />

        {/* Open Graph */}
        <meta property="og:title" content="Find the Best Doctors Near You | Apollo247 Clone" />
        <meta property="og:description" content="Search and consult with doctors by specialty, location, availability, and more. Trusted and verified listings." />
        <meta property="og:url" content="http://localhost:3000/doctor-listing" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/doctor-banner.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Find the Best Doctors Near You" />
        <meta name="twitter:description" content="Book appointments with verified doctors online. Filter by your needs easily." />
        <meta name="twitter:image" content="/doctor-banner.jpg" />

        {/* Structured Data for Healthcare Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "name": "Doctor Listing",
              "description": "List of verified doctors with filters for specialty, availability, location, language, and fee.",
              "url": "http://localhost:3000/doctor-listing",
              "itemListElement": doctors.slice(0, 10).map((doctor, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": `http://localhost:3000/doctor/${doctor._id}`,
                "name": doctor.name,
                "item": {
                  "@type": "Physician",
                  "name": doctor.name,
                  "medicalSpecialty": doctor.specialty,
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": doctor.location,
                    "addressCountry": "India"
                  },
                  "availableService": doctor.available ? "Online Consultation" : "Not Available",
                  "priceRange": `₹${doctor.fee}`,
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": doctor.rating || 4,
                    "reviewCount": 10
                  }
                }
              }))
            })
          }}
        />
      </Head>


      {/* Main UI Content */}
      <div className="flex">
        {/* Filter Sidebar */}
        <div className="w-1/4 p-4 bg-gray-200 text-black rounded-lg shadow-md space-y-4">
          <h3 className="font-semibold text-lg mb-2">Filters</h3>
          <select name="specialty" onChange={handleFilterChange} className="w-full p-2 border rounded-md">
            <option value="">Select Specialty</option>
            <option value="General Physician">General Physician</option>
            <option value="Cardiologist">Cardiologist</option>
          </select>
          <input type="text" name="location" placeholder="Location" onChange={handleFilterChange} className="w-full p-2 border rounded-md" />
          <select name="available" onChange={handleFilterChange} className="w-full p-2 border rounded-md">
            <option value="">Available</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <input type="number" name="fee" placeholder="Max Fee" min="0" onChange={handleFilterChange} className="w-full p-2 border rounded-md" />
          <input type="text" name="language" placeholder="Languages (comma separated)" onChange={handleFilterChange} className="w-full p-2 border rounded-md" />
        </div>

        {/* Doctor Listing */}
        <div className="w-3/4 p-4 grid grid-cols-1 gap-6">
          {doctors.map((doctor) => (
            <div key={doctor._id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-black">{doctor.name}</h3>
              <p className="text-gray-600">{doctor.specialty}</p>
              <p className="text-gray-600">{doctor.location}</p>
              <p className="text-gray-600">Rating: {doctor.rating}</p>
              <p className="text-gray-600">{doctor.available ? 'Available' : 'Not Available'}</p>
              <p className="text-gray-600">Fee: {doctor.fee} INR</p>
              <p className="text-gray-600">Languages: {doctor.language.join(', ')}</p>
            </div>
          ))}

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={filters.page <= 1}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-gray-700">
              Page {filters.page} of {pagination.totalPages}
            </span>
            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={filters.page >= pagination.totalPages}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
