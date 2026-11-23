# İş listesi

Bu dosya güncel iş panosudur. İşleri bitebilir parçalara ayır ve engelleri açıkça yaz.

## Devam ediyor

- [~] Türkçe sayfa metadatası: Jekyll SEO Tag kaynaklı ikinci `<title>`/description ve `og:locale=en_US` sorununu iki layout ve site ayarı üzerinden düzelt; üretilmiş landing, docs ve atölye HTML'sinde doğrula.
- [x] 2026-11-24 yerel kayıt toparlanması: `.bp` JSON'u okunabilir olsa bile blueprint şeması geçersizse başlangıç örneğini ezmeden önce kayıt reddediliyor. Bozuk `nodes: null` kaydı için Playwright regresyonu ve tam ürün test kapıları geçti; PR/CI/Pages yayını bu görev günlüğünde ayrıca kaydedilecek.
- [x] 2026-11-24 bütünleştirme: 1–32 bit simülasyon/Verilog, sabit ve seçici blokları; oynatmanın sinyal animasyonuyla sınırlanması; sağ tık arama/sol tık seçim/sağ veya orta tuş pan; grid snap; `.bp` modül çağırma/yeniden adlandırma/silme; sıralı modüler docs ve koyu tema/footer yenilemesi uygulandı. Mobil araçlık katlanır hâle geldi. Node 27/27, Icarus scalar/vector + hiyerarşik/1.920 vektör-çıkış oracle, CSS/Jekyll build ve Playwright 35/35 geçti. Bağımsız desktop/mobile/docs görsel incelemesi bloklayıcı bulmadı. PR #13 `5a7bf999` ile birleştirildi; Pages run `45279402440` build ve deploy başarılı. Canlı landing, `/docs/`, `/playground/` ve `/quiz/` HTTP 200 verdi. Ayrıntı: `raports/workbench-redesign-2026-11-23.md` ve bu görev günlüğü.
- [x] Devre Atölyesi etkileşimlerini endüstriyel çalışma alanına yaklaştır: sonsuz düzlem, imleç merkezli tekerlek yakınlaştırma, yumuşatılmış ortogonal sinyal yolları, araçlıktan sürükle-bırak ve boş tuvalde yazarak blok çağırma. Ana SVG görünürlüğü/port hizası E2E ve bağımsız desktop/mobile QA ile doğrulandı; Node, Icarus, Playwright ve PR CI geçti. PR #11 birleştirildi; Pages dağıtımı `45261362299` başarılı ve doğru `nec0ti.github.io` adresindeki landing/docs/atölye 200 döndürüyor. Ayrıntı: `raports/workbench-redesign-2026-11-23.md`.
- [x] Başlangıç dijital elektronik eğitim yolunu kurs haritası ve altı kısa derse ayır: sinyaller, kapılar, yarım toplayıcı, paralellik, saat/yazmaç ve Verilog eşlemesi. Kullanıcı geri bildirimiyle tek uzun Başlangıç sayfası küçük modüllere bölündü; Jekyll, E2E ve masaüstü/mobil QA geçti. Ayrıntı: `raports/docs-curriculum-review-2026-11-23.md`.

- İlk çalışan uygulama MVP'si: tam ekran Devre Atölyesi, pure graph motoru, çok modüllü `.bp` bileşimi, yerel anonim quiz, modüler docs ve Türkçe landing hazır; görsel QA, ana CI kapıları ve Pages yayını doğrulandı. Kalan: içerik/öğrenme aracı kapsamı ile ölçüm planının danışmanla kesinleştirilmesi.
- `.bp` modül bileşimi uygulandı ve doğrulandı. Quiz prototipi tamamlandı; araştırma ölçüm aracı olarak kullanımı için danışman/okul incelemesi bekliyor.

## Sıradaki işler

