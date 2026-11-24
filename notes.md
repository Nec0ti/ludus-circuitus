# Proje notları

Bu dosya proje hakkında paylaşılan bilgilerin düzenlendiği çalışma belleğidir. Her yeni bilgi için kaynağı, karar durumunu ve belirsizliği koru. Necati'nin açıkça kararlaştırmadığı ayrıntıları kesinleşmiş gibi yazma.

> Güncel kararlar dosyanın başındaki son tarihli proje yönünde yer alır. Aşağıdaki tarihli notlar, yazıldıkları gündeki karar ve uygulama durumunun tarihçesidir; sonraki kayıtlar önceki teknik kapsamı değiştirebilir.

## Proje fikri

**Çalışma tanımı:** Ludus Circuitus, Verilog öğrenmeye görsel bloklarla başlanan; kullanıcının oluşturduğu blueprint'i gerçek Verilog kodu ve devre davranışıyla yan yana gösteren açık kaynaklı bir eğitim projesidir. Unreal Engine Blueprint fikri, çok modüllü proje kurma deneyimine ilham veriyor.

Verilog'da modüller, bağlantılar ve HDL sözdizimi başlangıç düzeyinde öğrenmeyi zorlaştırabilir. Ürün; görsel kurulumdan gerçek HDL'e geçişi görünür kılarak bu öğrenme eşiğini düşürmeyi hedefliyor. Bu bir amaç ve tanıtım yönüdür; öğrenme etkisi ölçülmeden kanıtlanmış sonuç olarak sunulmayacak.

## Atölye genişletme ve görsel yenileme: 2026-11-24

**Necati'nin güncel yönlendirmesi:** Devre Atölyesi simülasyonundaki Oynat/Duraklat/Durdur, sağdaki devre görünümünde mantıksal sinyallerin hareketini canlandırmalı. Oynat giriş bitlerini çevirmemeli ve clock/register tiki üretmemeli; yazmaçlar yalnızca Tek tik veya Reset eylemiyle değişmeli. Animasyon hızı kullanıcı tarafından ayarlanabilir.

**Kapsam düzeltmesi:** RISC-V yalnızca örnekti. Assembly dili, tam işlemci veya ISA projesi istenmiyor. Ürün dijital mantık ve Verilog öğrenimine odaklanır. Eski `.bp` belgelerindeki genişlik belirtilmemiş sinyaller 1 bit kalır; yeni tasarımlarda 1–32 bit genişlik desteklenir. Giriş onluk girilebilir, bit dizisi de görünür. Sabit ve seçici (MUX) blokları eklenmiştir; veri genişliği uyumsuz bağlantılar doğrulamada reddedilir. Sinyal benzetimi, devre görünümü ve üretilen Verilog aynı çok-bitli tasarımı temsil eder. Davranış motoru, Icarus oracle'ları ve E2E ile sınanır.

**Etkileşim isteği:** Tuvalde sol tıkla seçim ve sürükleyerek seçim kutusu; sağ tıkta klavye ile aranabilen, her blok için kısa açıklama gösteren çağırma listesi; sağ tuşa basılı sürükleme veya orta tuş ile pan. Blok çağırmadan dışarı tıklama, Escape ve araç çubuğundaki başka eylem menüyü kapatır. Açık `.bp` dosyaları yeniden adlandırılabilir/silinebilir; bir `.bp` başka blueprint'te modül olarak eklenip giriş/çıkış portlarından bağlanabilir. Var olan dinamik modül örneklemesi korunmalı ve dosya silerken bağımlılıklar açıkça ele alınmalı.

**Görsel kalite yönü ve sonucu:** CSS yenilendi. Tanıtım/docs/quiz için mineral alt tonlu grafit-yeşil, atölye için bunun daha araç odaklı koyu yüzeyleri ortak token ve kontrast testleriyle uygulanmıştır. Footer kısa marka tanımı, üç gerekli bağlantı ve saha çalışması iddiasının sınırıyla sadeleştirilmiştir. Landing'de genel şablon kartları yerine etkileşimli yarım-toplayıcı devresi ve ürünün gerçek kod çıktısı öne çıkar. Renkler okunabilirlik ve durum ayrımı için seçilmiştir; eğitim başarısını artırdığı iddia edilmez. Görsel inceleme mobil taşma ve etiketlerin okunurluğu için bağımsız geri kontrolle yürütülür.

**Durum:** Tuval seçim kutusu, sağ tıkla aramalı blok çağırma, dışarı/Escape ile iptal, sağ tuş sürükleme/orta tuş pan, grid snap, imleç merkezli yakınlaştırma ve seçili düğümde genişlik düzenleme uygulandı. Blueprint yeniden adlandırma bağlı modül örneklerini günceller; silme bağımlılıkları açıkça temizler. Silme öncesi kullanıcı onayıyla bağlı tasarımın değişmesi bilerek görünürdür. Süreçler E2E ile sınanır. Güncel geçerli blok listesi `docs/bloklar.md`'de tutulur.

**TÜBİTAK ile ilişki:** Güncel erişilebilir 2204-A değerlendirme formlarının proje kanıtlarıyla eşlemesi [`research/tubitak/evaluation-alignment-2027.md`](research/tubitak/evaluation-alignment-2027.md) içinde. Tasarım kalitesi ve otomatik oracle testleri ürünün çalışırlığını destekler; öğrenme artışını kanıtlamaz. Başvuru materyali öğrencilerin gerçekte verdiği kararları doğru yansıtmalı; araç kullanımı veya dış katkı olduğundan farklı gösterilmemeli. Ekip üyelerinin sunduğu tasarımı, kod akışını ve testlerin sınırlarını kendilerinin anlayıp açıklaması gerekir.

## Araştırma ölçümü: 2026-11-23 kullanıcı kararları

- Tercih edilen yöntem, izinler alındıktan ve yeterli gönüllü bulunduktan sonra Ludus ile aynı süreli statik metin/şema anlatımını karşılaştırmaktır; gönüllüler koşullara rastgele atanır. Örneklem küçük kalırsa tek grup ön-test/Ludus/son-test pilotu uygulanabilir; bu durumda nedensel etki iddiası kurulmaz.
- Katılımcı adı-soyadı toplanmayacak. Tam yaş yerine kaba sınıf/eğitim düzeyi bandı kabul edildi; hangi kategorinin ve analizin gerekli olduğu danışmanla netleşecek ve MEB'e sunulan araçta yer alacak.
- Örneklem okulu Adil Karaağaç MTAL; katılımcılar lise öğrencileri. Ortaokul hedef kitlesine genelleme yapılmayacak.
- İzin, danışman/okul süreci ve KVKK veri akışı onaylanmadan API veya katılımcı verisi toplama başlatılmayacak.

