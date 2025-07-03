// Bu dosyayı src/config/api.ts olarak kopyalayın ve API key'inizi ekleyin
export const HUGGINGFACE_API_KEY = 'YOUR_API_KEY_HERE';

export const API_ENDPOINTS = {
  TRANSLATION_TR_TO_EN: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-tr-en',
  TRANSLATION_EN_TO_TR: 'https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-en-tr',
  DREAM_INTERPRETATION: 'https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct',
  TEXT_GENERATION: 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium'
}; 