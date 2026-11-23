# İş listesi

Bu dosya güncel iş panosudur. İşleri bitebilir parçalara ayır ve engelleri açıkça yaz.

## Devam ediyor

- İlk çalışan uygulama MVP'si: tam ekran Devre Atölyesi, pure graph motoru, çok modüllü `.bp` bileşimi, yerel anonim quiz, modüler docs ve Türkçe landing hazır; görsel QA, ana CI kapıları ve Pages yayını doğrulandı. Kalan: içerik/öğrenme aracı kapsamı ile ölçüm planının danışmanla kesinleştirilmesi.
- `.bp` modül bileşimi uygulandı ve doğrulandı. Quiz prototipi tamamlandı; araştırma ölçüm aracı olarak kullanımı için danışman/okul incelemesi bekliyor.

## Sıradaki işler

- [ ] Birincil kazanım ve ikincil quiz alt sonuçlarını (paralel yollar; blok↔Verilog; clock/register) danışmanla ve örneklem düzeyiyle uyumlu kesinleştir.
- [ ] CircuitVerse ve VPLAS'ı aynı başlangıç göreviyle uygulamalı karşılaştır; Ludus'un kanıtlanabilir farkını ürün ve araştırma sorusuna bağla.
- [x] Kaynaklı renk/okunabilirlik araştırmasına göre koyu-yumuşak paleti seçip landing'e ve dokümantasyona uygula; atölye temasını ayrı tut. Öğrenme etkisi iddiası değil, okunabilirlik ve durum ayrımı gerekçesiyle seçildi.
- [x] Landing'i somut devre etkileşimli bir hikâyeye dönüştür; tamamlanan görev ve merak ilerlemesi kullan, baskılı streak/infinite scroll ekleme. Yarım toplayıcı 4 giriş durumunu sayfa belleğinde gösterir; ağ/kalıcı izleme yok.
- [x] Docs'u eğitim portalı olarak yeniden kur: açılır/kapanır ana gruplar, alt başlıklar, içerik içi gezinme ve her sayfa/bölüm için yaklaşık okuma süresi.
- [x] Modül bileşimi uygulandıktan sonra `.bp` oluşturma/yeniden kullanma kılavuzunu gerçek kullanım adımlarına geçir.
- [x] Ana sayfa, docs ve atölye için ayrı iş-kopyası worktree'lerinde görsel alt ajan incelemesi yap; hizalama/taşma/kontrast benchmarklarını CI'a ekle. Üç bağımsız inceleme ve son düzeltme geri kontrolleri geçti; eşikler CI testlerine bağlandı. Ayrıntı: [`raports/visual-review-2026-11-23.md`](raports/visual-review-2026-11-23.md).
- [x] Araçlık bloklarının yanındaki yardım işaretleri hover/focus özeti gösterir ve hedef docs anchor'ını yeni sekmede açar.
- [x] Çocuklara uygun ama manipülatif olmayan motivasyon etkileşimlerini öğrenme kanıtı hipoteziyle eşleştir. (Özerklik, yetkinlik, sınırlı görev ve sağlıklı durma önerileri araştırma notunda; Ludus etkisi kanıtlanmış değil.)
- [x] Quiz belirtke tablosu, madde beceri eşlemesi, dengeli cevap anahtarı ve puanlama protokolü taslağını oluştur; A/B formları hâlâ araştırma geçerliği/eşdeğerliği kanıtlı değildir. Ayrıntı: [`research/measurement/quiz-blueprint.md`](research/measurement/quiz-blueprint.md).
- [ ] Danışman/alan öğretmeniyle kazanımları ve maddeleri gözden geçir; okul içinde gönüllü/karşılaştırma koşulunu belirle ve MEB izin dosyasında onaylat.
- [x] MVP blok kümesini ve port sözleşmesini tanımla. Giriş/çıkış + AND/OR/XOR/NOT + adlandırılmış ara sinyal + yazmaç + dinamik `.bp` modülü; sabit/MUX/çok bit/clock bloğu MVP dışında.
- [x] `.bp` dosya modeli, birden fazla blueprint'in açılması ve modül çağırma/port kurallarını belirle ve çalışan editör akışına bağla.
- [ ] Onluk kullanıcı değerleri, Verilog bit genişliği ve ikilik fiziksel davranış arasındaki pedagojik eşlemeyi tasarla.
- [x] Değişken paneli kapsamını belirle ve adlandırılmış Ara Sinyal bloğunu ekle. Giriş/çıkış/yazmaç ve ara sinyallerin canlı değerleri görünür; sabit/parametre yönetimi MVP dışında.
- [ ] Zorlayıcı test/benchmark şartnamesi, veri kümesi, eşikler ve başarısız kontrollerde push engelini tasarla.
- [ ] Gerçek Verilog üretimini, benzetimi ve `.bp` kaydet/yükle akışını benchmark kapılarından geçir.
- [x] Yerel kurulum, önizleme, katkı ve yayın akışını son MVP'ye göre tamamla; Node 22, Python 3, Icarus Verilog ve `_site`/E2E sıralaması belgelendi, Playwright kontrolü eklendi.
- [ ] İki öğrencinin 2204-A lise/yaş uygunluğunu ve varsa danışman koşulunu teyit et.
- [ ] Danışman öğretmeni belirle; Adil Karaağaç MTAL'deki örneklem sınıfı, tarafsız gönüllü çağrısı ve iki çalışma koşulu için okul yönetimiyle plan yap.
- [ ] Öğrencilerle öğrenme testi yapılacaksa MEB izni, veli onamı ve gönüllü katılım akışını başlat.
- [ ] İnsan katılımcılı quiz için KVKK aydınlatma, gerekiyorsa ayrı açık rıza, öğrenci/veli gönüllü katılım ve veri saklama-imha belgelerini danışmanla tamamla; quiz aracında katılımcı adı/kişisel bilgi isteme.
- [ ] Veriyi alacak veri sorumlusunu, araştırma örneklemini, sunucu erişimini ve kişisel veri güvenliği tedbirlerini belirlemeden API endpoint'i veya canlı veri toplamayı açma.
- [ ] Başvuruda yalnızca tamamlanmış proje sunulması şartına göre MVP, quiz, analiz ve rapor takvimini doğrula.
- [ ] Tanıtım sayfasındaki öğrenme etkisi iddialarını araştırma/ölçüm sonuçlarıyla destekle; sonuç yoksa hedef olarak ifade et.

