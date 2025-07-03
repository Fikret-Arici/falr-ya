import { HUGGINGFACE_API_KEY, API_ENDPOINTS } from '../config/api';

class DreamService {
  private async makeApiCall(endpoint: string, data: any) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API call error:', error);
      throw error;
    }
  }

  private async translateText(text: string, from: 'tr' | 'en', to: 'tr' | 'en'): Promise<string> {
    const endpoint = from === 'tr' ? API_ENDPOINTS.TRANSLATION_TR_TO_EN : API_ENDPOINTS.TRANSLATION_EN_TO_TR;
    
    const result = await this.makeApiCall(endpoint, { inputs: text });
    return result[0]?.translation_text || text;
  }

  private async interpretDreamEnglish(dreamText: string): Promise<string> {
    const prompt = `Please interpret this dream in detail and provide a meaningful analysis:\n\nDream: ${dreamText}\n\nInterpretation:`;
    
    const result = await this.makeApiCall(API_ENDPOINTS.DREAM_INTERPRETATION, {
      inputs: prompt,
      parameters: {
        max_new_tokens: 300,
        temperature: 0.7,
        do_sample: true,
        return_full_text: false
      }
    });

    return result[0]?.generated_text || 'Dream interpretation could not be generated.';
  }

  public async interpretDream(dreamText: string): Promise<string> {
    try {
      // 1. Türkçe'den İngilizce'ye çeviri
      console.log('Translating dream to English...');
      const dreamEnglish = await this.translateText(dreamText, 'tr', 'en');
      
      // 2. İngilizce rüya yorumlatma
      console.log('Interpreting dream...');
      const interpretationEnglish = await this.interpretDreamEnglish(dreamEnglish);
      
      // 3. İngilizce'den Türkçe'ye çeviri
      console.log('Translating interpretation to Turkish...');
      const interpretationTurkish = await this.translateText(interpretationEnglish, 'en', 'tr');
      
      return interpretationTurkish;
    } catch (error) {
      console.error('Dream interpretation error:', error);
      throw new Error('Rüya yorumu sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    }
  }

  // Fallback için basit rüya yorumları
  public getFallbackInterpretation(dreamText: string): string {
    const dreamKeywords = {
      'su': 'Su rüyası, duygusal temizlik ve yenilenme anlamına gelir. İç dünyanızda bir arınma süreci yaşıyorsunuz.',
      'uçmak': 'Uçma rüyası, özgürlük ve sınırları aşma arzusunu gösterir. Yeni fırsatlar sizi bekliyor.',
      'ev': 'Ev rüyası, güvenlik ve aile bağlarını temsil eder. Ev hayatınızda güzel gelişmeler olacak.',
      'ağaç': 'Ağaç rüyası, büyüme ve gelişimi simgeler. Kişisel gelişiminizde önemli adımlar atacaksınız.',
      'kuş': 'Kuş rüyası, özgürlük ve haber anlamına gelir. Yakında güzel bir haber alacaksınız.',
      'yılan': 'Yılan rüyası, dönüşüm ve bilgelik anlamına gelir. Hayatınızda önemli değişiklikler olacak.',
      'ölüm': 'Ölüm rüyası, yeni başlangıçları simgeler. Eski bir dönem kapanıyor, yeni bir dönem başlıyor.',
      'düşmek': 'Düşme rüyası, kontrol kaybı ve korkuları temsil eder. Güvenlik arayışınız devam ediyor.',
      'araba': 'Araba rüyası, hayat yolculuğunuzu simgeler. Kariyerinizde ilerleme kaydedeceksiniz.',
      'deniz': 'Deniz rüyası, bilinçaltı ve duyguları temsil eder. Duygusal bir dönem geçiriyorsunuz.'
    };

    const lowerText = dreamText.toLowerCase();
    for (const [keyword, interpretation] of Object.entries(dreamKeywords)) {
      if (lowerText.includes(keyword)) {
        return interpretation;
      }
    }

    return 'Bu rüya, bilinçaltınızın size özel bir mesajı. Dikkat etmeniz gereken konular var ve yakında önemli gelişmeler yaşanacak.';
  }
}

export const dreamService = new DreamService(); 