- [ ] Birincil kazanım ve ikincil quiz alt sonuçlarını (paralel yollar; blok↔Verilog; clock/register) danışmanla ve örneklem düzeyiyle uyumlu kesinleştir.
- [x] 2026–2027 2204-A için erişilebilir resmî kriterleri Ludus'un kanıtları ve eksikleriyle eşle; teknik doğruluk testlerini öğrenme etkisinden ayır, etik/onam ve öğrenci projeye hâkimiyet koşullarını görünür kıl. Ayrıntı: [`research/tubitak/evaluation-alignment-2027.md`](research/tubitak/evaluation-alignment-2027.md); çağrı sayfasındaki ölçüt PDF'lerinin 2025 adlı dosyalara gittiği not edildi.
- [x] Quiz ve atölye kodundaki mevcut veri akışını bağımsız kaynak incelemesiyle doğrula. Quiz cevap/puan/süre sunucuya gitmiyor; atölye `.bp` belgeleri yerel tarayıcı belleğinde kalabilir. Yayın sağlayıcısı erişim günlükleri incelenmedi. Ayrıntı: [`raports/privacy-flow-review-2026-11-24.md`](raports/privacy-flow-review-2026-11-24.md).
- [x] Final değerlendirme formunda görünen projeye hâkimiyet ölçütü için öğrencilerin kendi cevaplarıyla kullanacağı teknik prova kartı hazırla; hazır savunma metni yazma. Kriter dosyasının 2025 adlı sürüm olduğu ve 2027 için tekrar doğrulanması gerektiği not edildi: [`research/tubitak/project-mastery-rehearsal.md`](research/tubitak/project-mastery-rehearsal.md).
- [~] CircuitVerse ve VPLAS'ı aynı başlangıç göreviyle karşılaştır; Ludus'un kanıtlanabilir farkını ürün ve araştırma sorusuna bağla. 24.11.2026 misafir denemesinde CircuitVerse tuvaline giriş, AND/XOR ve çıkış blokları eklenip kablolar bağlandı; giriş değiştirilince contention uyarısı çıktı ve bunun bizim kablo yerleşimimizden kaynaklanıp kaynaklanmadığı belirlenemedi. Ortak görevin doğru simülasyon sonucu hâlâ doğrulanmadı. VPLAS kanıtı yayımlanmış makalelerle sınırlı; canlı uygulamada denenmedi. Aday katkı Türkçe başlangıç dersinde aynı blueprint'ten blok grafiği, Verilog ve mantıksal sinyali birlikte kurup okumaktır; benzersizlik veya üstünlük iddiası yok. Ayrıntı: `research/references/related-tools.md`.
- [x] Kaynaklı renk/okunabilirlik araştırmasına göre koyu-yumuşak paleti seçip landing'e ve dokümantasyona uygula; atölye temasını ayrı tut. Öğrenme etkisi iddiası değil, okunabilirlik ve durum ayrımı gerekçesiyle seçildi.
- [x] Landing'i somut devre etkileşimli bir hikâyeye dönüştür; tamamlanan görev ve merak ilerlemesi kullan, baskılı streak/infinite scroll ekleme. Yarım toplayıcı 4 giriş durumunu sayfa belleğinde gösterir; ağ/kalıcı izleme yok.
- [x] Docs'u eğitim portalı olarak yeniden kur: açılır/kapanır ana gruplar, alt başlıklar, içerik içi gezinme ve her sayfa/bölüm için yaklaşık okuma süresi.
- [x] Modül bileşimi uygulandıktan sonra `.bp` oluşturma/yeniden kullanma kılavuzunu gerçek kullanım adımlarına geçir.
- [x] Ana sayfa, docs ve atölye için ayrı iş-kopyası worktree'lerinde görsel alt ajan incelemesi yap; hizalama/taşma/kontrast benchmarklarını CI'a ekle. Üç bağımsız inceleme ve son düzeltme geri kontrolleri geçti; eşikler CI testlerine bağlandı. Ayrıntı: [`raports/visual-review-2026-11-23.md`](raports/visual-review-2026-11-23.md).
- [x] Araçlık bloklarının yanındaki yardım işaretleri hover/focus özeti gösterir ve hedef docs anchor'ını yeni sekmede açar; E2E kapsamı ve canlı Pages HTML'i doğrulandı.
- [x] Çocuklara uygun ama manipülatif olmayan motivasyon etkileşimlerini öğrenme kanıtı hipoteziyle eşleştir. (Özerklik, yetkinlik, sınırlı görev ve sağlıklı durma önerileri araştırma notunda; Ludus etkisi kanıtlanmış değil.)
- [x] Quiz belirtke tablosu, madde beceri eşlemesi, dengeli cevap anahtarı ve puanlama protokolü taslağını oluştur; A/B formları hâlâ araştırma geçerliği/eşdeğerliği kanıtlı değildir. Ayrıntı: [`research/measurement/quiz-blueprint.md`](research/measurement/quiz-blueprint.md).
- [ ] Danışman/alan öğretmeniyle kazanımları ve maddeleri gözden geçir; okul içinde gönüllü/karşılaştırma koşulunu belirle ve MEB izin dosyasında onaylat.
- [x] MVP blok kümesini ve port sözleşmesini tanımla. Giriş/çıkış, sabit, AND/OR/XOR/NOT, seçici (MUX), adlandırılmış ara sinyal, yazmaç ve dinamik `.bp` modülü; yeni sinyaller 1–32 bit, genişliği eksik eski `.bp` sinyalleri 1 bit.
- [x] `.bp` dosya modeli, birden fazla blueprint'in açılması ve modül çağırma/port kurallarını belirle ve çalışan editör akışına bağla.
- [x] Onluk kullanıcı değerleri, Verilog bit genişliği ve ikilik gösterim eşlemesini MVP için belirle: girişler onluk gösterilebilir; bit genişliği 1–32 arasıdır; taşan/uyumsuz değerler doğrulanır; başlangıç yazmaç değeri bilinmiyorsa `X` korunur.
- [x] Değişken paneli kapsamını belirle ve adlandırılmış Ara Sinyal bloğunu ekle. Giriş/çıkış/yazmaç ve ara sinyallerin canlı değerleri görünür; sabit bloğu sabit değer üretir, parametre yönetimi kapsam dışıdır.
- [x] Zorlayıcı test/benchmark şartnamesi, veri kümesi ve eşikleri belirle; main için PR + yeşil build zorunlu kuralını açıp GitHub API'den doğrula. Ayrıntı: [`research/quality/benchmark-gates.md`](research/quality/benchmark-gates.md).
- [x] Verilog üretimi, benzetim ve `.bp` içe/dışa aktarma/kayıt akışını kapılardan geçir: 12 × 40 kapılı sabit tohumlu corpus, 252 Icarus karşılaştırması, 500 birleşmiş blok ve 1 MiB aktarım sınırı, yerel saklama/yeniden yükleme E2E.
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
