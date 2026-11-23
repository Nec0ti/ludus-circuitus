# 2204-A ölçütleriyle Ludus kanıt ve açıkları

**Kontrol tarihi:** 24.11.2026. Bu eşleştirme proje planlama notudur; TÜBİTAK puan tahmini, başvuru onayı veya danışman görüşü değildir.

## Güncel resmî ölçüt durumu

2026–2027 (58. yarışma) çağrı sayfası **23.09.2026** tarihinde yayımlandı. Sayfadaki “Ön değerlendirme” ve “Bölge/Final sergi” bağlantıları hâlâ dosya adında `2025` yazan formlara gidiyor. Aşağıdaki ağırlıklar bu sayfadan şu an indirilebilen son formlara aittir; 2027 dönemi için ayrı güncel form görünürse başvuru öncesinde bu not yenilenmelidir.

- Ön değerlendirme: problem/araştırma sorusu 20; yöntem 20; yaratıcılık ve etki 30; sonuçlar ve tartışma 30.
- Bölge/final: problem/araştırma sorusu 15; yöntem 10; yaratıcılık ve etki 15; sonuçlar ve tartışma 20; sunum ve projeye hâkimiyet 40.
- Her iki form da etik ilkelere uyumu eşik koşulu yapıyor: gerekli izinlerin eksikliği, veri bütünlüğü ihlali, kaynak göstermeme, kişisel verilerin gizliliğini ihlal etme veya çalışmanın ekip tarafından geliştirilmediğinin tespiti elenme nedeni.

## Ölçüt → Ludus kanıtı → açık iş

| Ölçüt | Şu an gösterilebilecek kanıt | Eksik kalan / ölçülü sonraki adım |
|---|---|---|
| Problem ve araştırma sorusu | Başlangıç öğrencileri için dijital mantık ile Verilog arasındaki bağı kurma ihtiyacı tanımlı. Birincil kazanım paralel kombinasyonel yolların çıkışlarını tahmin etmek; `research/measurement/learning-study.md` ve quiz belirtkesi kapsamı belirtiyor. | Danışmanla araştırma sorusunu, hedef grubu ve ölçülebilir birincil sonucu kesinleştir. Lise örneklemiyle ortaokul etkisi iddia etme. |
| Yöntem | Mantık motoru ve kod üretimi birbirinden bağımsız test ediliyor; seeded oracle/Icarus eşleştirmeleri, modül ve yazmaç testleri, E2E akışları tekrarlanabilir. Quiz puan anahtarı ve A/B eşlemesi depoda kayıtlı. | Eğitim yöntemini izinli protokol hâline getir: eşit süre/yönerge, ölçme formu, örneklem ve analiz. İzin çıkmadan öğrenci verisi toplama. |
| Yaratıcılık ve etki | Öğrenci aynı bağlantı grafiğini blok düzenleyicide kurup davranış ve Verilog karşılığını birlikte görebiliyor; bunun teknik doğruluğu örnek devrelerle sınanabiliyor. | Bu bir ürün katkısı hipotezi, kanıtlanmış benzersizlik değil. CircuitVerse/VPLAS ve benzerleriyle aynı görevi kurup karşılaştır; bulamadığın özelliği yokmuş gibi sunma. |
| Sonuç, tartışma ve tekrarlanabilirlik | Şu anki sonuçlar yazılım doğruluğuna dair: test komutları, sabit tohum, Icarus oracle ve açık `.bp` örnekleri tekrarlanabilir teknik kanıt sağlar. | Teknik doğruluk, öğrenme artışı değildir. İzinli ölçüm yapılırsa önceden belirlenmiş puanlama, eksik veri kuralı, örneklem sınırı ve sınırlılıkları raporla; ham kişisel veriyi ekleme. |
| Uygulanabilirlik / karşılaştırma | Jekyll/GitHub Pages üzerinde yayımlanabilir statik web aracı; yerel tarayıcıda simülasyon, Verilog ve örnek devreler çalışır. | Başlangıç cihazı/tarayıcısında tamamlanan görevleri ve hataları kaydet; benzer araçlarla aynı görev/süre/yönergeyi kullan. Ürün demosunu karşılaştırma sonucu diye adlandırma. |
| Sunum ve projeye hâkimiyet (şu an bağlı formda %40) | README, docs, araştırma kayıtları ve küçük doğrulama komutları tasarımın nasıl çalıştığını açığa çıkarıyor. | İki öğrenci de kendi katkısını, testlerin neyi kanıtladığını, sınırlarını ve temel kod akışını kendisi açıklayabilmeli. Karar/commit/deney günlüğünü koru; ekip çalışmasını olduğundan farklı göstermeyin. Öğrencilerin kendi cevaplarıyla prova için [`project-mastery-rehearsal.md`](project-mastery-rehearsal.md) kullanılabilir. PDF hâlâ 2025 adlı dosyaya gittiğinden 2027 ölçüt ağırlığını tekrar doğrula. |
| Etik | Quiz şu an yerel ve kimliksiz prototip; kişisel veri API'si ve canlı katılımcı kaydı açılmadı. | Okul/MEB izni, gönüllü katılım ve 18 yaş altındakiler için veli onamı tamamlanmadan araştırma uygulaması yapma. Onaylı araçta gereksiz tanımlayıcı toplama; KVKK aydınlatması ve rıza gerekiyorsa birbirinden ayrı hazırlanmalı. |

