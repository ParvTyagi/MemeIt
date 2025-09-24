import { MessageCircle, Sparkles, Clock, Archive } from 'lucide-react';

export default function PlaceHolderGrid() {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="text-center max-w-md">
        {/* Animated Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <MessageCircle className="w-12 h-12 text-primary-content" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-warning rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-warning-content" />
          </div>
        </div>

        {/* Main Message */}
        <h2 className="text-2xl font-bold text-base-content mb-3">
          Select a chat to get started
        </h2>
        <p className="text-base-content/70 mb-8 leading-relaxed">
          Choose a conversation from the sidebar to continue chatting, or start a new conversation to begin.
        </p>

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
            <Clock className="w-4 h-4" />
            <span>Recent conversations appear in the sidebar</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-sm text-gray-500 bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200/50">
            <Archive className="w-4 h-4" />
            <span>Archived chats are stored safely</span>
          </div>
        </div>

        {/* Subtle Animation */}
        <div className="mt-8 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
}