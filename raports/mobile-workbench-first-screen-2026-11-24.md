# Mobil Devre Atölyesi ilk ekranı — 2026-11-24

## Bulgu ve değişiklik

390 px genişlikte araçlık, blok kategorileriyle birlikte yaklaşık 550–600 px yer kaplıyor; ilk ekranda çalışma tuvali görünmüyordu. 620 px altındaki görünümde araçlık artık erişilebilir bir “Blokları göster/gizle” düğmesiyle açılıp kapanıyor. İlk açılışta yalnızca kısa araçlık başlığı kalıyor ve tuval yaklaşık 283 px'te başlıyor. Masaüstünde araçlık sürekli açık; blok ekleme, yardım bağlantıları ve sürükleme akışı korunuyor.

## TÜBİTAK ölçütleriyle ilişkisi

2026–2027 2204-A yarışma sayfasının bağladığı değerlendirme formlarında hedeflerin ölçülebilirliği, ürünün çalışırlığı/uygulanabilirliği ve bulguların hedefleri desteklemesi yer alıyor. Bu küçük arayüz değişikliği, mobilde çalışma alanına erişimi iyileştiren ürün kullanılabilirliği düzenlemesidir; öğrenme kazanımına etkisinin kanıtı değildir. [2026–2027 çağrı sayfası](https://tubitak.gov.tr/tr/yarismalar/2204-lise-ogrencileri-arastirma-projeleri-yarismasi), [ön değerlendirme formu](https://tubitak.gov.tr/sites/default/files/2025-11/on_degerlendirme_kriterleri_2025_web.pdf), [bölge/final formu](https://tubitak.gov.tr/sites/default/files/2025-11/sergi_kriterleri_2025_web.pdf).

## Doğrulama

- 320 ve 390 px için Playwright E2E: shelf başlangıçta kapalı, ekran yatay taşmıyor, erişilebilir düğme ile açılıyor ve blok kontrolü çalışıyor.
- Tam E2E: 28/28 geçti; mevcut masaüstü sürükle-bırak regresyonu da kapsamda.
- Node: 27/27; Tailwind CSS derlemesi ve `git diff --check` başarılı.
- 390 px ekran görüntüleri: `/tmp/ludus-mobile-shelf-collapsed.png`, `/tmp/ludus-mobile-shelf-open.png`.

## Sınır

E2E işlevi ve yerleşimi doğrular; gerçek öğrenci kullanılabilirlik deneyi veya ekran okuyucu testi değildir. Katılımcı araştırması için okul/MEB izinleri ve gerekli onamlar ayrıca alınmalıdır.
