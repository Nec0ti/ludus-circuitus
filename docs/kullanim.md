---
layout: default
title: Kullanım
description: Devre Atölyesi taslağında sinyalleri ve Verilog'u incele.
permalink: /docs/kullanim/
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Atölye rehberi</p>
    <h1>Kullanım</h1>
    <p class="docs-intro">Devre Atölyesi tam ekran bir çalışma alanıdır. Üst menü dosyaları ve simülasyonu, sol araçlık blokları, orta tuval blueprint'i, sağ panel mantıksal sinyalleri ve gerçek Verilog'u gösterir.</p>
    <h2>Devre kur ve bağla</h2>
    <p>Soldan Giriş, Çıkış, AND, OR, XOR, NOT veya Register ekle. Bir bloğu başlığından tutup ızgarada taşı. Bağlantı yapmak için bir bloğun çıkış portuna, ardından hedef bloğun giriş portuna tıkla. Giriş portuna tek bir sinyal bağlanır. Seçili bloğu Delete tuşuyla kaldırabilirsin.</p>
    <h2>Girişleri değiştir ve sinyali izle</h2>
    <p>Alttaki Değişkenler bölümünde girişe tıklayarak 0 ve 1 arasında geçiş yap. Blueprint tuvalindeki ve sağdaki Sinyal Görünümü'ndeki değerler birlikte güncellenir. Turkuaz 1'i, gri 0'ı, kesik sarı çizgi henüz bilinmeyen <code>X</code> değerini gösterir. Bunlar mantıksal sinyallerdir; elektrik akımı canlandırması değildir.</p>
    <h2>Oynat ve clock</h2>
    <p>Yalnız kombinasyonel kapılar varsa Oynat, giriş birleşimlerini sırayla dener; bağımsız mantık yolları aynı giriş durumunda birlikte değerlendirilir. Devrede Register varsa Tek tik veya Oynat bir yükselen clock kenarı oluşturur; register'lar yeni değerlerini aynı eski durumdan eşzamanlı alır. Başlangıçta register değeri <code>X</code>'tir. Duraklat ve Durdur değeri korur; Reset register'ları 0 yapar.</p>
    <h2>Blueprint dosyaları ve Verilog</h2>
    <p>Yeni BP veya <code>+</code> ile yeni bir belge aç. Kaydet, açık belgeleri bu tarayıcıda saklar. Dışa aktar etkin belgeyi <code>.bp</code> JSON dosyası olarak indirir; İçe aktar bir dosyayı açar. Sağdaki Verilog çıktısı blueprint geçerliyken otomatik üretilir. Bağlantı hataları varsa uyarı görünür ve HDL üretilmez.</p>
    <aside class="docs-callout"><b>Gizlilik</b><p>Blueprint'ler bu cihazın tarayıcı saklamasında kalır. Quiz/API ve öğrenci verisi toplama henüz etkin değil; atölye verileri sunucuya gönderilmez.</p></aside>
    <div class="docs-next"><a href="{{ '/docs/bloklar/' | relative_url }}">Sonraki: Bloklar <span aria-hidden="true">↗</span></a></div>
  </article>
</div>
