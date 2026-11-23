---
layout: default
title: Bloktan Verilog'a
description: Görsel blokları Verilog'daki module ve assign ifadeleriyle eşleştir.
permalink: /docs/bloktan-verilog/
reading_time: 2
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Temel ders · 6 / 6</p>
    <h1>Bloktan Verilog'a</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu dersin sorusu: Tuvalde kurduğum devre kod olarak nasıl görünür?</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#module">Devrenin sınırı <small>1 dk</small></a><a href="#assign">Bağlantının kodu <small>1 dk</small></a></nav>
    <h2 id="module">Module, devrenin sınırını çizer <span class="docs-section-time">~1 dk</span></h2>
    <p>Verilog bir donanım tarif dilidir. <code>module</code> bir devreyi adlandırır; <code>input</code> ve <code>output</code> o devrenin dışarı açılan giriş ve çıkış portlarını tanımlar. Bunları atölyedeki giriş ve çıkış bloklarıyla eşleştirebilirsin.</p>
    <h2 id="assign">Assign, mantık bağlantısını tarif eder <span class="docs-section-time">~1 dk</span></h2>
    <p>Yarım toplayıcıda XOR Toplam, AND Taşıma çıkışını verir. İlişkiyi Verilog'da şöyle yazabiliriz:</p>
    <pre><code>module half_adder (
    input  wire a, b,
    output wire sum, carry
);
    assign sum   = a ^ b;
    assign carry = a &amp; b;
endmodule</code></pre>
    <p><code>assign</code> ifadesi sinyal ilişkisini sürekli tarif eder. İki satır, iki ayrı mantık yoludur; satırlar birbiri ardına çalışan komutlar değildir. Atölye, oluşturduğun blok bağlantılarını karşılık gelen Verilog olarak gösterir.</p>
    <aside class="docs-callout"><b>Devam et</b><p>Şimdi <a href="{{ '/docs/kullanim/' | relative_url }}">atölye kullanım rehberini</a> açıp blokları dene; kapı portlarını ve diğer blok türlerini <a href="{{ '/docs/bloklar/' | relative_url }}">blok kataloğunda</a> bulabilirsin.</p></aside>
    <div class="docs-next"><a href="{{ '/docs/kullanim/' | relative_url }}">Sonraki: Atölyeyi kullan</a></div>
  </article>
</div>
