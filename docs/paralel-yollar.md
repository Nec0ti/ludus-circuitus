---
layout: default
title: Paralel yollar
description: Verilog satırlarının donanım yollarını neden sıraya koymadığını öğren.
permalink: /docs/paralel-yollar/
reading_time: 3
docs_practice: true
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Temel ders · 4 / 6</p>
    <h1>Paralel yollar nasıl çalışır?</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu dersin sorusu: Bir devrede farklı kapılar aynı anda nasıl iş yapabilir?</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#iki-yol">İki bağımsız yol <small>1 dk</small></a><a href="#bagimlilik">Sinyal bağımlılığı <small>1 dk</small></a><a href="#kendini-dene">Kendini dene <small>1 dk</small></a></nav>
    <h2 id="iki-yol">İki bağımsız yol <span class="docs-section-time">~1 dk</span></h2>
    <p>Yarım toplayıcıda A ve B, hem XOR'a hem AND'e bağlanır. XOR Toplamı, AND Taşımayı hesaplar. Bunlar aynı girişleri kullanan iki ayrı donanım yoludur; girişler belli olduğunda ikisi de kendi çıkışını birlikte hesaplar.</p>
    <p>FPGA, tasarlanan mantık yollarının çip içinde kurulabildiği programlanabilir bir donanımdır. Verilog'daki <code>assign</code> satırlarını bir komut listesi gibi sırayla çalıştırmaz; her satır ayrı bir sinyal ilişkisini tarif eder. Animasyon mantıksal sinyal değerlerini izler; akımı ya da kapıların fiziksel hızını göstermez.</p>
    <h2 id="bagimlilik">Bağlantı varsa sonuç ona bağlıdır <span class="docs-section-time">~1 dk</span></h2>
    <p>Bir kapının çıkışını başka bir kapının girişine bağladıysan ikinci kapı ilk sinyalin değerini kullanır. Bu iki işlem arasında bir bağımlılık vardır. “Paralel” demek bütün bağlantı sırasını unutmak değil; birbirinden bağımsız yolların birlikte değerlendirilmesi demektir.</p>
    <h2 id="kendini-dene">Kendini dene <span class="docs-section-time">~1 dk</span></h2>
    <form class="docs-practice" data-docs-practice data-answer="together" data-correct-text="Doğru. İki ayrı assign ilişkisi aynı giriş değerlerinden birlikte değerlendirilir." data-retry-text="Verilog satırlarını işlem sırası gibi değil, devredeki bağlantı tarifleri gibi düşün.">
      <fieldset>
        <legend>Aynı A ve B girişlerini kullanan XOR ve AND yolları nasıl değerlendirilir?</legend>
        <div class="docs-practice-options">
          <label class="docs-practice-option"><input type="radio" name="parallel-check" value="in-order" required> Önce XOR tamamlanır, sonra AND başlar</label>
          <label class="docs-practice-option"><input type="radio" name="parallel-check" value="together" required> İki yol da kendi çıkışını birlikte hesaplar</label>
        </div>
        <button class="btn btn-sm btn-primary" type="submit">Yanıtı denetle</button>
        <p class="docs-practice-feedback" data-feedback aria-live="polite"></p>
      </fieldset>
    </form>
    <div class="docs-next"><a href="{{ '/docs/saat-yazmac/' | relative_url }}">Sonraki: Saat ve yazmaç</a></div>
  </article>
</div>
