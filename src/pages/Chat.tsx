/**
 * Chat/Companion page - AI companion with streaming-style responses
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLumenStore } from '@/lib/store';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import { staggerContainer, slideUp } from '@/styles/animation';
import { quickSuggestions } from '@/data/seed';

const Chat: React.FC = () => {
  const { messages, addMessage } = useLumenStore();
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    addMessage({ role: 'user', content: inputValue });
    setInputValue('');

    // Simulate agent response
    setTimeout(() => {
      addMessage({
        role: 'agent',
        content: `I understand you're thinking about: "${inputValue}". Let me help you explore this further...`,
        provenance: 'Reason: user query analysis',
      });
    }, 1000);
  };

  const handleSuggestion = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <h1 className="heading-handwritten mb-6">Your Companion</h1>

        {/* Messages */}
        <Card className="flex-1 overflow-y-auto scrollbar-custom mb-4" noPadding>
          <motion.div
            className="p-6 space-y-4"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <AnimatePresence mode="popLayout">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  variants={slideUp}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-4 rounded-xl ${
                      msg.role === 'user'
                        ? 'bg-accent-teal text-white'
                        : 'bg-white/80 dark:bg-white-soft/5 border border-accent-teal/20'
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    {msg.provenance && (
                      <Badge variant="info" className="mt-2">
                        {msg.provenance}
                      </Badge>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </motion.div>
        </Card>

        {/* Quick suggestions */}
        {messages.length === 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {quickSuggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                size="sm"
                onClick={() => handleSuggestion(suggestion)}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 rounded-xl card-paper focus:outline-none focus:ring-2 focus:ring-accent-teal"
            aria-label="Chat message input"
          />
          <Button onClick={handleSend} disabled={!inputValue.trim()}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
