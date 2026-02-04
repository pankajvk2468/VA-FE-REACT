import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Download, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { CustomSelect } from '../../../components/CustomSelect';

type TabId = 'startHere' | 'intentToFile' | 'general' | 'contact' | 'personal' | 'health' | 'military' | 'financial' | 'vaDirectDeposit' | 'supportingDocs';

interface TabInfo {
  id: TabId;
  label: string;
  completed: boolean;
}

const ClientEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNewClient = id === 'new';
  
  const [activeTab, setActiveTab] = useState<TabId>('startHere');
  const [isSaving, setIsSaving] = useState(false);

  const [tabs] = useState<TabInfo[]>([
    { id: 'startHere', label: 'Start Here', completed: false },
    { id: 'intentToFile', label: 'Intent to File', completed: false },
    { id: 'general', label: 'General', completed: false },
    { id: 'contact', label: 'Contact', completed: false },
    { id: 'personal', label: 'Personal', completed: false },
    { id: 'health', label: 'Health', completed: false },
    { id: 'military', label: 'Military', completed: false },
    { id: 'financial', label: 'Financial', completed: false },
    { id: 'vaDirectDeposit', label: 'VA Direct Deposit', completed: false },
    { id: 'supportingDocs', label: 'Supporting Document/Misc. Forms', completed: false },
  ]);

  const [formData, setFormData] = useState({
    // Start Here
    situation: isNewClient ? '' : 'singleVeteran',
    clientEmail: isNewClient ? '' : 'michael.j@example.com',
    status: isNewClient ? 'new' : 'new',
    allowUserToGenerateApp: false,
    lockoutEnabled: false,
    
    // General
    isClientNeedsHomeCare: false,
    isClientNeedsSeniorLivingCare: false,
    isSpouseNeedsHomeCare: false,
    isSpouseNeedsSeniorLivingCare: false,
    
    // Veteran Info
    veteranFirstName: isNewClient ? '' : 'Michael',
    veteranMiddleName: isNewClient ? '' : 'James',
    veteranLastName: isNewClient ? '' : 'Johnson',
    veteranDob: isNewClient ? '' : '1985-05-15',
    veteranSsn: isNewClient ? '' : '',
    veteranGender: isNewClient ? '' : 'male',
    
    // Spouse Info
    spouseFirstName: '',
    spouseMiddleName: '',
    spouseLastName: '',
    spouseDob: '',
    spouseSsn: '',
    
    // Contact
    primaryPhone: isNewClient ? '' : '(555) 111-2222',
    mobilePhone: '',
    homePhone: '',
    workPhone: '',
    primaryContactFirstName: isNewClient ? '' : 'Michael',
    primaryContactLastName: isNewClient ? '' : 'Johnson',
    streetAddress: isNewClient ? '' : '456 Oak Avenue',
    city: isNewClient ? '' : 'Chicago',
    state: isNewClient ? '' : 'IL',
    zipCode: isNewClient ? '' : '60601',
    country: 'USA',
    securityQuestion: '',
    securityAnswer: '',
    
    // Military
    branchOfService: isNewClient ? '' : 'Army',
    serviceStartDate: isNewClient ? '' : '2005-06-01',
    serviceEndDate: isNewClient ? '' : '2010-05-31',
    serviceNumber: '',
    vaFileNumber: '',
    servedUnderAnotherName: false,
    wasWarPrisoner: false,
    veteranEverFiledClaim: false,
    currentlyReceivingBenefits: false,
    
    // Financial
    haveMore25kAssets: false,
    ownPrimaryResidence: false,
    receivingSocialSecurity: false,
    
    // VA Direct Deposit
    bankName: '',
    routingNumber: '',
    accountNumber: '',
    accountType: 'checking',
    
    // Assignment
    companyId: isNewClient ? '' : '1',
    representativeId: isNewClient ? '' : '1',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [progress, setProgress] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    
    // Auto-save after change
    autoSave();
  };

  const autoSave = () => {
    setIsSaving(true);
    // Simulate auto-save
    setTimeout(() => {
      setIsSaving(false);
    }, 500);
  };

  useEffect(() => {
    // Calculate progress based on completed tabs
    const completedCount = tabs.filter(t => t.completed).length;
    setProgress((completedCount / tabs.length) * 100);
  }, [tabs]);

  const handleTabClick = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  const handleNext = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1].id);
    }
  };

  const handleBack = () => {
    const currentIndex = tabs.findIndex(t => t.id === activeTab);
    if (currentIndex > 0) {
      setActiveTab(tabs[currentIndex - 1].id);
    }
  };

  const handleDownloadPDF = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Generating PDF...',
        success: 'PDF downloaded successfully!',
        error: 'Failed to generate PDF',
      }
    );
  };

  const handleSendAccount = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1500)),
      {
        loading: 'Sending account credentials...',
        success: 'Account credentials sent successfully!',
        error: 'Failed to send credentials',
      }
    );
  };

  const handleDownloadIntentToFile = () => {
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 1000)),
      {
        loading: 'Generating Intent to File form...',
        success: 'Intent to File form downloaded!',
        error: 'Failed to generate form',
      }
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Saving form:', formData);
    
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 800)),
      {
        loading: 'Saving...',
        success: isNewClient ? 'Client created successfully!' : 'Client updated successfully!',
        error: 'Failed to save client',
      }
    ).then(() => {
      setTimeout(() => navigate('/staff/clients'), 500);
    });
  };

  return (
    <div className="fade-in">
      {/* Fixed Header with Progress Bar */}
      <div className="bg-white border-b border-gray-200 py-3 px-6 mb-0 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/staff/clients')}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-6 w-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Application for VA Benefits</h1>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isSaving && <span className="text-sm text-gray-600">Saving...</span>}
              <button onClick={handleDownloadPDF} className="btn btn-outline py-1.5 px-3 text-sm flex items-center">
                <Download className="h-4 w-4 mr-1.5" />
                PDF
              </button>
              <button onClick={handleSendAccount} className="btn btn-outline py-1.5 px-3 text-sm flex items-center">
                <Mail className="h-4 w-4 mr-1.5" />
                Send
              </button>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center space-x-3">
            <div className="flex-1">
              <div className="bg-gray-200 rounded-full h-6 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full flex items-center justify-center text-white font-semibold text-xs transition-all duration-300"
                  style={{ width: `${progress}%` }}
                >
                  {progress > 5 && `${Math.round(progress)}%`}
                </div>
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-600 whitespace-nowrap">
              {Math.round(progress)}%
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <nav className="flex space-x-0 overflow-x-auto px-6" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-3 py-2 text-sm font-medium whitespace-nowrap border-b-3 transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'border-b-4 border-blue-600 text-blue-700 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-blue-600 hover:border-gray-300'
                }`}
                role="tab"
                aria-selected={activeTab === tab.id}
              >
                {tab.label}
                {tab.completed && <span className="ml-1.5 text-green-500 font-bold">✓</span>}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <form onSubmit={handleSave} className="max-w-7xl mx-auto px-6 py-4">
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-4 min-h-[400px]">
          
          {/* Start Here Tab */}
          {activeTab === 'startHere' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Start Here</h2>
              <p className="text-gray-700 mb-6">
                Please read the following information carefully. Aid & Attendance is a lifetime benefit. The criteria for eligibility are continually met, paid by the Department of Veterans Affairs (VA) to help supplement the cost of senior care.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-blue-900 mb-2">Instructions / Mandated Steps</h3>
                <p className="text-sm text-blue-800">Complete each tab before moving to the next. All required fields must be filled.</p>
              </div>

              <fieldset className="border-2 border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold px-2">General Information</legend>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="situation" className="form-label required">Situation</label>
                    <CustomSelect
                      id="situation"
                      name="situation"
                      value={formData.situation}
                      onChange={(value) => setFormData({ ...formData, situation: value })}
                      placeholder="-- Select Situation --"
                      options={[
                        { value: 'survivingSpouse', label: 'Surviving Spouse' },
                        { value: 'singleVeteran', label: 'Single Veteran' },
                        { value: 'marriedVetNeedsCare', label: 'Married Veteran - Veteran Needs Care' },
                        { value: 'marriedVetSpouseCare', label: 'Married Veteran - Spouse Needs Care' },
                        { value: 'marriedVetBothCare', label: 'Married Veteran - Both Need Care' },
                      ]}
                    />
                  </div>

                  <div>
                    <label htmlFor="status" className="form-label">Status</label>
                    <CustomSelect
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={(value) => setFormData({ ...formData, status: value })}
                      placeholder="Select Status"
                      options={[
                        { value: 'new', label: 'New' },
                        { value: 'ifcGenerated', label: 'IFC Generated' },
                        { value: 'clientHasOpened', label: 'Client Has Opened' },
                        { value: 'completed', label: 'Completed' },
                      ]}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="clientEmail" className="form-label">Client Email</label>
                    <input
                      type="email"
                      id="clientEmail"
                      name="clientEmail"
                      value={formData.clientEmail}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="client@example.com"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <div className="flex items-center space-x-6">
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="allowUserToGenerateApp"
                          checked={formData.allowUserToGenerateApp}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-base">Allow User to Generate Application</span>
                      </label>
                      
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="lockoutEnabled"
                          checked={formData.lockoutEnabled}
                          onChange={handleChange}
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-base">Lockout Enabled</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h4 className="font-semibold mb-4">Care Needs (Required, choose one or both)</h4>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isClientNeedsSeniorLivingCare"
                        checked={formData.isClientNeedsSeniorLivingCare}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="text-base">Does or will the veteran need senior living care?</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="isClientNeedsHomeCare"
                        checked={formData.isClientNeedsHomeCare}
                        onChange={handleChange}
                        className="form-checkbox h-5 w-5 text-blue-600"
                      />
                      <span className="text-base">Does or will the veteran need home care?</span>
                    </label>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h4 className="font-semibold mb-4">Surviving Spouse</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="form-label required">First Name</label>
                      <input type="text" className="form-input" placeholder="First Name" />
                    </div>
                    <div>
                      <label className="form-label">Middle Name</label>
                      <input type="text" className="form-input" placeholder="Middle Name" />
                    </div>
                    <div>
                      <label className="form-label required">Last Name</label>
                      <input type="text" className="form-input" placeholder="Last Name" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 border-t pt-6">
                  <h4 className="font-semibold mb-4">Veteran</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="form-label required">First Name</label>
                      <input type="text" name="veteranFirstName" value={formData.veteranFirstName} onChange={handleChange} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label">Middle Name</label>
                      <input type="text" name="veteranMiddleName" value={formData.veteranMiddleName} onChange={handleChange} className="form-input" />
                    </div>
                    <div>
                      <label className="form-label required">Last Name</label>
                      <input type="text" name="veteranLastName" value={formData.veteranLastName} onChange={handleChange} className="form-input" />
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {/* Intent to File Tab */}
          {activeTab === 'intentToFile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Intent to File Form</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-900">
                  The Intent to File locks in the retroactive payment start date to begin in the 1st of the following month that the VA receives the Intent to File.
                </p>
              </div>

              <fieldset className="border-2 border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold px-2">Intent to File Information</legend>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label required">Veteran's Date of Birth</label>
                    <input type="date" name="veteranDob" value={formData.veteranDob} onChange={handleChange} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label required">Veteran's SSN</label>
                    <input type="text" name="veteranSsn" value={formData.veteranSsn} onChange={handleChange} className="form-input" placeholder="XXX-XX-XXXX" />
                  </div>
                  <div>
                    <label className="form-label">Veteran's Gender</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="veteranGender" value="male" checked={formData.veteranGender === 'male'} onChange={handleChange} className="form-radio" />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="veteranGender" value="female" checked={formData.veteranGender === 'female'} onChange={handleChange} className="form-radio" />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Service Number</label>
                    <input type="text" name="serviceNumber" value={formData.serviceNumber} onChange={handleChange} className="form-input" />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Mailing Address</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="Street Address" className="form-input" />
                    <div className="grid grid-cols-3 gap-4">
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="form-input" />
                      <CustomSelect
                        name="state"
                        value={formData.state}
                        onChange={(value) => setFormData({ ...formData, state: value })}
                        placeholder="State"
                        options={[
                          { value: 'IL', label: 'Illinois' },
                          { value: 'CA', label: 'California' },
                          { value: 'NY', label: 'New York' },
                          { value: 'TX', label: 'Texas' },
                        ]}
                      />
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="ZIP" className="form-input" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Contact Phone</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="tel" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} placeholder="Primary Phone" className="form-input" />
                    <input type="tel" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} placeholder="Mobile Phone" className="form-input" />
                  </div>
                </div>
              </fieldset>

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6 mt-6">
                <h4 className="text-lg font-bold text-red-900 mb-2">
                  <span className="text-red-600">STOP:</span> Did you read the instructions and complete the steps listed above?
                </h4>
                <button
                  type="button"
                  onClick={handleDownloadIntentToFile}
                  className="btn btn-primary mt-4 flex items-center"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Download the Intent to File Form
                </button>
              </div>
            </div>
          )}

          {/* General Tab */}
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">General Information</h2>
              <p className="text-gray-700">Additional general information and settings will go here.</p>
              <p className="text-sm text-gray-500 italic">This tab content is being developed...</p>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              
              <fieldset className="border-2 border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold px-2">Contact Details</legend>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Primary Phone</label>
                    <input type="tel" name="primaryPhone" value={formData.primaryPhone} onChange={handleChange} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Mobile Phone</label>
                    <input type="tel" name="mobilePhone" value={formData.mobilePhone} onChange={handleChange} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Home Phone</label>
                    <input type="tel" name="homePhone" value={formData.homePhone} onChange={handleChange} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Work Phone</label>
                    <input type="tel" name="workPhone" value={formData.workPhone} onChange={handleChange} className="form-input" />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Primary Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="primaryContactFirstName" value={formData.primaryContactFirstName} onChange={handleChange} placeholder="First Name" className="form-input" />
                    <input type="text" name="primaryContactLastName" value={formData.primaryContactLastName} onChange={handleChange} placeholder="Last Name" className="form-input" />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Mailing Address</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <input type="text" name="streetAddress" value={formData.streetAddress} onChange={handleChange} placeholder="Street Address" className="form-input" />
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="form-input" />
                      <CustomSelect
                        name="state"
                        value={formData.state}
                        onChange={(value) => setFormData({ ...formData, state: value })}
                        placeholder="State"
                        options={[
                          { value: 'IL', label: 'Illinois' },
                          { value: 'CA', label: 'California' },
                        ]}
                      />
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="ZIP" className="form-input" />
                      <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" className="form-input" />
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-semibold mb-4">Security Question</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <CustomSelect
                      name="securityQuestion"
                      value={formData.securityQuestion}
                      onChange={(value) => setFormData({ ...formData, securityQuestion: value })}
                      placeholder="Select a security question"
                      options={[
                        { value: 'pet', label: "What was your first pet's name?" },
                        { value: 'school', label: 'What elementary school did you attend?' },
                        { value: 'city', label: 'What city were you born in?' },
                      ]}
                    />
                    <input type="text" name="securityAnswer" value={formData.securityAnswer} onChange={handleChange} placeholder="Your answer" className="form-input" />
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {/* Personal Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Personal Information</h2>
              
              <fieldset className="border-2 border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold px-2">Personal Details</legend>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Veteran's Date of Birth</label>
                    <input type="date" name="veteranDob" value={formData.veteranDob} onChange={handleChange} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Veteran's SSN</label>
                    <input type="text" name="veteranSsn" value={formData.veteranSsn} onChange={handleChange} className="form-input" placeholder="XXX-XX-XXXX" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="form-label">Veteran's Gender</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="veteranGender" value="male" checked={formData.veteranGender === 'male'} onChange={handleChange} className="form-radio" />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="veteranGender" value="female" checked={formData.veteranGender === 'female'} onChange={handleChange} className="form-radio" />
                        <span>Female</span>
                      </label>
                    </div>
                  </div>
                </div>

                {formData.situation?.includes('married') && (
                  <div className="mt-6 border-t pt-6">
                    <h4 className="font-semibold mb-4">Spouse Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">Spouse's Date of Birth</label>
                        <input type="date" name="spouseDob" value={formData.spouseDob} onChange={handleChange} className="form-input" />
                      </div>
                      <div>
                        <label className="form-label">Spouse's SSN</label>
                        <input type="text" name="spouseSsn" value={formData.spouseSsn} onChange={handleChange} className="form-input" placeholder="XXX-XX-XXXX" />
                      </div>
                    </div>
                  </div>
                )}
              </fieldset>
            </div>
          )}

          {/* Health Tab */}
          {activeTab === 'health' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Health Information</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">HIPAA authorization and medical information will be collected here.</p>
              </div>
              <p className="text-sm text-gray-500 italic">Detailed health fields are being developed...</p>
            </div>
          )}

          {/* Military Tab */}
          {activeTab === 'military' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Military Information</h2>
              
              <fieldset className="border-2 border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold px-2">Service Information</legend>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="form-label">Branch of Service</label>
                    <CustomSelect
                      name="branchOfService"
                      value={formData.branchOfService}
                      onChange={(value) => setFormData({ ...formData, branchOfService: value })}
                      placeholder="Select Branch"
                      options={[
                        { value: 'Army', label: 'Army' },
                        { value: 'Navy', label: 'Navy' },
                        { value: 'Air Force', label: 'Air Force' },
                        { value: 'Marines', label: 'Marines' },
                        { value: 'Coast Guard', label: 'Coast Guard' },
                      ]}
                    />
                  </div>
                  <div>
                    <label className="form-label">Service Number</label>
                    <input type="text" name="serviceNumber" value={formData.serviceNumber} onChange={handleChange} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Service Start Date</label>
                    <input type="date" name="serviceStartDate" value={formData.serviceStartDate} onChange={handleChange} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">Service End Date</label>
                    <input type="date" name="serviceEndDate" value={formData.serviceEndDate} onChange={handleChange} className="form-input" />
                  </div>
                  <div>
                    <label className="form-label">VA File Number</label>
                    <input type="text" name="vaFileNumber" value={formData.vaFileNumber} onChange={handleChange} className="form-input" />
                  </div>
                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" name="servedUnderAnotherName" checked={formData.servedUnderAnotherName} onChange={handleChange} className="form-checkbox h-5 w-5" />
                        <span>Served Under Another Name</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" name="wasWarPrisoner" checked={formData.wasWarPrisoner} onChange={handleChange} className="form-checkbox h-5 w-5" />
                        <span>Was a Prisoner of War</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" name="veteranEverFiledClaim" checked={formData.veteranEverFiledClaim} onChange={handleChange} className="form-checkbox h-5 w-5" />
                        <span>Veteran Ever Filed Claim with VA</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="checkbox" name="currentlyReceivingBenefits" checked={formData.currentlyReceivingBenefits} onChange={handleChange} className="form-checkbox h-5 w-5" />
                        <span>Currently Receiving VA Benefits</span>
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === 'financial' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Financial Information</h2>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-yellow-900 mb-2">Financial Overview</h4>
                <p className="text-sm text-yellow-800">
                  The VA requires detailed financial information to determine eligibility for benefits. Please provide accurate information about assets and income.
                </p>
              </div>

              <fieldset className="border-2 border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold px-2">Assets & Income</legend>
                
                <div className="space-y-4">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="haveMore25kAssets" checked={formData.haveMore25kAssets} onChange={handleChange} className="form-checkbox h-5 w-5" />
                    <span>Have more than $25,000 in assets</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="ownPrimaryResidence" checked={formData.ownPrimaryResidence} onChange={handleChange} className="form-checkbox h-5 w-5" />
                    <span>Own primary residence</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" name="receivingSocialSecurity" checked={formData.receivingSocialSecurity} onChange={handleChange} className="form-checkbox h-5 w-5" />
                    <span>Receiving Social Security benefits</span>
                  </label>
                </div>
                
                <p className="text-sm text-gray-500 italic mt-4">Additional financial fields will be added...</p>
              </fieldset>
            </div>
          )}

          {/* VA Direct Deposit Tab */}
          {activeTab === 'vaDirectDeposit' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">VA Direct Deposit</h2>
              
              <fieldset className="border-2 border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold px-2">Banking Information</legend>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="form-label">Bank Name</label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleChange} className="form-input" placeholder="Bank of America" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Routing Number</label>
                      <input type="text" name="routingNumber" value={formData.routingNumber} onChange={handleChange} className="form-input" placeholder="123456789" />
                    </div>
                    <div>
                      <label className="form-label">Account Number</label>
                      <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleChange} className="form-input" placeholder="Account number" />
                    </div>
                  </div>
                  <div>
                    <label className="form-label">Account Type</label>
                    <div className="flex items-center space-x-4 mt-2">
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="accountType" value="checking" checked={formData.accountType === 'checking'} onChange={handleChange} className="form-radio" />
                        <span>Checking</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <input type="radio" name="accountType" value="savings" checked={formData.accountType === 'savings'} onChange={handleChange} className="form-radio" />
                        <span>Savings</span>
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          )}

          {/* Supporting Documents Tab */}
          {activeTab === 'supportingDocs' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Supporting Document/Misc. Forms</h2>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">Required Documents</h4>
                <ul className="list-disc list-inside text-sm text-blue-800 space-y-1">
                  <li>DD 214 (Discharge Papers)</li>
                  <li>Marriage Certificate (if applicable)</li>
                  <li>Death Certificate (if surviving spouse)</li>
                  <li>Medical Records</li>
                  <li>Financial Documents</li>
                </ul>
              </div>

              <fieldset className="border-2 border-gray-300 rounded-lg p-6">
                <legend className="text-lg font-semibold px-2">File Uploads</legend>
                
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <input type="file" className="hidden" id="fileUpload" multiple />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <div className="text-gray-600">
                        <p className="text-lg font-medium">Click to upload files</p>
                        <p className="text-sm mt-2">or drag and drop</p>
                        <p className="text-xs mt-1 text-gray-500">PDF, DOC, JPG, PNG up to 10MB</p>
                      </div>
                    </label>
                  </div>
                  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Uploaded Files:</h5>
                    <p className="text-sm text-gray-500 italic">No files uploaded yet</p>
                  </div>
                </div>
              </fieldset>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeTab === 'startHere'}
            className="btn btn-outline py-2 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          
          <button
            type="submit"
            className="btn btn-primary py-2 px-5 flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </button>
          
          <button
            type="button"
            onClick={handleNext}
            disabled={activeTab === 'supportingDocs'}
            className="btn btn-primary py-2 px-5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientEdit;
