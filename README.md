# Ludus Circuitus

Ludus Circuitus, başlangıç düzeyindeki öğrenenlerin görsel bloklarla dijital mantık kurmasını, mantıksal sinyalleri izlemesini ve gerçek Verilog karşılığını görmesini amaçlayan bir eğitim projesidir. Açık kaynaklı bir araç olarak yayımlanması ve ortaokul düzeyindeki öğrenenlerin de takip edebileceği bir web deneyimi sunması hedeflenir. Öğrenme katkısı quiz/test ile ölçülmeden kanıtlanmış sayılmaz.

Site üç bölümden oluşur:

- **Tanıtım:** Projenin amacı, Verilog öğrenirken karşılaşılan güçlük ve etkileşimli yarım toplayıcı örneği.
- **Dokümantasyon:** Başlangıç, kullanım, bloklar ve yerel kurulum için Türkçe kılavuz.
- **Devre Atölyesi:** Tam ekran, CAD/CAM esintili çalışma alanı. Blokları ekleyip bağla, mantıksal sinyal değerlerini ve üretilen Verilog'u izle; açık `.bp` belgelerini modül olarak birleştirip bu cihazda sakla veya ayrı ayrı içe/dışa aktar.

Site Jekyll ile hazırlanıp GitHub Pages'te yayımlanır: [ludus-circuitus](https://nec0ti.github.io/ludus-circuitus/). Atölye verileri tarayıcıda kalır; sunucu/API veya katılımcı veri toplama yoktur. [Quiz prototipi](https://nec0ti.github.io/ludus-circuitus/quiz/) sekiz soruluk iki form ile paralel yol tahminini, Verilog eşlemesini ve clock/yazmaç bilgisini yoklar; yanıtları ve puanı kaydetmez veya göndermez, araştırma aracı olarak henüz onaylı değildir. Birden çok `.bp` modülü geliştirme kapsamındadır; tamamlanma durumu [`backlog.md`](backlog.md) içinde izlenir. Proje kararları [`notes.md`](notes.md), çalışma kuralları [`AGENTS.md`](AGENTS.md) ve [`const.md`](const.md) içindedir.

TÜBİTAK 2204-A kuralları, kaynak haritası ve özgün Verilog örnekleri [`research/`](research/) altında etiketlenmiştir. İnsan katılımcılı öğrenme ölçümü gerekli okul/veli izinleri alınmadan yapılmaz.
