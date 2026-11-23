# Ludus Circuitus — gece kalite kontrolü

**Tarih:** 24 Kasım 2026  
**Kapsam:** MVP yayımlama, atölye mobil akışı, sayfa metadata'sı, dokümantasyon ve 2204-A kaynak güncelliği.  
**Bu rapor neyi kanıtlamaz:** Öğrencilerde öğrenme artışını, rakiplere karşı üstünlüğü veya araştırma protokolünün okul/MEB onayını.

## Uygulama ve yayımlama

- PR #15 bozuk yerel `.bp` kaydının varsayılan yarım toplayıcıyı boşalttığı hatayı düzeltti. Kayıt doğrulanmadan çalışma belgelerinin yerini alamıyor; geçersiz veri kullanıcıya ait `localStorage` içeriğini silmiyor. CI: Node 27/27, Icarus scalar/hiyerarşik/vektör oracle'ları (1.920 vektör-çıkış karşılaştırması), Jekyll ve Playwright 36/36. Pages run `45283762587` başarılı.
- PR #17 Jekyll SEO Tag'in ürettiği title/açıklama etiketlerini layout'taki tekrarlarla çakışmaktan çıkardı ve `locale: tr_TR` ayarladı. PR artifact'ı ile canlı dört rotada bir `<title>`, bir açıklama ve `og:locale=tr_TR` görüldü. Pages run `45286285879` başarılı.
- PR #18, 620 px altındaki CSS kuralının üçüncü menü öğesi olan `#export-bp` düğmesini gizlemesini düzeltti. Yeni E2E testi 390×844 görünümünde düğmeyi gösterip `top.bp` indirmesini doğrular. CI Node 27/27, CSS/Jekyll, Icarus ve Playwright 37/37 geçti. Pages run `45287278491` başarılı. Canlı 390×844 Playwright tekrarında düğme görünür, dosya `top.bp`, sayfa hatası yok ve `documentElement.scrollWidth=390`.
- PR #20 resmî 2204-A çağrı/kriter bağlantılarını 24 Kasım'da yeniden kontrol etti. CI run `45288258019`, Pages run `45288530875` başarılı.
- Yayın sonrası landing, docs, playground ve quiz rotaları HTTP 200 döndü.

## Dokümantasyon incelemesi

Bağımsız içerik kontrolü canlı kurs dizinini, kurs planını, altı dersi, kullanım rehberini ve blok kataloğunu açtı. İç sayfa gezinme hedefleri mevcut, sayfa hatası gözlenmedi. Ders yolu tutarlı: sinyal → kapı/doğruluk tablosu → yarım toplayıcı → paralel ve veri bağımlı yollar → clock/yazmaç → Verilog eşlemesi. AND/OR/XOR tabloları, `0101 AND 0011 = 0001` örneği, `1+1=10` yarım toplayıcı sonucu, yükselen clock kenarı ve `X` açıklaması denetlendi; üretilen aktif-yüksek asenkron reset açıklamayla eşleşiyor. Somut kavram veya sıra hatası bulunmadı.

## TÜBİTAK ve rakip kanıtlarının sınırı

- Canlı [2204-A 2026–2027 çağrı sayfası](https://tubitak.gov.tr/tr/yarismalar/2204-lise-ogrencileri-arastirma-projeleri-yarismasi) 4 Ocak 2027 saat 17.30 kapanışını gösteriyor. Ön değerlendirme ve bölge/final bağlantıları hâlâ adında `2025` taşıyan PDF'lere gidiyor. Bu ağırlıklar erişilebilir son formlardır; 2027 formu oldukları doğrulanmış değildir. Ayrıntı: [`research/tubitak/evaluation-alignment-2027.md`](../research/tubitak/evaluation-alignment-2027.md).
- CircuitVerse misafir oturumunda giriş, AND/XOR ve çıkış blokları tuvale eklendi, kablo denendi. Girişi değiştirince contention uyarısı çıktı; kablo güzergâhı hatalı olabilir. Ortak AND/XOR görevinin doğru simülasyon sonucu doğrulanmadı. Bu, CircuitVerse kusuru veya Ludus üstünlüğü iddiası değildir. VPLAS canlı uygulaması denenmedi. Ayrıntı: [`research/references/related-tools.md`](../research/references/related-tools.md).
- Quiz veya atölyede öğrenci/katılımcı verisi kullanılmadı. Quiz sonuçlarını sunucuya gönderme/API toplama açılmadı; araştırma uygulaması okul/MEB izinleri ve gereken onam süreçleri bekliyor.

## Sonraki adımlar

- CircuitVerse ortak görevini doğru kablo yerleşimiyle tamamlayıp sonucu bağımsız doğrula; VPLAS canlı uygulama bulunursa erişilebilirliğini ve aynı görevi kaydet.
- Danışmanla öğrenme kazanımı, örneklem ve karşılaştırma yöntemini kararlaştır; izin/onam dosyalarını tamamlamadan öğrenci verisi toplama.
- Başvuru öncesi 2204-A kriter PDF'lerinin sürümünü yeniden kontrol et.
