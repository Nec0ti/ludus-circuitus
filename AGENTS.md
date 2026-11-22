# Proje çalışma rehberi

Bu dosya proje çalışmalarına giriş noktasıdır. İşe başlamadan önce ilgili kayıtlara bak; proje bağlamını yalnızca sohbet içinde bırakma.

## Başvurulacak kayıtlar

- [`const.md`](const.md): kalıcı ürün, dil, kalite ve çalışma kuralları.
- [`backlog.md`](backlog.md): güncel işler, durumları ve sıradaki adımlar.
- [`backloglog.md`](backloglog.md): her görevde yapılanların ve yarım kalanların tarihli kaydı.
- [`notes.md`](notes.md): proje fikri, arayüz taslağı, kararlar, varsayımlar, açık sorular ve kaynaklar.
- [`research/`](research/): TÜBİTAK kuralları, tasarım/dil kaynakları ve etiketlenmiş özgün Verilog örnekleri.
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
- Arayüz geliştirmeden önce yerel `.codex/skills/frontend-design/SKILL.md` ve `.codex/skills/daisyui/SKILL.md` becerilerini (kuruluysa) oku; DaisyUI seçilirse ilgili kurulum/kullanım rehberlerini de gözden geçir. Kurulum bilgisi `research/references/frontend-skills.md` içindedir.

## Güncel proje yönü

Ludus Circuitus; lise proje ekibinin ortaokul düzeyindeki yeni başlayanlara kombinasyonel ve sıralı mantığı bloklarla kurdurup gerçek Verilog ve mantıksal sinyal davranışıyla ilişkilendiren, quiz/test ile öğrenme kazanımı ölçmeyi hedefleyen tarayıcı tabanlı bir projedir. FPGA'daki bağımsız donanım yollarının paralel çalışmasını doğru biçimde öğret; görselleştirmede fiziksel akım yerine mantıksal sinyal değişimlerini canlandır. Ürün kapsamı için `const.md`, proje kararları için `notes.md`, kanıt ve kurallar için `research/` altındaki etiketli kaynakları esas al.
