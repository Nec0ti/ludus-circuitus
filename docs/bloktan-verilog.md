---
layout: default
title: Bloktan Verilog'a
description: Görsel blokları Verilog'daki module ve assign ifadeleriyle eşleştir.
permalink: /docs/bloktan-verilog/
reading_time: 3
docs_practice: true
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Temel ders · 6 / 6</p>
    <h1>Bloktan Verilog'a</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu dersin sorusu: Tuvalde kurduğum devre kod olarak nasıl görünür?</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#module">Devrenin sınırı <small>1 dk</small></a><a href="#assign">Bağlantının kodu <small>1 dk</small></a><a href="#kendini-dene">Kendini dene <small>1 dk</small></a></nav>
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
    <h2 id="kendini-dene">Kendini dene <span class="docs-section-time">~1 dk</span></h2>
    <form class="docs-practice" data-docs-practice data-answer="xor-sum" data-correct-text="Doğru. XOR, a ve b girişlerinin farklı olduğu durumda sum değerini 1 yapar." data-retry-text="Hatırla: ^ XOR kapısıdır ve yarım toplayıcının toplam çıkışını verir.">
      <fieldset>
        <legend>Yarım toplayıcıda XOR çıkışı <code>sum</code> için hangi atama kullanılır?</legend>
        <div class="docs-practice-options">
          <label class="docs-practice-option"><input type="radio" name="assign-check" value="and-sum" required> <code>assign sum = a &amp; b;</code></label>
          <label class="docs-practice-option"><input type="radio" name="assign-check" value="xor-sum" required> <code>assign sum = a ^ b;</code></label>
          <label class="docs-practice-option"><input type="radio" name="assign-check" value="xor-carry" required> <code>assign carry = a ^ b;</code></label>
        </div>
        <button class="btn btn-sm btn-primary" type="submit">Yanıtı denetle</button>
        <p class="docs-practice-feedback" data-feedback aria-live="polite"></p>
      </fieldset>
    </form>
    <aside class="docs-callout"><b>Devam et</b><p>Şimdi <a href="{{ '/docs/kullanim/' | relative_url }}">atölye kullanım rehberini</a> açıp blokları dene; kapı portlarını ve diğer blok türlerini <a href="{{ '/docs/bloklar/' | relative_url }}">blok kataloğunda</a> bulabilirsin.</p></aside>
    <div class="docs-next"><a href="{{ '/docs/kullanim/' | relative_url }}">Sonraki: Atölyeyi kullan</a></div>
  </article>
</div>
