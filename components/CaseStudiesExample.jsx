'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';


export default function CaseStudiesExample() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const locale = useLocale();

  console.log('locale', locale);
  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/case-studies?locale=${locale}`);
        const data = await response.json();
        console.log('data case studies', data);
        
        if (data.caseStuide) {
          setCaseStudies([data.caseStuide]);
        } else {
          setError('No case studies found');
        }
      } catch (err) {
        setError('Failed to fetch case studies');
        console.error('Error fetching case studies:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchCaseStudies();
  }, [locale]);

  if (loading) return <div>Loading case studies...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="case-studies-container max-w-4xl mx-auto p-6">
   
      
      <h2 className="text-3xl font-bold mb-6">Case Studies</h2>
      
      {caseStudies.length > 0 && (
        <div className="grid gap-6">
          {caseStudies.map((caseStudy, index) => (
            <div key={index} className="border rounded-lg p-6 shadow-md">
              {caseStudy.images && caseStudy.images.length > 0 && (
                <div className="mb-4">
                  <img 
                    src={caseStudy.images[0].url} 
                    alt="Case Study" 
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}
              
              {caseStudy.description && (
                <div 
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: caseStudy.description.html }}
                />
              )}
            </div>
          ))}
        </div>
      )}
      
      {caseStudies.length === 0 && !loading && !error && (
        <p className="text-gray-500 text-center">No case studies available for this language.</p>
      )}
    </div>
  );
}
