# 🌟 Mistik Kehanet - Gelişmiş Fal Uygulaması

Modern ve etkileşimli bir fal uygulaması. Kahve falı, el falı, tarot kartları, burç yorumları, **rüya yorumu**, numeroloji, kristal falı ve aşk falı ile geleceğin sırlarını keşfedin.

## ✨ Yeni Özellikler

### 🌙 Rüya Yorumu (AI Destekli)
- **Hugging Face AI** entegrasyonu
- Türkçe rüya analizi
- Otomatik çeviri sistemi
- Rüya geçmişi saklama

### 👑 Numeroloji
- İsim ve doğum tarihi analizi
- Yaşam sayısı hesaplama
- Kişilik yorumları

### 💎 Kristal Falı
- 8 farklı kristal türü
- Enerji ve korunma yorumları

### 💕 Aşk Falı
- Kişiselleştirilmiş aşk soruları
- Detaylı aşk yorumları

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd falweb-main
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. **API Key Kurulumu:**
   - `.env.local` dosyası oluşturun:
   ```bash
   echo "VITE_HUGGINGFACE_API_KEY=YOUR_API_KEY_HERE" > .env.local
   ```
   - Hugging Face API key'inizi ekleyin

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

5. Tarayıcınızda `http://localhost:5174` adresini açın

## 🔑 API Key Alma

1. [Hugging Face](https://huggingface.co/) sitesine gidin
2. Ücretsiz hesap oluşturun
3. Settings > Access Tokens bölümünden yeni token oluşturun
4. Token'ı `.env.local` dosyasına ekleyin

## 🛠️ Kullanılan Teknolojiler

- **React 18** - Modern UI framework
- **TypeScript** - Tip güvenliği
- **Vite** - Hızlı build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon set
- **Hugging Face API** - AI rüya yorumu
- **LocalStorage** - Veri saklama

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda mükemmel çalışır:
- 📱 Mobil telefonlar
- 📱 Tabletler
- 💻 Masaüstü bilgisayarlar

## 🎨 Özellikler

### Animasyonlar
- Fade-in efektleri
- Slide-up animasyonları
- Glow efektleri
- Hover animasyonları
- 3D kart çevirme

### Kullanıcı Deneyimi
- Sezgisel navigasyon
- Loading durumları
- Hata yönetimi
- Dosya boyutu kontrolü
- AI destekli analiz

### Performans
- Lazy loading
- Optimized images
- Efficient state management
- API rate limiting

## 📁 Proje Yapısı

```
falweb-main/
├── App.tsx                    # Ana uygulama bileşeni
├── main.tsx                   # Uygulama giriş noktası
├── index.html                 # HTML template
├── index.css                  # Global stiller
├── tailwind.config.js         # Tailwind konfigürasyonu
├── src/
│   ├── config/
│   │   ├── api.ts            # API konfigürasyonu
│   │   └── api.example.ts    # API örnek dosyası
│   └── services/
│       └── dreamService.ts   # Rüya yorumu servisi
├── package.json              # Bağımlılıklar
└── README.md                # Bu dosya
```

## 🎯 Kullanım

1. **Ana Sayfa**: 9 farklı fal seçeneği arasından seçim yapın
2. **Günlük Fal**: Her gün yeni bir fal alın
3. **Kahve/El Falı**: Fotoğraf yükleyin ve falınızı okuyun
4. **Tarot**: Kart seçin ve kaderinizi öğrenin
5. **Burç**: Doğum tarihinizi girin ve burç yorumunuzu alın
6. **🌙 Rüya Yorumu**: Rüyanızı anlatın, AI analiz etsin
7. **👑 Numeroloji**: İsim ve doğum tarihinizle sayınızı öğrenin
8. **💎 Kristal Falı**: Size uygun kristali keşfedin
9. **💕 Aşk Falı**: Aşk hayatınızla ilgili sorular sorun

## 🔧 Geliştirme

### Scripts
- `npm run dev` - Geliştirme sunucusu
- `npm run build` - Production build
- `npm run preview` - Build önizleme
- `npm run lint` - Kod kontrolü

### Yeni Özellik Ekleme
1. Yeni fal türü için `FortuneType` enum'una ekleyin
2. `fortuneOptions` array'ine yeni seçeneği ekleyin
3. `renderContent` fonksiyonuna yeni case ekleyin
4. Gerekli state'leri ve fonksiyonları ekleyin

## 🌟 Gelecek Özellikler

- [ ] Sesli fal okuma
- [ ] Sosyal medya paylaşımı
- [ ] Fal geçmişi dashboard'u
- [ ] Push notifications
- [ ] Offline modu
- [ ] Daha fazla AI modeli
- [ ] Çoklu dil desteği

## 🔒 Güvenlik

- API key'ler güvenli şekilde saklanır
- .env dosyaları git'e eklenmez
- API rate limiting uygulanır
- Hata durumunda fallback sistemler

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/AmazingFeature`)
3. Commit yapın (`git commit -m 'Add some AmazingFeature'`)
4. Push yapın (`git push origin feature/AmazingFeature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorularınız için issue açabilir veya pull request gönderebilirsiniz.

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
