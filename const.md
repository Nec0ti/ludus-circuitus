# Değişmeyen proje kuralları

Bu dosya kalıcı ürün ve çalışma kurallarını tutar. Bu kurallar Necati'nin açık onayı olmadan değiştirilmez. Gelişen fikirleri, taslakları ve görev ayrıntılarını `notes.md` ile `backlog.md` içine yaz.

## Ürün

- Proje, Verilog ve dijital mantık öğrenmeyi görsel bloklarla daha anlaşılır hâle getiren bir web uygulamasıdır.
- Web sitesi GitHub Pages'te Jekyll ile yayımlanır ve üç ana bölümden oluşur: tanıtım, dokümantasyon ve Devre Atölyesi.
- İlk sürüm için sunucu tarafı bileşen gerekmez. Devre Atölyesi'nin tarayıcı içinde etkileşimli çalışması bu statik yayın kararına aykırı değildir.
- Ana uygulama ve istemcinin gördüğü bütün metinler Türkçe olmalıdır; buna arayüz, tanıtım ve yayımlanan dokümantasyon dahildir. İç geliştirme notları Türkçe veya İngilizce olabilir. Standart Verilog sözdizimi, teknik özel adlar ve `.bp` gibi dosya uzantıları özgün yazımlarıyla kalabilir.
- Tasarım estetik, sürükleyici ve anlaşılır olmalı; öğrenme aracı karmaşık bir profesyonel EDA arayüzüne dönüşmemelidir.
- Blok kümesi olabildiğince küçük tutulmalı ve başlangıç düzeyinde kolay kullanılmalıdır. Bir blok eklenmesi, anlaşılır bir öğrenme adımı sağlamalı; simülatör, Verilog, `.bp` uyumluluğu, yardım, ders içeriği ve zorlayıcı oracle testleri birlikte güncellenmelidir.
- Sinyaller yalnızca 1 bit ile sınırlı değildir. Eski `.bp` dosyalarında genişlik belirtilmemişse 1 bit kabul edilir; yeni çok bitli destek aynı simülasyon, devre görünümü ve Verilog üretimi sözleşmesini paylaşmalıdır. Kullanıcı değerleri onluk biçimde girebilir/görebilir; bit genişliği ve ikilik donanım karşılığı açıkça anlatılır.
- RISC-V bu projede işlemci veya assembly kapsamı kararı değildir; yalnızca örnek olarak anılmıştır. Öğretim amacı doğrultusunda temel dijital mantık/Verilog blokları geliştirilecek, tam CPU/ISA veya assembly ortamı eklenmeyecektir.
- İçerik ve etkileşimler ortaokul düzeyindeki bir başlangıç öğrencisinin de takip edebileceği sadelikte tasarlanmalıdır. Arayüzde onluk değerlerle çalışmak uygundur; donanımın ikili mantıkla çalıştığı saklanmamalı, ikilik gösterim gerektiğinde sade bir köprüyle açıklanmalıdır.
- İlk ürün web tarayıcısında çalışır; masaüstü uygulaması ve fiziksel FPGA kartına yükleme MVP kapsamı dışındadır. Tarayıcıda benzetim ve Verilog çıktısı yeterlidir.
- Öğrenme kazanımı bir quiz/test ile ölçülebilir olacak şekilde kurulmalıdır. Ölçülmemiş bir etki iddiası sonuç gibi sunulmaz.

## Blueprint ve Devre Atölyesi modeli

- Devre projeleri modüllere ayrılabilir; kullanıcı arayüzündeki blueprint belgeleri `top.bp`, `adder.bp` gibi `.bp` uzantılı dosyalar olarak düşünülür. Üretilen gerçek donanım dili Verilog'dur.
- İlk MVP'de `.bp` belgeleri tarayıcıda yerel olarak saklanabilir ve içe/dışa aktarılabilir.
- Sıralı mantık bu projenin kapsamındadır; clock ve register/yazmaç davranışları anlatımda ve benzetimde yer alacaktır.
- Devre Atölyesi'nin çalışma alanı; sol blok araçlığı, üst menü ve benzetim araçları, ortada birden çok blueprint açılabilen tuval, sağda gerçek zamanlı devre görünümü ve Verilog çıktısı, altta değişkenler paneli fikrine dayanır.
- Üst menüde Dosya, Görünüm, Yeni BP gibi klasik düzenleme girişleri bulunur. Oynat/Duraklat/Durdur sağdaki mantıksal sinyal görselleştirmesinin animasyonunu yönetir; girişleri ya da yazmaçları değiştirmez ve clock tiki oluşturmaz. Tek tik bir yükselen clock kenarıdır; Reset ayrı eylemdir.
- Görsel devre, üretilen Verilog ve blueprint aynı tasarımın tutarlı gösterimleri olmalıdır.
- Devre görünümü fiziksel elektrik akımını değil, mantıksal sinyallerin devredeki ilerleyişini canlandırır.
- FPGA anlatımı, bağımsız donanım yollarının eşzamanlı çalışabilmesini ve saat kenarında register'ların durum saklamasını vurgular. Veri bağımlılıkları yol boyunca sıralı yayılıma neden olur; kaynaklar ve clock zamanlaması da paralelliği sınırlar. "Her işlem aynı anda olur" gibi yanlış bir iddia kullanılmaz.
- Clock tikinin ve sıfırlamanın anlamı, görselleştirme oynatma kontrollerinden ayrı tutulur.
- Onaylı güncel semantik: Play/Pause/Stop sadece sağ sinyal görünümündeki animasyonu başlatır, dondurur ve başa alır; input ve register state sabit kalır. Tek tik bir yükselen clock kenarıdır; Reset register'ı ayrı sıfırlar; bilinmeyen başlangıç `X` görünür.
- Blueprint tuvalinde sol tık/drag seçim kutusunu kullanır; sağ tık arama ve kısa açıklama içeren blok listesini açar. Sağ tuş basılı sürükleme ve orta tuş pan yapar. Menü ekleme yapılmadan dışarı tıklama veya Escape ile kapanır.

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
