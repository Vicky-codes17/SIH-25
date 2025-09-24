import chatbotResponses from '../data/chatbotResponses.json';
import quickSuggestions from '../data/quickSuggestions.json';

// Chatbot utility functions
export const chatbotUtils = {
  // Enhanced intent detection with more keywords
  detectIntent: (userInput) => {
    const input = userInput.toLowerCase();
    
    const intents = {
      greeting: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'greetings', 'namaste'],
      courses: ['course', 'courses', 'program', 'programs', 'study', 'learn', 'learning', 'training', 'skill', 'skills', 'certification', 'class', 'classes'],
      colleges: ['college', 'colleges', 'university', 'universities', 'institution', 'institutions', 'campus', 'admission', 'admissions', 'degree', 'undergraduate', 'postgraduate'],
      scholarships: ['scholarship', 'scholarships', 'funding', 'financial aid', 'grant', 'grants', 'money', 'fee', 'fees', 'cost', 'affordable', 'cheap', 'budget'],
      career: ['career', 'careers', 'job', 'jobs', 'work', 'profession', 'professional', 'employment', 'future', 'salary', 'growth', 'opportunity', 'opportunities'],
      roadmaps: ['roadmap', 'roadmaps', 'path', 'paths', 'plan', 'plans', 'steps', 'guide', 'guidance', 'direction', 'journey', 'progress', 'timeline'],
      exams: ['exam', 'exams', 'test', 'tests', 'competition', 'competitive', 'entrance', 'preparation', 'prepare', 'score', 'rank', 'qualify', 'jee', 'neet', 'cat', 'upsc'],
      ebooks: ['ebook', 'ebooks', 'book', 'books', 'pdf', 'material', 'materials', 'resource', 'resources', 'reading', 'textbook', 'textbooks'],
      help: ['help', 'assist', 'assistance', 'support', 'what can you do', 'how can you help', 'capabilities', 'features', 'options', 'menu'],
      thanks: ['thank', 'thanks', 'thank you', 'thankyou', 'appreciate', 'grateful'],
      goodbye: ['bye', 'goodbye', 'see you', 'farewell', 'exit', 'quit', 'close', 'end']
    };
    
    // Check for exact matches first, then partial matches
    for (const [intent, keywords] of Object.entries(intents)) {
      if (keywords.some(keyword => input.includes(keyword))) {
        return intent;
      }
    }
    
    return 'default';
  },

  // Generate contextual responses from JSON data
  generateResponse: (intent, userInput) => {
    const responses = chatbotResponses[intent] || chatbotResponses.default;
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  },

  // Get relevant quick suggestions based on context
  getQuickSuggestions: (lastUserInput = '') => {
    const intent = chatbotUtils.detectIntent(lastUserInput);
    
    if (quickSuggestions[intent]) {
      return quickSuggestions[intent];
    }
    
    return quickSuggestions.initial;
  },

  // Get personalized response for logged in users
  getPersonalizedResponse: (intent, userInput, userData) => {
    const baseResponse = chatbotUtils.generateResponse(intent, userInput);
    
    if (!userData) return baseResponse;
    
    const personalizedAdditions = {
      courses: `\n\n💡 Based on your ${userData.course} background, I can suggest specialized advanced courses that align with your current studies!`,
      career: `\n\n🎯 Given your interest in ${userData.course}, here are some career paths that ${userData.college} graduates often pursue successfully!`,
      colleges: `\n\n📍 I notice you're at ${userData.college}! I can help you explore transfer options or postgraduate programs that complement your current studies.`,
      scholarships: `\n\n⭐ With your ${userData.semester} progress in ${userData.course}, you might be eligible for merit-based scholarships and research grants!`
    };
    
    if (personalizedAdditions[intent]) {
      return baseResponse + personalizedAdditions[intent];
    }
    
    return baseResponse;
  },

  // Format response with user's name for logged in users
  addPersonalTouch: (response, userData) => {
    if (!userData || !userData.name) return response;
    
    const firstName = userData.name.split(' ')[0];
    const personalGreetings = [
      `Hey ${firstName}! `,
      `${firstName}, `,
      `Great question, ${firstName}! `,
      `Hi ${firstName}! `
    ];
    
    // Add personal touch to some responses
    if (Math.random() > 0.7) {
      const greeting = personalGreetings[Math.floor(Math.random() * personalGreetings.length)];
      return greeting + response;
    }
    
    return response;
  }
};

export default chatbotUtils;