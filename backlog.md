# İş listesi

Bu dosya güncel iş panosudur. Yalnızca açık kararları ve son doğrulama durumunu gösterir; tamamlanan işlerin tarihçesi `backloglog.md` içindedir.

## Açık işler

### Danışmanla netleştir

- [ ] “Sadece 1 bitin dışına çık” yönlendirmesini netleştir: ürün yalnız 1 bit mi olmalı, yoksa mevcut 1–32 bitlik yollar sürmeli mi? Yanıt gelene kadar mevcut kapsamı ve `.bp` uyumluluğunu koru; daraltma yapma.
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
- [~] Geçmiş yarışma örneklerini araştırmayı sürdür. 2023 ve 2024 Konya bölgesi derece listeleri tarihli Internet Archive kopyalarından indirildi/hash'lendi; 2023–2025 dokuz başlık sınırlı biçimde tarandı. 2025 listesi ve 2026 başlıksız davet PDF'si için doğrudan/Wayback dosya erişimi bulunamadı; Konya MEM kaynakları bazı derece kayıtlarını kısmen destekliyor. Bu tarama başvuru için güncel TÜBİTAK arşivi değildir ve özgünlük kanıtı sayılmaz. Ayrıntı: [`research/tubitak/past-award-title-scan.md`](research/tubitak/past-award-title-scan.md).
- [ ] Ölçüm yapılmadıkça tanıtımda öğrenme artışını sonuç gibi ileri sürme. İzinli çalışma biterse ölçüm, sınırlılık ve örneklemle birlikte raporla.
- [ ] TÜBİTAK ÜYZ rehberine göre geliştirme ve başvuru hazırlığında kullanılan yapay zekâ/dış araç desteğini danışmanla doğru beyan et; öğrenci katkısını olduğundan farklı göstermeme. Ayrıntı: [`research/tubitak/2027-2204-a.md`](research/tubitak/2027-2204-a.md).

## Son sürüm durumu

- MVP'nin web uygulaması, Devre Atölyesi, altı modüllü başlangıç kursu ve yerel quiz'i GitHub Pages'te yayında. Teknik doğruluk benchmarkları ve Playwright kapıları geçmiştir; bunlar öğrenme etkisini kanıtlamaz.
- Referans alınan son ana ürün yayını PR #43 (`f1d7f4b`). CI `45315138623` başarılı; Pages build/deploy tamamlandı. Son yayında Tanıtım, Dokümantasyon ve Devre Atölyesi rotaları HTTP 200 döndü.
- Pages concurrency PR #49 (`db10412`) ile workflow/ref'e göre ayrıldı. En son araştırma güncellemesi PR #52 (`cd4f456`) CI `45322307642` ve main Pages build/deploy [`45322453097`](https://github.com/Nec0ti/ludus-circuitus/actions/runs/45322453097) ile geçti. Sonrasında tanıtım, docs ve atölye rotaları HTTP 200 döndü.
- Araştırma yöntemi, ölçme aracının geçerliği, katılımcı izinleri, KVKK veri akışı ve öğrenme etkisi hâlâ çözülmemiştir. Ayrıntılı kanıt ve geçmiş görevler [`backloglog.md`](backloglog.md) ile [`raports/overnight-quality-review-2026-11-24.md`](raports/overnight-quality-review-2026-11-24.md) içinde.
