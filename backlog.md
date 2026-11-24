# İş listesi

Bu dosya güncel iş panosudur. Yalnızca açık kararları ve son doğrulama durumunu gösterir; tamamlanan işlerin tarihçesi `backloglog.md` içindedir.

## Açık işler

### Danışmanla netleştir

- [ ] Danışman öğretmeni belirle; iki ekip üyesinin 2204-A lise/yaş uygunluğunu ve danışman koşullarını doğrula.
- [ ] Bir birincil kazanımı ve en fazla iki ikincil sonucu, sınıf düzeyini ve erişilebilir örneklem büyüklüğünü danışmanla kesinleştir. Mevcut adaylar: bağımsız paralel yolların sonucunu tahmin etme; blok↔Verilog eşlemesi; clock kenarında yazmaç davranışı.
- [ ] Araştırma düzenini seç: yeterli gönüllü varsa eşit süreli Ludus/metin-şema karşılaştırması; örneklem küçükse nedensellik iddiası taşımayan tek grup pilotu. Gönüllüleri okulda tarafsız ve baskısız çağırma yolunu yönetimle belirle.
- [ ] Quiz maddelerini, cevap anahtarını ve A/B formlarını danışman/alan öğretmeniyle gözden geçir. Mevcut `/quiz/` geri bildirimli bir ürün alıştırmasıdır; geçerliği kanıtlı araştırma aracı değildir ve doğrudan ön-test/son-test aracı olarak kullanılmamalıdır.
- [ ] Başvuru öncesi 2204-A çağrı sayfasındaki değerlendirme formlarının yeni dönem sürümünü ve 2027 TYBS yapay zekâ beyanının kapsamını yeniden kontrol et.

### İzin ve veri koruma

- [ ] Quiz/ön-son test uygulamasının MEB araştırma izni ve etik kurul bakımından hangi yola girdiğini danışman, okul ve ilgili izin merciiyle teyit et. Bu sınıflandırma netleşmeden katılımcı uygulaması yapma.
- [ ] Onaylı örneklem ve araçlara göre MEB izin dosyasını, tarafsız gönüllü davetini, 18 yaş altı için veli onamını ve öğrencinin kendi gönüllü katılımını hazırla.
- [ ] Veri sorumlusunu, amaç ve hukuki işleme şartını, en az veri alanlarını, saklama/imha süresini ve başvuru/çekilme akışını netleştir; gerekiyorsa KVKK aydınlatmasını ve açık rızayı ayrı hazırla. Quiz'e ad-soyad koyma.
- [ ] Sunucu, HTTPS erişimi, ağ günlükleri, güvenlik ve silme akışı onaylanmadan quiz API'sini veya canlı veri toplamayı açma. Şimdiki quiz puan/süre/yanıtları göndermiyor; bu hâlini koru.

### Araştırma kanıtı

- [~] Yakın araçları aynı başlangıç göreviyle karşılaştır ve olası dar katkıyı sınamayı sürdür. HDLBoard, VeriSim ve Verilog Labs'te yarım-toplayıcı çalıştırıldı; CircuitVerse'te aynı görev güvenilir biçimde bitirilemedi, HDLPath görevi kilitli kaldı, VPLAS incelemesi makaleyle sınırlı. Bu gözlemler tam kıyas veya üstünlük kanıtı değildir. Ayrıntı: [`research/references/related-tools.md`](research/references/related-tools.md).
- [~] Geçmiş yarışma örneklerini araştırmayı sürdür. Önceden alınmış 2023–2025 Konya bölgesi derece başlıkları (dokuz Yazılım projesi) ve başlıksız 2026 Konya davet listesi sınırlı tarandı; TÜBİTAK PDF'leri 24.11.2026'da 404 döndü. Konya MEM kaynakları TellCord (2024) ve TİDAP (2025) başlık/derecelerini kısmen destekliyor; 2026 Meram MEM haberi Yazılım alanında üçüncülük söylüyor ama başlık vermiyor. Tam listeler hâlâ eksik. TÜBİTAK arşivi veya başka kalıcı resmî listeyi bulmadan tüm taramayı doğrudan doğrulanmış kaynak gibi sunma. Ayrıntı: [`research/tubitak/past-award-title-scan.md`](research/tubitak/past-award-title-scan.md).
- [ ] Ölçüm yapılmadıkça tanıtımda öğrenme artışını sonuç gibi ileri sürme. İzinli çalışma biterse ölçüm, sınırlılık ve örneklemle birlikte raporla.
- [ ] TÜBİTAK ÜYZ rehberine göre geliştirme ve başvuru hazırlığında kullanılan yapay zekâ/dış araç desteğini danışmanla doğru beyan et; öğrenci katkısını olduğundan farklı göstermeme. Ayrıntı: [`research/tubitak/2027-2204-a.md`](research/tubitak/2027-2204-a.md).

## Son sürüm durumu

- MVP'nin web uygulaması, Devre Atölyesi, altı modüllü başlangıç kursu ve yerel quiz'i GitHub Pages'te yayında. Teknik doğruluk benchmarkları ve Playwright kapıları geçmiştir; bunlar öğrenme etkisini kanıtlamaz.
- Referans alınan son ana ürün yayını PR #43 (`f1d7f4b`). CI `45315138623` başarılı; Pages build/deploy tamamlandı. Son yayında Tanıtım, Dokümantasyon ve Devre Atölyesi rotaları HTTP 200 döndü.
- Araştırma yöntemi, ölçme aracının geçerliği, katılımcı izinleri, KVKK veri akışı ve öğrenme etkisi hâlâ çözülmemiştir. Ayrıntılı kanıt ve geçmiş görevler [`backloglog.md`](backloglog.md) ile [`raports/overnight-quality-review-2026-11-24.md`](raports/overnight-quality-review-2026-11-24.md) içinde.
