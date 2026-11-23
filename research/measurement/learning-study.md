# Öğrenme katkısı araştırması: taslak ölçüm planı

**Durum:** Araştırma taslağı; onaylı protokol veya TÜBİTAK zorunlu yöntemi değildir. Kaynaklar **2026-11-23** tarihinde incelendi. Katılımcı verisi, MEB izin belgesi ve onaylı veri toplama aracı olmadan toplanmamalıdır.

## TÜBİTAK ölçütlerinden çıkan ihtiyaç

2027 çağrı sayfası, 2204-A ön değerlendirme kriter bağlantısında hâlâ **2025** değerlendirme formunu gösteriyor. Son görünen formda problem/araştırma sorusu %20, yöntem %20, yaratıcılık/etki %30, sonuçlar/tartışma %30 ağırlıkta. Form; açık ve ölçülebilir hedef, yöntemin açıklığı, yenilik, kanıtların hedefe erişimi, tekrarlanabilirlik ve mevcut çözümlerle karşılaştırma arıyor. 2027 değerlendirme formu yayımlanırsa bu yüzdeler değişebilir; başvurudan önce tekrar kontrol edilmeli. Kaynaklar: [2027 çağrı ve kriter bağlantıları](https://tubitak.gov.tr/tr/yarismalar/2204-lise-ogrencileri-arastirma-projeleri-yarismasi), [son yayımlı 2025 ön değerlendirme formu](https://tubitak.gov.tr/sites/default/files/2025-11/on_degerlendirme_kriterleri_2025_web.pdf), [2027 proje rehberi, Yazılım §3.6.12](https://tubitak.gov.tr/sites/default/files/2026-10/2204A_proje_rehberi_2027.pdf).

Dolayısıyla yalnızca bir web uygulaması yapmak veya yalnızca son quiz puanı toplamak “Verilog eğitimine katkı” bulgusunu göstermeye yetmez. Etkiyi hangi öğrenme kazanımıyla sınadığımız, karşılaştırma düzeni ve puanlama önceden tanımlanmalıdır.

## Ludus için dar fark hipotezi

**Aday araştırma sorusu:** “Blokları, gerçek Verilog'u ve adım adım mantıksal sinyal izini eşzamanlı gösteren kısa Ludus etkinliği, başlangıç düzeyindeki öğrencilerin basit Verilog devrelerinde bağımsız paralel yolların ve bunların çıktılarının davranışını tahmin etme başarısını eşdeğer bir başlangıç anlatımına kıyasla artırır mı?”

Bu, **hipotezdir; henüz doğrulanmış özgünlük değildir.** CircuitVerse zaten devre oluşturma/simülasyon, sıralı elemanlar, alt devre, zaman diyagramı, yerel kayıt ve deneysel Verilog dışa aktarımı belgeliyor. VPLAS web tabanlı Verilog öğretimi sunuyor. Bu yüzden yalnız “blok editörü + simülasyon + Verilog” yenilik iddiası olamaz. Aday fark, **başlangıç öğrencisine aynı anda görünen blok↔Verilog eşlemesi ve bağımsız mantıksal yolların doğru paralel/zamanlı anlatımıdır**. CircuitVerse ve VPLAS özelliklerini aynı görevlerle uygulamalı kıyaslamadan ürünlerin yapamadığı bir iş iddia edilmemeli. Ayrıntı: [`related-tools.md`](../references/related-tools.md).

## Önerilen ölçüm, danışmanla netleştirilecek

1. **Tek birincil kazanım seç:** Küçük bir Verilog örneğindeki bağımsız iki mantık yolunun birlikte değerlendirildiğini ve bu yollardan çıkan değerleri doğru tahmin etme. Register/clock bilgisi MVP'de öğretilebilir; bu ilk çalışmada ikinci birincil sonuç yapılmayabilir.
2. **Ön-test ve son-test:** Aynı kazanımı ölçen, eşdeğer zorlukta fakat aynı soruları ezberletmeyen iki form hazırla. Soruları en başta bir belirtke tablosuna bağla (çıktı tahmini, bağımsız/paralel yol, Verilog ifadesini anlamlandırma); 100 puanlık ölçeği önceden sabitle.
3. **Karşılaştırma koşulu:** Mümkünse benzer başlangıç seviyesindeki katılımcıları iki koşula ayır: Ludus etkinliği ve aynı kavram/süreyi işleyen eşdeğer bir metin/şema anlatımı veya yakın araç. Her iki gruba aynı yönerge, süre, öğretim içeriği ve eşdeğer test ver. Grup belirleme/örneklem sayısı yöntemi danışmanla gerekçelendir.
4. **Daha az kaynaklı alternatif:** Tek grup ön-test→Ludus→son-test yapılabilir; ancak artış, tekrar etkisi/önbilgi/öğretmen etkisi gibi sebeplerden ayrılamayacağından “Ludus artırdı/kanıtladı” yerine yalnız “bu küçük pilotta puanlar değişti” denebilir.
5. **Süre ikincil ölçüt:** Playground'da aktif geçirilen süre, öğrenme puanının yerine geçmez. Süreyi yalnız kullanışlılık/etkinlik süresi gibi ikincil bir ölçüt olarak al; sayfada açıkça bildir, mümkünse etkinlik sırasında otomatik ve sınırlı ölç. Serbest gezinme süresini öğrenmeyle eş tutma.
6. **Tekrarlanabilirlik:** Quiz sürümü, cevap anahtarı, puanlama, etkinlik yönergesi, süre, örnek devreler, dışlama/eksik yanıt kuralı, veri temizleme ve analiz adımlarını kişisel verisiz yöntem ekinde sakla. Testi MEB başvurusunda sunulacak son hâliyle uygula.
7. **Zaman/izin kısıtı:** Danışman hemen seçilmeli; TTKB kılavuzu zorunlu eğitime devam eden öğrencilerin başvurusunu danışmanın yaptığını söylüyor. İzin çıkmadan öğrenci üzerinde pilot/ön test bile yapma. İzin takvimi yetişmezse başvurunun niteliğini danışmanla tekrar değerlendir; izinsiz öğrenci verisi toplayarak takvimi kurtarmaya çalışma.

Bu öneri araştırma planlaması içindir; yeterli örneklem, ölçüm geçerliği veya istatistiksel çıkarım garantisi vermez. Uygunluk/veri toplama protokolünü danışman ve okul yönetimi onaylamalıdır.

## Başvuruda veri toplama dosyaları

2025 TTKB kılavuzunun zorunlu eğitim öğrencileri/2204-A yolu için listelediği dosyalar: Araştırma/Proje Bilgileri; danışmanın imzaladığı MEB izin taahhütnamesi; Ayrıntılı Bilgilendirme ve Gönüllü Katılım Formu; gerçek veri toplama aracı (ön/son test ve protokol); öğrenci katılımcı varsa Veli Onam Formu. Yeniden kullanılan ölçeğin kullanım izni/kaynak durumu da açıklanmalıdır. Bu başvuru türünde etik kurul belgesi istenmediğini kılavuz açıkça belirtiyor.

Kılavuzun önemli uygulama kuralı: katılımcı/veli adı imzalı bilgilendirme ve veli onam formlarında olabilir; **quiz, anket ve diğer veri toplama araçlarında katılımcı adı-soyadı ve kişisel bilgiler istenmemelidir**. Verisi eşleştirilecekse rastgele bir çalışma kodu değerlendirilip bu kod MEB'e sunulan araçta görünmelidir. Kodla ilişkilendirilebilen sonuçlar anonim değil, en azından takma adlı kişisel veri sayılmalıdır. [TTKB kılavuzu §§2.2.1, 3 ve 6](https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_07/19211911_arastirmauygulamaizinleribasvuruvedegerlendirmekilavuzu.pdf).

## Açık ölçüm kararları

- Örneklem hangi okul ve sınıf/yaş aralığı olacak? Kullanıcının kendi okulu Konya/Adil Karaağaç MTAL olarak belirtilmiş olsa da katılımcı okulu henüz kararlaştırılmadı.
- Araştırma “araç uygulaması/deneysel etkinlik” olarak mı yürütülecek, yoksa yalnız anket/ölçek mi? Bu, Konya İl MEM başvurusunda uygulama okulunun belirtilmesi seçeneğini etkileyebilir. TTKB SSS, araç/deney uygulamasında okulun özel bilgiler bölümünde belirtilmesine imkân tanırken anket/ölçek/görüşme uygulamalarında okul adı yazılmamasını söylüyor.
- Ludus'u neyle karşılaştıracağız; aynı başlangıç görevi tüm koşullarda adil ve uygulanabilir olacak mı?
- Aynı öğrenciye ön/son testi bağlamak için çalışma kodu gerçekten gerekiyor mu? Kod kullanılırsa silme/çekilme talebini kodla nasıl karşılayacağız?
- Örneklem sayısı, test maddeleri, süre ve ana analiz danışmanla nasıl gerekçelendirilecek?

### Kaynaklar

- **PRIMARY / RESMÎ:** [TÜBİTAK 2204-A çağrı, başvuru kuralları ve değerlendirme bağlantıları](https://tubitak.gov.tr/tr/yarismalar/2204-lise-ogrencileri-arastirma-projeleri-yarismasi).
- **PRIMARY / RESMÎ:** [2025 Ön Değerlendirme Aşaması Formu](https://tubitak.gov.tr/sites/default/files/2025-11/on_degerlendirme_kriterleri_2025_web.pdf) — 2027 linki şu anda buraya yönleniyor.
- **PRIMARY / RESMÎ:** [2027 Proje Rehberi](https://tubitak.gov.tr/sites/default/files/2026-10/2204A_proje_rehberi_2027.pdf), Yazılım projeleri §3.6.12.
- **PRIMARY / RESMÎ:** [TTKB 2025 başvuru ve değerlendirme kılavuzu](https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_07/19211911_arastirmauygulamaizinleribasvuruvedegerlendirmekilavuzu.pdf), özellikle §§2.2.1, 3, 6 ve Ek 2.
- **PRIMARY / RESMÎ:** [TTKB canlı SSS](https://ttkb.meb.gov.tr/www/sss.php?DIL=tr), tek il başvuru süresi ve okul seçimi.
- **RELATED TOOL / PRIMARY:** [CircuitVerse key features](https://docs.circuitverse.org/chapter1/chapter1-keyfeatures/), [CircuitVerse menubar / Verilog export](https://docs.circuitverse.org/chapter3/chapter3-menubar/), [VPLAS 2025 paper](https://www.mdpi.com/1999-5903/17/8/333).
