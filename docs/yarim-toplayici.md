---
layout: default
title: Yarım toplayıcı
description: XOR ve AND kapılarını birleştirerek iki biti topla.
permalink: /docs/yarim-toplayici/
reading_time: 3
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Temel ders · 3 / 6</p>
    <h1>İki kapı, bir yarım toplayıcı</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu dersin sorusu: İki tek bitin toplamasını iki ayrı kapı nasıl hesaplar?</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#iki-bit">İki biti topla <small>1 dk</small></a><a href="#iki-cikis">Toplam ve taşıma <small>1 dk</small></a><a href="#tablo">Sonuçları kontrol et <small>1 dk</small></a></nav>
    <h2 id="iki-bit">İki tek bitin toplamı <span class="docs-section-time">~1 dk</span></h2>
    <p>A ve B girişlerinin her biri 0 veya 1 olabilir. 0+0 sonucu 0, 0+1 ve 1+0 sonucu 1, 1+1 sonucu 2'dir. Son durumda 2'yi tek bitlik bir sonuç olarak yazamayız; iki çıkışa ihtiyaç duyarız.</p>
    <h2 id="iki-cikis">Toplam ve taşıma <span class="docs-section-time">~1 dk</span></h2>
    <p><b>XOR</b> Toplam bitini verir: girişler farklıysa 1. <b>AND</b> Taşıma bitini verir: iki giriş de 1 ise 1. Örneğin 1+1 için Toplam 0, Taşıma 1 olur. Birlikte okunduğunda sonuç <code>10</code> biçimindedir; bu ikilik sistemde 2 değerini gösterir.</p>
    <h2 id="tablo">Dört giriş durumunu kontrol et <span class="docs-section-time">~1 dk</span></h2>
    <table class="mini-truth-table"><caption>Yarım toplayıcının iki çıkışı</caption><thead><tr><th scope="col">A</th><th scope="col">B</th><th scope="col">Toplam (XOR)</th><th scope="col">Taşıma (AND)</th></tr></thead><tbody>
      <tr><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td class="truth-one">1</td><td>0</td></tr><tr><td>1</td><td>0</td><td class="truth-one">1</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td><td class="truth-one">1</td></tr>
    </tbody></table>
    <p>İki çıkış aynı A ve B girişlerinden beslenir. Devre XOR ve AND işlemlerini ayrı yollarda kurar; sonraki derste bu yolların neden paralel çalıştığını göreceksin.</p>
    <div class="docs-next"><a href="{{ '/docs/paralel-yollar/' | relative_url }}">Sonraki: Paralel yollar</a></div>
  </article>
</div>
