# Devre Atölyesi yeniden tasarım kapsamı — 2026-11-23

## Görsel yön

- Graphite `#171C22`, raised panel `#222A34`, blueprint grid `#303B46`, instrument text `#D6E0E8`, signal teal `#52D2B2`, active amber `#E6B861`.
- Mevcut arayüz sans yazı karakteri etiket ve açıklamalarda; monospace sinyal adı, port, değer ve kısa yol göstergelerinde kalır.
- Yerleşim: üstte dosya/simülasyon kontrol rayı; solda sürüklenebilir blok rafı; ortada ekranın ana alanını kaplayan grid; sağda kod/sinyal görünümü; altta değişken güvertesi.
- Etkileşim ilkesi: imleç zoom'un odağıdır, pan boş alanda/Space ile yapılır, node sürükleme port ve başlık eylemlerini engellemez; bütün durumlar klavye ile de ulaşılır.
- Tel çizgileri dik açılarını korur; yön değişimi yumuşak kıvrımla gösterilir. Teal/amber yalnız sinyal değeri/durum anlamı taşır.

```text
┌ Dosya · Görünüm · Oynat · Tek tik · Hız · zoom ─────────────┐
│ Blok rafı │  sonsuz blueprint grid / node çağırma           │ Kod│
│ sürükle   │                                                  │Siny│
│ kısa yol  │                                                  │    │
│           ├ Değişkenler / giriş değerleri ──────────────────┤    │
└───────────┴─────────────────────────────────────────────────┴────┘
```

Bu düzen mevcut koyu, yalın ürün paletini korur; genel amaçlı SaaS gradientleri, aşırı küçük teknik etiketler ve gereksiz dekoratif kartlar kullanmaz. Kullanıcı referansları: Festo FluidSIM araç+çalışma yüzeyi, Unreal Blueprint boş alan çağrısı ve verilen endüstriyel blok görünümü. Bunlar davranış/yön referansıdır; birebir görsel kopya değildir.

## Uygulama kapsamı

- 2B çalışma alanında sınırlandırılmış kaydırma yerine kamera pan/zoom; wheel zoom imleç altındaki dünya noktasını sabit tutar. Boş grid'de Space+sürükleme (dokunmatik ekranda tek parmak sürükleme) pan yapar; dokunmatik kısa dokunuş ve fare tıklaması aramayı açar. `.bp` sürüm 1 koordinatları korunur; koordinatlar finite olmalı ve ±1.000.000 sınırını aşamaz.
- Araçlık düğmesine tıklama mevcut merkezî ekleme akışını korur; sürükleyip bırakma bırakılan dünya koordinatında ekler.
- Tuvalin boş alanında tıklama bir arama kutusu açar; ad yazıp Enter ile aynı koordinatta blok üretir; Escape kapatır.
- Sinyal yolları her iki gösterimde aynı route işlevini kullanır.
- NAND/NOR/XNOR; doğrulama, port, değerlendirme, Verilog, modül düzleştirme, yardım ve truth-table oracle'ı kapsar.
- Node başlığı/değer etiketi ekranda yaklaşık sabit piksel boyutunda kalır; zoom, metin okunabilirliğini küçültmez.

## Kapsam dışı

MUX, sabit kaynak, çok bitli sinyaller, portlar arası sürükleyerek kablo çizme ve tam otomatik çakışma/route çözümü bu artışa alınmadı. Eski `.bp` sürüm 1 belge biçimi değişmeyecek.

## Kontrol listesi

- [x] Node/pan/zoom dönüşümleri; `.bp` sürüm 1 kayıt biçimi ve geçerli koordinatları korunuyor, bozuk/sınırsız koordinatlar reddediliyor
- [x] Drop, arama kutusu, klavye erişimi ve wheel zoom E2E
- [x] NAND/NOR/XNOR için X semantiği, Verilog ve Icarus: 12 sabit tohumlu × 40 kapı, 252 vektör
- [x] Ana SVG çalışma alanı görünür ve altı örnek bağlantının başlangıç/bitiş noktaları E2E ile gerçek port merkezlerine oturuyor
- [x] Küçük ve mobil görünümde hizalama, clipping, focus: içerik fit'i, %58 en düşük ilk görünüm, dokunmatik pan ve sabit ekran boyutlu etiketler uygulandı. Bağımsız son inceleme desktop/mobile'da kabloları görünür ve gerçek port merkezlerine bağlı doğruladı; clipping veya taşma yok. 390×844 ilk ekranda node sırası alt kenarın biraz altında kaldığından kısa kaydırma gerekiyor.
- [x] Ana CI/Pages yayın kanıtı: PR #11 squash merge `3ac1ca0`; Pages workflow run `45261362299` build (Node, Icarus, Playwright) ve deploy adımları başarılı. `https://nec0ti.github.io/ludus-circuitus/`, `/docs/` ve `/playground/` HTTP 200 döndürüyor.
