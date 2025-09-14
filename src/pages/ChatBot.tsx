import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Shield, AlertCircle, FileText } from "lucide-react";
import { Link } from "react-router-dom";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to provide anonymous mental health support. Everything you share is completely confidential and secured by blockchain technology. How are you feeling today?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const predefinedResponses = [
    {
      keywords: ["stress", "stressed", "overwhelming", "pressure"],
      response: "It sounds like you're dealing with stress. This is very common among students. Stress can feel overwhelming, but there are effective ways to manage it. Would you like me to share some stress management techniques or direct you to our screening assessment?"
    },
    {
      keywords: ["anxious", "anxiety", "worried", "panic"],
      response: "Anxiety can be really challenging. You're not alone in feeling this way. Many students experience anxiety, especially during academic periods. I can help you with some immediate coping strategies or guide you to take our GAD-7 assessment to better understand your anxiety levels."
    },
    {
      keywords: ["sad", "depressed", "down", "hopeless"],
      response: "Thank you for sharing that with me. Feeling sad or down is something many people experience, and it takes courage to talk about it. These feelings are valid and there is help available. Would you be interested in taking our PHQ-9 screening to better understand how you're feeling?"
    },
    {
      keywords: ["test", "quiz", "assessment", "screening"],
      response: "Great! Taking a mental health screening can help you better understand your current state of mind. We offer validated assessments like PHQ-9 for depression and GAD-7 for anxiety. These are completely anonymous and the results are just for your understanding."
    },
    {
      keywords: ["help", "support", "counselor", "therapist"],
      response: "I'm glad you're seeking support. That's a positive step! We can connect you with trained counselors through our confidential booking system. All appointments are secured using blockchain technology to ensure complete privacy."
    },
    {
      keywords: ["resources", "materials", "learn"],
      response: "We have a comprehensive resource library with materials in multiple languages. You can find self-help guides, coping strategies, meditation resources, and educational content about mental health. All resources are stored securely on IPFS."
    }
  ];

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const response of predefinedResponses) {
      if (response.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return response.response;
      }
    }
    
    // Default responses
    const defaultResponses = [
      "Thank you for sharing that with me. Can you tell me a bit more about what you're experiencing?",
      "I'm here to listen and support you. What would be most helpful for you right now - talking more, taking a screening assessment, or looking at some resources?",
      "That sounds difficult to deal with. Remember that seeking help is a sign of strength, not weakness. How can I best support you today?",
      "I appreciate you opening up. Everyone's experience is unique and valid. Would you like to explore some coping strategies or connect with additional resources?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        sender: "bot",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Anonymous AI Support</h1>
        <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <Shield className="h-4 w-4 text-primary" />
            <span>100% Anonymous</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-wellness" />
            <span>Blockchain Secured</span>
          </div>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col border-border shadow-card">
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[80%] ${
                    message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-wellness text-wellness-foreground"
                  }`}>
                    {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                  </div>
                  
                  <div
                    className={`rounded-lg p-4 ${
                      message.sender === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    <span className="text-xs opacity-70 mt-2 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3 max-w-[80%]">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-wellness text-wellness-foreground flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-muted rounded-lg p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-border p-6">
            <div className="flex items-center space-x-4">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isTyping}
                size="icon"
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border hover:shadow-card transition-all">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-accent mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Take Screening</h3>
            <p className="text-sm text-muted-foreground mb-4">
              PHQ-9 & GAD-7 assessments
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/quiz">Start Assessment</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-card transition-all">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-wellness mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Browse Resources</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Self-help guides & materials
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/resources">View Resources</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-border hover:shadow-card transition-all">
          <CardContent className="p-6 text-center">
            <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">Book Session</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Private counselor consultation
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/booking">Schedule Now</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 text-center">
        <Badge variant="outline" className="text-xs">
          <Shield className="h-3 w-3 mr-1" />
          All conversations are encrypted and stored on Aptos blockchain
        </Badge>
      </div>
    </div>
  );
};

export default ChatBot;