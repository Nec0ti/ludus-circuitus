# Özgün Verilog örnekleri

Bu örnekler 2026-11-23 tarihinde proje için yazılmıştır (**PROJECT EXAMPLE / ORIGINAL**); IEEE standardından veya HDLBits çözümlerinden kopya değildir. Klasik Verilog-2001 tarzı `wire`, `reg`, `assign`, `always @(posedge clk)` yazımı kullanılır; SystemVerilog'a özgü sözdizimi eklenmemiştir.

| Dosya | Etiket | Öğretim amacı |
|---|---|---|
| [`01_parallel_paths.v`](01_parallel_paths.v) | **COMBINATIONAL / PARALLEL** | İki bağımsız mantık kolu ve bu kolların birleştiği bağımlı bir çıkış. Kaynakta satırların sırası donanım işleme sırası değildir. |
| [`02_register.v`](02_register.v) | **SEQUENTIAL / CLOCK EDGE** | Yükselen kenarda veri tutan register ve senkron reset. Reset clock kenarında uygulanır. |
| [`03_decimal_counter.v`](03_decimal_counter.v) | **SEQUENTIAL / DECIMAL-FACING** | Kullanıcıya onluk 0–9 sayacı gösterirken gerçek donanımda dört bitlik değer kullanmak. 9 sonrası sıfıra sarar. |

## Öğretim ve kapsam sınırı

Onluk gösterim yeni başlayan kullanıcıyı gereksiz bit yazımından koruyabilir; Verilog'un bit vektörleriyle çalışan dijital donanım modeli korunmalıdır. Örneğin 4 bitlik sinyal `0`–`15` aralığını tutar; onluk sayaç örneği bilinçli olarak `0`–`9` aralığına sarar. İlk iki kolun animasyonu fiziksel akım veya gerçek kapı gecikmesi anlamına gelmez; mantıksal değerlerin ilişkisini gösterir.

Bu dosyalarda testbench ve ölçüm eşikleri yok; bunlar test/benchmark şartnamesi yazılırken ayrıca eklenmeli. Araca eklenmeden önce örneklerin simülatörle derlenip beklenen giriş/clock izleriyle doğrulanması gerekir.
