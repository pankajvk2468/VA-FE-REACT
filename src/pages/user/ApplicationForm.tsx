import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Save, Send, ArrowRight, Check } from 'lucide-react';

const ApplicationForm: React.FC = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    middleName: '',
    ssn: '',
    dateOfBirth: '',
    // Contact Information
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    // Medical Information
    currentMedications: '',
    medicalConditions: '',
    physicianName: '',
    physicianPhone: '',
  });

  const sections = [
    { id: 0, name: 'Personal Information', completed: false },
    { id: 1, name: 'Contact Information', completed: false },
    { id: 2, name: 'Medical Information', completed: false },
    { id: 3, name: 'Financial Details', completed: false },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveDraft = () => {
    console.log('Saving draft...', formData);
    alert('Draft saved successfully!');
  };

  const handleNext = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const handlePrevious = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">VA Benefits Application</h1>
        <p className="text-lg text-gray-600">
          Complete all sections to submit your application
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Progress Sidebar */}
        <div className="lg:col-span-1">
          <div className="card sticky top-24">
            <h3 className="font-bold text-gray-900 mb-4">Progress</h3>
            <div className="space-y-3">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm transition-all ${
                    activeSection === section.id
                      ? 'bg-primary-100 text-primary-700 font-semibold'
                      : section.completed
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    {section.completed && (
                      <Check className="h-4 w-4 mr-2 flex-shrink-0" />
                    )}
                    <span>{section.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form Content */}
        <div className="lg:col-span-3">
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {sections[activeSection].name}
            </h2>

            {activeSection === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter middle name (optional)"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Social Security Number *</label>
                    <input
                      type="text"
                      name="ssn"
                      value={formData.ssn}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="XXX-XX-XXXX"
                      maxLength={11}
                    />
                  </div>
                  <div>
                    <label className="form-label">Date of Birth *</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="123 Main St"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      name="zip"
                      value={formData.zip}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="12345"
                      maxLength={5}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 2 && (
              <div className="space-y-6">
                <div>
                  <label className="form-label">Current Medications</label>
                  <textarea
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleInputChange}
                    className="form-input"
                    rows={4}
                    placeholder="List all current medications"
                  />
                </div>

                <div>
                  <label className="form-label">Medical Conditions</label>
                  <textarea
                    name="medicalConditions"
                    value={formData.medicalConditions}
                    onChange={handleInputChange}
                    className="form-input"
                    rows={4}
                    placeholder="Describe your medical conditions"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Physician Name</label>
                    <input
                      type="text"
                      name="physicianName"
                      value={formData.physicianName}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="Dr. Smith"
                    />
                  </div>
                  <div>
                    <label className="form-label">Physician Phone</label>
                    <input
                      type="tel"
                      name="physicianPhone"
                      value={formData.physicianPhone}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeSection === 3 && (
              <div className="space-y-6">
                <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">Financial Information</h3>
                  <p className="text-blue-800">
                    This section will collect information about your financial situation,
                    including income, assets, and expenses. This information is used to
                    determine your eligibility for benefits.
                  </p>
                </div>
                <p className="text-gray-600">
                  Financial information form fields will be added here...
                </p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-8 pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
              <button
                onClick={handleSaveDraft}
                className="btn btn-outline w-full sm:w-auto"
              >
                <Save className="h-5 w-5 mr-2" />
                Save Draft
              </button>

              <div className="flex space-x-4 w-full sm:w-auto">
                {activeSection > 0 && (
                  <button
                    onClick={handlePrevious}
                    className="btn btn-outline flex-1 sm:flex-initial"
                  >
                    Previous
                  </button>
                )}
                {activeSection < sections.length - 1 ? (
                  <button onClick={handleNext} className="btn btn-primary flex-1 sm:flex-initial">
                    Next
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </button>
                ) : (
                  <Link to="/application/review" className="btn btn-primary flex-1 sm:flex-initial">
                    Review & Submit
                    <Send className="h-5 w-5 ml-2" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