## Tamamlandı

- [x] Proje çalışma kılavuzunu ve kalıcı kayıtları oluştur.
- [x] İlk proje fikrini, ilk sürüm önerisini ve açık soruları kaydet.
- [x] Özel GitHub deposunu `Nec0ti/ludus-circuitus` adıyla oluştur, yerel klasörü bağla ve `main` dalını gönder.
- [x] Playwright 1.56.1'i `npx` üzerinden çalıştırıp GitHub sayfasına ulaştığını doğrula.
- [x] Üç bölümlü Türkçe site, Devre Atölyesi taslağı, referanslar ve geliştirme kalite kurallarını proje kayıtlarına işle.
- [x] Sıralı mantığın kapsamda olduğunu, FPGA paralelliğinin öğretileceğini ve animasyonun mantıksal sinyalleri göstereceğini netleştir.
- [x] Hedefi ortaokul düzeyine kadar erişilebilir olarak belirle; quiz/test ölçümünü, tarayıcı MVP'sini ve simülasyon varsayımlarını onayla.
- [x] Öncelikli TÜBİTAK ve frontend becerileri araştırması için kapsam belirle.
- [x] 2026–2027 TÜBİTAK 2204-A kurallarını ve etiketli ürün/dil kaynaklarını `research/` altında araştırıp düzenle.
- [x] DaisyUI ve ek frontend-design becerilerini proje ortamına kur; ön koşulları ve Jekyll entegrasyon notlarını kaydet.
- [x] TÜBİTAK öğrenme ölçümü, KVKK/MEB katılımcı verisi ve GitHub Pages POST sınırları için kaynaklı araştırma taslağı hazırla; özgün katkı hipotezini daralt.
- [x] Jekyll/Tailwind iskeletini, Türkçe tanıtım ve dört docs sayfasını, responsive çok panelli playground prototipini ve Pages workflow'unu oluşturup yarım toplayıcı etkileşimini tarayıcıda doğrula.
- [x] README ve sayfa metinlerini mevcut taslak durumunu doğru gösterecek şekilde güncelle; drag-drop, codegen, sıralı mantık ve kayıt özelliklerinin henüz olmadığını belirt.
- [x] Öğrenme ölçümü için yeterli gönüllüde eşit süreli karşılaştırma, yetersiz örneklemde nedensel iddiasız tek grup pilotu ve ad-soyadsız kaba sınıf bandı tercihlerini kaydet.
- [x] Pure grafik motorunun ilk katmanı: half-adder evaluation, X dahil kapı semantiği, döngü/eksik port/çoklu sürücü reddi, register reset ve toplu kenar güncellemesi, başlangıç Verilog codegen; Node test kapısı.
- [x] `Nec0ti/ludus-circuitus` deposunu açıkça onaylanan şekilde public yap; Git geçmişindeki merge commit kişisel yazar metadatasını kullanıcıya bildir.
- [x] Tam ekran çalışma alanı: blok ekleme, grid taşıma, port bağlama, canlı sinyal paneli, Verilog codegen, yerel belge kaydı ve `.bp` içe/dışa aktarma.
- [x] Ağ isteği ve kalıcı kayıt olmadan yerel quiz prototipi; paralel mantık birincil, Verilog ve sıralı mantık alt puanları; eşlenmiş A/B soru formları.
