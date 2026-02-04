import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, FileCheck } from 'lucide-react';

const FormReview: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    // In production, submit to API
    alert('Application submitted successfully!');
    navigate('/dashboard');
  };

  return (
    <div className="max-w-4xl mx-auto fade-in">
      <div className="card">
        <div className="text-center mb-8">
          <FileCheck className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Review Your Application</h1>
          <p className="text-lg text-gray-600">
            Please review all information before submitting
          </p>
        </div>

        {/* Review sections would go here */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-900 mb-4">Personal Information</h3>
            <p className="text-gray-600">Application details will be displayed here...</p>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <button onClick={() => navigate('/application')} className="btn btn-outline">
            ← Back to Edit
          </button>
          <button onClick={handleSubmit} className="btn btn-primary btn-lg">
            <Send className="h-5 w-5 mr-2" />
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormReview;
