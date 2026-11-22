# Proje çalışma rehberi

Bu dosya proje çalışmalarına giriş noktasıdır. İşe başlamadan önce ilgili kayıtlara bak; proje bağlamını yalnızca sohbet içinde bırakma.

## Başvurulacak kayıtlar

- [`const.md`](const.md): kalıcı ürün, dil, kalite ve çalışma kuralları.
- [`backlog.md`](backlog.md): güncel işler, durumları ve sıradaki adımlar.
- [`backloglog.md`](backloglog.md): her görevde yapılanların ve yarım kalanların tarihli kaydı.
- [`notes.md`](notes.md): proje fikri, arayüz taslağı, kararlar, varsayımlar, açık sorular ve kaynaklar.
- [`raports/`](raports/): saklanmaya değer proje raporları ve incelemeler.
- [`README.md`](README.md): projenin kısa tanıtımı.

## Her görevde izlenecek sıra

1. `const.md` dosyasını, ardından konuyla ilgili `notes.md`, `backlog.md` ve eski raporları oku.
2. Başlamadan önce kapsamı ve durumu `backlog.md` içinde işaretle.
3. İstenen işi tamamlanabilir bir bütün olarak bitir. Bir şey açık kalırsa neyin ve neden kaldığını yaz.
4. Her görevden sonra `backlog.md` dosyasını güncelle ve `backloglog.md` dosyasına tarihli kayıt ekle. Değişen dosyaları, yapılan doğrulamayı ve kalan işleri yaz.
5. Necati proje bilgisi paylaştığında bilgileri `notes.md` içinde düzenle; kaynağı ve belirsizliği koru. Bir öneriyi sessizce karara dönüştürme.
6. `raports/` içine yalnızca saklanmaya değer rapor koy; ilgili kayıtları notlardan veya backlog'dan bağla.

## Geliştirme ve yayın akışı

- Yazılım geliştirme görevlerinde işi uygun, sınırları belli alt görevlere ayır ve alt ajanlardan yararlan. Sonuçları ana uygulamaya almadan önce incele ve bütünleştir.
- Gerçek mantık, Verilog üretimi, `.bp` kaydetme/yükleme, modül bağlantısı ve arayüz iş akışları için zorlayıcı testler ve benchmarklar tasarla. Zorunlu test veya benchmark başarısızsa Git'e push etme.
- Küçük ve anlamlı adımları sık commit et. Büyük ürün veya mimari değişikliklerini çekme isteği (PR) üzerinden yürüt; gerekli benchmarklar geçmeden birleştirme.
- Başlangıç ürünü GitHub Pages üzerinde Jekyll ile sunulan statik bir sitedir. Devre Atölyesi etkileşimli olabilir; sunucu tarafı bileşen ekleme kararını ayrıca kaydet.
- Ürün arayüzü ve proje dokümantasyonundaki kullanıcıya dönük yazılar Türkçe olmalı. Standart Verilog sözdizimini, teknik adları ve dosya uzantılarını çevirmeye çalışma.

## Güncel proje yönü

Ludus Circuitus; tanıtım, dokümantasyon ve Devre Atölyesi bölümlerinden oluşan, görsel bloklarla Verilog ve devre davranışını ilişkilendiren bir öğrenme projesidir. Ürün kapsamının ve araştırma yönteminin ayrıntıları için `notes.md` dosyasındaki doğrulanmış kararları ve açık soruları esas al.
