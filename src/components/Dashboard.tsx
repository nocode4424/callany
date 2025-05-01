import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  ClipboardList, 
  Mic, 
  Copy, 
  Settings, 
  User, 
  Coins,
  Info,
  LogOut,
  Camera,
  Check,
  Edit2,
  ChevronDown,
  CheckCircle
} from 'lucide-react';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { checkUserExists } from '../supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import CallConfirmationModal from './CallConfirmationModal';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  phone: string;
  onLogout: () => void;
}

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  zip_code: string;
  call_types_preferences?: string[];
  profile_image?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ phone, onLogout }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('make-call');
  const [callFormData, setCallFormData] = useState({
    target: '',
    goal: '',
    info: '',
    actingAs: 'self'
  });
  const [isCallStarted, setIsCallStarted] = useState(false);
  const [callStatus, setCallStatus] = useState('waiting'); // waiting, connecting, in-progress, completed
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileImage, setProfileImage] = useState('https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [callFieldErrors, setCallFieldErrors] = useState<{target?: string, goal?: string}>({});
  const [callSuccess, setCallSuccess] = useState(false);
  
  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { exists, userData } = await checkUserExists(phone);
        if (exists && userData) {
          setUserData(userData);
          // Set profile image if available
          if (userData.profile_image) {
            setProfileImage(userData.profile_image);
          }
        } else {
          // If user doesn't exist, redirect to home
          onLogout();
          navigate('/');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    
    fetchUserData();
  }, [phone, navigate, onLogout]);
  
  const formatPhoneNumber = (value: string): string => {
    const phoneNumber = parsePhoneNumberFromString(value, 'US');
    return phoneNumber ? phoneNumber.formatNational() : value;
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCallFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field if it exists
    if (callFieldErrors[name as keyof typeof callFieldErrors]) {
      setCallFieldErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  const handleStartCall = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors: {target?: string, goal?: string} = {};
    
    if (!callFormData.target.trim()) {
      errors.target = 'Please provide who we should call';
    }
    
    if (!callFormData.goal.trim()) {
      errors.goal = 'Please provide the goal of the call';
    }
    
    if (Object.keys(errors).length > 0) {
      setCallFieldErrors(errors);
      return;
    }
    
    // Show confirmation modal
    setShowConfirmationModal(true);
  };

  const handleConfirmCall = () => {
    // Close the modal
    setShowConfirmationModal(false);
    
    // Show success message
    setCallSuccess(true);
    
    // Start call process
    setIsCallStarted(true);
    setCallStatus('connecting');
    
    // Simulate call connecting
    setTimeout(() => {
      setCallStatus('in-progress');
    }, 2000);
  };

  const handleProfileImageChange = () => {
    if (profileImageUrl.trim()) {
      setProfileImage(profileImageUrl);
      setProfileImageUrl('');
      // Here you would update the user profile in the database
    }
  };
  
  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };
  
  const handleLogout = () => {
    onLogout();
    navigate('/');
  };
  
  // Extract target name and phone from the input for the call confirmation modal
  const extractTargetInfo = (): {target_name: string, target_phone: string} => {
    // This is a simplified version - in a real app you might want more robust parsing
    const parts = callFormData.target.split(/[,\s]+/);
    
    // Try to find a phone number pattern
    let phoneNumber = '';
    let name = '';
    
    // Look for phone number
    for (const part of parts) {
      const digits = part.replace(/\D/g, '');
      if (digits.length >= 10) {
        phoneNumber = digits;
        break;
      }
    }
    
    // Everything else is considered the name
    name = callFormData.target.replace(phoneNumber, '').trim();
    
    // If no clear separation, make a best effort
    if (!name) {
      name = callFormData.target;
    }
    
    // Format the phone nicely if we can
    let formattedPhone = phoneNumber;
    try {
      if (phoneNumber) {
        const parsedPhone = parsePhoneNumberFromString(`+1${phoneNumber}`, 'US');
        if (parsedPhone) {
          formattedPhone = parsedPhone.formatNational();
        }
      }
    } catch (e) {
      console.log('Error formatting phone number', e);
    }
    
    return {
      target_name: name,
      target_phone: formattedPhone || phoneNumber
    };
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-gradient-to-b from-primary-600 to-primary-700 text-white flex flex-col">
        {/* Logo Area */}
        <div className="p-4 bg-primary-700 flex items-center justify-center border-b border-primary-500">
          <div className="bg-white/10 rounded-full p-2 mr-2">
            <Phone size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold text-white">FinishTheList</h1>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex-1 pt-4">
          <NavItem 
            icon={Phone} 
            label="Make Call" 
            isActive={activeTab === 'make-call'} 
            onClick={() => setActiveTab('make-call')}
          />
          <NavItem 
            icon={ClipboardList} 
            label="Call History" 
            isActive={activeTab === 'call-history'} 
            onClick={() => setActiveTab('call-history')}
          />
          <NavItem 
            icon={Mic} 
            label="Voices" 
            isActive={activeTab === 'voices'} 
            onClick={() => setActiveTab('voices')}
          />
          <NavItem 
            icon={Copy} 
            label="Clone Voice" 
            isActive={activeTab === 'clone-voice'} 
            onClick={() => setActiveTab('clone-voice')}
          />
          <NavItem 
            icon={Settings} 
            label="Settings" 
            isActive={activeTab === 'settings'} 
            onClick={() => setActiveTab('settings')}
          />
          <NavItem 
            icon={User} 
            label="Profile" 
            isActive={activeTab === 'profile'} 
            onClick={() => setActiveTab('profile')}
          />
          <NavItem 
            icon={Coins} 
            label="Tokens" 
            isActive={activeTab === 'tokens'} 
            onClick={() => setActiveTab('tokens')}
          />
        </nav>
        
        {/* User Info at bottom */}
        <div className="p-4 border-t border-primary-500 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold mr-2">
              {userData?.first_name?.charAt(0) || phone.charAt(0)}
            </div>
            <span className="text-sm text-white/80 truncate">{formatPhoneNumber(phone)}</span>
          </div>
          <button onClick={handleLogout} className="text-white/80 hover:text-white">
            <LogOut size={18} />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 max-h-screen overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === 'make-call' ? 'Make a Call' : 
             activeTab === 'call-history' ? 'Call History' :
             activeTab === 'voices' ? 'Voices' :
             activeTab === 'clone-voice' ? 'Clone Voice' :
             activeTab === 'settings' ? 'Settings' :
             activeTab === 'profile' ? 'Profile' : 'Tokens'}
          </h2>
          
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 px-3 py-1 rounded-full flex items-center text-sm">
              <Coins size={16} className="text-primary-700 mr-1" />
              <span className="text-primary-700 font-medium">Total Tokens: 250 remaining</span>
            </div>
            <button className="bg-gradient-to-r from-tertiary-400 to-tertiary-500 text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center">
              Buy More <span className="ml-1 bg-white/20 px-1.5 rounded-sm text-xs">50% OFF</span>
            </button>
            
            {/* Profile Menu */}
            <div className="relative ml-2">
              <button 
                onClick={toggleProfileMenu}
                className="flex items-center focus:outline-none"
              >
                <img 
                  src={profileImage} 
                  alt="Profile" 
                  className="w-10 h-10 rounded-full object-cover border-2 border-primary-600" 
                />
                <ChevronDown size={16} className="ml-1 text-gray-600" />
              </button>
              
              <AnimatePresence>
                {profileMenuOpen && (
                  <motion.div 
                    className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-10"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="flex items-center">
                        <img 
                          src={profileImage} 
                          alt="Profile" 
                          className="w-12 h-12 rounded-full object-cover" 
                        />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-800">
                            {userData?.first_name} {userData?.last_name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {userData?.email}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="px-4 py-2">
                      <button 
                        onClick={() => setActiveTab('profile')}
                        className="flex items-center w-full text-left px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        <User size={16} className="mr-2" />
                        View Profile
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="flex items-center w-full text-left px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>
        
        {/* Main Content Area */}
        <div className="p-6">
          {activeTab === 'make-call' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                {callSuccess ? (
                  <div className="text-center py-6">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={40} className="text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Call Request Confirmed!</h3>
                    <p className="text-lg text-gray-600 mb-6">
                      We've received your call request and our AI is handling it now.
                      You can follow the progress in real-time below.
                    </p>
                    <button
                      className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                      onClick={() => {
                        setCallSuccess(false);
                        setCallFormData({
                          target: '',
                          goal: '',
                          info: '',
                          actingAs: 'self'
                        });
                      }}
                    >
                      Make Another Call
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleStartCall}>
                    {/* Who to call */}
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <label className="text-lg font-medium text-gray-800">
                          Who should we call and what's the number?
                        </label>
                        <button 
                          type="button" 
                          className="ml-2 text-primary-600 hover:text-primary-800"
                          title="Help"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                      <input
                        type="text"
                        name="target"
                        value={callFormData.target}
                        onChange={handleInputChange}
                        placeholder="Enter name and phone number"
                        className={`w-full px-4 py-3 border ${callFieldErrors.target ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                      />
                      {callFieldErrors.target && (
                        <p className="text-red-500 text-sm mt-1">{callFieldErrors.target}</p>
                      )}
                    </div>
                    
                    {/* Call goal */}
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <label className="text-lg font-medium text-gray-800">
                          What's the goal of the call?
                        </label>
                        <button 
                          type="button" 
                          className="ml-2 text-primary-600 hover:text-primary-800"
                          title="Help"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                      <textarea
                        name="goal"
                        value={callFormData.goal}
                        onChange={handleInputChange}
                        placeholder="Describe what you want to accomplish"
                        rows={3}
                        className={`w-full px-4 py-3 border ${callFieldErrors.goal ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors`}
                      />
                      {callFieldErrors.goal && (
                        <p className="text-red-500 text-sm mt-1">{callFieldErrors.goal}</p>
                      )}
                    </div>
                    
                    {/* Important info */}
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <label className="text-lg font-medium text-gray-800">
                          What important information should we have ready?
                        </label>
                        <button 
                          type="button" 
                          className="ml-2 text-primary-600 hover:text-primary-800"
                          title="Help"
                        >
                          <Info size={18} />
                        </button>
                      </div>
                      <textarea
                        name="info"
                        value={callFormData.info}
                        onChange={handleInputChange}
                        placeholder="Enter account numbers, confirmation codes, or other relevant information"
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                      />
                    </div>
                    
                    {/* Call Button */}
                    <div className="flex justify-center mt-8">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-secondary-400 hover:bg-secondary-500 text-white font-semibold rounded-lg shadow-md transition-colors flex items-center"
                        disabled={isCallStarted}
                      >
                        <Phone className="mr-2" size={20} />
                        Start Call
                      </button>
                    </div>
                  </form>
                )}
              </div>
              
              {/* Call Transcription */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">Call Transcription</h3>
                  <div className="text-sm text-gray-500">
                    {callStatus === 'waiting' && 'Waiting for call to start...'}
                    {callStatus === 'connecting' && 'Connecting...'}
                    {callStatus === 'in-progress' && 'Call in progress'}
                    {callStatus === 'completed' && 'Call completed'}
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 min-h-[200px] border border-gray-200">
                  {!isCallStarted ? (
                    <div className="text-gray-500 text-center">
                      No active call. Transcription will appear here when a call is in progress.
                    </div>
                  ) : (
                    <div>
                      {callStatus === 'connecting' && (
                        <div className="flex items-center justify-center text-gray-600">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Connecting to {extractTargetInfo().target_name}...
                        </div>
                      )}
                      
                      {callStatus === 'in-progress' && (
                        <div className="space-y-4">
                          <div className="flex">
                            <div className="w-8 h-8 rounded-full bg-primary-100 flex-shrink-0 flex items-center justify-center mr-3">
                              <Phone size={16} className="text-primary-700" />
                            </div>
                            <div>
                              <div className="bg-primary-100 p-3 rounded-lg text-gray-800">
                                <p className="text-sm">Hello, thank you for calling. How can I help you today?</p>
                              </div>
                              <span className="text-xs text-gray-500 mt-1 block">Operator • Just now</span>
                            </div>
                          </div>
                          
                          <div className="flex justify-end">
                            <div>
                              <div className="bg-blue-100 p-3 rounded-lg text-gray-800">
                                <p className="text-sm">I'm calling about {callFormData.goal}.</p>
                              </div>
                              <span className="text-xs text-gray-500 mt-1 block">AI Assistant • Just now</span>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center ml-3">
                              <User size={16} className="text-blue-700" />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'profile' && (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h3>
                
                <div className="flex flex-col md:flex-row">
                  {/* Profile Image Section */}
                  <div className="md:w-1/3 flex flex-col items-center mb-6 md:mb-0">
                    <div className="relative">
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                      />
                      <button 
                        onClick={() => setIsEditingProfile(!isEditingProfile)} 
                        className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-md hover:bg-primary-700 transition-colors"
                      >
                        <Camera size={18} />
                      </button>
                    </div>
                    
                    {isEditingProfile && (
                      <div className="mt-4 w-full max-w-xs">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Profile Image URL
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={profileImageUrl}
                            onChange={(e) => setProfileImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                          />
                          <button
                            onClick={handleProfileImageChange}
                            className="bg-primary-600 text-white px-3 rounded-r-md hover:bg-primary-700"
                          >
                            <Check size={18} />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Enter a URL for your profile image</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Profile Details Section */}
                  <div className="md:w-2/3 md:pl-8">
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Full Name
                      </label>
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-medium text-gray-800">
                          {userData?.first_name} {userData?.last_name}
                        </p>
                        <button className="text-primary-600 hover:text-primary-800">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Email Address
                      </label>
                      <div className="flex items-center justify-between">
                        <p className="text-lg text-gray-800">
                          {userData?.email}
                        </p>
                        <button className="text-primary-600 hover:text-primary-800">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        Phone Number
                      </label>
                      <div className="flex items-center justify-between">
                        <p className="text-lg text-gray-800">
                          {formatPhoneNumber(userData?.phone_number || phone)}
                        </p>
                        <button className="text-primary-600 hover:text-primary-800">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-500 mb-1">
                        ZIP Code
                      </label>
                      <div className="flex items-center justify-between">
                        <p className="text-lg text-gray-800">
                          {userData?.zip_code || 'Not provided'}
                        </p>
                        <button className="text-primary-600 hover:text-primary-800">
                          <Edit2 size={16} />
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-500 mb-2">
                        Call Types Preferences
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {userData?.call_types_preferences && Array.isArray(userData.call_types_preferences) ? (
                          userData.call_types_preferences.map((type, index) => (
                            <span key={index} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                              {type}
                            </span>
                          ))
                        ) : (
                          <p className="text-gray-500">No preferences selected</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab !== 'make-call' && activeTab !== 'profile' && (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <h3 className="text-xl font-medium text-gray-800 mb-2">
                This section is coming soon!
              </h3>
              <p className="text-gray-600">
                We're working hard to bring you the {activeTab.replace('-', ' ')} feature.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Call Confirmation Modal */}
      {showConfirmationModal && (
        <CallConfirmationModal
          onClose={() => setShowConfirmationModal(false)}
          onConfirm={handleConfirmCall}
          callData={{
            ...extractTargetInfo(),
            goal: callFormData.goal,
            important_info: callFormData.info
          }}
          userData={userData}
        />
      )}
    </div>
  );
};

// Navigation Item Component
const NavItem: React.FC<{
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon: Icon, label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center px-4 py-3 hover:bg-primary-800 text-left ${
        isActive ? 'bg-primary-800 border-l-4 border-secondary-400' : 'text-white/70'
      }`}
    >
      <Icon size={20} className={`mr-3 ${isActive ? 'text-white' : 'text-white/70'}`} />
      <span className={`${isActive ? 'text-white font-medium' : 'text-white/70'}`}>{label}</span>
    </button>
  );
};

export default Dashboard;