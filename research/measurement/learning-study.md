# Öğrenme katkısı araştırması: taslak ölçüm planı

**Durum:** Araştırma taslağı; onaylı protokol veya TÜBİTAK zorunlu yöntemi değildir. Kaynaklar **2026-11-23 ve 2026-11-24** tarihlerinde yeniden incelendi. Katılımcı verisi, MEB izin belgesi ve onaylı veri toplama aracı olmadan toplanmamalıdır.

## TÜBİTAK ölçütlerinden çıkan ihtiyaç

2027 çağrı sayfası, 2204-A ön değerlendirme kriter bağlantısında hâlâ **2025** değerlendirme formunu gösteriyor. Son görünen formda problem/araştırma sorusu %20, yöntem %20, yaratıcılık/etki %30, sonuçlar/tartışma %30 ağırlıkta. Form; açık ve ölçülebilir hedef, yöntemin açıklığı, yenilik, kanıtların hedefe erişimi, tekrarlanabilirlik ve mevcut çözümlerle karşılaştırma arıyor. 2027 değerlendirme formu yayımlanırsa bu yüzdeler değişebilir; başvurudan önce tekrar kontrol edilmeli. Kaynaklar: [2027 çağrı ve kriter bağlantıları](https://tubitak.gov.tr/tr/yarismalar/2204-lise-ogrencileri-arastirma-projeleri-yarismasi), [son yayımlı 2025 ön değerlendirme formu](https://tubitak.gov.tr/sites/default/files/2025-11/on_degerlendirme_kriterleri_2025_web.pdf), [2027 proje rehberi, Yazılım §3.6.12](https://tubitak.gov.tr/sites/default/files/2026-10/2204A_proje_rehberi_2027.pdf).

Dolayısıyla yalnızca bir web uygulaması yapmak veya yalnızca son quiz puanı toplamak “Verilog eğitimine katkı” bulgusunu göstermeye yetmez. Etkiyi hangi öğrenme kazanımıyla sınadığımız, karşılaştırma düzeni ve puanlama önceden tanımlanmalıdır.

## Ludus için dar fark hipotezi ve örneklem sınırı

**Aday araştırma sorusu:** “Öğrencinin bir dijital devreyi bloklarla kurup aynı tasarımın Verilog ve mantık değerlerini tek çalışma alanında izlemesi, başlangıç düzeyindeki lise öğrencilerinin bağımsız paralel yolların çıktılarını doğru tahmin etme başarısıyla ilişkili midir?” Bu biçim ürün etkinliğini tarif eder; nedensel etki sorusuna ancak danışmanla deney tasarımı ve ölçme aracı onaylandıktan sonra çevrilmelidir.

Bu, **ürün/araştırma hipotezidir; doğrulanmış özgünlük değildir.** Yakın araçlar benzer parçaları zaten gösteriyor: CircuitVerse şema kurma, simülasyon, sıralı öğeler, hiyerarşi, timing diagram ve Verilog export belgeliyor; VPLAS'ın 2025 makalesi kodu, otomatik değerlendirilen alıştırmayı ve devre şeması/zaman dalga biçimlerini aynı yönlendirilmiş öğrenme akışında tarif ediyor; Verilog Labs kod, simülasyon/waveform ve quiz içeren dersler sunuyor; HDLPath kod alıştırmaları ve adaptif ilerleme paneli gösteriyor. HDLBoard canlı sanal kartta HDL giriş/çıkışını; VeriSim test edilen HDL'den oluşan waveform'u, ayrıca README'sinde sentezlenmiş Gate/RTL şemasını belgeliyor. ChipXpert Lab simülasyon, waveform ve sentez/netlist laboratuvarlarını listeliyor. Dolayısıyla “blok + kod + devre görünümü”, “simülasyon + quiz” veya “Verilog'a adım adım yardım” tek başına yenilik sayılamaz. Ludus için daha dar aday; öğrencinin kendisinin blok bağlantı grafiğini kurması ve bu kaynak tasarımdan aynı öğrenme adımında Verilog ile mantıksal sinyal değerlerini alması olabilir. İncelenen araçların denenen akışlarında öğrenci tarafından düzenlenen blueprint kaynağı gözlenmedi; fakat bu, tüm sürümler ve araçlar için kanıtlanmış yokluk değildir. CircuitVerse'te aynı yarım-toplayıcı görevini canlı arayüzde uçtan uca kurma denemesi tamamlanamadı; Verilog Labs/HDLPath half-adder görevleri kilit/arayüz nedeniyle çalıştırılmadı, ChipXpert canlı görevi denenmedi. Bu yüzden doğrudan aynı görev kullanılabilirlik kıyası açık kalıyor. Ayrıntı ve kanıt sınırları: [`related-tools.md`](../references/related-tools.md).

## Birincil ve ikincil kazanımlar

Birden fazla kazanım ölçmek daha geniş bir resim verebilir; fakat bütün sonuçları eşit derecede birincil ilan etmek küçük örneklemde çok sayıda karşılaştırma ve seçici sonuç sunma riski doğurur. Öneri: **bir birincil sonuç, iki önceden belirtilmiş ikincil sonuç** kullan; örneklem azsa ikincil sonuçları keşfedici olarak raporla.

| Öncelik | Kazanım taslağı | Örnek quiz maddesi |
|---|---|---|
| **Birincil** | Basit devrede bağımsız kombinasyonel yolların paralel çalışmasını ve birleşik çıkış değerini tahmin etme | İki ayrı AND/OR kolu aynı girişlerden besleniyor; belirli girişte iki kol ve birleşik çıkış kaç olur, yolların hangisi beklemez? |
| **İkincil A** | Görsel blok/bağlantı ile gerçek Verilog'daki `assign` veya modül bağlantısını eşleme/okuma | Bir blokta görülen ilişkiyi iki kısa Verilog ifadesinden seçme veya bir Verilog satırının çıkışını açıklama |
| **İkincil B** | Sıralı devrede register değerinin clock'un yükselen kenarında değiştiğini anlama | Clock kenarı gelmeden önce/sonra register'da hangi değer tutulur? |

100 üzerinden puan toplamı kullanılabilir; cevap anahtarı ve her boyutun puanı baştan sabitlenmeli. Birincil sonuç tek başına raporlanmalı; toplam ve alt boyutlar onu tamamlayıcı biçimde gösterilmeli. Birincil kazanım uygulamadaki soru taslağına bağlandı; bu yalnızca ürün prototipidir. Soru eşleme ve sınırlılıklar [`quiz-blueprint.md`](quiz-blueprint.md) içinde kayıtlıdır; danışman ve öğrenci incelemesi olmadan araştırma aracı olarak kullanılmamalı.

### Lise örnekleminin ortaokul hedefine sınırı

Necati'nin ek kararı: **Konya'daki Adil Karaağaç MTAL hem ekip hem planlanan katılımcı okulu; örneklem bu okulun öğrencileri olacak.** Böyle bir örneklem erişilebilirliği artırır, fakat sonuç lise öğrencilerinden elde edilir. Uygulama ortaokul için sade tasarlansa bile bu çalışma **ortaokul öğrencilerinde etkiyi kanıtlamaz**; rapor yalnız katılan lise öğrencileri/başlangıç düzeyi alt grubu için sonuç çıkarabilir ve ortaokul genellemesini sınırlılık olarak söylemelidir. Ortaokul etkisi ayrıca izin alınmış, ortaokul örneklemli bir çalışmayla test edilir.

Verilog/dijital mantığa daha önce maruz kalmamış öğrencileri hedefleyin. Tek sınıf düzeyinde katılımcı bulmak mümkünse yaş ve sınıf alt grup analizi için gerekmeyebilir; ön-test başlangıç bilgisi için daha doğrudan ölçüdür. Birden çok sınıf seçilecekse sınıf bandı araştırma sorusu veya analiz için gerekçelendirilip MEB'e sunulan araçta onaylatılmalı. Tam yaş, aynı okulun küçük gönüllü grubunda bilimsel değeri düşük ve yeniden tanımlama riskini artırabilir; şu an toplamama önerisi geçerlidir.

## Önerilen ölçüm, danışmanla netleştirilecek

### Necati'nin 2026-11-23 onayı

- Yeterli gönüllü bulunur ve MEB/okul izinleri çıkarsa, aynı süreli başlangıç düzeyi anlatımla karşılaştırmalı tasarım tercih edilecek; katılımcılar onam sonrası iki koşula rastgele atanacak. Örneklem iki koşulu anlamlı kılmayacak kadar küçükse tek grup ön-test → Ludus → son-test pilotuna dönülecek ve nedensel etki iddiası yapılmayacak.
- Quiz'de ad-soyad toplanmayacak. Tam yaş yerine, gerekli görülür ve MEB'e sunulan araçta onaylanırsa yalnızca kaba sınıf/eğitim düzeyi bandı alınması kabul edildi. Kesin kategori ve gereklilik danışmanla kararlaştırılacak.
- Örneklem Adil Karaağaç MTAL'deki lise öğrencileridir; bu örneklem ortaokul öğrencilerinde etki iddiasını desteklemez.

### Necati'nin 2026-11-24 kararları ve örneklem tahmini

- Kullanıcı birincil paralel-yol tahmini kazanımını ve iki ikincil kazanımı (blok↔Verilog eşlemesi; clock/yazmaç davranışı) kabul etti. Kazanım seçimi kabul edilmiştir; quizin ölçme geçerliği ve puanlaması onaylanmış değildir.
- Kullanıcı okuldan yaklaşık 20 öğrenciye ulaşılabileceğini tahmin ediyor. Bu bir erişim öngörüsüdür; kesin örneklem veya istatistiksel güç hesabı değildir. İki koşula bölünürse yaklaşık 10 kişi/koşul olur; böyle bir karşılaştırmanın yeterliliği mevcut kayıtlardan çıkarılamaz. Danışman, gerçek katılım beklentisine ve ölçülebilir fark varsayımına göre tasarımı belirlemelidir.
- Katılımcı ve okul izinleri çıkmadan önce tasarım kararı ve gönüllü çağrısı uygulanmamalı. Gerçek katılım düşük kalırsa tek grup pilotu, keşfedici sonuçlar ve nedensel etki iddiası olmadan raporlama değerlendirilebilir.

Bu kararlar araştırma tasarımına yön verir; okul/MEB izni, danışman onayı ve katılımcı belgelerinin yerine geçmez.

1. **Ön-test/son-test:** Lise başlangıç grubunda aynı kazanımı ölçen, eşdeğer zorlukta fakat aynı soruları ezberletmeyen iki form hazırla. Belirtke tablosu, cevap anahtarı, her boyutun puanı ve 100'lük ölçek önceden sabitlensin.
2. **Tercih edilen okul içi kıyas:** Gönüllü katılımcı bulunduktan ve MEB izni çıktıktan sonra, aynı sınıf düzeyi/benzer ön-test düzeyindeki öğrencileri iki koşula rastgele ata: (A) Ludus; (B) aynı kavramı aynı sürede anlatan kısa metin/şema çalışma kâğıdı. Ludus'un adım adım blok↔Verilog↔sinyal izini, karşılaştırma koşulunda göstermeyerek araştırılan katkıyı ayır. İki koşulda yönerge, süre ve quiz zorluğu aynı olsun. İzin sonrasında kontrol grubuna da aracı deneme fırsatı verilebilir.
3. **Örneklem azsa:** İki koşul küçük ve dengesiz kalacaksa bunu danışmanla önceden belirleyin. Tek grup ön-test→Ludus→son-test daha yapılabilir bir pilot olur; artış, tekrar etkisi/önbilgi/öğretmen etkisinden ayrıştırılamayacağından “Ludus artırdı/kanıtladı” denmemeli.
4. **Gönüllü bulma:** Önce danışman ve okul yönetimi örneklem sınıflarını ve MEB başvurusunu netleştirsin. MEB izninden sonra, okulun izin verdiği sınıflara araştırmanın amacını/seans süresini tarafsızca duyurup gönüllüleri davet edin; ders notu/öğretmen ilişkisi/katılım baskısı olmamalı. 18 yaş altı için veli onamı ve öğrencinin kendi gönüllü katılımı gerekir. Gönüllü örneklemin kendini seçme yanlılığını raporlayın.
5. **Süre ikincil ölçüt:** Playground'da etkinlik sırasında geçirilen süre kullanılabilirlik/etkinlik süresi için ikincil ölçüttür, öğrenme puanının yerine geçmez. Sayfada ölçüm açıkça belirtilmeli; serbest gezinme/ayrıntılı tıklama geçmişi kaydetme.
6. **Tekrarlanabilirlik ve izin:** Quiz sürümü, cevap anahtarı, yönerge, iki grup materyali, süre, örnek devreler, dışlama/eksik yanıt kuralı, veri temizleme ve analiz adımlarını kişisel verisiz yöntem ekinde sakla. MEB başvurusuna tüm koşul materyallerini ve veri araçlarını ekle; onaylanmayan araç/prosedürle uygulama yapma.
7. **Takvim:** Danışman ve okul planı önümüzdeki hafta netleşecekse izin dosyası ve quiz/protokol aynı anda hazırlanmalı. Tek il için açıklanan süre en fazla 15 gündür, ancak revizyon ve okul uygulama planına zaman gerekir. İzin çıkmadan davet/quiz/ön-test verisi toplama.

Bu öneri araştırma planlaması içindir; yeterli örneklem, ölçüm geçerliği veya istatistiksel çıkarım garantisi vermez. Uygunluk/veri toplama protokolünü danışman ve okul yönetimi onaylamalıdır.

## Başvuruda veri toplama dosyaları

2025 TTKB kılavuzunun zorunlu eğitim öğrencileri/2204-A yolu için listelediği dosyalar: Araştırma/Proje Bilgileri; danışmanın imzaladığı MEB izin taahhütnamesi; Ayrıntılı Bilgilendirme ve Gönüllü Katılım Formu; gerçek veri toplama aracı (ön/son test ve protokol); öğrenci katılımcı varsa Veli Onam Formu. Yeniden kullanılan ölçeğin kullanım izni/kaynak durumu da açıklanmalıdır. Bu başvuru türünde etik kurul belgesi istenmediğini kılavuz açıkça belirtiyor.

Kılavuzun önemli uygulama kuralı: katılımcı/veli adı imzalı bilgilendirme ve veli onam formlarında olabilir; **quiz, anket ve diğer veri toplama araçlarında katılımcı adı-soyadı ve kişisel bilgiler istenmemelidir**. Verisi eşleştirilecekse rastgele bir çalışma kodu değerlendirilip bu kod MEB'e sunulan araçta görünmelidir. Kodla ilişkilendirilebilen sonuçlar anonim değil, en azından takma adlı kişisel veri sayılmalıdır. [TTKB kılavuzu §§2.2.1, 3 ve 6](https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_07/19211911_arastirmauygulamaizinleribasvuruvedegerlendirmekilavuzu.pdf).

## Açık ölçüm kararları

- Örneklem okulu Adil Karaağaç MTAL olarak netleşti. Yaklaşık 20 kişi yalnız erişim tahminidir; danışman gerçek sayı ve iki koşullu tasarımın istatistiksel gerekçesini değerlendirmeli.
- Araştırma “araç uygulaması/deneysel etkinlik” olarak planlanacak. Bu, Konya İl MEM başvurusunda uygulama okulunun belirtilmesi seçeneğini etkileyebilir. TTKB SSS, araç/deney uygulamasında okulun özel bilgiler bölümünde belirtilmesine imkân tanırken anket/ölçek/görüşme uygulamalarında okul adı yazılmamasını söylüyor. Nihai sınıflandırmayı danışman/Konya İl MEM teyit etmeli.
- Ludus'u neyle karşılaştıracağız; aynı başlangıç görevi tüm koşullarda adil ve uygulanabilir olacak mı?
- Ön-son eşleştirme için rastgele çalışma kodu kullanmak gerekli mi ve kod/çekilme akışı nasıl işleyecek?
- Örneklem sayısı, test maddeleri, süre ve ana analiz danışmanla nasıl gerekçelendirilecek?

### Kaynaklar

- **PRIMARY / RESMÎ:** [TÜBİTAK 2204-A çağrı, başvuru kuralları ve değerlendirme bağlantıları](https://tubitak.gov.tr/tr/yarismalar/2204-lise-ogrencileri-arastirma-projeleri-yarismasi).
- **PRIMARY / RESMÎ:** [2025 Ön Değerlendirme Aşaması Formu](https://tubitak.gov.tr/sites/default/files/2025-11/on_degerlendirme_kriterleri_2025_web.pdf) — 2027 linki şu anda buraya yönleniyor.
- **PRIMARY / RESMÎ:** [2027 Proje Rehberi](https://tubitak.gov.tr/sites/default/files/2026-10/2204A_proje_rehberi_2027.pdf), Yazılım projeleri §3.6.12.
- **PRIMARY / RESMÎ:** [TTKB 2025 başvuru ve değerlendirme kılavuzu](https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_07/19211911_arastirmauygulamaizinleribasvuruvedegerlendirmekilavuzu.pdf), özellikle §§2.2.1, 3, 6 ve Ek 2.
- **PRIMARY / RESMÎ:** [TTKB canlı SSS](https://ttkb.meb.gov.tr/www/sss.php?DIL=tr), tek il başvuru süresi ve okul seçimi.
- **RELATED TOOL / PRIMARY:** [CircuitVerse key features](https://docs.circuitverse.org/chapter1/chapter1-keyfeatures/), [CircuitVerse menubar / Verilog export](https://docs.circuitverse.org/chapter3/chapter3-menubar/), [VPLAS 2025 paper](https://www.mdpi.com/1999-5903/17/8/333).