Detay, alternatifler ve sınırlılıklar: [`research/measurement/learning-study.md`](research/measurement/learning-study.md) ve [`research/privacy/data-collection-plan.md`](research/privacy/data-collection-plan.md).

## Devre Atölyesi etkileşim ve ders yönü: 2026-11-23

- Kullanıcı, örnek görseller üzerinden Atölye'nin endüstriyel ve araç merkezli görünmesini; sonsuz 2B grid, grid snap, tekerlekle yakınlaştırma, araçlıktan sürükleyip bırakma ve boş alanda isim yazarak blok çağırmayı istedi. Bu istek [yeniden tasarım raporunda](raports/workbench-redesign-2026-11-23.md) uygulama sınırı ve dışarıda bırakılanlarla kayıtlı.
- 1-bit başlangıç kataloğunu ölçülü büyütme isteği doğrultusunda NAND, NOR ve XNOR seçildi. MUX, sabit giriş ve çok bitli değerler şimdilik kapsam dışı; her yeni blok tam simülasyon/Verilog/docs/test eşleşmesine tabi.
- Kullanıcı docs'un hâlâ karışık olduğunu ve daha fazla küçük sayfa/kategori istediğini belirtti. Kurs haritası ve altı kısa sayfa uygulandı: dijital sinyaller, mantık kapıları, yarım toplayıcı, paralel yollar, saat/yazmaç ve Verilog'a geçiş. Kullanım, blok kataloğu ve kurulum kılavuzları ayrı ana gruplarda kaldı; masaüstü ve mobil gezinme bağımsız görsel kontrolden geçti.

## İlk etkileşimli atölye dilimi: 2026-11-23

- Devre Atölyesi site nav/footer'ından ayrıldı ve tam ekran koyu endüstriyel CAD/CAM çalışma alanına alındı. Izgara, araçlık, belge sekmeleri, saat kontrolü, değişken şeridi, sinyal görünümü ve Verilog paneli aynı ekranda yer alıyor.
- 1-bit blueprint JSON'u saf motorla doğrulanıp simüle ediliyor. 0/1/X kapı mantığı, kombinasyonel döngü reddi, gerçek Verilog üretimi, başlangıç X yazmaç, eşzamanlı yükselen kenar, ayrı reset, tarayıcı localStorage ve `.bp` JSON içe/dışa aktarımı çalışıyor.
- Araçlık blokları mouse/keyboard ile eklenebilir; çıkıştan girişe tıklayarak bağlanır; canvas'ta 20 birimlik ızgarada taşınır. Bu ilk dilimde alt blueprint dosyaları tablarda açılabilir; modül örneği çağırma/bileştirme henüz yok.
- Her blokta kısa hover/focus yardımı var; yardım bağlantısı ilgili Bloklar başlığını yeni sekmede açıyor.
- Atölye verileri tarayıcıda yerel kalır. Quiz yalnız açık sayfa belleğinde puanlanan anonim bir öğrenme alıştırmasıdır; cevap/puan/süre kaydetmez ve API isteği yapmaz. Okul/MEB/KVKK onayı beklemeden insan katılımcılı araştırma verisi toplanmayacak.
- Genel site koyu ve yumuşak palete alındı; Devre Atölyesi ayrı endüstriyel temasını koruyor. Landing'de yarım toplayıcı etkileşimi var; docs eğitim portalı, quiz yerel anonim prototip olarak eklendi.

## Görsel dil ve etkileşim araştırması: 2026-11-23

- Kaynaklı tasarım araştırması [`research/design/visual-engagement.md`](research/design/visual-engagement.md) içinde. Seçilen palet: sayfa `#1B232B`, yüzey `#232E37`, yükseltilmiş yüzey `#2D3B44`, metin `#F1F3EE`, ikincil metin `#B5C0C0`, mantık sinyali `#72D6B5`, clock/odak `#F1B866`, hata `#E8897B`. Tema genel landing/docs/quiz'e uygulandı; Devre Atölyesi `ludus-cad` temasını kullanıyor.
- Renk rolleri okunabilirlik, düzen ve durum ayrımı içindir; eğitim etkisi kanıtı değildir. 0/1/X metinsel olarak da gösterilir. İlk ekran görüntüleri desktop/mobile landing, docs ve atölyede incelendi; bağımsız görsel incelemeleri sürüyor.
- Landing yarım toplayıcı önizlemesinde A ve B girişleri değiştirilebilir; AND taşıma ve XOR toplam sonuçlarıyla sinyal yolları anlık güncellenir. Dört giriş çifti için sınırlı, yalnızca açık sayfa belleğinde kalan keşif göstergesi var. Verilog satırları devre tanımını gösterir ve giriş değerleri değişince değişmez.
- Etkileşim önerileri: kullanıcının seçim ve duraklatma/çıkış kontrolü, açıklayıcı ve nazik doğruluk geri bildirimi, sonu görünür kısa görevler; streak kaybı, geri sayım baskısı, değişken ödül, zorunlu bildirim, leaderboard ve sonsuz akış kullanılmaması. Bunlar literatürün Ludus üzerindeki sonuçları değil, eğitim/çocuk iyi oluşu kaynaklarına dayalı tasarım hipotezleridir.
- Renk ve gamification bulgularını başarı/bağımlılık iddiasına çevirmemek; öğrenci görüşlerini izinli biçimde alıp örneklem sınırını korumak gerekir.

## Çoklu `.bp` modül birleşimi: 2026-11-23

- Bir açık blueprint'in `name` alanı modül kimliğidir. Bir modül örneği `{ type: "module", module: <hedef blueprint name>, name: <örnek adı> }` biçimindedir.
- Modül giriş portları hedef blueprint'teki `input` bloklarının adları, çıkış portları `output` bloklarının adlarıdır. Araçlıktaki `BP MODÜLLERİ` listesi diğer açık blueprint'leri modül olarak ekler.
- Bir proje 1–8 benzersiz `.bp` sekmesi taşır; modül adları benzersiz, bağımlılıklar döngüsüz olmalı. Modül başına en fazla 8 giriş ve 8 çıkış portu desteklenir.
- Simülasyon ve Verilog, `.bp` hiyerarşisini düzleştirip tek üst Verilog modülünde birleştirir. İç modül register/yazmaç durumları da üst tasarımla aynı tick/reset geçişlerine katılır.
- Her açık BP yerel depolamada birlikte saklanır. Dışa aktarma hâlâ etkin `.bp` dosyasını verir; başka cihaza proje taşırken bağımlı BP dosyaları ayrı ayrı içe aktarılmalıdır.
- Doğrulama: tüm yarım toplayıcı giriş vektörleri, modül portları, eksik modül, modül döngüsü, iç içe register tick/reset, 320–1440 px atölye akışı, yerel saklama/yükleme ve Icarus ile kombinasyonel + sıralı modül simülasyonu.


