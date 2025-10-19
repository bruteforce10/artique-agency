'use client';

import { useState, useEffect } from 'react';

export default function CaseStudiesExample() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const response = await fetch('/api/case-studies');
        const data = await response.json();
        console.log('data case studies', data);
        
        if (data.length > 0) {
          setCaseStudies(data);
        } else {
          setError('No case studies found');
        }
      } catch (err) {
        setError('Failed to fetch case studies');
        console.error('Error fetching case studies:', err);
      }
    }

    fetchCaseStudies();
  }, []);

  if (loading) return <div>Loading case studies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="case-studies-container">
      <h2>Case Studies</h2>
    </div>
  );
}
