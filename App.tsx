import React, { useState, useEffect } from 'react';
import { Moon, Sun, Coffee, Hand as HandPalm, Car as Cards, Stars, Upload, Calendar, ArrowLeft, Sparkles, Loader2, RefreshCw } from 'lucide-react';

type FortuneType = 'coffee' | 'palm' | 'tarot' | 'horoscope' | 'daily' | null;

type TarotCard = {
  id: number;
  name: string;
  image: string;
  meaning: string;
  description: string;
  reversed: string;
};

const dailyFortunes = [
  "Bugün şansın seninle! Yeni fırsatlar kapında.",
  "İçindeki sesi dinle, sana doğru yolu gösterecek.",
  "Beklenmedik bir haber alabilirsin, sakin ol ve pozitif kal.",
  "Bugün yeni bir arkadaşlık kurabilirsin.",
  "Finansal konularda dikkatli olmalısın.",
  "Sevdiğin birinden güzel bir haber alacaksın.",
  "Kariyerinde yeni bir kapı açılabilir.",
  "Aşk hayatında güzel gelişmeler yaşanacak.",
  "Sağlığına dikkat etmelisin, kendine iyi bak.",
  "Uzun zamandır beklediğin bir haber gelecek.",
  "Bugün yaratıcılığın zirvede, yeni projeler başlatabilirsin.",
  "Ailenle ilgili güzel gelişmeler yaşanacak.",
  "Seyahat planların gerçekleşebilir.",
  "Eski bir arkadaşınla karşılaşabilirsin.",
  "Bugün kendine güven, başarı seni bekliyor."
];

const coffeeFortunes = [
  "Kahve fincanında bir yol görüyorum. Yakında bir seyahat seni bekliyor.",
  "Fincanın dibinde bir kalp var. Aşk hayatında güzel gelişmeler olacak.",
  "Bir kuş figürü beliriyor. Özgürlük ve bağımsızlık zamanı.",
  "Ağaç figürü görüyorum. Aile hayatında büyüme ve gelişme var.",
  "Su dalgaları var. Duygusal bir dönem geçireceksin.",
  "Bir ev figürü beliriyor. Ev hayatında değişiklikler olabilir.",
  "Yıldızlar görüyorum. Şansın açık, dileklerin gerçekleşebilir.",
  "Bir köprü figürü var. Geçmiş ile gelecek arasında bir bağlantı kurulacak.",
  "Çiçek figürleri görüyorum. Bahar gibi güzel günler yakında.",
  "Bir anahtar figürü var. Yeni kapılar açılacak."
];

const palmFortunes = [
  "Hayat çizginiz uzun ve net. Uzun bir ömür süreceksiniz.",
  "Aşk çizginizde derinlik var. Gerçek aşkı bulacaksınız.",
  "Kader çizginizde bir dönüm noktası görüyorum. Önemli bir karar vereceksiniz.",
  "Başarı çizginiz yükseliyor. Kariyerinizde büyük başarılar olacak.",
  "Sağlık çizginiz güçlü. Uzun yıllar sağlıklı kalacaksınız.",
  "Para çizginizde artış var. Finansal açıdan şanslı bir dönemdesiniz.",
  "Aile çizginizde büyüme görüyorum. Aile hayatınızda güzel gelişmeler olacak.",
  "Seyahat çizginiz aktif. Yakında bir yolculuk yapacaksınız.",
  "Arkadaşlık çizginizde yeni bağlantılar var. Yeni arkadaşlıklar kuracaksınız.",
  "Yaratıcılık çizginiz güçlü. Sanatsal yetenekleriniz gelişecek."
];