## Yerel quiz prototipi

- `/quiz/` sayfasında sekiz soruluk A ve B formları bulunur. İki form da aynı dağılımı izler: dört paralel mantık yolu tahmini (birincil puan), iki blok-Verilog eşleme ve iki clock/yazmaç sorusu (ikincil puanlar).
- Sonuçlar form toplamı ve üç alt puan olarak sayfada gösterilir; yanlış yanıtlara kısa açıklama verilir. Yanıtlar yalnız açık sayfanın JavaScript belleğinde durur; sonuç/katılımcı/süre saklanmaz. API isteği veya analitik kodu yoktur.
- A/B formlarının konu ve beceri eşlemesi, her formda A–D doğru konumu dengesi ve form çiftleri arasında doğru konumun değişmesi otomatik testle doğrulanır. Bu, pedagojik geçerliği veya saha uygulamasında gerçek test eşdeğerliğini kanıtlamaz. İnsan katılımcılı ölçümden önce danışman ve MEB izin dosyasıyla gözden geçirilmeli; gerekirse soru ve puanlama değiştirilmelidir.

## Ürün ve yayın kararı

- Site GitHub Pages ve Jekyll ile yayımlanacak.
- Sunucu tarafı dinamik sisteme gerek yok. Devre Atölyesi etkileşimli olacaksa bu etkileşim tarayıcıda çalışabilir; sunucu tarafı bileşen gereksinimi şu an yok.
- Ana uygulama ve istemcinin gördüğü her içerik Türkçe olacak: tanıtım metni, yayımlanan dokümantasyon, menüler, araç ipuçları, hatalar ve Devre Atölyesi etiketleri. İç geliştirme notları İngilizce olabilir. Verilog anahtar sözcükleri, kod örnekleri, `top.bp` gibi dosya adları ve teknik özel adlar çevrilmeyecek.
- Ana site üç bölüm: **Tanıtım**, **Dokümantasyon**, **Devre Atölyesi**. Bunlar Türkçe arayüz için geçici adlardır.
- Sıralı mantık bu projenin ilk ürün kapsamındadır; clock/register davranışı temel öğrenme başlıklarından biridir.
- İlk kullanıcı seviyesi lise öğrencileriyle sınırlı tutulmayacak: ortaokul öğrencilerinin ve ortalama başlangıç seviyesindeki kişilerin anlayabileceği açıklık hedefleniyor. Değerleri onluk biçimde göstermek/işletmek başlangıç yükünü azaltabilir; gerçek Verilog'un bitli/ikili donanım modelini yanlış anlatmamak için onluk gösterim ile donanım gösterimi gerektiğinde açıkça eşleştirilecek.
- Öğrenme etkisi birden çok beceriyle incelenebilir; yöntem taslağında bir birincil sonuç (paralel bağımsız yolların çıktısını tahmin) ve iki ikincil sonuç (blok↔Verilog okuma/eşleme, clock kenarında register güncellemesi) önerildi. Quiz, ön-test/son-test ve mümkünse eşdeğer anlatım karşılaştırmasıyla ölçülecek; soru havuzu ve protokol danışmanla kesinleştirilecek. İnsan katılımcılı denemeden önce gerekli MEB izni ve onamlar alınmalı.
- İlk MVP tarayıcıda çalışacak; masaüstü uygulaması ve fiziksel FPGA kartına programlama kapsam dışı. Tarayıcı benzetimi, `.bp` blueprint ve Verilog çıktısı hedefleniyor.
- Özgünlük için güncel bulgu (2026-11-23): CircuitVerse resmî belgeleri şema kurma/simülasyon, timing diagrams, hiyerarşi ve deneysel Verilog export'ı doğruluyor. Canlı misafir editörde giriş/çıkış/kapı/sıralı öğe paleti görüldü; aynı devreyi kurma denemesi tekrarlanan `transformCallback` tarayıcı hataları yüzünden bitirilemedi. VPLAS 2025 makalesi kod alıştırmalarına devre şeması ve timing waveform desteği ekliyor; 2026 teknik raporu Verilog code fill-in görevlerini genişletiyor. “İlk/tek” iddiası ve yalnızca blok+kod+devre görünümünü özgünlük saymak desteklenmiyor. Aday dar fark, öğrencinin blok grafiğini kendisinin kurması ve aynı grafiğin kod/değer gösterimlerini anlık alması; benzer araçlarda bulunmadığı henüz kanıtlanmadı. Ayrıntı ve sınırlamalar `research/references/related-tools.md` içinde.
- Simülasyon sözleşmesi uygulanıp belgelenmiştir: bir tik yükselen clock kenarıdır; duraklatma/durdurma register durumunu korur; reset ayrı eylemdir ve aktif-yüksek asenkron olarak yazmaçları 0 yapar; başlangıçta bilinmeyen `X` sinyalleri görünürdür. `.bp` yerel saklama, içe/dışa aktarma ve modül bileşimini destekler. Kullanıcıya dönük açıklama `docs/bloklar.md` içindedir.
- TÜBİTAK başvuru hedefi lise kategorisi 2204-A, mevcut ekip şimdilik iki öğrencidir. 2026-11-23 tarihinde yayımlanmış 2026–2027 çağrısı ve rehber incelendi; doğrulanmış yükümlülükler `research/tubitak/2027-2204-a.md` içindedir. Ekip üyelerinin güncel lise kaydı/yaşı henüz ayrı ayrı teyit edilmedi.
- 2026-11-23 ek araştırma dump'ı: Kullanıcı, quiz sonucu ve Playground süresini kendi sunucusunda saklama ve kullanıcı ad-soyad, yaş, okul/eğitim düzeyi/sınıf, 100 üzerinden puan ve süre alanlarını alma fikrini önerdi. Bu, henüz uygulanması onaylı veri şeması değildir. TTKB 2025 kılavuzu, imzalı gönüllü katılım/veli onam formlarında ad-soyad olabileceğini fakat veri toplama aracında ad-soyad ve kişisel bilgi istenmemesini açıkça belirtiyor; quiz/API payload'ından isim-soyisim çıkarılmalı. Örneklem, veri sorumlusu ve eşleştirme ihtiyacı karara bağlanmadan KVKK aydınlatma/açık rıza metni son hâle getirilemez. Ayrıntı `research/privacy/data-collection-plan.md` içinde.
- Ölçümün araştırma taslağı: birincil kazanım, blok↔Verilog eşlemesi ve sinyal izini kullanarak basit Verilog örneklerindeki bağımsız paralel yolların çıktısını doğru tahmin etmektir; Verilog eşleme ve clock/register bilgisi ikincil alt sonuçlar olabilir. Sadece post-quiz puanı ve süre, Ludus'un öğrenmeye katkısını göstermez; mümkünse eşdeğer süre/içerikte karşılaştırmalı ön-son ölçüm, değilse sınırlı pilot olarak raporlanmalı. Bu taslak danışman onayı/ölçüm aracı değildir. `research/measurement/learning-study.md`.
- Kullanıcı örneklemi netleştirdi: Konya/Adil Karaağaç MTAL hem ekip hem katılımcı okulu; katılımcılar lise öğrencileri olacak. Bu çalışma ortaokulda etkiyi kanıtlamaz; ortaokul için erişilebilir tasarım hedefi korunur ama eğitim etkisi iddiası lise başlangıç düzeyi örneklemle sınırlanır. Yaşın alt grup analizi için değeri henüz gösterilmedi; mevcut öneri tam yaş toplamamak, gerekçeli sınıf bandı ihtiyacını danışman/MEB'e sormak.
- Okul içi gönüllü bulma tercih ediliyor. Öneri: izin ve okul kararı sonrası tarafsız sınıf duyurusu, uygun sınıflardan gönüllüler, öğrencinin baskısız katılımı ve 18 yaş altı için veli onamı. Mümkünse gönüllüler Ludus ve aynı süreli basit metin/şema koşuluna rastgele ayrılır; yeterli katılımcı yoksa ön-son tek grup pilotu olur ve nedensel katkı iddiası sınırlanır. Ad-soyad quiz'de yok; tam yaşın gerekçesi yoksa toplama.
- MEB izin başvurusunu danışman zorunlu eğitim öğrencisi/2204-A yolundan yapar. Proje bilgisi, danışman imzalı taahhüt, bilgilendirme-gönüllü katılım formu, quiz/veri toplama araçları ve öğrenci örnekleminde veli onamı gerekir. Tek il başvuru süresi en çok 15 gündür; okul içi araştırma olması izin gereğini kaldırmaz. Uygulama/araç araştırmasında örneklem okulunu başvuru özel bilgi alanında belirtme seçeneğini danışman/Konya İl MEM ile teyit et.
- GitHub Pages statik yayındır ve API çalıştırmaz; frontend başka erişilebilir bir API'ye POST atabilir. Öğrencinin `localhost` adresi Necati'nin sunucusu değildir. Ev sunucusunun dışarıdan HTTPS üzerinden erişimi, CORS/preflight, tunnel/third-party transfer, endpoint güvenliği ve KVKK sorumluluğu ayrıca çözülmelidir. Hiçbir API veya veri toplama henüz kurulmadı. Ayrıntı `research/architecture/github-pages-post.md`.
- FPGA'nın paralel donanım modeli özellikle görünür ve anlaşılır anlatılacaktır. Bağımsız donanım yolları aynı anda çalışabilir; register'lar durumu clock kenarında günceller, veri bağımlılıkları ise mantıksal yollarda sıralı ilerleyiş yaratır. Tanıtım "her işlem aynı anda olur" diye genelleme yapmayacak.
- Devre Atölyesi fiziksel elektrik akımını değil, mantıksal sinyallerin akışını ve clock kenarında register durumlarının değişimini gösterecek.

