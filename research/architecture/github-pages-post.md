# GitHub Pages sitesi ve quiz verisine POST

**İnceleme tarihi:** 2026-11-23. Bu dosya mimari notudur; endpoint kurulmamış, kişisel veri toplanmamıştır.

## Kısa cevap

GitHub Pages JavaScript'i quiz bitince `fetch(..., { method: "POST" })` ile başka bir API'ye veri gönderebilir. GitHub Pages'in kendisi API/backend çalıştırmaz; statik HTML/CSS/JS yayımlar. API'nin ayrıca çalışması, internete/belirlenen ağa erişilebilir olması ve GitHub Pages origin'ine uygun CORS yanıtı vermesi gerekir. [GitHub Pages statik yayın açıklaması](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).

## “Yerel sunucum” ne anlama geliyor?

- API adresini `localhost` yaparsak bu her zaman quiz'i açan öğrencinin kendi cihazını gösterir; Necati'nin ev bilgisayarını göstermez.
- `192.168.x.x` gibi LAN adresi yalnızca aynı ağdan yönlendirilebilir; internetten öğrenciler evdeki makineye doğrudan erişemez.
- Ev makinesine internetten erişilecekse DNS/public adres ve TLS sertifikalı HTTPS giriş, router port yönlendirme veya ters tünel/VPN gibi erişim katmanı gerekir. Tünel sağlayıcısı üçüncü tarafsa veri akışının/aktarımın bir parçası olarak değerlendirilmelidir.
- Okul içinde aynı LAN'daki API düşünülebilir; fakat HTTPS Pages'ten özel ağ/HTTP sunucuya erişim tarayıcı güvenlik kuralları, CORS ve destekleyen tarayıcıların Local Network Access izin akışlarıyla sınırlanabilir. Farklı tarayıcı ve cihazlarda denenmeden buna dayalı veri toplama sözü verilmemeli. [Chrome Local Network Access rehberi](https://developer.chrome.com/docs/modern-web-guidance/guides/security/local-network-access), [MDN local network access](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Local_network_access), [mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content).

## CORS ve istek düzeni

`application/json` POST genellikle CORS `OPTIONS` preflight isteği doğurur. API, doğru origin için `Access-Control-Allow-Origin`, `POST`/`OPTIONS` yöntemleri ve kullanılan header'ları izinli döndürmelidir. `no-cors` kullanmak CORS'u güvenli şekilde çözmez; tarayıcı yanıtını opak yapar. Sadece izinli origin yazmak veya CORS yapılandırmak API'yi kimlik doğrulamaz; curl ve başka istemciler sunucuya doğrudan istek atabilir. [MDN CORS rehberi](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS), [Fetch açıklaması](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch).

GitHub Pages JavaScript'i herkese açık olduğundan içinde API anahtarı/token saklanamaz. Veri kabul eden endpoint'in kendisi kötüye kullanım ve geçersiz veriye karşı güvenli olmalı: gövde boyutu ve şema sınırları, beklenen quiz ID/sürümü, sayı aralıkları, tekrar/spam kısıtları, TLS, minimum log, erişim kontrolü, yedek ve imha politikası. KVKK kapsamındaki çocuk katılımcı kayıtlarında kişisel verileri server access/proxy loglarına yazmamak da veri minimizasyonunun parçasıdır.

## Seçenekler

| Seçenek | Nasıl çalışır | Kısıt / risk |
|---|---|---|
| **Tarayıcıda topla, dışa aktar** | Sonuçlar yalnızca oturum tarayıcısında hesaplanır; araştırmacı onaylı ve asgari veriyi okulda yetkili kişiyle kontrollü biçimde aktarır | Eşzamanlı merkezi toplama yok; cihaz kaydı/aktarımı ve ham dosyanın korunması yine gereklidir. |
| **Okul LAN'ında API** | Okul içindeki bilgisayar/özel makine aynı yerel ağdan kabul eder veya uygulama okul ağına yerel olarak sunulur | Ağ/cihaz yönetimi, HTTPS ve tarayıcı local-network permission değişkenliği; okulun BT sorumlusu onayı gerekir. |
| **İnternete açık kendi API'si** | Sunucuya geçerli alan adı ve TLS ile ulaşılır; Pages, izinli origin'den POST gönderir | Ev sunucusunun sürekli erişilebilir ve güvenli tutulması; NAT/tünel, saldırı, yedek ve hukuki veri sorumluluğu. Minör verisi için tüm kontroller kurulmadan kullanma. |
| **Yönetilen API/veri servisi** | Pages, servis sağlayıcısına POST yapar | Sağlayıcı veri işleyen/alıcı olabilir; erişim, saklama, ülke ve KVKK m.9 aktarımı değerlendirilmeden çocuk araştırma verisi gönderilmemeli. |

Bu aşamada tercih önerisi: önce MEB/onam ve veri minimizasyonu kararı ver; sonra endpoint tasarla. İsim/soyisim quiz POST'unda olmayacak. Eğer araştırma başvurusu satır bazında puan/süre toplamayı onaylarsa, önce sınırlı bir sentetik test verisiyle endpointin kabul, loglama, reddetme ve silme akışını doğrula; gerçek katılımcı verisi ancak yazılı izin/onam ve güvenlik gözden geçirmesi sonrası. Bu, henüz alınmış bir uygulama kararı değildir.

### Kaynaklar

- **PRIMARY / HOSTING:** [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site), [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
- **PRIMARY / WEB PLATFORM DOCS:** [MDN CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS), [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), [Local Network Access](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Local_network_access), [Mixed content](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Mixed_content).
- **PRIMARY / SECURITY:** [KVKK data-security obligations](https://www.kvkk.gov.tr/Icerik/2040/Veri-Guvenligine-Iliskin-Yukumlulukler), [KVKK child-data minimization/security guide](../privacy/data-collection-plan.md).
