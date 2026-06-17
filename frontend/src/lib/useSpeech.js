'use client';
import { useState, useCallback, useRef } from 'react';

const LANG_MAP = {
  "English": "en-IN",
  "Hindi": "hi-IN",
  "Marathi": "mr-IN",
  "Bengali": "bn-IN",
  "Tamil": "ta-IN",
  "Telugu": "te-IN",
  "Kannada": "kn-IN",
  "Gujarati": "gu-IN"
};

export const useSpeech = () => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // 1. Text to Speech (AI speaks)
  const speak = useCallback((text, language = 'English') => {
    if (typeof window === 'undefined') return;

    // Stop any current speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    const langCode = LANG_MAP[language] || "en-IN";
    utterance.lang = langCode;

    // Find and set a voice that matches the language
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.lang.startsWith(langCode)) || 
                  voices.find(v => v.lang.startsWith('en'));
    if (voice) {
        utterance.voice = voice;
    }
    
    window.speechSynthesis.speak(utterance);
  }, []);

  // 2. Speech to Text (User speaks)
  const listen = useCallback((onResult, language = 'English') => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    
    recognition.continuous = false;
    recognition.interimResults = false;
    
    // Set recognition language based on preference
    recognition.lang = LANG_MAP[language] || "en-IN";
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.start();
  }, []);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  }, []);

  return { speak, listen, stopListening, isListening };
};