### 2026-11-23 — İlk web arayüzü prototipi

- Jekyll iskeleti, Türkçe tanıtım, Başlangıç/Kullanım/Bloklar/Yerel kullanım ve kurulum docs sayfaları ve responsive çok panelli Devre Atölyesi taslağı oluşturuldu. Görsel dil DaisyUI 5 + Tailwind CSS 4 üzerinde özel açık tema ve sistem fontlarıyla kuruldu.
- Playground şu an sabit yarım toplayıcı blueprint'ini gösteriyor. A/B girişleri değişiyor; toplam XOR, taşıma AND, SVG mantık yolları ve değişken değerleri eşzamanlı güncelleniyor. Oynat dört giriş vektörünü, Duraklat mevcut değeri korumayı, Başa al 00 durumunu gösteriyor. Verilog görüntüsü bu örneğin sabit kodudur.
- Bu ilk prototipte sürükle-bırak blok düzenleme, blueprint ekleme/kaydetme, dinamik Verilog üretimi, clock/register simülasyonu, quiz, API veya kullanıcı verisi toplama yoktur. Bunlar tamamlanmış özellik olarak tanıtılmayacak.
- GitHub Pages için CSS'i npm ile derleyip resmi Jekyll Pages action'ıyla derleme workflow'u eklendi. PR derlemesi Pages ayarından bağımsızdır; otomatik yayın `PAGES_ENABLED=true` deposal Actions değişkeniyle açılır. Repo görünürlüğü ve Pages yayın durumu backlog'da izlenir.

### Tanıtım sayfasında anlatılacaklar

- Verilog öğrenirken görülen başlangıç güçlükleri ve dijital mantıkla HDL arasındaki geçiş.
- Bloklarla kurulan devrenin nasıl gerçek Verilog'a dönüştüğü.
- Görsel devre, benzetim ve HDL çıktısının birlikte öğrenmeye nasıl hizmet ettiği.
- Projenin açık kaynaklı oluşu ve katkı biçimi.
- Öğrenme sürecini hızlandırma/öğrenme eğrisini dikleştirme hedefi. İddia sonuç gibi değil, projenin hedefi olarak anlatılacak; etki araştırma/benchmark ile ölçülürse sonuç sonradan eklenir.

## Site haritası ve dokümantasyon

Dokümantasyon kısa tutulacak ama temel parçaları kapsayacak. Her blok kendi amacı, giriş/çıkışları ve örneğiyle açıklanacak.

| Bölüm | İçerik taslağı |
|---|---|
| Başlangıç | Devre Atölyesi'ni açma, ilk blueprint'i oluşturma, giriş ve çıkış ekleyip ilk devreyi çalıştırma |
| Kullanım | Arayüzün ana bölgeleri, dosya/sekme düzeni, benzetim kontrolleri ve kaydetme |
| Bloklar | Desteklenen her bloğun ne yaptığı, portları ve kısa kullanım örneği |
| Yerel Kullanım ve Kurulum | Depoyu indirme, Jekyll bağımlılıkları, yerel önizleme ve değişiklik katkısı |

