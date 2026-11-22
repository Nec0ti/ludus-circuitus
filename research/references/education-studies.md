# Yakın eğitim araştırmaları ve özgün değer sorusu

**Erişim tarihi:** 2026-11-23. Bunlar alan yazınını başlatan kaynaklardır; tam kaynak taraması ve danışmanla karşılaştırma yapılmadan proje özgünlüğü kararı verilmiş sayılmaz.

## Doğrudan Verilog öğrenme aracı

**Hsieh ve diğerleri (2025), “A Verilog Programming Learning Assistant System Focused on Basic Verilog with a Guided Learning Method.”** [Future Internet 17(8), 333](https://www.mdpi.com/1999-5903/17/8/333), DOI: 10.3390/fi17080333.

- **Kanıt türü:** Hakemli araştırma makalesi; web tabanlı, temel Verilog öğretimi ve otomatik değerlendirilen alıştırmalar sunan VPLAS sistemini anlatıyor.
- **Örneklem/sınır:** Makale değerlendirmeyi giriş chip-design dersi alan 50 üniversite öğrencisiyle yapıyor; ortaokul veya lise başlangıç öğrencilerine doğrudan genellenemez.
- **İlk inceleme notu:** VPLAS metin ve yönlendirilmiş alıştırmaya odaklanıyor. Ludus'un olası farkı Scratch-benzeri donanım blokları, aynı tasarımın Verilog/gate görünümü, paralel bağımsız yollar ve clock'lu register davranışını birlikte öğretmek olabilir. Bu farkı makalenin tüm yöntemi ve benzer sistemler tarandıktan sonra kanıtlamak gerekir.
- Makalenin yüksek quiz doğruluğu gibi yazar sonuçları, Ludus için öğrenme etkisi iddiası olarak kullanılamaz.

## Blok tabanlı programlama kanıtı — doğrudan donanım kanıtı değil

**Hu, Chen ve Su (2021), “Exploring the Effectiveness and Moderators of Block-Based Visual Programming on Student Learning: A Meta-Analysis.”** [Journal of Educational Computing Research 58(8), 1467–1493](https://doi.org/10.1177/0735633120945935).

- 2019 sonuna kadarki 29 deneysel/yarı deneysel çalışmadan 34 etki büyüklüğünü sentezler; genel programlama başarısı için küçük-orta pozitif ortalama etki bildirir.
- Etki eğitim düzeyi, kullanılan araç, müdahale ve okul konumuna göre değişmektedir. Bu bulgu Scratch/blokların genel Verilog öğrenmesini artırdığını göstermez.

**Saygıner ve Tüzün (2023), “The effects of block-based visual and text-based programming training on students' achievement, logical thinking skills, and motivation.”** [Journal of Computer Assisted Learning 39(2), 644–658](https://doi.org/10.1111/jcal.12771).

- 60 programlama deneyimi olmayan üniversite öğrencisinde 10 haftalık eşdeğer ortam karşılaştırması yapar.
- Makalenin özetine göre blok ortamı mantıksal düşünme ve motivasyonda olumlu katkı sağlamış, programlama başarısında ise anlamlı farklılık göstermemiştir. Bu, ölçümün yalnızca quiz başarı puanından ibaret tutulmaması gerektiğine dair bir uyarıdır; örneklem ve alan farklıdır.

## Ludus için araştırma çıkarımı (hipotez değil, tasarım sorusu)

1. Araçta gerçek sorun Verilog sözdizimi mi, dijital mantığı anlama mı, metinden donanıma geçiş mi? Önce hedef kavramı daralt.
2. Basit değerlendirme: aynı ön bilgi seviyesinde, kısa ve eşdeğer zorluktaki ön/son test maddeleriyle **mantık kapısı çıktısı, bağımsız yolların birlikte çalışması ve clock kenarında register güncelleme** kavramlarını ayrı puanla.
3. Karşılaştırma yapılacaksa öğretim içeriğini, süreyi ve zorluk seviyesini eşleştir; yalnızca “bizim ürünle quiz yaptılar ve puan arttı” ön-son farkı tek başına araca nedensel etki atfetmeye yetmez.
4. Sınavın anlık başarısı yanında daha sonra yapılan kısa gecikmeli test, devreyi yeni örneğe aktarabilme ve Verilog'u okuyabilme aday ölçülerdir; kapasite/zaman ve izinlere göre danışmanla seç.
5. Ortaokul öğrencileri insan katılımcıdır; TÜBİTAK çağrısı, MEB izni ve veli/katılımcı onam süreci tamamlanmadan pilot verisi toplanmamalı.

Yakın ürünlerin erken karşılaştırması için [`related-tools.md`](related-tools.md) dosyasına bak. Özellikle CircuitVerse'in Verilog export, sequential circuits, multi-tab/subcircuits ve browser local save özellikleri, projenin yalnızca bu işlevleri bir araya getirmesinin özgün değer sayılmayabileceğini gösteriyor.
