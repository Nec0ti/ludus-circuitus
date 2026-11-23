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

- 2B çalışma alanında sınırlandırılmış kaydırma yerine kamera pan/zoom; wheel zoom imleç altındaki dünya noktasını sabit tutar. Boş grid'de Space+sürükleme (dokunmatik ekranda tek parmak sürükleme) pan yapar; dokunmatik kısa dokunuş ve fare tıklaması aramayı açar. `.bp` sürüm 1 koordinatları korunur ve grid'e oturur.
- Araçlık düğmesine tıklama mevcut merkezî ekleme akışını korur; sürükleyip bırakma bırakılan dünya koordinatında ekler.
- Tuvalin boş alanında tıklama bir arama kutusu açar; ad yazıp Enter ile aynı koordinatta blok üretir; Escape kapatır.
- Sinyal yolları her iki gösterimde aynı route işlevini kullanır.
- NAND/NOR/XNOR; doğrulama, port, değerlendirme, Verilog, modül düzleştirme, yardım ve truth-table oracle'ı kapsar.

## Kapsam dışı

MUX, sabit kaynak, çok bitli sinyaller, portlar arası sürükleyerek kablo çizme ve tam otomatik çakışma/route çözümü bu artışa alınmadı. Eski `.bp` sürüm 1 belge biçimi değişmeyecek.

## Kontrol listesi

- [x] Node/pan/zoom dönüşümleri; `.bp` sürüm 1 kayıt biçimi ve koordinatları korunuyor
- [x] Drop, arama kutusu, klavye erişimi ve wheel zoom E2E
- [x] NAND/NOR/XNOR için X semantiği, Verilog ve Icarus: 12 sabit tohumlu × 40 kapı, 252 vektör
- [~] Küçük ve mobil görünümde hizalama, clipping, focus: eski mobil fit ve dokunma sorunları bulundu; fit alanı içerik boyutuna göre ve en az %58 ölçekli, dokunmatik pan eklendi. Masaüstü/mobil son geri incelemesi bekleniyor.
- [ ] Ana CI/Pages yayın kanıtı
