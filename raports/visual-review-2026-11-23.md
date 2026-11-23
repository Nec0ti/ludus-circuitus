# Görsel kalite incelemesi — 2026-11-23

## Kapsam ve yöntem

Tanıtım sayfası, dokümantasyon ve Devre Atölyesi birbirinden bağımsız worktree'lerde incelendi. Ekran görüntüleri masaüstünde 1440×900/1000, mobilde 390×844 ölçülerinde değerlendirildi. Son düzeltmelerden sonra her bölüm kendi inceleme ajanına tekrar kontrol ettirildi.

Otomatik görsel kapılar `tests/e2e/visual.spec.mjs` ve `tests/visual-colors.test.mjs` içinde; GitHub Actions'taki mevcut Playwright ve Node test aşamaları bunları çalıştırır.

## Bulgular ve düzeltmeler

- **Tanıtım:** masaüstü iki sütun hizası iyi; mobil taşma yok. Devre SVG'sindeki etiketler mobilde yaklaşık 8 px'e küçülüyordu. Mobil yazı boyutu artırıldı; son incelemede A/B/çıkış etiketleri yaklaşık 12 px, AND/XOR yaklaşık 11 px ölçüldü ve çizgilerle çakışmadı.
- **Dokümantasyon:** masaüstü menü ve içerik hizalıydı; mobilde iki uzun menü grubu açık olduğu için içerik başlığı y=836'ya düşüyordu. Yalnız etkin grup açık bırakıldı ve mobil satır aralıkları sıkılaştırıldı. Son ölçümde başlık y=643, menü yüksekliği 439 px; 390 px görünümde taşma yok. Blok kataloğunun menüdeki 3 dk etiketi, içerikle tutarlı şekilde 5 dk yapıldı.
- **Devre Atölyesi:** masaüstü paneller hizalı ve tam ekran; mobil yatay taşma yok. İkincil araçlık/yardım metinlerinin yazı boyutları ve kontrastı artırıldı. Değişen tonlar koyu panel üzerinde 6.5:1'in üzerinde ölçüldü; tekrar incelemede hizalama bozulması görülmedi.

## Otomatik eşikler

- 1440 px'de landing metin/devre dikey merkez farkı en fazla 2 px; başlık en fazla 3 satır.
- Doküman menüsü ve makale başlangıcı en fazla 2 px farkla hizalı; aktif menü grubu mobilde tek açık grup ve ana başlık y<680 px.
- Atölye üç ana sütunun üst ve alt kenarları en fazla 2 px farklı.
- Genel tema metni en az 4.5:1; belirgin devre konturu en az 3:1; seçilmiş atölye yardımcı metinleri en az 4.5:1.

## Açık kullanım notu

Mobil Devre Atölyesi'nde blueprint tuvali sabit genişlikli kalır ve yatay kaydırılır; küçük ekranda devrenin tamamı ilk bakışta görünmez. İçerik kaybolmaz, ancak kaydırma gereksinimi açıkça işaretlenmiyor.
