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

### 24 Kasım ek kaynak ve canlı araç taraması

- 2027 Proje Rehberi §2.3 ve yarışma sayfasındaki TYBS kılavuzu yeniden kontrol edildi. İnsan davranışı/anket çalışması için bilgilendirme, gönüllü yazılı onam, reşit olmayanlarda veli onayı, gizlilik ve MEB izni görünür koşullar; kısa quizin ayrıca etik kurul kapsamına girip girmediği danışman/izin merciyle netleşmeli. Çağrı sayfasına bağlı 2026 TYBS kılavuzunda genel “Yapay Zekâ kullanım beyanı” adımı var, ancak 2027 canlı formunun tam metni doğrulanmadı. Ayrıntı: [`2027-2204-a.md`](../research/tubitak/2027-2204-a.md).
- HDLBoard üzerinde canlı Verilog half-adder, SW0/SW1 ve LED çıktılarıyla 00/01/10/11 vektörlerinde doğru çalıştı. VeriSim hazır Gate-Level Half Adder örneğinde doğru dört sonuç, VCD ve waveform görüldü. VeriSim'in README'si ayrıca sentezlenmiş Gate/RTL şeması belgeliyor; canlı akışta kullanıcı çizimi kaynak blueprint'i gözlenmedi.
- Verilog Labs'ın sayaç dersinde editör, Icarus/WASM, waveform ve quiz; HDLPath'te adaptif problem/progress paneli görüldü. İki üründe de half-adder eş görevini çalıştırıp ölçemedik. ChipXpert Lab özellikleri ürün sayfasından incelendi, laboratuvar çalıştırılmadı. Bu araçlar adım adım HDL öğretimi, quiz, waveform ve simülasyonun yeni olmadığını gösteriyor; Ludus'un editlenebilir blueprint → Verilog + canlı mantıksal değer akışı yalnızca test edilmesi gereken bir ürün hipotezidir.
- Güncel Pages yayını `45299489446` başarılı. Nix Chromium ile güncel Pages artifact'ında Playwright 38/38, Node 27/27, Icarus scalar/hiyerarşik ve 1.920 vektör-çıkış karşılaştırması geçti. Live landing/docs/workbench/quiz 200. Desktop 1440×900 ve workbench mobile 390×844 görüntüleri hizalama/taşma bakımından incelendi; bağımsız görsel incelemesi bloklayıcı bulmadı. Küçük ekran devre etiketleri küçük olabilir; yakınlaştırma mevcut.
- Araştırma güncellemeleri PR #29 (`1cdeee8`), #30 (`0771490`) ve #31 (`a7f3d28`) ile yeşil CI sonrası birleştirildi. PR #31'in build run'ı `45302122322`; main Pages run `45302304568` build ve deploy'u tamamladı. Sonrasında canlı landing, docs, atölye ve quiz yeniden HTTP 200 verdi.

## Üretken yapay zekâ şeffaflığı

TÜBİTAK'ın ayrı ÜYZ rehberi başvuru sahibi kapsamına öğrencileri de alıyor; destekleyici kod yardımı doğrulama ile mümkün, önemli ÜYZ katkısının başvuru hazırlığında beyanı gerekiyor ve AI ile üretilmiş görsellerin belirtilmesi isteniyor. Bu rehber görsel tasarımın iyi görünmesini yasaklamaz; gerçek katkının gizlenmesini desteklemez. 2204-A başvuru ekranındaki güncel beyan sorusu ve projenin kapsamı danışmanla kontrol edilmeli. Kaynaklar [`2027-2204-a.md`](../research/tubitak/2027-2204-a.md) içinde.

## Sonraki adımlar

- CircuitVerse'te ortak görevi tamamlayıp bağımsız doğrula; VPLAS canlı uygulamasına erişim bulunursa aynı görevi kaydet. Verilog Labs/HDLPath kilitli yarım-toplayıcı görevleri bu oturumda çalışmadı; doğrudan kıyas henüz tamamlanmış sayılmaz.
- Danışmanla öğrenme kazanımı, örneklem ve karşılaştırma yöntemini kararlaştır; izin/onam dosyalarını tamamlamadan öğrenci verisi toplama.
- Başvuru öncesi 2204-A kriter PDF'lerinin sürümünü yeniden kontrol et.
