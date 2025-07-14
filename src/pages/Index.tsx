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
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-black mb-2">Self Chat</h1>
            <p className="text-gray-600">Чат с самим собой</p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Войти</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Пароль</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button 
                    onClick={() => setIsAuthenticated(true)} 
                    className="w-full bg-black hover:bg-gray-800"
                  >
                    Войти
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="register">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center">Регистрация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Пароль</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Повторите пароль</label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <Button 
                    onClick={() => setIsAuthenticated(true)} 
                    className="w-full bg-black hover:bg-gray-800"
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
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto animate-fade-in">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center animate-bounce-in">
            <Icon name="User" size={20} />
          </div>
          <div>
            <h1 className="font-semibold text-gray-900">Self Chat</h1>
            <p className="text-sm text-gray-500">online</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsAuthenticated(false)}
          className="hover:bg-gray-100 transition-colors"
        >
          <Icon name="LogOut" size={16} />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} animate-slide-up`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${
              message.isOwn 
                ? 'bg-black text-white' 
                : 'bg-white text-black border border-gray-200'
            }`}>
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${
                message.isOwn ? 'text-gray-300' : 'text-gray-500'
              }`}>
                {message.timestamp}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Напишите сообщение..."
            className="flex-1 border-gray-300 focus:border-black transition-colors"
          />
          <Button 
            onClick={handleSendMessage}
            size="sm"
            className="bg-black hover:bg-gray-800 transition-colors min-w-[44px] h-10"
          >
            <Icon name="Send" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Index;