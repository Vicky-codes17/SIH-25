import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import chatbotUtils from '../../utils/chatbotUtils';
import './ChatBot.css';

const ChatBot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [guestChatsUsed, setGuestChatsUsed] = useState(0);
  const [showPeek, setShowPeek] = useState(false);
  const [quickSuggestions, setQuickSuggestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const messagesEndRef = useRef(null);

  const FREE_CHAT_LIMIT = 3;

  // Enhanced authentication status check
  useEffect(() => {
    const checkAuthStatus = () => {
      // Check multiple authentication methods
      const authChecks = [
        localStorage.getItem('isAuthenticated') === 'true',
        localStorage.getItem('userToken') !== null && localStorage.getItem('userToken') !== '' && localStorage.getItem('userToken') !== 'null',
        localStorage.getItem('googleAuthData') !== null && localStorage.getItem('googleAuthData') !== '' && localStorage.getItem('googleAuthData') !== 'null',
        localStorage.getItem('githubAuthData') !== null && localStorage.getItem('githubAuthData') !== '' && localStorage.getItem('githubAuthData') !== 'null',
        localStorage.getItem('user_logged_in') === 'true',
        localStorage.getItem('userData') !== null && localStorage.getItem('userData') !== '' && localStorage.getItem('userData') !== 'null',
        localStorage.getItem('user_data') !== null && localStorage.getItem('user_data') !== '' && localStorage.getItem('user_data') !== 'null',
      ];
      
      const authStatus = authChecks.some(check => check === true);
      
      console.log('🔍 Auth Check Results:', {
        isAuthenticated: localStorage.getItem('isAuthenticated'),
        userToken: localStorage.getItem('userToken'),
        user_logged_in: localStorage.getItem('user_logged_in'),
        userData: localStorage.getItem('userData'),
        authStatus: authStatus,
        guestChatsUsed: guestChatsUsed
      });
      
      setIsLoggedIn(authStatus);
      
      if (authStatus) {
        // Try to get user data from various sources
        const userDataSources = [
          localStorage.getItem('userData'),
          localStorage.getItem('user_data'),
          localStorage.getItem('googleAuthData'),
          localStorage.getItem('githubAuthData')
        ];
        
        let foundUserData = null;
        for (const source of userDataSources) {
          if (source && source !== 'null' && source !== '') {
            try {
              foundUserData = JSON.parse(source);
              break;
            } catch (e) {
              continue;
            }
          }
        }
        
        if (foundUserData) {
          setUserData(foundUserData);
        } else {
          // Set default user data for authenticated users without stored data
          const defaultUserData = {
            name: 'Student User',
            email: 'student@futurenest.com',
            isAuthenticated: true,
            loginTime: new Date().toISOString()
          };
          setUserData(defaultUserData);
        }
        
        // Reset guest chats for authenticated users
        setGuestChatsUsed(0);
        localStorage.removeItem('guest_chats_used');
      } else {
        setUserData(null);
        // Load guest chats for non-authenticated users
        const storedGuestChats = localStorage.getItem('guest_chats_used');
        if (storedGuestChats) {
          setGuestChatsUsed(parseInt(storedGuestChats));
        }
      }
    };

    // Initial check
    checkAuthStatus();
    
    // Listen for authentication changes
    const handleStorageChange = () => {
      console.log('📦 Storage changed, rechecking auth...');
      checkAuthStatus();
    };
    
    const handleAuthStateChange = () => {
      console.log('🔄 Auth state changed, rechecking...');
      setTimeout(checkAuthStatus, 100); // Small delay to ensure localStorage is updated
    };
    
    // Add multiple event listeners to catch all authentication changes
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChanged', handleAuthStateChange);
    window.addEventListener('userLoggedIn', handleAuthStateChange);
    window.addEventListener('userSignedUp', handleAuthStateChange);
    window.addEventListener('loginSuccess', handleAuthStateChange);
    window.addEventListener('signupSuccess', handleAuthStateChange);
    
    // Periodic check every 3 seconds to ensure we catch authentication changes
    const authCheckInterval = setInterval(() => {
      checkAuthStatus();
    }, 3000);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChanged', handleAuthStateChange);
      window.removeEventListener('userLoggedIn', handleAuthStateChange);
      window.removeEventListener('userSignedUp', handleAuthStateChange);
      window.removeEventListener('loginSuccess', handleAuthStateChange);
      window.removeEventListener('signupSuccess', handleAuthStateChange);
      clearInterval(authCheckInterval);
    };
  }, []);

  // Initialize chatbot messages
  useEffect(() => {
    const storedMessages = localStorage.getItem('chatbot_messages');
    
    if (storedMessages && JSON.parse(storedMessages).length > 0) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Initialize with welcome message
      const welcomeMessage = isLoggedIn 
        ? `🎉 Welcome back${userData?.name ? `, ${userData.name.split(' ')[0]}` : ''}! You now have unlimited access to EduBuddy! I can help with college recommendations, career roadmaps, scholarships, and learning resources. What would you like to explore today?`
        : '👋 Hi! I\'m EduBuddy, your AI student advisor! I can help with college recommendations, career roadmaps, and learning resources. You have 3 free chats to try me out! How can I assist you?';
      
      const initialMessage = {
        id: Date.now(),
        type: 'bot',
        text: welcomeMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessages([initialMessage]);
      localStorage.setItem('chatbot_messages', JSON.stringify([initialMessage]));
    }

    // Show peek animation for non-authenticated users
    if (!isLoggedIn && !isOpen) {
      const peekTimer = setTimeout(() => {
        setShowPeek(true);
      }, 3000);
      return () => clearTimeout(peekTimer);
    }
  }, [isLoggedIn, userData]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot_messages', JSON.stringify(messages));
    }
  }, [messages]);

  // Save guest chats count (only for non-authenticated users)
  useEffect(() => {
    if (!isLoggedIn && guestChatsUsed >= 0) {
      localStorage.setItem('guest_chats_used', guestChatsUsed.toString());
      console.log('💾 Saved guest chats:', guestChatsUsed);
    }
  }, [guestChatsUsed, isLoggedIn]);

  // Initialize quick suggestions
  useEffect(() => {
    setQuickSuggestions(chatbotUtils.getQuickSuggestions());
  }, []);

  const addMessage = (type, text) => {
    const newMessage = {
      id: Date.now(),
      type,
      text,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const generateBotResponse = (userInput) => {
    const intent = chatbotUtils.detectIntent(userInput);
    
    let response;
    if (isLoggedIn && userData) {
      // Get personalized response for logged-in users
      response = chatbotUtils.getPersonalizedResponse(intent, userInput, userData);
      response = chatbotUtils.addPersonalTouch(response, userData);
    } else {
      // Get standard response for guest users
      response = chatbotUtils.generateResponse(intent, userInput);
    }
    
    // Update quick suggestions based on the conversation
    setQuickSuggestions(chatbotUtils.getQuickSuggestions(userInput));
    
    return response;
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    
    console.log('📤 Sending message, current state:', {
      isLoggedIn,
      guestChatsUsed,
      FREE_CHAT_LIMIT,
      canSend: isLoggedIn || guestChatsUsed < FREE_CHAT_LIMIT
    });
    
    // Check guest chat limit ONLY for non-authenticated users
    if (!isLoggedIn && guestChatsUsed >= FREE_CHAT_LIMIT) {
      console.log('🚫 Chat limit reached, showing upgrade prompt');
      const limitMessage = '🔒 You\'ve used all 3 free chats! Ready for unlimited conversations and personalized recommendations? \n\n✨ Sign up or login to unlock:\n• 🚀 Unlimited AI conversations\n• 🎯 Personalized study recommendations\n• 📈 Progress tracking\n• 📚 Premium resources access\n\nJoin thousands of students already using FutureNest!';
      addMessage('bot', limitMessage);
      setInputText('');
      return;
    }
    
    // Add user message first
    addMessage('user', inputText);
    const userQuery = inputText;
    setInputText('');
    
    // Increment guest chats ONLY for non-authenticated users AFTER they send a message
    if (!isLoggedIn) {
      const newGuestChats = guestChatsUsed + 1;
      setGuestChatsUsed(newGuestChats);
      console.log('🔢 Guest chats updated:', newGuestChats);
      
      // Show warning at 2nd chat (after they use their 2nd chat)
      if (newGuestChats === 2) {
        setTimeout(() => {
          const warningMessage = '⚠️ You have 1 free chat remaining! Sign up or login for unlimited access to all features and personalized recommendations.';
          addMessage('bot', warningMessage);
        }, 2000);
      }
    }
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate realistic bot thinking time
    const thinkingTime = 1200 + Math.random() * 1800; // 1.2-3 seconds
    setTimeout(() => {
      setIsTyping(false);
      const response = generateBotResponse(userQuery);
      addMessage('bot', response);
    }, thinkingTime);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    // Check if guest user has reached limit before allowing suggestion click
    if (!isLoggedIn && guestChatsUsed >= FREE_CHAT_LIMIT) {
      const limitMessage = '🔒 You\'ve used all 3 free chats! Please sign up or login for unlimited access.';
      addMessage('bot', limitMessage);
      return;
    }
    setInputText(suggestion);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowPeek(false);
  };

  const clearChat = () => {
    const welcomeMessage = isLoggedIn 
      ? `👋 Chat cleared! Hi${userData?.name ? ` ${userData.name.split(' ')[0]}` : ''}! How can I help you today with unlimited access?`
      : '👋 Chat cleared! I\'m EduBuddy, your AI advisor. You have 3 free chats to try me out! How can I help you today?';
    
    const newMessage = {
      id: Date.now(),
      type: 'bot',
      text: welcomeMessage,
      timestamp: new Date().toISOString()
    };
    
    setMessages([newMessage]);
    
    // Reset guest chats only for non-authenticated users
    if (!isLoggedIn) {
      setGuestChatsUsed(0);
      localStorage.setItem('guest_chats_used', '0');
    }
    
    setQuickSuggestions(chatbotUtils.getQuickSuggestions());
  };

  const handleLogin = () => {
    navigate('/login');
    setIsOpen(false);
  };

  const handleSignup = () => {
    navigate('/signup');
    setIsOpen(false);
  };

  // Hide chatbot on roadmaps page
  if (location.pathname === '/roadmaps') {
    return null;
  }

  const remainingChats = Math.max(0, FREE_CHAT_LIMIT - guestChatsUsed);

  return (
    <>
      {/* Mascot Button */}
      <div className={`chatbot-mascot ${showPeek ? 'peek' : ''} ${isOpen ? 'hidden' : ''}`}>
        <button 
          className="mascot-btn"
          onClick={toggleChat}
          aria-label="Open EduBuddy Chat"
        >
          <div className="mascot-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div className="pulse-ring"></div>
        </button>
      </div>

      {/* Chat Panel */}
      {isOpen && (
        <div className="chatbot-panel">
          {/* Header */}
          <div className="chat-header">
            <div className="bot-info">
              <div>
                <div className="bot-name">EduBuddy</div>
                <div className="bot-status">
                  {isTyping ? 'Typing...' : isLoggedIn ? '✨ Unlimited Access' : `${remainingChats} free chats left`}
                </div>
              </div>
            </div>
            <div className="header-actions">
              <button 
                className="action-btn"
                onClick={clearChat}
                title="Clear Chat"
              >
                Clear
              </button>
              <button 
                className="action-btn close-btn"
                onClick={toggleChat}
                title="Close Chat"
              >
                ×
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div key={message.id} className={`message ${message.type}`}>
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message bot">
                <div className="message-content typing">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {quickSuggestions.length > 0 && (
            <div className="quick-suggestions">
              {quickSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="suggestion-chip"
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={!isLoggedIn && guestChatsUsed >= FREE_CHAT_LIMIT}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div className="chat-input">
            {!isLoggedIn && guestChatsUsed >= FREE_CHAT_LIMIT ? (
              <div className="upgrade-prompt">
                <p>🔒 Free chats used up! Sign up for unlimited access & personalized recommendations.</p>
                <div className="auth-buttons">
                  <button className="auth-btn login" onClick={handleLogin}>Login</button>
                  <button className="auth-btn signup" onClick={handleSignup}>Sign Up</button>
                </div>
              </div>
            ) : (
              <div className="input-row">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isLoggedIn 
                      ? `Hi${userData?.name?.split(' ')[0] ? ` ${userData.name.split(' ')[0]}` : ''}! Ask me about education, careers, colleges...` 
                      : `Ask about colleges, courses, careers... (${remainingChats} free chats left)`
                  }
                  className="chat-input-field"
                  disabled={!isLoggedIn && guestChatsUsed >= FREE_CHAT_LIMIT}
                />
                <button
                  onClick={handleSend}
                  className="send-btn"
                  disabled={!inputText.trim() || (!isLoggedIn && guestChatsUsed >= FREE_CHAT_LIMIT)}
                >
                  Send
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;