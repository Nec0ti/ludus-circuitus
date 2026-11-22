# Değişmeyen proje kuralları

Bu dosya kalıcı ürün ve çalışma kurallarını tutar. Bu kurallar Necati'nin açık onayı olmadan değiştirilmez. Gelişen fikirleri, taslakları ve görev ayrıntılarını `notes.md` ile `backlog.md` içine yaz.

## Ürün

- Proje, Verilog ve dijital mantık öğrenmeyi görsel bloklarla daha anlaşılır hâle getiren bir web uygulamasıdır.
- Web sitesi GitHub Pages'te Jekyll ile yayımlanır ve üç ana bölümden oluşur: tanıtım, dokümantasyon ve Devre Atölyesi.
- İlk sürüm için sunucu tarafı bileşen gerekmez. Devre Atölyesi'nin tarayıcı içinde etkileşimli çalışması bu statik yayın kararına aykırı değildir.
- Ana uygulama ve istemcinin gördüğü bütün metinler Türkçe olmalıdır; buna arayüz, tanıtım ve yayımlanan dokümantasyon dahildir. İç geliştirme notları Türkçe veya İngilizce olabilir. Standart Verilog sözdizimi, teknik özel adlar ve `.bp` gibi dosya uzantıları özgün yazımlarıyla kalabilir.
- Tasarım estetik, sürükleyici ve anlaşılır olmalı; öğrenme aracı karmaşık bir profesyonel EDA arayüzüne dönüşmemelidir.
- Blok kümesi olabildiğince küçük tutulmalı ve başlangıç düzeyinde kolay kullanılmalıdır.

## Blueprint ve Devre Atölyesi modeli

- Devre projeleri modüllere ayrılabilir; kullanıcı arayüzündeki blueprint belgeleri `top.bp`, `adder.bp` gibi `.bp` uzantılı dosyalar olarak düşünülür. Üretilen gerçek donanım dili Verilog'dur.
- Devre Atölyesi'nin çalışma alanı; sol blok araçlığı, üst menü ve benzetim araçları, ortada birden çok blueprint açılabilen tuval, sağda gerçek zamanlı devre görünümü ve Verilog çıktısı, altta değişkenler paneli fikrine dayanır.
- Üst menüde Dosya, Görünüm, Yeni BP gibi klasik düzenleme girişleri bulunur. Benzetim araçlarında Oynat, Duraklat, Durdur ve tik hızı kontrolü yer alır.
- Görsel devre, üretilen Verilog ve blueprint aynı tasarımın tutarlı gösterimleri olmalıdır.
- Tik kontrolleri istenen arayüz yönüdür; tek başına saat/register veya sıralı mantık dilinin kararlaştırıldığı anlamına gelmez. Zaman ve durum semantiği uygulanmadan önce ayrıca tanımlanır.
- Devre animasyonunda gösterilen akışın mantıksal sinyal akışı mı yoksa gerçek elektrik akımı mı olduğu açıkça belirlenmeden fiziksel akım benzetimi iddia edilmez.

## Doğruluk ve iddialar

- Üretilen Verilog ile blueprint ve devre davranışı birbirini tutmalıdır. Uygun test veya benchmark olmadan doğru çalıştığı iddia edilmez.
- Tanıtım sayfasındaki öğrenme etkisi ve hız iddiaları, ölçüm yapılmadan kanıtlanmış sonuç gibi yazılmaz.
- Dış kaynaklardan gelen bilgiler ve araştırma iddiaları kaynaklarıyla kaydedilir; karar, öneri, varsayım ve soru birbirinden ayrılır.

## Test, benchmark ve yayın

- Uygulama geliştirme sırasında uygun alt görevlerde alt ajanlardan yararlan; bütünleştirme öncesi çıktıları gözden geçir.
- Verilog üretimi, benzetim tutarlılığı, blueprint kaydetme/yükleme, modül bileşimi ve kullanıcı iş akışları için zorlayıcı test/benchmarklar oluştur.
- Zorunlu kontroller başarısızsa ilgili değişikliği push etme.
- Küçük ve anlamlı değişiklikleri sık commit et. Büyük ürün veya mimari güncellemelerini çekme isteği (PR) ile aç; gerekli benchmarklar geçmeden birleştirme.

## Katılımcılar ve gizlilik

- Gerekli okul izinleri ve onamlar alınmadan öğrencilere veya katılımcılara ait tanımlanabilir verileri toplama, saklama ya da yayımlama.
- Kimlik bilgilerini, tokenları ve özel kişisel bilgileri depoya koyma.

## Proje belleği

- `AGENTS.md` giriş noktasıdır ve başvurulacak kayıtları açıklar.
- Her görevden sonra backlog'u ve görev günlüğünü güncelle; bağlamı sohbet geçmişine bağımlı bırakma.
