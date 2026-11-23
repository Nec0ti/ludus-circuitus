---
layout: default
title: Kullanım
description: Devre Atölyesi taslağında sinyalleri ve Verilog'u incele.
permalink: /docs/kullanim/
reading_time: 7
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
    <p>Soldan Giriş, Çıkış, AND, OR, XOR, NOT veya Register ekle. Bir bloğu başlığından tutup ızgarada taşı. Bağlantı yapmak için bir bloğun çıkış portuna, ardından hedef bloğun giriş portuna tıkla. Giriş portuna tek bir sinyal bağlanır. Seçili bloğu Delete tuşuyla kaldırabilirsin.</p>
    <h2 id="girisleri-izle">Girişleri değiştir ve sinyali izle <span class="docs-section-time">~1 dk</span></h2>
    <p>Alttaki Değişkenler bölümünde girişe tıklayarak 0 ve 1 arasında geçiş yap. Blueprint tuvalindeki ve sağdaki Sinyal Görünümü'ndeki değerler birlikte güncellenir. Turkuaz 1'i, gri 0'ı, kesik sarı çizgi henüz bilinmeyen <code>X</code> değerini gösterir. Bunlar mantıksal sinyallerdir; elektrik akımı canlandırması değildir.</p>
    <h2 id="simulasyon">Oynat ve clock <span class="docs-section-time">~1 dk</span></h2>
    <p>Yalnız kombinasyonel kapılar varsa Oynat, giriş birleşimlerini sırayla dener; bağımsız mantık yolları aynı giriş durumunda birlikte değerlendirilir. Devrede Register varsa Tek tik veya Oynat bir yükselen clock kenarı oluşturur; register'lar yeni değerlerini aynı eski durumdan eşzamanlı alır. Başlangıçta register değeri <code>X</code>'tir. Duraklat ve Durdur değeri korur; Reset register'ları 0 yapar.</p>
    <h2 id="blueprint-dosyalari">Blueprint dosyaları ve Verilog <span class="docs-section-time">~1 dk</span></h2>
    <p>Yeni BP veya <code>+</code> ile yeni bir belge aç. Kaydet, açık belgeleri bu tarayıcıda saklar. Dışa aktar etkin belgeyi <code>.bp</code> JSON dosyası olarak indirir; İçe aktar bir dosyayı açar. Sağdaki Verilog çıktısı blueprint geçerliyken otomatik üretilir. Bağlantı hataları varsa uyarı görünür ve HDL üretilmez.</p>
    <h2 id="moduller">Bir blueprint'i modül olarak kullanmak <span class="docs-section-time">~2 dk · taslak</span></h2>
    <p><strong>Önizleme:</strong> Modül bir kez kurulan devrenin adlandırılıp başka bir blueprint içinde tekrar kullanılmasını sağlar. Modül dosyasındaki Giriş ve Çıkış blokları onun dışarıya açılan bağlantı noktalarıdır; kapılar, yazmaçlar ve iç bağlantılar modülün içinde kalır.</p>
    <ol><li>Yeni bir BP açıp adını <code>toplayici.bp</code> yap.</li><li>İki Giriş bloğunu <code>A</code> ve <code>B</code>, iki Çıkış bloğunu <code>Toplam</code> ve <code>Taşıma</code> olarak adlandır. İçeride XOR ve AND yollarını kurup bu çıkışlara bağla.</li><li>Üst blueprint'te <code>toplayici</code> modülünü ekle. A ve B girişlerini üst devredeki sinyallere bağla; Toplam ve Taşıma çıkışlarını sonraki bloklara bağla.</li></ol>
    <p>Giriş portu adları modülün girişlerini, çıkış portu adları da sonuçlarını belirler. Bir modülün kendi içinde başka bir modülü kullanması mümkün olsa da bağımlılıkların döngü oluşturmaması gerekir.</p>
    <p>Bu bölüm planlanan `.bp` modül akışını açıklar; editörde kullanıma açılması için modül bağlantısı ve üretilen Verilog'u doğrulayan testlerin tamamlanması gerekir.</p>
    <aside class="docs-callout" id="gizlilik"><b>Gizlilik · ~1 dk</b><p>Blueprint'ler bu cihazın tarayıcı saklamasında kalır. Quiz/API ve öğrenci verisi toplama henüz etkin değil; atölye verileri sunucuya gönderilmez.</p></aside>
    <div class="docs-next"><a href="{{ '/docs/bloklar/' | relative_url }}">Sonraki: Bloklar</a></div>
  </article>
</div>
