import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<Array<{id: number, text: string, isOwn: boolean, timestamp: string}>>([
    {id: 1, text: "Привет! Как дела?", isOwn: true, timestamp: "14:30"},
    {id: 2, text: "Привет! Всё отлично, спасибо. А у тебя как?", isOwn: false, timestamp: "14:31"},
    {id: 3, text: "Тоже хорошо! Что планируешь на выходные?", isOwn: true, timestamp: "14:32"},
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const now = new Date();
      const timestamp = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
      
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: newMessage,
        isOwn: true,
        timestamp
      }]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">Self Chat</h1>
            <p className="text-gray-600 text-lg">Чат с самим собой</p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 h-12">
              <TabsTrigger value="login" className="text-base">Вход</TabsTrigger>
              <TabsTrigger value="register" className="text-base">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center text-xl">Войти</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Пароль</label>
                    <Input type="password" placeholder="••••••••" className="h-12 text-base" />
                  </div>
                  <Button 
                    onClick={() => setIsAuthenticated(true)} 
                    className="w-full bg-black hover:bg-gray-800 h-12 text-base"
                  >
                    Войти
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card className="shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center text-xl">Регистрация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Пароль</label>
                    <Input type="password" placeholder="••••••••" className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Повторите пароль</label>
                    <Input type="password" placeholder="••••••••" className="h-12 text-base" />
                  </div>
                  <Button 
                    onClick={() => setIsAuthenticated(true)} 
                    className="w-full bg-black hover:bg-gray-800 h-12 text-base"
                  >
                    Зарегистрироваться
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-md lg:max-w-2xl xl:max-w-4xl flex flex-col animate-fade-in">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4 lg:p-6 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gray-200 rounded-full flex items-center justify-center animate-bounce-in">
              <Icon name="User" size={20} />
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-lg lg:text-xl">Self Chat</h1>
              <p className="text-sm lg:text-base text-gray-500">online</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsAuthenticated(false)}
            className="hover:bg-gray-100 transition-colors lg:h-10 lg:w-10"
          >
            <Icon name="LogOut" size={16} />
          </Button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-4 lg:space-y-6 smooth-scroll">
          {messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl px-4 py-3 lg:px-6 lg:py-4 rounded-2xl shadow-sm transition-all duration-200 desktop-hover mobile-tap-highlight ${
                message.isOwn 
                  ? 'bg-black text-white' 
                  : 'bg-white text-black border border-gray-200'
              }`}>
                <p className="text-sm lg:text-base leading-relaxed">{message.text}</p>
                <p className={`text-xs lg:text-sm mt-2 ${
                  message.isOwn ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4 lg:p-6 shadow-lg mobile-safe-area">
          <div className="flex items-center gap-2 lg:gap-4 max-w-full">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Напишите сообщение..."
              className="flex-1 border-gray-300 focus:border-black transition-colors h-10 lg:h-12 text-base mobile-optimized"
            />
            <Button 
              onClick={handleSendMessage}
              size="sm"
              className="bg-black hover:bg-gray-800 transition-colors min-w-[44px] h-10 lg:h-12 lg:min-w-[52px] mobile-optimized"
            >
              <Icon name="Send" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;