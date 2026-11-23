---
layout: default
title: Kullanım
description: Devre Atölyesi taslağında sinyalleri ve Verilog'u incele.
permalink: /docs/kullanim/
reading_time: 8
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Atölye rehberi</p>
    <h1>Kullanım</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Devre Atölyesi tam ekran bir çalışma alanıdır. Üst menü dosyaları ve simülasyonu, sol araçlık blokları, orta tuval blueprint'i, sağ panel mantıksal sinyalleri ve gerçek Verilog'u gösterir.</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#devre-kur">Devre kurma <small>1 dk</small></a><a href="#girisleri-izle">Sinyali izleme <small>1 dk</small></a><a href="#simulasyon">Simülasyon ve clock <small>1 dk</small></a><a href="#blueprint-dosyalari">Blueprint ve Verilog <small>1 dk</small></a><a href="#moduller">.bp modülleri <small>2 dk</small></a><a href="#gizlilik">Yerel kayıt <small>1 dk</small></a></nav>
    <h2 id="devre-kur">Devre kur ve bağla <span class="docs-section-time">~1 dk</span></h2>
    <p>Soldan Giriş, Çıkış, AND, OR, XOR, NOT, Ara Sinyal veya Yazmaç ekle. Bir bloğu başlığından tutup ızgarada taşı. Bağlantı yapmak için bir bloğun çıkış portuna, ardından hedef bloğun giriş portuna tıkla. Giriş portuna tek bir sinyal bağlanır. Seçili bloğu Delete tuşuyla kaldırabilirsin.</p>
    <h2 id="girisleri-izle">Girişleri değiştir ve sinyali izle <span class="docs-section-time">~1 dk</span></h2>
    <p>Alttaki Değişkenler bölümünde girişe tıklayarak 0 ve 1 arasında geçiş yap. Blueprint tuvalindeki ve sağdaki Sinyal Görünümü'ndeki değerler birlikte güncellenir. Turkuaz 1'i, gri 0'ı, kesik sarı çizgi henüz bilinmeyen <code>X</code> değerini gösterir. Bunlar mantıksal sinyallerdir; elektrik akımı canlandırması değildir.</p>
    <p>Bir yolun değerini adlandırıp alttaki listede izlemek için Ara Sinyal ekle. Bloğa çift tıklayarak adını değiştir; bu değer saklanmaz, bağlı olduğu sinyalle birlikte anında değişir.</p>
    <h2 id="simulasyon">Oynat ve clock <span class="docs-section-time">~1 dk</span></h2>
    <p>Yalnız kombinasyonel kapılar varsa Oynat, giriş birleşimlerini sırayla dener; bağımsız mantık yolları aynı giriş durumunda birlikte değerlendirilir. Devrede Register varsa Tek tik veya Oynat bir yükselen clock kenarı oluşturur; register'lar yeni değerlerini aynı eski durumdan eşzamanlı alır. Başlangıçta register değeri <code>X</code>'tir. Duraklat ve Durdur değeri korur; Reset register'ları 0 yapar.</p>
    <h2 id="blueprint-dosyalari">Blueprint dosyaları ve Verilog <span class="docs-section-time">~1 dk</span></h2>
    <p>Yeni BP veya <code>+</code> ile yeni bir belge aç. Kaydet, açık belgeleri bu tarayıcıda saklar. Dışa aktar etkin belgeyi <code>.bp</code> JSON dosyası olarak indirir; İçe aktar bir dosyayı açar. Sağdaki Verilog çıktısı blueprint geçerliyken otomatik üretilir. Bağlantı hataları varsa uyarı görünür ve HDL üretilmez.</p>
    <h2 id="moduller">Bir blueprint'i modül olarak kullanmak <span class="docs-section-time">~2 dk</span></h2>
    <p>Bir modül, kendi giriş ve çıkışlarıyla tek blok gibi kullanılabilen başka bir açık blueprint'tir. Modülün içindeki kapılar ve yazmaçlar çalışma sırasında üst devreyle birlikte değerlendirilir.</p>
    <ol><li><strong>Modül dosyasını kur:</strong> <code>+</code> veya <em>Yeni BP</em> ile yeni bir blueprint aç. Giriş, kapı/yazmaç ve Çıkış bloklarını kurup bütün portları bağla. Giriş ve Çıkış adları modül port adları olur.</li><li><strong>Üst blueprint'e dön:</strong> sekmelerden üst devreyi seç. Sol araçlıktaki <em>BP MODÜLLERİ</em> altında diğer açık dosyaların adını bulup kullanmak istediğine tıkla.</li><li><strong>Portları bağla:</strong> modül bloğunun adlandırılmış giriş portlarını üst devredeki sinyal çıkışlarına; modülün adlandırılmış çıkışlarını sonraki blokların girişlerine bağla.</li></ol>
    <p>Üst ve alt blueprint'lerin modül adları benzersiz olmalı, çağrılar da döngü oluşturmamalıdır. Bir projede en fazla 8 açık blueprint; modül başına en fazla 8 giriş ve 8 çıkış portu bulunabilir. Ana tuval modülü tek blok olarak gösterir; Verilog çıktısı iç mantığı üst modülde açar. Sıralı alt modüller aynı clock tiklerinde güncellenir.</p>
    <p><em>Kaydet</em> açık blueprint dosyalarını bu tarayıcıda birlikte saklar. <em>Dışa aktar</em> yalnız etkin `.bp` dosyasını indirir; projeyi başka cihaza taşırken bağlı modül dosyalarını ayrı ayrı dışa aktarıp yeniden aç.</p>
    <aside class="docs-callout" id="gizlilik"><b>Gizlilik · ~1 dk</b><p>Blueprint'ler bu cihazın tarayıcı saklamasında kalır. Quiz/API ve öğrenci verisi toplama henüz etkin değil; atölye verileri sunucuya gönderilmez.</p></aside>
    <div class="docs-next"><a href="{{ '/docs/bloklar/' | relative_url }}">Sonraki: Bloklar</a></div>
  </article>
</div>