Bu tablo “tamamlandı” puanı vermez. Teknik testler, öğrenme ölçümünün ve öğrencilerin projeye hâkimiyetinin yerine geçmez. Yapay zekâ/dış araç desteğini gizlemek, öğrenci katkısının izini silmek veya jüriye ekibin yapmadığı işi yapılmış gibi anlatmak yerine, öğrencilerin gerçekten yaptığı kararları, kodu ve doğrulamayı anlayıp sahiplenmesini sağla; başvuru kılavuzunun güncel açıklama/araç kullanım koşullarına uy.

## Resmî birincil kaynaklar

- [TÜBİTAK 2204-A yarışma ve 2026–2027 çağrı sayfası](https://tubitak.gov.tr/tr/yarismalar/2204-lise-ogrencileri-arastirma-projeleri-yarismasi) — duyuru tarihi 23.09.2026; başvuru kuralları ile güncel kriter bağlantıları.
- [Ön değerlendirme formu (sayfanın mevcut bağlantısı)](https://tubitak.gov.tr/sites/default/files/2025-11/on_degerlendirme_kriterleri_2025_web.pdf) — sayfa 1; problem, yöntem, yaratıcılık/etki, sonuç/tartışma ve etik.
- [Bölge/final değerlendirme formu (sayfanın mevcut bağlantısı)](https://tubitak.gov.tr/sites/default/files/2025-11/sergi_kriterleri_2025_web.pdf) — sayfa 1; ölçüt ağırlıkları ve sunum/projeye hâkimiyet.
- [2027 2204-A Proje Rehberi](https://tubitak.gov.tr/sites/default/files/2026-10/2204A_proje_rehberi_2027.pdf) — özellikle yazılım projeleri bölümü ve araştırma raporu düzeni. PDF bu kontrol sırasında web önizlemesinde zaman aşımına uğradı; proje dosyası hazırlarken doğrudan indirilip doğrulanmalı.
- [MEB Araştırma Uygulama İzinleri sistemi](https://arastirmaizinleri.meb.gov.tr/) ve [TTKB izin başvuru/değerlendirme kılavuzu](https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_07/19211911_arastirmauygulamaizinleribasvuruvedegerlendirmekilavuzu.pdf) — öğrenci/okul uygulaması ve onam belgeleri.

## İlgili proje kayıtları

- [`2027-2204-a.md`](2027-2204-a.md): dönem kuralları ve başvuru takvimi.
- [`../measurement/learning-study.md`](../measurement/learning-study.md): aday kazanımlar, kıyas yöntemi ve örneklem sınırı.
- [`../measurement/quiz-blueprint.md`](../measurement/quiz-blueprint.md): prototip soru eşlemesi ve ölçme sınırlılıkları.
- [`../quality/benchmark-gates.md`](../quality/benchmark-gates.md): yazılım doğruluğu ve tekrarlanabilir oracle kapıları.
- [`../privacy/data-collection-plan.md`](../privacy/data-collection-plan.md): veri minimizasyonu ve izin önkoşulları.
