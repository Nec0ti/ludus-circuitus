# Yakın çevrim içi araçlar ve ilk fark analizi

**Erişim tarihi:** 2026-11-23. Bu, başlangıç düzeyinde masa başı kaynak taramasıdır; araçları aynı görevlerle uygulamalı olarak karşılaştırma henüz yapılmadı.

| Araç | Resmî kaynaklarda doğrulanan kapsam | Ludus ile örtüşme / ayrışma hipotezi |
|---|---|---|
| **CircuitVerse** | [Resmî ürün kılavuzu](https://docs.circuitverse.org/) browser içinde devre oluşturma/simülasyon, kapılardan register-transfer-level öğelere kadar bileşenler, multibit wires, subcircuit ve hierarchical designs, timing diagrams, online/local save ve paylaşmayı belgeliyor. [Menubar/Verilog export kılavuzu](https://docs.circuitverse.org/chapter3/chapter3-menubar/) birden çok circuit tab, Verilog module subcircuit, dec-bin-hex tool ve Verilog dışa aktarımını anlatıyor; export özelliği kendi belgesinde **experimental** diye uyarılıyor ve kodda değişiklik gerekebileceğini söylüyor. | **En yakın doğrudan ürün karşılaştırması.** “Tarayıcıda kapı çiz, simüle et, Verilog export et, sequential eleman kullan” tek başına Ludus'un özgün değeri olamaz. Ludus'un olası farkı pin tabanlı Scratch/Blueprint authoring hissi, signal/state playback, ortaokul başlangıç pedagojisi, üretilen Verilog'a adım adım eşleme ve bunların öğrenme etkisini ölçmektir. Bunların CircuitVerse'te hiç bulunmadığı iddia edilmeden önce aynı örneklerle uygulamalı karşılaştırma yapılmalı. |
| **HDLBits** | [Problem sets](https://hdlbits.01xz.net/wiki/Problem_sets) Verilog temel sözdiziminden kapılar, modüller, kombinasyonel devre, clocked blocks, register, counter ve FSM'e ilerleyen alıştırmalar içeriyor; ayrıca simülasyon okuma/testbench başlıkları var. | Güçlü Verilog alıştırma kaynağı; ana deneyim metinle HDL yazıp alıştırma çözme. Ludus'un görsel donanım ve HDL eşleme yaklaşımını karşılaştırmak için. Soru metinleri/kod çözümleri kopyalanmayacak. |
| **EDA Playground** | [Proje dokümantasyonu](https://github.com/edaplayground/eda-playground/blob/master/docs/intro.rst) browser'da Verilog dahil HDL simülasyonu, konsol çıktısı, EPWave waveform viewer ve kod/sonuç paylaşımını anlatıyor. | Gerçek HDL'yi hızlı çalıştırıp dalga biçimini göstermek için yakın; görsel bloklarla devre kurmaya odaklı değil. Ludus HDL kodunun test doğruluğunu karşılaştırmada dış simülatör adayı olabilir. |
| **VPLAS (2025)** | [Araştırma makalesi](https://www.mdpi.com/1999-5903/17/8/333) web tabanlı, adım adım temel Verilog öğretimi ve otomatik değerlendirilen alıştırma sistemi anlatıyor. | Güçlü yakın akademik eser. Ludus problemi ve farkı bu çalışmayla karşılaştırılmalı; VPLAS'ın kendi üniversite örneklem sonuçlarını ortaokula taşıma. Ayrıntı [`education-studies.md`](education-studies.md) içinde. |

## İlk rakip/karşılaştırma matrisi (masa başı doğrulama)

| Özellik | CircuitVerse | HDLBits | EDA Playground | Ludus hedefi |
|---|---:|---:|---:|---:|
| Browser tabanlı | Evet | Evet | Evet | Evet |
| Görsel dijital devre kurma/simülasyon | Evet | Alıştırma içinde | Hayır, metin HDL + dalga viewer | Evet |
| Sequential elemanlar | Evet (register/RTL sınıfı; detay UI'da kontrol edilmeli) | Clocked Verilog devre alıştırmaları | HDL destekler | Evet; clock kenarı net öğretilir |
| Verilog üretme veya çalıştırma | Deneysel export | Verilog yazılır/çalıştırılır | Verilog yazılır/simüle edilir | Blueprint'ten Verilog; tutarlılık zorunlu |
| Yerel kayıt/import-export | Browser local save ve file flows belgeli | Alıştırma oturumu | Code playground save/share | `.bp` local save/import/export |
| Ortaokul başlangıç dili + sinyal canlandırma | Aynı dokümanlardan doğrulanmadı | Görev ve dil odağı daha teknik | Profesyonel HDL/testbench odaklı | Araştırılıp ölçülecek hedef |

Bu özellik matrisi resmî belgelerde görülen işlevleri gösterir, ürünlerin güncel her ekranı için laboratuvar testi değildir. Rakip karşılaştırması aynı öğrenme görevi, aynı başlangıç bilgisi ve aynı quiz ile yapılırsa araştırma raporuna kanıt sağlayabilir.

## Özgünlük için çalışma kuralı

Ürün fikri şu an **“ilk Scratch benzeri Verilog aracı”** diye sunulmamalı. CircuitVerse zaten visual digital circuit editor, sequential components, browser simulation, multi-tab/subcircuits, local save, decimal conversion ve Verilog export features documents ediyor. Araştırma açığı için daha dar iddia araştır:

- Başlangıçta 0/1 yerine onluk görünümle giriş yaparken gerçek bit genişliği/Verilog eşleşmesini anlama;
- bağımsız hardware branches'in paralel ilerleyişini ve dependent path'leri aynı görselde ayırt etmeyi öğrenme;
- blueprint block construction'dan okunabilir Verilog'a geçiş;
- ortaokul seviyesinde tek bir kavramı öğrenme testiyle ölçme.

Bu olası katkıların her biri henüz hipotezdir. Alan yazını ve doğrudan CircuitVerse/VPLAS karşılaştırması tamamlanmadan “eşsiz”, “ilk” veya kanıtlanmış öğrenme etkisi iddiası kullanılmamalı.
