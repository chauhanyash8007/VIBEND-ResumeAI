import { useState, useEffect } from "react";
import { Mic, MicOff, MessageCircle } from "lucide-react";

interface VoiceAssistantProps {
  activeSection: string;
  onVoiceInput: (text: string, field: string) => void;
}

export function VoiceAssistant({ activeSection, onVoiceInput }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
    }
  }, []);

  const getSectionPrompts = (section: string) => {
    const prompts = {
      personal: [
        "Say your full name",
        "What's your email address?",
        "What's your phone number?",
        "Where are you located?",
        "Tell me about yourself for the summary"
      ],
      experience: [
        "What's your job title?",
        "Which company did you work for?",
        "Describe your responsibilities",
        "What were your achievements?"
      ],
      education: [
        "Which school did you attend?",
        "What degree did you earn?",
        "What was your field of study?"
      ],
      skills: [
        "What are your technical skills?",
        "List your programming languages",
        "What tools do you use?"
      ],
      projects: [
        "What's the project name?",
        "Describe the project",
        "What technologies did you use?"
      ]
    };
    return prompts[section as keyof typeof prompts] || [];
  };

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 bg-gray-100 text-gray-600 p-4 rounded-lg shadow-lg">
        <div className="flex items-center">
          <MessageCircle className="w-5 h-5 mr-2" />
          <span className="text-sm">Voice input not supported in this browser</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Voice Assistant</h3>
        <button
          onClick={() => setIsListening(!isListening)}
          className={`p-2 rounded-full ${
            isListening ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>
      </div>
      
      <div className="text-sm text-gray-600 mb-3">
        <p className="font-medium mb-1">Try saying:</p>
        <ul className="space-y-1">
          {getSectionPrompts(activeSection).slice(0, 3).map((prompt, index) => (
            <li key={index} className="text-xs">• {prompt}</li>
          ))}
        </ul>
      </div>

      {isListening && (
        <div className="flex items-center text-sm text-red-600">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
          Listening...
        </div>
      )}

      {transcript && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-sm">
          <p className="text-gray-700">{transcript}</p>
        </div>
      )}
    </div>
  );
}