export default function App() {
  const [selectedOption, setSelectedOption] = useState<FortuneType>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTarotCard, setSelectedTarotCard] = useState<TarotCard | null>(null);
  const [readingType, setReadingType] = useState<'daily' | 'weekly' | 'general'>('daily');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isReversed, setIsReversed] = useState(false);
  const [dailyFortune, setDailyFortune] = useState<string | null>(null);
  const [canViewDailyFortune, setCanViewDailyFortune] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [fortuneResult, setFortuneResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const lastViewedDate = localStorage.getItem('lastDailyFortuneDate');
    const today = new Date().toDateString();

    if (lastViewedDate === today) {
      const savedFortune = localStorage.getItem('dailyFortune');
      if (savedFortune) {
        setDailyFortune(savedFortune);
        setCanViewDailyFortune(false);
      }
    } else {
      localStorage.removeItem('dailyFortune');
      setCanViewDailyFortune(true);
    }
  }, []);

  const generateDailyFortune = () => {
    const fortune = dailyFortunes[Math.floor(Math.random() * dailyFortunes.length)];
    setDailyFortune(fortune);
    localStorage.setItem('dailyFortune', fortune);
    localStorage.setItem('lastDailyFortuneDate', new Date().toDateString());
    setCanViewDailyFortune(false);
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Simüle edilmiş API çağrısı
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const fortunes = selectedOption === 'coffee' ? coffeeFortunes : palmFortunes;
      const result = fortunes[Math.floor(Math.random() * fortunes.length)];
      setFortuneResult(result);
    } catch (err) {
      setError('Fal analizi sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const fortuneOptions = [
    { id: 'daily', icon: Sparkles, label: 'Günlük Falın', description: 'Her gün yeni bir fal' },
    { id: 'coffee', icon: Coffee, label: 'Kahve Falı', description: 'Fincanındaki sırları keşfet' },
    { id: 'palm', icon: HandPalm, label: 'El Falı', description: 'Elindeki çizgileri oku' },
    { id: 'tarot', icon: Cards, label: 'Tarot', description: 'Kartların rehberliğinde' },
    { id: 'horoscope', icon: Stars, label: 'Burç Yorumları', description: 'Burcuna özel yorumlar' },
  ];

  const tarotCards: TarotCard[] = [
    {
      id: 1,
      name: 'The Fool (Saf)',
      image: 'https://images.unsplash.com/photo-1604881991720-f91add269bed?w=400&h=600&fit=crop',
      meaning: 'Yeni başlangıçlar, saf potansiyel ve macera zamanı...',
      description: 'The Fool, yeni bir yolculuğun başlangıcını temsil eder. Önünüzde sonsuz potansiyel var. Risk almaktan korkmayın ve içgüdülerinize güvenin. Hayat sizi yeni deneyimlere çağırıyor.',
      reversed: 'Düşüncesizce hareket etme riski. Kararlarınızı daha dikkatli almalısınız. Naiflik tehlikeli olabilir.'
    },
    {
      id: 2,
      name: 'The High Priestess (Baş Rahibe)',
      image: 'https://images.unsplash.com/photo-1601153211050-ae2e1fa428d7?w=400&h=600&fit=crop',
      meaning: 'Sezgisel bilgelik, gizli bilgi ve içsel rehberlik...',
      description: 'High Priestess, bilinçaltınızın ve sezgisel bilgeliğinizin sesidir. Yüzeyin altındaki gerçekleri görme zamanı. Sessizlikte ve meditasyonda cevapları bulacaksınız.',
      reversed: 'Sezgilerinizi bastırıyorsunuz. İç sesinizi dinlemeyi reddetme durumu var.'
    },
    {
      id: 3,
      name: 'The Empress (İmparatoriçe)',
      image: 'https://images.unsplash.com/photo-1578874557108-9ab0833d3fe3?w=400&h=600&fit=crop',
      meaning: 'Bereket, yaratıcılık ve sevgi dolu bir dönem...',
      description: 'İmparatoriçe, yaşamın bereketini ve yaratıcı gücünü temsil eder. Projeleriniz ve ilişkileriniz çiçek açacak. Kendinize ve sevdiklerinize özen gösterme zamanı.',
      reversed: 'Yaratıcı blokaj ve kendini ihmal etme durumu. Duygusal dengesizlik riski.'
    },
    {
      id: 4,
      name: 'The Tower (Kule)',
      image: 'https://images.unsplash.com/photo-1590845947698-8924d7409b56?w=400&h=600&fit=crop',
      meaning: 'Ani değişim, yıkım ve yeniden yapılanma...',
      description: 'Kule, beklenmedik değişimleri ve ani dönüşümleri temsil eder. Eski yapılar yıkılıyor, ancak bu yenilenme için gerekli. Değişime direnmek yerine onu kucaklayın.',
      reversed: 'Kaçınılmaz değişimden kaçınma. Yıkımın geciktirilmesi ama engellenememesi.'
    },
    {
      id: 5,
      name: 'The Star (Yıldız)',
      image: 'https://images.unsplash.com/photo-1502481851512-e9e2529bfbf9?w=400&h=600&fit=crop',
      meaning: 'Umut, ilham ve manevi rehberlik...',
      description: 'Yıldız, umut ve yenilenme vadeder. Zorlu bir dönemin ardından iyileşme ve ilham zamanı. Evrenin size rehberlik etmesine izin verin.',
      reversed: 'Umutsuzluk ve inancını kaybetme durumu. İyimserliğin azalması.'
    },
    {
      id: 6,
      name: 'The Moon (Ay)',
      image: 'https://images.unsplash.com/photo-1596662100219-5903f73416a3?w=400&h=600&fit=crop',
      meaning: 'Sezgiler, rüyalar ve bilinçaltı mesajlar...',
      description: 'Ay, bilinçaltı dünyasını ve gizli korkuları temsil eder. Rüyalarınıza ve sezgilerinize dikkat edin. Her şey göründüğü gibi olmayabilir.',
      reversed: 'Yanılsama ve kafa karışıklığı. Gerçekle hayal arasında kaybolma riski.'
    },
    {
      id: 7,
      name: 'The Sun (Güneş)',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      meaning: 'Mutluluk, başarı ve pozitif enerji...',
      description: 'Güneş, yaşamın enerjisini ve mutluluğunu temsil eder. Başarı ve sevinç dolu günler sizi bekliyor. İçinizdeki ışığı dünyaya yayın.',
      reversed: 'Geçici mutsuzluk ve enerji düşüklüğü. Güneş ışığı yakında geri dönecek.'
    },
    {
      id: 8,
      name: 'The World (Dünya)',
      image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=600&fit=crop',
      meaning: 'Tamamlanma, başarı ve dünya seyahati...',
      description: 'Dünya, bir döngünün tamamlanmasını ve büyük başarıları temsil eder. Hedeflerinize ulaştınız ve yeni maceralar sizi bekliyor.',
      reversed: 'Tamamlanmamış işler ve eksik başarılar. Biraz daha çaba gerekli.'
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setError('Dosya boyutu çok büyük. Lütfen 5MB\'dan küçük bir dosya seçin.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError(null);
        setFortuneResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBack = () => {
    setSelectedOption(null);
    setSelectedImage(null);
    setSelectedTarotCard(null);
    setSelectedDate('');
    setIsCardFlipped(false);
    setIsReversed(false);
    setError(null);
    setFortuneResult(null);
    setIsLoading(false);
  };

  const handleSelectCard = (card: TarotCard) => {
    setIsReversed(Math.random() > 0.5);
    setSelectedTarotCard(card);
    setTimeout(() => setIsCardFlipped(true), 100);
  };

  const getZodiacSign = (date: string): string => {
    const [year, month, day] = date.split('-').map(Number);
    const monthDay = month * 100 + day;
    if (monthDay >= 321 && monthDay <= 419) return 'Koç';
    if (monthDay >= 420 && monthDay <= 520) return 'Boğa';
    if (monthDay >= 521 && monthDay <= 620) return 'İkizler';
    if (monthDay >= 621 && monthDay <= 722) return 'Yengeç';
    if (monthDay >= 723 && monthDay <= 822) return 'Aslan';
    if (monthDay >= 823 && monthDay <= 922) return 'Başak';
    if (monthDay >= 923 && monthDay <= 1022) return 'Terazi';
    if (monthDay >= 1023 && monthDay <= 1121) return 'Akrep';
    if (monthDay >= 1122 && monthDay <= 1221) return 'Yay';
    if (monthDay >= 1222 || monthDay <= 119) return 'Oğlak';
    if (monthDay >= 120 && monthDay <= 218) return 'Kova';
    return 'Balık';
  };

  const getHoroscopeText = (sign: string, type: 'daily' | 'weekly' | 'general'): string => {
    const horoscopes = {
      daily: {
        'Koç': 'Bugün enerjiniz zirvede! Yeni projeler başlatmak için ideal bir gün.',
        'Boğa': 'Finansal konularda şanslısınız. Para yatırımlarınızı değerlendirin.',
        'İkizler': 'İletişim becerileriniz öne çıkıyor. Yeni arkadaşlıklar kurabilirsiniz.',
        'Yengeç': 'Aile hayatınızda güzel gelişmeler var. Sevdiklerinizle zaman geçirin.',
        'Aslan': 'Liderlik özellikleriniz öne çıkıyor. İş hayatında başarılar kazanacaksınız.',
        'Başak': 'Detaylara odaklanma zamanı. Organizasyon becerileriniz gelişiyor.',
        'Terazi': 'Denge ve uyum arayışınız devam ediyor. İlişkilerinizde barış sağlayacaksınız.',
        'Akrep': 'Sezgileriniz güçlü. Gizli konuları çözmek için ideal bir dönem.',
        'Yay': 'Seyahat ve macera arzunuz artıyor. Yeni yerler keşfetmek için zaman.',
        'Oğlak': 'Kariyer hedeflerinize odaklanın. Disiplinli çalışmanız ödüllendirilecek.',
        'Kova': 'Yenilikçi fikirleriniz öne çıkıyor. Toplumsal konularda aktif olun.',
        'Balık': 'Yaratıcılığınız zirvede. Sanatsal projeler için ideal bir dönem.'
      },
      weekly: {
        'Koç': 'Bu hafta kariyerinizde önemli gelişmeler olacak. Yeni fırsatlar kapınızı çalacak.',
        'Boğa': 'Finansal açıdan şanslı bir hafta. Para konularında dikkatli kararlar alın.',
        'İkizler': 'Sosyal hayatınızda yoğun bir hafta. Yeni bağlantılar kuracaksınız.',
        'Yengeç': 'Aile ve ev hayatınızda güzel gelişmeler. Ev dekorasyonu yapabilirsiniz.',
        'Aslan': 'Liderlik pozisyonlarında başarılar. Takım çalışmasında öne çıkacaksınız.',
        'Başak': 'Sağlık ve düzen konularında odaklanma. Yeni rutinler oluşturun.',
        'Terazi': 'İlişkilerinizde denge kurma zamanı. Çatışmaları çözmek için ideal.',
        'Akrep': 'Derin araştırmalar ve analizler. Gizli konuları aydınlatacaksınız.',
        'Yay': 'Seyahat ve eğitim fırsatları. Yeni bilgiler öğreneceksiniz.',
        'Oğlak': 'Kariyer hedeflerinizde ilerleme. Uzun vadeli planlar yapın.',
        'Kova': 'Toplumsal projelerde aktif rol. Yenilikçi çözümler üreteceksiniz.',
        'Balık': 'Yaratıcı projelerde başarı. Sanatsal yeteneklerinizi geliştirin.'
      },
      general: {
        'Koç': 'Önümüzdeki dönemde enerjiniz ve cesaretinizle öne çıkacaksınız. Yeni başlangıçlar için ideal bir zaman.',
        'Boğa': 'Finansal istikrar ve güvenlik arayışınız devam edecek. Sabırlı olun.',
        'İkizler': 'İletişim ve öğrenme konularında gelişim. Çok yönlü becerileriniz artacak.',
        'Yengeç': 'Aile ve ev hayatınızda derinleşme. Duygusal bağlarınız güçlenecek.',
        'Aslan': 'Liderlik ve yaratıcılık dönemi. Kişisel gücünüzü keşfedeceksiniz.',
        'Başak': 'Hizmet ve organizasyon konularında mükemmellik. Detaylara önem verin.',
        'Terazi': 'Denge ve uyum arayışınız sürecek. İlişkilerinizde barış sağlayacaksınız.',
        'Akrep': 'Dönüşüm ve yenilenme dönemi. Gizli güçlerinizi keşfedeceksiniz.',
        'Yay': 'Genişleme ve büyüme zamanı. Yeni ufuklar keşfedeceksiniz.',
        'Oğlak': 'Kariyer ve başarı odaklı dönem. Hedeflerinize ulaşacaksınız.',
        'Kova': 'Yenilik ve değişim dönemi. Toplumsal konularda öncü olacaksınız.',
        'Balık': 'Sezgisel ve yaratıcı dönem. Manevi gelişiminiz hızlanacak.'
      }
    };
    
    return horoscopes[type][sign] || 'Burç yorumunuz hazırlanıyor...';
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'daily':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-purple-200 text-center">
              Günlük Falın
            </h2>
            <div className="max-w-md mx-auto">
              {canViewDailyFortune ? (
                <button
                  onClick={generateDailyFortune}
                  className="w-full p-8 rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 border border-purple-500/30 hover:from-purple-500/40 hover:to-pink-500/40 transition-all duration-300 group animate-glow"
                >
                  <Sparkles className="w-12 h-12 text-purple-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-purple-200 text-lg">Günlük Falını Gör</p>
                </button>
              ) : (
                <div className="space-y-6">
                  <div className="p-6 rounded-xl bg-purple-900/30 border border-purple-500/30 animate-slide-up">
                    <p className="text-purple-100 text-lg leading-relaxed text-center">
                      {dailyFortune}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      onClick={() => {
                        localStorage.removeItem('dailyFortune');
                        localStorage.removeItem('lastDailyFortuneDate');
                        setCanViewDailyFortune(true);
                        setDailyFortune(null);
                      }}
                      className="flex items-center px-4 py-2 text-purple-300 hover:text-purple-200 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Yeni Fal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case 'coffee':
      case 'palm':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-purple-200 text-center">
              {selectedOption === 'coffee' ? 'Kahve Falı' : 'El Falı'}
            </h2>
            <div className="max-w-md mx-auto">
              {!selectedImage ? (
                <label className="flex flex-col items-center p-8 border-2 border-dashed border-purple-500/30 rounded-xl cursor-pointer hover:border-purple-400/50 transition-colors">
                  <Upload className="w-12 h-12 text-purple-400 mb-4" />
                  <span className="text-purple-200">Fotoğraf Yükle</span>
                  <span className="text-purple-400 text-sm mt-2">JPG, PNG (Max 5MB)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <img
                    src={selectedImage}
                    alt="Yüklenen fotoğraf"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  {error && (
                    <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg">
                      <p className="text-red-200 text-sm">{error}</p>
                    </div>
                  )}
                  {!fortuneResult && !isLoading && (
                    <button
                      onClick={analyzeImage}
                      className="w-full p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                    >
                      Falımı Oku
                    </button>
                  )}
                  {isLoading && (
                    <div className="flex items-center justify-center p-4">
                      <Loader2 className="w-6 h-6 text-purple-400 animate-spin mr-2" />
                      <span className="text-purple-200">Falınız analiz ediliyor...</span>
                    </div>
                  )}
                  {fortuneResult && (
                    <div className="p-6 rounded-xl bg-purple-900/30 border border-purple-500/30 animate-slide-up">
                      <p className="text-purple-100 text-lg leading-relaxed text-center">
                        {fortuneResult}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        );

      case 'tarot':
        return (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-2xl font-semibold text-purple-200 text-center mb-4">
              Tarot Kartları
            </h2>
            {!selectedTarotCard ? (
              <>
                <p className="text-center text-purple-200 mb-4">
                  Bir kart seçin ve kaderinizi öğrenin. Kartın düz veya ters gelmesi sizin için özel bir mesaj içerir...
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
                  {tarotCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => handleSelectCard(card)}
                      className="relative group overflow-hidden rounded-lg aspect-[2/3] transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                    >
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579546929518-9e396f3cc809')] bg-cover bg-center opacity-80 group-hover:opacity-0 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-black/80 group-hover:opacity-0 transition-opacity duration-500" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-medium text-purple-200 group-hover:scale-110 transition-transform duration-500">
                          ✧
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className={`max-w-lg mx-auto space-y-4 transition-all duration-1000 ${isCardFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                <div className={`relative aspect-[2/3] rounded-lg overflow-hidden shadow-xl shadow-purple-500/20 transition-transform duration-1000 ${isReversed ? 'rotate-180' : ''}`}>
                  <img
                    src={selectedTarotCard.image}
                    alt={selectedTarotCard.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                  <div className={`absolute inset-x-0 bottom-0 p-4 space-y-2 ${isReversed ? 'rotate-180' : ''}`}>
                    <h3 className="text-xl font-bold text-purple-200">
                      {selectedTarotCard.name} {isReversed ? '(Ters)' : ''}
                    </h3>
                    <p className="text-base text-purple-100 font-medium">
                      {isReversed ? selectedTarotCard.reversed : selectedTarotCard.meaning}
                    </p>
                  </div>
                </div>
                <div className="bg-purple-900/30 p-4 rounded-lg border border-purple-500/30">
                  <p className="text-purple-100 text-sm leading-relaxed">
                    {selectedTarotCard.description}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedTarotCard(null);
                    setIsCardFlipped(false);
                    setIsReversed(false);
                  }}
                  className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  Yeni Kart Seç
                </button>
              </div>
            )}
          </div>
        );

      case 'horoscope':
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-purple-200 text-center">
              Burç Yorumları
            </h2>
            <div className="max-w-md mx-auto space-y-6">
              <div className="space-y-2">
                <label className="block text-purple-200">Doğum Tarihiniz</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-purple-900/50 border border-purple-500/30 text-purple-100 focus:outline-none focus:border-purple-400"
                />
              </div>
              {selectedDate && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-purple-200">
                      {getZodiacSign(selectedDate)}
                    </h3>
                  </div>
                  <div className="flex justify-center space-x-4">
                    {(['daily', 'weekly', 'general'] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setReadingType(type)}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          readingType === type
                            ? 'bg-purple-600 text-white'
                            : 'bg-purple-900/50 text-purple-200 hover:bg-purple-800/50'
                        }`}
                      >
                        {type === 'daily' ? 'Günlük' : type === 'weekly' ? 'Haftalık' : 'Genel'}
                      </button>
                    ))}
                  </div>
                  <div className="p-6 rounded-xl bg-purple-900/30 border border-purple-500/30 animate-slide-up">
                    <p className="text-purple-100">
                      {getHoroscopeText(getZodiacSign(selectedDate), readingType)}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-10 bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-indigo-900/50 to-black/50 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {selectedOption && (
          <button
            onClick={handleBack}
            className="mb-8 flex items-center text-purple-300 hover:text-purple-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Geri Dön
          </button>
        )}

        <div className="text-center mb-16 space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <Moon className="w-8 h-8 text-purple-400 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300">
              Mistik Kehanet
            </h1>
            <Sun className="w-8 h-8 text-purple-400 animate-pulse" />
          </div>
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">
            Geleceğin sırlarını keşfetmek için mistik yolculuğunuza hoş geldiniz
          </p>
        </div>

        {!selectedOption ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {fortuneOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setSelectedOption(option.id as FortuneType)}
                  className={`
                    relative group p-8 rounded-xl
                    bg-gradient-to-b from-purple-800/50 to-indigo-900/50
                    border border-purple-500/30 backdrop-blur-sm
                    transition-all duration-300 ease-in-out
                    hover:scale-105 hover:from-purple-700/50 hover:to-indigo-800/50
                    animate-fade-in
                  `}
                >
                  <div className="absolute inset-0 rounded-xl bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative flex flex-col items-center space-y-4">
                    <Icon className="w-12 h-12 text-purple-300" />
                    <span className="text-lg font-medium text-purple-100">
                      {option.label}
                    </span>
                    <span className="text-sm text-purple-300 text-center">
                      {option.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            {renderContent()}
          </div>
        )}
      </div>
    </div>
  );
}