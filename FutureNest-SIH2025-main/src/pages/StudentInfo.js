import React, { useState } from 'react';
import { BookOpen, MapPin, Target, ChevronDown, CheckCircle, Asterisk, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ChatBot from '../components/chatbot/ChatBot';


// Location Data: States and Major Cities in India
const locationData = {
  "Andaman and Nicobar Islands": ["Port Blair"],
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati"],
  "Arunachal Pradesh": ["Itanagar", "Tawang"],
  "Assam": ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
  "Chandigarh": ["Chandigarh"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Silvassa"],
  "Delhi": ["New Delhi", "Delhi"],
  "Goa": ["Panaji", "Margao", "Vasco da Gama"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Haryana": ["Faridabad", "Gurugram", "Panipat", "Ambala"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala"],
  "Jammu and Kashmir": ["Srinagar", "Jammu", "Anantnag", "Baramulla", "Udhampur"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad"],
  "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"],
  "Ladakh": ["Leh", "Kargil"],
  "Lakshadweep": ["Kavaratti"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane"],
  "Manipur": ["Imphal"],
  "Meghalaya": ["Shillong"],
  "Mizoram": ["Aizawl"],
  "Nagaland": ["Kohima", "Dimapur"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Rourkela"],
  "Puducherry": ["Puducherry"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Sikkim": ["Gangtok"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad"],
  "Tripura": ["Agartala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital"],
  "West Bengal": ["Kolkata", "Asansol", "Siliguri", "Durgapur"]
};

// Course Data: Fields of Study and their corresponding courses
const courseData = {
  "Science": [
    "B.Sc. (Bachelor of Science)",
    "B.Sc. in Physics",
    "B.Sc. in Chemistry",
    "B.Sc. in Mathematics",
    "B.Sc. in Biology",
    "B.Sc. in Computer Science",
    "B.Sc. in Biotechnology",
    "BCA (Bachelor of Computer Applications)"
  ],
  "Commerce": [
    "B.Com (Bachelor of Commerce)",
    "B.Com (Honours)",
    "BBA (Bachelor of Business Administration)",
    "BMS (Bachelor of Management Studies)",
    "CA (Chartered Accountancy)",
    "CS (Company Secretary)"
  ],
  "Arts & Humanities": [
    "B.A. (Bachelor of Arts)",
    "B.A. in English",
    "B.A. in History",
    "B.A. in Political Science",
    "B.A. in Sociology",
    "B.A. in Psychology",
    "B.A. in Economics",
    "BFA (Bachelor of Fine Arts)",
    "Journalism and Mass Communication"
  ],
  "Engineering & Technology": [
    "B.Tech (Bachelor of Technology)",
    "B.E. (Bachelor of Engineering)",
    "Computer Science Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Electronics and Communication Engineering",
    "B.Arch (Bachelor of Architecture)"
  ],
  "Medical & Health Sciences": [
    "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
    "BDS (Bachelor of Dental Surgery)",
    "BAMS (Bachelor of Ayurvedic Medicine and Surgery)",
    "BHMS (Bachelor of Homeopathic Medicine and Surgery)",
    "B.Pharm (Bachelor of Pharmacy)",
    "B.Sc. in Nursing",
    "BPT (Bachelor of Physiotherapy)"
  ]
};

// --- MOCK USER DATA ---
// In a real app, this `userData` object will be passed as a prop.
const MOCK_USER_DATA_12th = {
    name: 'Priya Sharma',
    educationalStage: 'Completed 12th',
    stream: 'Science - Non-Medical',
};

// --- Framer Motion Variants ---
const formContainerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};


const SectionHeader = ({ icon, title }) => (
    <motion.div variants={itemVariants} className="flex items-center gap-3 mb-4 mt-8 border-b border-slate-200 pb-3">
        {icon}
        <h2 className="text-xl font-bold text-slate-700">{title}</h2>
    </motion.div>
);

const ThemedInput = ({ name, placeholder, type = 'text', value, onChange }) => (
    <motion.div variants={itemVariants} className="relative w-full">
        <input
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
    </motion.div>
);

const ThemedSelect = ({ name, children, value, onChange }) => (
    <motion.div variants={itemVariants} className="relative w-full">
        <select
            name={name}
            value={value}
            onChange={onChange}
            className="w-full appearance-none px-4 py-3 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
            {children}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
    </motion.div>
);


export default function StudentInfo() {
    const navigate = useNavigate();
    const { currentUser, userProfile, updateUserProfile } = useAuth();
    
    const [formData, setFormData] = useState({
        board10th: '',
        year10th: '',
        percentage10th: '',
        board12th: '',
        year12th: '',
        percentage12th: '',
        stream12th: '',
        state: 'Jammu and Kashmir',
        city: '',
        preferredField: '',
        interestedCourses: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Clear specific field errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
        
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            
            // Validate percentage inputs (0-100 range)
            if (name === 'percentage10th' || name === 'percentage12th') {
                const numValue = parseFloat(value);
                if (value && (numValue > 100 || numValue < 0)) {
                    setErrors(prev => ({ 
                        ...prev, 
                        [name]: 'Percentage must be between 0 and 100' 
                    }));
                    return prev; // Don't update if invalid
                }
            }
            
            // Reset city when state changes
            if (name === 'state') {
                newData.city = '';
            }
            
            // Reset interested courses when preferred field changes
            if (name === 'preferredField') {
                newData.interestedCourses = '';
            }
            
            return newData;
        });
    };

    const validateForm = () => {
        const newErrors = {};

        // Check if at least one education level is filled
        const has10thData = formData.board10th || formData.year10th || formData.percentage10th;
        const has12thData = formData.board12th || formData.year12th || formData.percentage12th;

        if (!has10thData && !has12thData) {
            newErrors.general = 'Please fill at least one education level (10th or 12th)';
        }

        // If 10th data is partially filled, require all 10th fields
        if (has10thData) {
            if (!formData.board10th) newErrors.board10th = 'Board is required';
            if (!formData.year10th) newErrors.year10th = 'Year is required';
            if (!formData.percentage10th) newErrors.percentage10th = 'Percentage is required';
        }

        // If 12th data is partially filled, require all 12th fields
        if (has12thData) {
            if (!formData.board12th) newErrors.board12th = 'Board is required';
            if (!formData.year12th) newErrors.year12th = 'Year is required';
            if (!formData.percentage12th) newErrors.percentage12th = 'Percentage is required';
        }

        // Validate percentages are in range
        if (formData.percentage10th && (formData.percentage10th < 0 || formData.percentage10th > 100)) {
            newErrors.percentage10th = 'Percentage must be between 0 and 100';
        }
        if (formData.percentage12th && (formData.percentage12th < 0 || formData.percentage12th > 100)) {
            newErrors.percentage12th = 'Percentage must be between 0 and 100';
        }

        // Validate required fields
        if (!formData.state) newErrors.state = 'State is required';
        if (!formData.city) newErrors.city = 'City is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        
        try {
            // Save to Firebase instead of localStorage
            await updateUserProfile({
                ...formData,
                profileCompleted: true,
                studentInfoCompleted: true,
                completedAt: new Date().toISOString()
            });

            console.log("Profile Data Saved Successfully");
            
            // Navigate to quiz route (which will redirect to your HTML quiz)
            navigate('/quiz', { replace: true });
            
        } catch (error) {
            console.error('Error saving student info:', error);
            setErrors({ general: 'Failed to save profile. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-white flex items-center justify-center p-4 font-sans">
            {/* Loading Overlay */}
            {loading && (
                <div className="fixed inset-0 z-[100] bg-white bg-opacity-95 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-4">
                            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mr-3" />
                            <div className="text-2xl font-bold text-indigo-600">CareerPath</div>
                        </div>
                        <p className="text-slate-600 text-lg font-medium">Saving your profile...</p>
                        <div className="mt-4 w-64 bg-slate-200 rounded-full h-2 mx-auto">
                            <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{width: '80%'}}></div>
                        </div>
                    </div>
                </div>
            )}

            <motion.div
                className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 space-y-6"
                variants={formContainerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="text-center">
                    <h1 className="text-3xl font-extrabold text-slate-800">
                        {/* Welcome, {userData.name}! */}
                        Welcome, Learner!
                    </h1>
                    <p className="text-slate-500 mt-2">
                        Complete your profile to unlock personalized recommendations.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit}>
                    {/* General Error Message */}
                    {errors.general && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                            <p className="text-red-700 text-sm">{errors.general}</p>
                        </div>
                    )}

                    <SectionHeader icon={<BookOpen className="text-indigo-600" />} title="Your Academic Foundation" />
                    
                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-3 font-semibold text-slate-600 flex items-center">
                            10th Standard Details
                            <span className="text-xs text-slate-500 ml-2">(Fill at least one education level)</span>
                        </div>
                        
                        <div className="space-y-1">
                            <div className="flex items-center">
                                <label className="text-sm font-medium text-slate-600">Board</label>
                                {formData.board10th && <Asterisk className="w-3 h-3 text-red-500 ml-1" />}
                            </div>
                            <ThemedSelect name="board10th" value={formData.board10th} onChange={handleChange}>
                                <option value="">Select Board</option>
                                <option value="JKBOSE">JKBOSE</option>
                                <option value="CBSE">CBSE</option>
                                <option value="ICSE">ICSE</option>
                                <option value="Other">Other</option>
                            </ThemedSelect>
                            {errors.board10th && <p className="text-red-500 text-xs mt-1">{errors.board10th}</p>}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center">
                                <label className="text-sm font-medium text-slate-600">Year</label>
                                {formData.year10th && <Asterisk className="w-3 h-3 text-red-500 ml-1" />}
                            </div>
                            <ThemedSelect name="year10th" value={formData.year10th} onChange={handleChange}>
                                <option value="">Year of Passing</option>
                                {Array.from({ length: 9 }, (_, i) => 2025 - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </ThemedSelect>
                            {errors.year10th && <p className="text-red-500 text-xs mt-1">{errors.year10th}</p>}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center">
                                <label className="text-sm font-medium text-slate-600">Percentage</label>
                                {formData.percentage10th && <Asterisk className="w-3 h-3 text-red-500 ml-1" />}
                            </div>
                            <ThemedInput 
                                name="percentage10th" 
                                placeholder="Percentage (0-100)" 
                                type="number" 
                                min="0" 
                                max="100" 
                                step="0.01"
                                value={formData.percentage10th} 
                                onChange={handleChange} 
                            />
                            {errors.percentage10th && <p className="text-red-500 text-xs mt-1">{errors.percentage10th}</p>}
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="md:col-span-3 font-semibold text-slate-600 flex items-center">
                            12th Standard Details
                            <span className="text-xs text-slate-500 ml-2">(Optional if 10th is filled)</span>
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center">
                                <label className="text-sm font-medium text-slate-600">Board</label>
                                {formData.board12th && <Asterisk className="w-3 h-3 text-red-500 ml-1" />}
                            </div>
                            <ThemedSelect name="board12th" value={formData.board12th} onChange={handleChange}>
                                <option value="">Select Board</option>
                                <option value="JKBOSE">JKBOSE</option>
                                <option value="CBSE">CBSE</option>
                                <option value="ICSE">ICSE</option>
                                <option value="Other">Other</option>
                            </ThemedSelect>
                            {errors.board12th && <p className="text-red-500 text-xs mt-1">{errors.board12th}</p>}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center">
                                <label className="text-sm font-medium text-slate-600">Year</label>
                                {formData.year12th && <Asterisk className="w-3 h-3 text-red-500 ml-1" />}
                            </div>
                            <ThemedSelect name="year12th" value={formData.year12th} onChange={handleChange}>
                                <option value="">Year of Passing</option>
                                {Array.from({ length: 7 }, (_, i) => 2025 - i).map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </ThemedSelect>
                            {errors.year12th && <p className="text-red-500 text-xs mt-1">{errors.year12th}</p>}
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center">
                                <label className="text-sm font-medium text-slate-600">Percentage</label>
                                {formData.percentage12th && <Asterisk className="w-3 h-3 text-red-500 ml-1" />}
                            </div>
                            <ThemedInput 
                                name="percentage12th" 
                                placeholder="Percentage (0-100)" 
                                type="number" 
                                min="0" 
                                max="100" 
                                step="0.01"
                                value={formData.percentage12th} 
                                onChange={handleChange} 
                            />
                            {errors.percentage12th && <p className="text-red-500 text-xs mt-1">{errors.percentage12th}</p>}
                        </div>

                        <div className="md:col-span-3 space-y-1">
                            <label className="text-sm font-medium text-slate-600">Stream</label>
                            <ThemedSelect name="stream12th" value={formData.stream12th} onChange={handleChange}>
                                <option value="">Select Stream</option>
                                <option value="Science Stream">Science Stream</option>
                                <option value="Commerce Stream">Commerce Stream</option>
                                <option value="Arts/Humanities Stream">Arts/Humanities Stream</option>
                            </ThemedSelect>
                        </div>
                    </motion.div>                     <SectionHeader icon={<MapPin className="text-indigo-600" />} title="Your Location" />
                     <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <ThemedSelect name="state" value={formData.state} onChange={handleChange}>
                             <option value="">Select State</option>
                             {Object.keys(locationData).map(state => (
                                 <option key={state} value={state}>{state}</option>
                             ))}
                         </ThemedSelect>
                         <ThemedSelect name="city" value={formData.city} onChange={handleChange}>
                             <option value="">Select City</option>
                             {formData.state && locationData[formData.state] && locationData[formData.state].map(city => (
                                 <option key={city} value={city}>{city}</option>
                             ))}
                         </ThemedSelect>
                     </motion.div>

                     <SectionHeader icon={<Target className="text-indigo-600" />} title="Your Future Ambitions" />
                     <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ThemedSelect name="preferredField" value={formData.preferredField} onChange={handleChange}>
                            <option value="">Preferred Field of Study</option>
                            {Object.keys(courseData).map(field => (
                                <option key={field} value={field}>{field}</option>
                            ))}
                        </ThemedSelect>
                        <ThemedSelect name="interestedCourses" value={formData.interestedCourses} onChange={handleChange}>
                            <option value="">Select Interested Course</option>
                            {formData.preferredField && courseData[formData.preferredField] && courseData[formData.preferredField].map(course => (
                                <option key={course} value={course}>{course}</option>
                            ))}
                        </ThemedSelect>
                     </motion.div>

                    <motion.div variants={itemVariants} className="mt-8">
                         <button type="submit" className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold px-6 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                             <CheckCircle />
                             Save
                         </button>
                    </motion.div>
                </form>
            </motion.div>
            <ChatBot />
        </div>
    );
}