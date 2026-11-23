# Ludus Circuitus

Ludus Circuitus, başlangıç düzeyindeki öğrenenlerin görsel bloklarla dijital mantık kurmasını, mantıksal sinyalleri izlemesini ve gerçek Verilog karşılığını görmesini amaçlayan bir eğitim projesidir. Açık kaynaklı bir araç olarak yayımlanması ve ortaokul düzeyindeki öğrenenlerin de takip edebileceği bir web deneyimi sunması hedeflenir. Öğrenme katkısı quiz/test ile ölçülmeden kanıtlanmış sayılmaz.

Site üç bölümden oluşur:

- **Tanıtım:** Projenin amacı, Verilog öğrenirken karşılaşılan güçlük ve etkileşimli yarım toplayıcı örneği.
- **Dokümantasyon:** Dijital sinyallerden kapılara, yarım toplayıcıdan clock'lu yazmaçlara ilerleyen kısa dersler; ayrıca kullanım, blok kataloğu ve yerel kurulum rehberleri.
- **Devre Atölyesi:** Tam ekran, araç odaklı çalışma alanı. 1-bit varsayılanıyla 1–32 bit mantık yolları kur; kapı, sabit, seçici ve yazmaçları bağla. Sinyal görünümü, onluk/ikilik değerler ve üretilen Verilog aynı tasarımı gösterir. Açık `.bp` belgeleri modül olarak birleştirilip bu cihazda saklanabilir veya içe/dışa aktarılabilir.

Site Jekyll ile hazırlanıp GitHub Pages'te yayımlanır: [ludus-circuitus](https://nec0ti.github.io/ludus-circuitus/). Atölye verileri tarayıcıda kalır; sunucu/API veya katılımcı veri toplama yoktur. [Quiz prototipi](https://nec0ti.github.io/ludus-circuitus/quiz/) sekiz soruluk iki form ile paralel yol tahminini, Verilog eşlemesini ve clock/yazmaç bilgisini yoklar; yanıtları ve puanı kaydetmez veya göndermez, araştırma aracı olarak henüz onaylı değildir. Araç ve araştırma durumları [`backlog.md`](backlog.md) içinde izlenir. Proje kararları [`notes.md`](notes.md), çalışma kuralları [`AGENTS.md`](AGENTS.md) ve [`const.md`](const.md) içindedir.

TÜBİTAK 2204-A kuralları, kaynak haritası ve özgün Verilog örnekleri [`research/`](research/) altında etiketlenmiştir. İnsan katılımcılı öğrenme ölçümü gerekli okul/veli izinleri alınmadan yapılmaz.

## Doğrulama

Node davranış testleri için `npm test`; Icarus Verilog ile bağımsız simülatör karşılaştırmaları için `npm run test:verilog`; site ve tarayıcı akışlarını kontrol etmek için `npm run build:css`, Jekyll build ve `npm run test:e2e` çalıştırılır. Ayrıntılı ve sabit tohumlu sınırlar [`research/quality/benchmark-gates.md`](research/quality/benchmark-gates.md) içindedir. Bu teknik doğrulamalar kullanıcıların daha iyi öğrendiğini kanıtlamaz.
