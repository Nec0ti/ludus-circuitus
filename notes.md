# Proje notları

Bu dosya proje hakkında paylaşılan bilgilerin düzenlendiği çalışma belleğidir. Her yeni bilgi için kaynağı, karar durumunu ve belirsizliği koru. Necati'nin açıkça kararlaştırmadığı ayrıntıları kesinleşmiş gibi yazma.

## Proje fikri

**Çalışma tanımı:** Ludus Circuitus, Verilog öğrenmeye görsel bloklarla başlanan; kullanıcının oluşturduğu blueprint'i gerçek Verilog kodu ve devre davranışıyla yan yana gösteren açık kaynaklı bir eğitim projesidir. Unreal Engine Blueprint fikri, çok modüllü proje kurma deneyimine ilham veriyor.

Verilog'da modüller, bağlantılar ve HDL sözdizimi başlangıç düzeyinde öğrenmeyi zorlaştırabilir. Ürün; görsel kurulumdan gerçek HDL'e geçişi görünür kılarak bu öğrenme eşiğini düşürmeyi hedefliyor. Bu bir amaç ve tanıtım yönüdür; öğrenme etkisi ölçülmeden kanıtlanmış sonuç olarak sunulmayacak.

## Ürün ve yayın kararı

- Site GitHub Pages ve Jekyll ile yayımlanacak.
- Sunucu tarafı dinamik sisteme gerek yok. Devre Atölyesi etkileşimli olacaksa bu etkileşim tarayıcıda çalışabilir; sunucu tarafı bileşen gereksinimi şu an yok.
- Ana uygulama ve istemcinin gördüğü her içerik Türkçe olacak: tanıtım metni, yayımlanan dokümantasyon, menüler, araç ipuçları, hatalar ve Devre Atölyesi etiketleri. İç geliştirme notları İngilizce olabilir. Verilog anahtar sözcükleri, kod örnekleri, `top.bp` gibi dosya adları ve teknik özel adlar çevrilmeyecek.
- Ana site üç bölüm: **Tanıtım**, **Dokümantasyon**, **Devre Atölyesi**. Bunlar Türkçe arayüz için geçici adlardır.
- Sıralı mantık bu projenin ilk ürün kapsamındadır; clock/register davranışı temel öğrenme başlıklarından biridir.
- İlk kullanıcı seviyesi lise öğrencileriyle sınırlı tutulmayacak: ortaokul öğrencilerinin ve ortalama başlangıç seviyesindeki kişilerin anlayabileceği açıklık hedefleniyor. Değerleri onluk biçimde göstermek/işletmek başlangıç yükünü azaltabilir; gerçek Verilog'un bitli/ikili donanım modelini yanlış anlatmamak için onluk gösterim ile donanım gösterimi gerektiğinde açıkça eşleştirilecek.
- Öğrenme etkisi birden çok beceriyle incelenebilir; yöntem taslağında bir birincil sonuç (paralel bağımsız yolların çıktısını tahmin) ve iki ikincil sonuç (blok↔Verilog okuma/eşleme, clock kenarında register güncellemesi) önerildi. Quiz, ön-test/son-test ve mümkünse eşdeğer anlatım karşılaştırmasıyla ölçülecek; soru havuzu ve protokol danışmanla kesinleştirilecek. İnsan katılımcılı denemeden önce gerekli MEB izni ve onamlar alınmalı.
- İlk MVP tarayıcıda çalışacak; masaüstü uygulaması ve fiziksel FPGA kartına programlama kapsam dışı. Tarayıcı benzetimi, `.bp` blueprint ve Verilog çıktısı hedefleniyor.
- Özgünlük için kritik erken bulgu: CircuitVerse browser schematic editing/simulation, sequential parts, subcircuits/multiple tabs, local save, decimal converter ve Verilog export özelliklerini resmî dokümanlarında anlatıyor; export deneysel uyarısı var. VPLAS da web tabanlı Verilog öğretim ve otomatik alıştırma sistemi. “Bunları ilk yapan” iddiası yapılmayacak; Ludus'un ölçülebilir dar farkı araştırma ve uygulamalı kıyasla bulunacak. Ayrıntı `research/references/related-tools.md` içinde.
- Simülasyon başlangıç tercihi onaylandı: bir tik bir yükselen clock kenarıdır; duraklatma/durdurma register durumunu korur; reset ayrı eylemdir; başlangıçta bilinmeyen `X` sinyalleri görünürdür. `.bp` için yerel saklama ile içe/dışa aktarma tercih edildi. Ayrıntılı kullanım sözleşmesi uygulama öncesi yazılacak.
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
- GitHub Pages için CSS'i npm ile derleyip resmi Jekyll Pages action'ıyla derleme workflow'u eklendi. PR derlemesi Pages ayarından bağımsızdır; otomatik yayın `PAGES_ENABLED=true` deposal Actions değişkeniyle açılır. GitHub resmî dokümanına göre Pages kaynak özel olsa bile desteklenen planda site herkese açık olabilir. Depo şu an özeldir; sitede yalnızca açık kaynaklı yayımlanma hedefi olarak ifade edilir. Görünürlük kararı öncesi yayın açılmayacak.

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

Blueprint modülleri Unreal Blueprint'in modüler çalışma fikrinden esinlenerek `top.bp`, `adder.bp` gibi ayrı belgeler olacak. Kullanıcı `.v` dosyalarını elle kurmak yerine `.bp` modülleri arasında geçiş yapar; sistem bunların karşılığında gerçek Verilog üretir. Dosya biçiminin iç şeması henüz kararlaştırılmadı.

### Açık teknik ayrımlar

- Onaylı başlangıçta bir tik tek yükselen kenar; duraklatma/durdurma durumu korur, reset ayrıdır ve `X` görünür. Resetin aktif seviyesi, senkron/asenkron seçimi, ilk değer ayarları ve animasyonun fiziksel zamanla ilişkisi uygulama sözleşmesine bağlanmalı.
- Değişken paneli hangi kavramları tutacak: giriş/çıkış, ara kablo, sabitler, parametreler veya durum/register değerleri? Ayrı kavramlar gereksiz blok çeşitliliği yaratmayacak şekilde seçilmeli.
- `.bp` belgesi nasıl kaydedilecek, başka bir modülü nasıl çağıracak ve Verilog modülüne nasıl eşlenecek?
- Sadeleştirilmiş başlangıçta onluk sayı gösterimi hangi genişlik/sınır kurallarıyla gerçek Verilog bit vektörlerine çevrilecek?
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
