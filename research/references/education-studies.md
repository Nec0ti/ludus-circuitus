# Yakın eğitim araştırmaları ve özgün değer sorusu

**Erişim tarihi:** 2026-11-23. Bunlar alan yazınını başlatan kaynaklardır; tam kaynak taraması ve danışmanla karşılaştırma yapılmadan proje özgünlüğü kararı verilmiş sayılmaz.

## Doğrudan Verilog öğrenme aracı

**Hsieh ve diğerleri (2025), “A Verilog Programming Learning Assistant System Focused on Basic Verilog with a Guided Learning Method.”** [Future Internet 17(8), 333](https://www.mdpi.com/1999-5903/17/8/333), DOI: 10.3390/fi17080333.

- **Kanıt türü:** Hakemli araştırma makalesi; web tabanlı, temel Verilog öğretimi ve otomatik değerlendirilen alıştırmalar sunan VPLAS sistemini anlatıyor.
- **İçerik:** Sistem Source Coding, Answer ve Related Information alanlarını birleştiriyor; referans alanında kod açıklamasıyla birlikte devre şeması veya zaman diyagramı bulunabiliyor. GUP ve Value Trace görevleriyle, öğrenci verilen Verilog'u ve davranışı yorumluyor. Kaynaklar bunları destekleyici referans materyali olarak anlatıyor; canlı senkron animasyon veya kullanıcı tarafından düzenlenen blok diyagram olarak tanımlamıyor. Bu nedenle “Verilog ile devre görünümünü birlikte veren öğrenme aracı yok” denemez; olası ayrım ancak bu görsellerin üretim şekli ve etkileşim düzeyi olarak incelenebilir.
- **Örneklem/sınır:** Makale özeti 50 öğrenciyi bildirirken sonuç bölümü iki grupta toplam 112 lisans öğrencisi yazıyor. Makale içindeki bu sayı farkı çözülmeden tek bir örneklem büyüklüğü tekrar edilmemeli. Katılımcılar giriş chip-design dersi alan üniversite öğrencileri; ortaokul veya lise başlangıç öğrencilerine doğrudan genellenemez.
- **Ludus ile karşılaştırma:** İncelenen 2025 makalesi kademeli kod/boşluk doldurma ve kod/devre yorumlama akışını tarif ediyor; öğrencinin sürükleyip bağladığı blok grafik devreyi tasarım aracı olarak yazması belgelenmiyor. Bu yalnızca makale kapsamı hakkında bir gözlemdir; VPLAS'ın her sürümünde böyle bir özellik olmadığını veya Ludus'un bu nedenle özgün olduğunu kanıtlamaz. Güncel canlı VPLAS uygulamasına erişim linki bu taramada bulunamadı.
- Makalenin yüksek quiz doğruluğu gibi yazar sonuçları, Ludus için öğrenme etkisi iddiası olarak kullanılamaz.

**2026 uzantısı:** Jin ve diğerleri, VPLAS'ın GUP ve Value Trace Problem (VTP) görevlerine sekiz Element Fill-in-the-blank (EFP) örneği ekleyen bir IEICE teknik raporu sunuyor. EFP, kombine ve sıralı devrelerin Verilog açıklamalarındaki temel öğeleri öğrencinin tamamlamasını istiyor; çalışma 99 NTUT lisans öğrencisinin cevap kayıtlarını analiz ettiğini bildiriyor. Bu da Verilog kodunu adım adım yeniden kurma alıştırmasının Ludus'a özgü olmadığını gösterir. [IEICE teknik rapor kaydı](https://www.ieice.org/publications/ken/summary.php?contribution_id=142049&expandable=3&ken_id=ET&lang=jp&presen_date=2026-03-04&schedule_id=8798&society_cd=ISS&year=2026).

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

Yakın ürünlerin güncel kanıt/sınırlama dökümü için [`related-tools.md`](related-tools.md) dosyasına bak. CircuitVerse'in editör/simülatör ve Verilog export özellikleri ile VPLAS'ın kod alıştırmalarını devre/waveform bağlamında sunması, bu özellikleri tek başına özgün değer olarak sunmamamız gerektiğini gösteriyor.