Bu sayfa başlıkları Türkçe arayüz için geçici karşılıklardır; asıl bölüm kapsamları kullanıcının verdiği taslağı izler.

## Görsel yön ve referanslar

- Genel hedef: estetik, sürükleyici, teknik ama yeni başlayanları ürkütmeyen bir görünüm. Arayüz, oyun motoru editörlerinin tanıdık düzeninden esinlenebilir; doğrudan Unreal arayüzünü kopyalamak şart değil.
- Dokümantasyon için Unity yardımının başlık/konu hiyerarşisi ve gezinme düzeni referans olabilir.
- Hamartia yardım sayfası da referans: üstte ürün/gezinme çubuğu, solda konu ağacı, ortada okunabilir içerik, sağda sayfa içi başlıklar; koyu arka plan ve mavi vurgu kullanımı. Bu yapı Ludus Circuitus'un görsel kimliğine göre uyarlanacak.
- Hamartia adresinde yazım önemli: Necati'nin verdiği `https://necoti.github.io/hamartia/` adresi `o` harfi nedeniyle 404 veriyor. Depo sahibi `Nec0ti` (sıfır); etkin GitHub Pages adresi `https://nec0ti.github.io/hamartia/`. Sayfa Playwright ile 2026-11-22 tarihinde açılarak incelendi.
- Unity referansı: [Unity User Manual](https://docs.unity3d.com/Manual/index.html). Hamartia: [Hamartia yardım sayfası](https://nec0ti.github.io/hamartia/).

## Devre Atölyesi arayüz taslağı

İstenen masaüstü düzeni, birden fazla panelden oluşan klasik editör hissi verir:

1. **Üst menü:** sol üstte Dosya, Görünüm, Yeni BP gibi menüler; sekme/dosya işlemleri.
2. **Benzetim araçlığı:** Oynat, Duraklat, Durdur, tik hızı ve benzetimle ilgili kontroller.
3. **Sol araçlık:** seçilebilir/tuvale yerleştirilebilir küçük blok kümesi.
4. **Orta blueprint tuvali:** birden fazla `.bp` sayfası/sekmesi açılır; bağlantılar burada kurulur.
5. **Sağ panel:** blueprint ile eşzamanlı devre/kapı görünümü; altında gerçek Verilog çıktısı.
6. **Alt panel:** kullanıcı değişkenlerini ekleyip düzenlediği değişkenler alanı.

Blueprint modülleri Unreal Blueprint'in modüler çalışma fikrinden esinlenerek `top.bp`, `adder.bp` gibi ayrı belgeler olarak uygulanmıştır. Kullanıcı açık `.bp` modülleri arasında geçiş yapabilir; üst modül çağrısı port adlarıyla bağlanır ve kaynak grafikten Verilog üretilir. Şema, sınırlar ve kullanım akışı `docs/kullanim/`, `docs/bloklar/` ve `assets/js/project.mjs` ile belgelenir/uygulanır.

### Açık teknik ayrımlar

- **Çözüldü:** tek tik yükselen kenardır; duraklatma/durdurma durumu korur; aktif-yüksek asenkron reset register'ları 0'a alır; ilk değer `X`'tir. Animasyon fiziksel yayılma gecikmesi göstermez.
- **Çözüldü:** değişken paneli giriş/çıkış, ara sinyal ve yazmaç değerlerini izler. Sabit/parametre ve çok bitli değerler MVP dışında.
- **Çözüldü:** `.bp` belgeleri yerel saklanır ve içe/dışa aktarılır; açık belgeler port adlarıyla modül olarak çağrılabilir.
- **Çözüldü:** sinyaller 1-bit'tir; 0/1 görünümü aynı tek-bit değeri olarak eşlenir; çok bitli bus MVP kapsamında değildir.
- Ortaokul öğrencileriyle quiz/ön-son test yapılmadan önce MEB izni, veli onamı ve gönüllü katılım belgeleri nasıl alınacak; bu döngü 2204-A takvimine yetişecek mi?

## İlk sürüm için önceki taslak

Önceki taslak giriş/çıkış sinyalleri, AND/OR/NOT/XOR, devre görünümü, canlı Verilog ve doğruluk tablosunu önermişti. 2026-11-23'te Necati bunu netleştirdi: sıralı mantık ilk ürün kapsamındadır ve FPGA'daki paralel donanım modeli özellikle öğretilmelidir. Çok modüllü `.bp` belgeleri ve değişken paneli de ürün yönünün parçasıdır; ilk gösterimdeki kesin blok kümesi hâlâ seçilecek.

## Test ve benchmark yaklaşımı

Necati'nin kuralı: zorlayıcı test veya benchmark başarısızsa değişikliği Git'e push etme. Benchmarklar yalnızca kod biçimlendirmesini değil, ürünün gerçekten doğru çalışmasını ölçmeli.

İlk taslak ölçümler (henüz benchmark şartnamesi değil):

- Desteklenen küçük devrelerde bütün giriş birleşimlerini değerlendir; simülatör sonucu, doğruluk tablosu ve üretilmiş Verilog simülasyonu eşleşmeli.
- Clock kenarlarında register durum geçişlerini, reset davranışını ve oluşan sinyal izlerini beklenen sonuçlarla karşılaştır.
- Bağımsız mantık kollarının aynı clock aralığında birlikte ilerleyişini ve bağımlı kolların doğru sinyal sırasını doğrula; paralel anlatımı ardışık yazılım adımıymış gibi modelleme.
- Birden fazla `.bp` modülünün bağlantısı ve üst modülden alt modüle port eşlemesi doğru olmalı.
- Kaydet/yükle döngüsünde bağlantılar, değişkenler ve modül ilişkileri kaybolmamalı; geçersiz dosya anlaşılır hata vermeli.
- Devre Atölyesi'nde blok ekleme/bağlama/silme ve canlı sağ panel üretimi tutarlı kalmalı.
- Büyük veya hatalı blueprint'lerde süre, bellek ve doğrulama hataları ölçülmeli; eşikler ve benchmark veri kümesi ayrıca yazılmalı.

Sürekli tümleşim (CI) ve push engeli bu taslaklar kararlaştırıldıktan sonra kurulacak. Eşikler belirlenmeden performans sonucu iddia edilmez.

## Kararlar

- Site üç bölümden oluşacak: tanıtım, dokümantasyon ve Devre Atölyesi.
- Yayın platformu GitHub Pages; site üretimi Jekyll.
- Kullanıcıya dönük metinler ve dokümantasyon Türkçe.
- Devre Atölyesi çok modüllü `.bp` blueprint dosyalarını ve bunlardan üretilen gerçek Verilog'u gösterecek.
- Arayüzde sol blok araçlığı, üst menü/benzetim kontrolleri, orta çok sayfalı blueprint tuvali, sağ canlı devre ve Verilog paneli, alt değişkenler paneli fikri var.
- Blok sayısı en aza yakın ve öğrenmesi kolay tutulacak.
- Geliştirme sırasında alt ajanlar, zorlayıcı benchmark/test kapıları, sık commit ve büyük değişikliklerde çekme isteği (PR) kullanılacak. Başarısız kapıyla push veya birleştirme yapılmayacak.

## Açık ürün ve araştırma soruları

- Ortaokul başlangıç düzeyi erişilebilir hedef olarak net; quiz/test ile ölçülecek tam kazanım ve araştırma sorusu ne olacak?
- CircuitVerse ve VPLAS gibi mevcut araçlardan sonra Ludus'un kanıtlanabilir özgün katkısı hangi tam öğrenme problemidir?
- Öğrenme eğrisi hedefi nasıl ölçülecek; tanıtım sayfasında ne kadar iddialı yazılabilir?
- İlk blok kümesi ve her bloğun davranış/port sözleşmesi ne?
- `.bp` veri modeli ve modül bağlantı kuralları ne olacak?
- Değişkenler, sinyaller, parametreler ve sıralı durum birbirinden nasıl ayrılacak?
- Resetin seviyesi/türü ve başlangıç değerleri nasıl ayarlanacak; animasyon temposu gerçek donanım gecikmesi iddia edecek mi?
- İlk eğitimde onluk kullanıcı değerleriyle bit genişliği/ikilik gösterim arasındaki bağlantı nasıl anlaşılır kılınacak?
- Zorlayıcı benchmarkların veri kümesi, süre/performans eşikleri ve sürekli tümleşim kapıları ne?
- Masaüstü önceliği ve dar ekran davranışı nasıl olacak?
- İki ekip üyesinin 2204-A lise/yaş uygunluğu ve danışman seçeneği nasıl doğrulanacak; MEB ve etik izin takvimi ne?
- 2026–2027 çağrısının 4 Ocak 2027 son tarihine kadar tamamlanmış proje ve izinli öğrenme ölçümü yetiştirilebilir mi?

## Kaynak ve dayanak

- Ürün kapsamı, `.bp` fikri, ekran düzeni, Türkçe gereksinimi ve geliştirme akışı Necati'nin 2026-11-22 tarihli bu oturumdaki proje dump'ından alınmıştır.
- Görsel/dokümantasyon örnekleri: [Hamartia yardım sayfası](https://nec0ti.github.io/hamartia/) (Playwright ile 2026-11-22 tarihinde incelendi) ve [Unity User Manual](https://docs.unity3d.com/Manual/index.html).
- Genişletilmiş etiketli kaynaklar, Verilog örnekleri ve 2027 çağrı notu: [`research/README.md`](research/README.md), [`research/references/index.md`](research/references/index.md) ve [`research/tubitak/2027-2204-a.md`](research/tubitak/2027-2204-a.md).
- Yakın eğitim çalışmaları: web tabanlı Verilog alıştırma sistemi VPLAS (Hsieh vd., 2025) ve blok tabanlı programlamaya dair meta-analiz/karşılaştırma. Bunlar benzer ürünleri ve ölçüm tasarımını anlamak için kaynak; Ludus'un ortaokul seviyesinde etkisini ispatlamaz. İnceleme notu [`research/references/education-studies.md`](research/references/education-studies.md) içindedir.
- Paralel ve clock'lu FPGA donanımını anlatırken yararlanılacak birincil kaynaklar: [Intel FPGA'da paralellik modellerinin donanıma eşlenmesi](https://www.intel.com/content/www/us/en/docs/oneapi-fpga-add-on/developer-guide/2024-0/mapping-parallelism-models-to-fpga-hardware.html) ve [FPGA donanım tasarımı kavramları](https://www.intel.com/content/www/us/en/docs/oneapi-fpga-add-on/developer-guide/2024-2/concepts-of-fpga-hardware-design.html). Bu kaynaklar bağımsız işlemlerin aynı anda çalışmasını, clock/register davranışını, bağımlılıkları ve pipeline ödünleşimlerini açıklıyor.
- Önceki proje taslağı: İkinci Beyin içindeki `notes/tubitak-fpga-egitim-araci.md` kaydı. Oradaki kapı/doğruluk tablosu önerileri bu depoda henüz uygulama kararı değildir.
- 2026–2027 2204-A çağrısı ile 2025 MEB Araştırma Uygulama İzinleri Yönergesi/TTKB kılavuzu 2026-11-23'te resmî sayfalardan doğrulandı ve `research/` altında özetlendi. Uygunluk, seçilecek örneklem ili, okul süreçleri ve güncel başvuru belgeleri başvuru anında yeniden teyit edilmeli.
- TÜBİTAK ön değerlendirme kriter bağlantısı şu anda 2025 formuna yönleniyor. Formun görünen ağırlıkları (problem/soru %20, yöntem %20, yaratıcılık/etki %30, sonuç/tartışma %30) 2027 için kesinleşmiş kabul edilmemeli; yeni form başvurudan önce kontrol edilmeli.


### 2026-11-23 — Üç yüzey için görsel kalite kapıları

- Landing, docs ve Devre Atölyesi ayrı worktree'lerde bağımsız görsel ajanlarca masaüstü ve mobil boyutlarda incelendi; bulunan mobil etiket, docs menü yüksekliği/okuma süresi ve atölye ikincil metin okunabilirliği sorunları düzeltildi.
- Son ekran kontrolleri: landing mobil devre etiketleri yaklaşık 11–12 px; docs ana başlığı 390×844'te y=643; docs yatay taşmasız ve tek etkin bölüm açık; atölye değiştirilen yardımcı metinleri koyu yüzeylerde 6.5:1 üstü kontrastla okunuyor.
- Playwright hizalama ve mobil içerik konumu eşiği ile WCAG kontrast eşikleri `npm test`/`npm run test:e2e` kapılarına eklendi; mevcut Pages workflow bu testleri PR'da çalıştırır.
- İnceleme raporu: [`raports/visual-review-2026-11-23.md`](raports/visual-review-2026-11-23.md). Açık kullanım notu: atölye mobil tuvali yatay kaydırılır ve kaydırma gereksinimi görsel olarak belirtilmiyor.


### 2026-11-23 — Görsel güncellemenin yayını

- Görsel benchmarklar ve bağımsız incelemeler geçtikten sonra PR #2 `bfaf4b18` merge commit'iyle `main`e alındı. Main Pages build, Verilog oracle'ı, E2E ve deploy başarılı. Canlı site `https://nec0ti.github.io/ludus-circuitus/`.
- Deploy sonrası canlı Chromium kontrolü mobil landing/docs ve Devre Atölyesi'ni açtı; docs ilk ekran başlığı y=642.875, açık grup sayısı 1, taşma ve JS hatası yok. Atölyede 7 blok yardım bağlantısı var. Ayrıntı görev günlüğünde.

### 2026-11-23 — Quiz araç taslağı gözden geçirmesi

- Ayrı worktree'de yapılan quiz denetimi, ilk sürümde cevap konumlarının yalnızca B/C'de kaldığını ve birincil maddelerin çoğunlukla kapı doğruluk tablosu sorduğunu buldu. Yerel prototipte seçenekler A–D arasında dengelendi; birincil havuza iki bağımsız `assign` yolunun hem çıkışlarını hem paralel ilişkisini birlikte sorması sağlandı; A/B beceri anahtarı ve test eşikleri tanımlandı.
- [`research/measurement/quiz-blueprint.md`](research/measurement/quiz-blueprint.md) kazanım belirtkesi, soru çifti eşlemesi, cevap anahtarı, puanlama ve sınırlılıkları içerir. A/B formları hâlâ aday taslaklardır; istatistiksel eşdeğerlik, madde güçlüğü, geçerlik veya ortaokul/lise anlaşılabilirliği kanıtlanmış değildir. Katılımcı verisi toplama/API yoktur.


### 2026-11-23 — Quiz belirtkesi canlıya alındı

- PR #3 (`ce89a00`) `52ae1ebb` merge commit'iyle `main`e geçti. PR build ve ana dal Pages build/deploy (`45232526762`) başarılı.
- Canlı quiz'de p2'nin her seçeneği hem AND/XOR değerlerini hem paralel/seri ilişkiyi söylüyor; doğru seçenek ikisini doğru kuruyor. 390 px'te yatay taşma yok; local/session storage boş, GET harici istek yok.
- A/B'nin eşdeğerliği ve soruların geçerliği kanıtlanmış değildir. Bu sürüm alıştırma olarak kullanılabilir; okul araştırmasında kullanmak için danışman/öğrenci incelemesi ve MEB onayı beklenir.


### 2026-11-23 — Ara sinyal ve değişken paneli

- **Karar/uygulama:** Değişken panelinin MVP kapsamına adlandırılmış ara sinyaller eklendi. Ara Sinyal bloğu bir girişten aldığı değeri çıkışına combinational olarak geçirir; 0/1/X değerini saklamaz ve saati beklemez. Alt panel bu bloğun canlı değerini gösterir.
- **Verilog karşılığı:** Verilen ad bir yerel `wire` olarak üretilir ve bağlı kaynakla `assign` edilir. İsimler Verilog tanımlayıcı kurallarına uyar, modül içi giriş/çıkış/ara sinyaller arasında benzersizdir; register kullanılan tasarımlarda `clk` ve `reset` ile çakışamaz. Aynı `.bp` modülü birden fazla kullanılırsa düzleştirilmiş kodda ara sinyaller örneğe göre adlandırılır.
- **Kapsam sınırı:** Sabitler, parametreler ve çok bitli değişkenler eklenmedi. Değer saklama için var olan Yazmaç kullanılır. `.bp` sürümü 1 değişmedi; yeni node tipi `signal` eklemelidir.
- **Doğrulama kaydı:** Uygulama/test ayrıntıları `backloglog.md` içindeki 2026-11-23 ara sinyal girdisinde.

- Ara Sinyal değişikliği PR #4 ile `452c539` commit’inde birleştirildi. PR kontrolü ve main Pages build/deploy başarılı; canlı `https://nec0ti.github.io/ludus-circuitus/playground/` smoke testinde blok/yeni sekme yardım hedefi doğrulandı ve POST/diğer yazan istek görülmedi. Ayrıntı `backloglog.md` içindeki aynı tarihli kayıt ve `/tmp/ludus-ab3a75f-{1440,390}.png` görsel kontrolüdür.


### 2026-11-23 — Yerel katkı/test kurulumu

- Yerel proje için Node.js 22, Ruby/Bundler, Git gerekir; Playwright E2E ayrıca Python 3 ve Chromium, `test:verilog` ise Icarus `iverilog`/`vvp` ister. Repo şu anda Ruby sürümünü pinlemiyor.
- `npm run test:e2e`, Jekyll'i çalıştırmaz; güncel `npm run build:css` ve `bundle exec jekyll build` ardından `_site` klasörünü Python sunucusuyla açar. Linux Playwright kurulumunda OS bağımlılıkları `--with-deps` ile kurulabilir. Ayrıntı güncel `docs/yerel-kurulum.md` içinde.

- Yerel katkı kılavuzu PR #5 (`6276373`) ile main'e alındı; PR build, main Pages build/deploy başarılı. Canlı `/docs/yerel-kurulum/` içeriği güncel Node 22/Python/Icarus/Jekyll/Playwright komutlarını içeriyor. Ayrıntı `backloglog.md`.


### 2026-11-23 — MVP blok kataloğu ve davranış sözleşmesi

- **Katalog kararı:** Giriş, Çıkış, AND, OR, XOR, NOT, Ara Sinyal, Yazmaç; başka açık `.bp` dosyaları araçlıkta dinamik modül bloğu olur. Yeni mux, sabit, bus/çok bitli aritmetik veya bağımsız clock bloğu eklenmedi. AND/OR/NOT temel işlemleri, XOR parite/yarım-toplayıcı öğrenimini, Ara Sinyal adlı ara noktayı incelemeyi, Yazmaç ise clock'lu durumu kapsar. Bu, başlangıç MVP'si için ürün kapsamı kararıdır; matematiksel olarak en küçük Boolean taban iddiası değildir.
- **Port sözleşmesi:** `input: —→out`; `output: in→—`; `and/or/xor: a,b→out`; `not: in→out`; `signal: in→out`; `register: d→out/Q`; `module: child input names→child output names`. Port dokümanı `docs/bloklar.md` içindedir.
- **Reset/izleme:** Atölye Reset eylemi saati beklemeden register'ı 0 yapar. Verilog çıktısı 1 olduğunda asenkron çalışan aktif-yüksek `reset` portu üretir. Register ilk başta `X`; input ilk başta 0. Ara Sinyal combinational wire'dır, state saklamaz. Sinyal renkleri mantıksal değerlerin durumunu gösterir; propagation delay/gerçek hız değildir.

- **Onluk/bit eşlemesi:** İlk MVP'de her sinyal tek bit. Arayüzde 0 veya 1 onluk değer olarak görünür; Verilog'da bu doğrudan 1-bit `0` veya `1` değerine karşılık gelir. Arada sayı tabanı dönüşümü veya çok bitli bus yoktur. Başlangıçta değerini bilmediğimiz register `X` olur; girişler başlangıçta 0'dır. Çok bitli değerler pedagojik gereksinim doğduğunda ayrı tasarlanacak.

### 2026-11-23 — Teknik doğrulama korpusu ve merge kapısı

- `research/quality/benchmark-gates.md` benchmark kurallarını kaydeder: 12 sabit tohumlu 40 kapılı devre, Icarus ile 252 dört-durum karşılaştırması, 500 birleşmiş blok sınırı ve modül fanout kaynak testi.
- Validator artık hiyerarşik modül genişleme boyutunu flatten etmeden sayar; 500 sınırının üzerini hemen reddeder. Eşik, önceden `validateBlueprint` tarafından yalnız genişleme sonrası örtük uygulanıyordu.
- GitHub `main` için `main-requires-green-build` ruleset ID `27927079` aktif. `main` PR ve güncel `build` CI check'i gerektiriyor; bypass yok, onay sayısı 0. `build` Node testleri, Icarus, Jekyll ve Playwright'ı içerir. Bu, workflow-only kurulumun engelleyemediği doğrudan main push'unu da korur.

### 2026-11-24 — 2204-A rehber, TYBS Yapay Zekâ beyanı ve katılımcı etiği

- **Resmî kaynakla doğrulandı:** 2026–2027 çağrı sayfasının yayımladığı 2027 Proje Rehberi §2.3 (basılı ss. 61–63), insan davranışını ölçen deneyler için anlaşılır bilgilendirme, yazılı gönüllü onam ve etik kurul iznini; anketler için gönüllülük, kurum izni, 18 yaş altındakilerde veli onayı ve gizliliği açıklar. Aynı çağrı sayfası MEB paydaşlarıyla araştırma için MEB Araştırma Uygulama İzin Belgesi ister.
- **Resmî kaynakla doğrulandı, sürüm sınırı var:** Çağrı sayfasının şu an bağladığı TYBS başvuru kılavuzu `2025-2026` dosya adında ve 2026 TYBS kılavuzu. §2.4 başvuru ekranında KVKK aydınlatma metni ile “Yapay Zekâ kullanım beyanı” olduğunu söyler. 2027 kılavuzu veya giriş gerektiren canlı formdaki beyan metni/seçenekleri doğrulanmış değildir.
- **Açık soru:** TTKB'nin 2025 kılavuzu ilgili zorunlu-eğitim öğrencisi MEB izin başvuru yolunda etik kurul belgesi istemiyor; bu, TÜBİTAK'ın 2027 Proje Rehberinde insan deneyi için belirttiği ayrı etik kurul koşulunun uygulanıp uygulanmadığını yanıtlamıyor. Ludus öğrenme quizinin hangi etik sınıfa girdiği danışman/izin merciyle netleştirilmelidir. Bu soru çözülmeden okul katılımcısıyla veri toplama başlamaz.
- Kaynak ve ayrıntı: [`research/tubitak/2027-2204-a.md`](research/tubitak/2027-2204-a.md), [`research/tubitak/evaluation-alignment-2027.md`](research/tubitak/evaluation-alignment-2027.md). Başvuru sayfası ve 2026 TYBS kılavuzu resmî TÜBİTAK bağlantılarıdır.

### 2026-11-24 — Yakın Verilog araçlarında canlı görev gözlemi

- HDLBoard'un canlı tarayıcı arayüzünde Verilog yarım-toplayıcı, sanal kartın SW girişleri ve LED çıkışlarıyla çalıştırıldı; dört ikili vektörün XOR/AND sonuçları doğru izlendi. Bu arayüz kod + kart simülatörüdür; kapı şeması düzenleyicisi değildir.
- VeriSim'in hazır Gate-Level Half Adder örneği Icarus/WASM ile çalıştırıldı; konsolun dört vektör sonucu ve VCD/waveform alanı görüldü. Denenen akış kod/testbench odaklıydı.
- İki araç da Ludus'un benzerlerinin bulunabileceğini gösteriyor; “ilk/tek” iddiası yapılmamalı. Aday katkı, öğrencinin düzenlediği blueprint ile gerçek Verilog ve mantıksal sinyal değerlerini aynı başlangıç görevinde birlikte kurmasıdır. Bu henüz karşılaştırmalı veya pedagojik olarak kanıtlanmış değildir.
- Kaynak/oturum ayrıntıları [`research/references/related-tools.md`](research/references/related-tools.md) içinde. İnsan katılımcı/veri kullanılmadı.

### 2026-11-24 — Ek eğitim aracı taraması ve katkı sınırı

- Verilog Labs'ın 4-bit sayaç dersinde tarayıcı Icarus/WASM, editör, testbench, çıktı/waveform, eğitim yönergesi, statik diyagram ve quiz akışı görüldü. Half-adder bölümü 00/01/10/11 görevinde çalıştırılamadı.
- HDLPath paneli adaptif problem önerisi, konu ilerleme/hâkimiyet ve 182 problem iddiası gösterdi; Half-adder sorusu listede kilitliydi, çalıştırılmadı.
- ChipXpert ürün sayfası öğrenme laboratuvarları, Verilog simülasyonu, waveform ve HDL sentez/netlist özelliklerini listeliyor; canlı aynı görev çalıştırılmadı.
- VeriSim README'si canlı denemede görülmeyen, HDL'den sentezlenen Gate/RTL şemalarını da belgeledi. Ludus'un aday farkı “şema ve kodu bir arada göstermek” kadar geniş tutulmamalı: kullanıcı bağlantı grafiğinin kaynak olması ve aynı öğrenme adımında üretilen Verilog ile mantıksal sinyal değerlerinin beraber gösterilmesi, denenen akışlarda gözlenmeyen bir hipotezdir; alan yazını/pazar taraması tam değildir ve benzersizlik kanıtı değildir.
- Ayrıntı ve kaynaklar [`research/references/index.md`](research/references/index.md) ile [`research/references/related-tools.md`](research/references/related-tools.md) içinde. Canlı araç bakışlarında katılımcı veya kişisel veri kullanılmadı.
