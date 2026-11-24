---
layout: default
title: Mantık kapıları
description: AND, OR, XOR ve terslenmiş çıkışlı kapıları doğruluk tablosuyla öğren.
permalink: /docs/mantik-kapilari/
reading_time: 4
docs_practice: true
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Temel ders · 2 / 6</p>
    <h1>Mantık kapıları ve doğruluk tabloları</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu dersin sorusu: Bir ya da iki giriş verildiğinde kapının çıkışını nasıl buluruz?</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#tablo-okuma">Tablo okuma <small>1 dk</small></a><a href="#temel-kapilar">AND, OR ve XOR <small>1 dk</small></a><a href="#terslenen-kapilar">NAND, NOR ve XNOR <small>1 dk</small></a><a href="#kendini-dene">Kendini dene <small>1 dk</small></a></nav>
    <h2 id="tablo-okuma">Doğruluk tablosu nasıl okunur? <span class="docs-section-time">~1 dk</span></h2>
    <p>Kapıların girişlerine göre hangi çıkışı verdiğini kuralı yazarak veya doğruluk tablosuyla gösterebiliriz. İki girişli bir kapıda A ve B'nin dört olası eşleşmesi vardır: 00, 01, 10 ve 11. Her satır bir eşleşmeyi, son sütun ise kapının sonucunu verir.</p>
    <h2 id="temel-kapilar">AND, OR ve XOR <span class="docs-section-time">~1 dk</span></h2>
    <p><b>AND</b> “ikisi de 1 mi?” diye sorar. <b>OR</b> “en az biri 1 mi?” diye sorar. <b>XOR</b> “değerler farklı mı?” diye sorar. Dikkat: OR, iki giriş de 1 olduğunda da 1 verir; XOR ise farklılık aradığı için 0 verir.</p>
    <table class="mini-truth-table"><caption>Temel kapıların çıkışları</caption><thead><tr><th scope="col">A</th><th scope="col">B</th><th scope="col">AND</th><th scope="col">OR</th><th scope="col">XOR</th></tr></thead><tbody>
      <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td></tr><tr><td>0</td><td>1</td><td>0</td><td class="truth-one">1</td><td class="truth-one">1</td></tr><tr><td>1</td><td>0</td><td>0</td><td class="truth-one">1</td><td class="truth-one">1</td></tr><tr><td>1</td><td>1</td><td class="truth-one">1</td><td class="truth-one">1</td><td>0</td></tr>
    </tbody></table>
    <p><b>İsteğe bağlı, biraz ileri:</b> Bu tablo tek bit içindir. Daha geniş bir yolda kapı aynı kuralı her bit konumuna ayrı uygular. Örneğin <code>0101 AND 0011</code> sonucu <code>0001</code> olur; bu işlem sayıları toplamaz ve bitler arasında taşıma üretmez.</p>
    <h2 id="terslenen-kapilar">NAND, NOR ve XNOR <span class="docs-section-time">~1 dk</span></h2>
    <p>NOT, bir girişin değerini tersine çevirir: 0'ı 1, 1'i 0 yapar. İki girişli kapı adının başındaki N de çıkışın terslendiğini hatırlatır: NAND, AND'in; NOR, OR'un; XNOR, XOR'un tersidir.</p>
    <table class="mini-truth-table"><caption>Terslenmiş kapı çıkışları</caption><thead><tr><th scope="col">A</th><th scope="col">B</th><th scope="col">NAND</th><th scope="col">NOR</th><th scope="col">XNOR</th></tr></thead><tbody>
      <tr><td>0</td><td>0</td><td class="truth-one">1</td><td class="truth-one">1</td><td class="truth-one">1</td></tr><tr><td>0</td><td>1</td><td class="truth-one">1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>0</td><td class="truth-one">1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td><td>0</td><td class="truth-one">1</td></tr>
    </tbody></table>
    <h2 id="kendini-dene">Kendini dene <span class="docs-section-time">~1 dk</span></h2>
    <form class="docs-practice" data-docs-practice data-answer="zero" data-correct-text="Doğru. XOR, girişler farklı olduğunda 1 verir; 1 ve 1 aynı olduğu için sonuç 0'dır." data-retry-text="İki giriş aynı mı farklı mı? XOR yalnızca farklı olduklarında 1 verir.">
      <fieldset>
        <legend>XOR kapısının A=1 ve B=1 için çıkışı nedir?</legend>
        <div class="docs-practice-options">
          <label class="docs-practice-option"><input type="radio" name="gate-check" value="one" required> 1</label>
          <label class="docs-practice-option"><input type="radio" name="gate-check" value="zero" required> 0</label>
        </div>
        <button class="btn btn-sm btn-primary" type="submit">Yanıtı denetle</button>
        <p class="docs-practice-feedback" data-feedback aria-live="polite"></p>
      </fieldset>
    </form>
    <div class="docs-next"><a href="{{ '/docs/yarim-toplayici/' | relative_url }}">Sonraki: Yarım toplayıcıyı kur</a></div>
  </article>
</div>
