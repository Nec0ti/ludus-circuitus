# Quiz ve çalışma alanı veri akışı incelemesi — 2026-11-24

## Kapsam ve yöntem

Kod ve HTML kaynakları ayrı bir worktree'de salt okunur incelendi. Quiz, landing ve Devre Atölyesi içinde kişisel veri alanları, cevap/puan/süre kaydı, ağ gönderimi, tarayıcı depolaması, analytics ve service worker arandı. Bu, uygulama koduna yönelik kaynak denetimidir; sunucu/CDN sağlayıcı erişim günlüklerini veya ağ katmanının dış davranışını doğrulamaz.

## Bulgu

- Quiz'de yaş, sınıf, ad-soyad veya katılımcı kodu formu yoktur. Form A/B seçimi ve 8 soru gösterilir. Yanıtlar `assets/js/quiz.mjs` içindeki sayfa belleğinde tutulur; sonuç ve alt puanlar DOM'a çizilir. Form sıfırlanınca bellek temizlenir.
- Quiz'de gerçek oturum süresi ölçümü yoktur; sayfadaki yaklaşık dört dakika bir içerik tahminidir. Cevap, puan ve süre `fetch`, XHR, `sendBeacon`, `localStorage` veya `sessionStorage` ile gönderilmez ya da kalıcılaştırılmaz.
- Playground blueprint belgelerini `assets/js/playground.mjs` üzerinden tarayıcı `localStorage` alanına kaydedip geri yükler. Bu sunucuya gönderim değildir. Paylaşılan cihazda yerel çalışma kalabilir; serbest dosya adlarına veya node etiketlerine kullanıcıların kişisel bilgi yazma ihtimali vardır.
- İncelenen HTML ve JavaScript'te quiz analitiği, service worker veya katılımcı verisi için bir API isteği bulunmadı.

## İzin ve gizlilik açısından sonuç

Şu anki quiz, araştırma verisi toplama sistemi değil, yerel bir alıştırmadır. Bu inceleme KVKK uygunluk onayı değildir. Katılımcılı veri toplama/API tasarımı için veri sorumlusu, amaç ve asgari alanlar, hukuki dayanak, erişim/günlükler, saklama-imha, okul/MEB izni ve öğrenci/veli belgeleri önce kararlaştırılmalıdır; ayrıntı [`research/privacy/data-collection-plan.md`](../research/privacy/data-collection-plan.md) içindedir.

GitHub Pages/CDN gibi yayın altyapılarının standart erişim günlükleri bu kaynak incelemesinin dışındadır. Bu yüzden ürün metni “sitede hiçbir veri işlenmiyor” diye genişletilmemelidir. Yalnızca quiz cevaplarının ve puanının uygulama kodu tarafından sunucuya gönderilmediği söylenebilir.

## Doğrulama izi

- `quiz/index.html`: kimlik alanı bulunmayan quiz ve yerel işleme açıklaması.
- `assets/js/quiz.mjs`: yanıtların bellekte tutulması, skor gösterimi ve reset.
- `assets/js/playground.mjs`: blueprint'in yerel tarayıcı depolaması.
- Denetimde `fetch`, `XMLHttpRequest`, `sendBeacon`, `serviceWorker`, `analytics`, `sessionStorage` ve quiz için ağ gönderimi bulunmadı.

