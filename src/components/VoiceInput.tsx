import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Volume2 } from "lucide-react";

interface VoiceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
}

export function VoiceInput({ value, onChange, placeholder, multiline = false }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsSupported(true);
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          onChange(value + (value ? ' ' : '') + finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const toggleListening = () => {
    if (!isSupported) return;

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const InputComponent = multiline ? 'textarea' : 'input';
  const inputProps = multiline 
    ? { rows: 4, className: "w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none" }
    : { type: "text", className: "w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" };

  return (
    <div className="relative">
      <InputComponent
        {...inputProps}
        value={value}
        onChange={(e: any) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
        {isSupported ? (
          <button
            type="button"
            onClick={toggleListening}
            className={`p-2 rounded-full transition-colors ${
              isListening 
                ? "bg-red-100 text-red-600 hover:bg-red-200" 
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>
        ) : (
          <div className="p-2 text-gray-400" title="Voice input not supported">
            <Volume2 className="w-4 h-4" />
          </div>
        )}
      </div>
      {isListening && (
        <div className="absolute -bottom-8 left-0 text-sm text-blue-600 flex items-center">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-2"></div>
          Listening...
        </div>
      )}
    </div>
  );
}
