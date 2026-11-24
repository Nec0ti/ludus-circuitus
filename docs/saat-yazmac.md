---
layout: default
title: Saat ve yazmaç
description: Kombinasyonel kapılar ile saat kenarında değer saklayan yazmaçları ayırt et.
permalink: /docs/saat-yazmac/
reading_time: 4
docs_practice: true
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Temel ders · 5 / 6</p>
    <h1>Saat ve yazmaç</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu dersin sorusu: Bir devre yeni değeri ne zaman hesaplar, ne zaman saklar?</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#hesapla">Kapı hemen hesaplar <small>1 dk</small></a><a href="#sakla">Yazmaç değeri saklar <small>1 dk</small></a><a href="#bir-tik">Bir tikte ne olur? <small>1 dk</small></a><a href="#kendini-dene">Kendini dene <small>1 dk</small></a></nav>
    <h2 id="hesapla">Kapı girişe göre hesaplar <span class="docs-section-time">~1 dk</span></h2>
    <p>AND, OR veya XOR gibi bir kapı girişlerini kullanıp çıkışını hesaplar. Bu tür devreye <b>kombinasyonel mantık</b> denir. Örneğin A veya B değiştiğinde XOR'un sonucu da yeni giriş eşleşmesine göre değişir.</p>
    <h2 id="sakla">Yazmaç bir değeri tutar <span class="docs-section-time">~1 dk</span></h2>
    <p><b>Yazmaç</b> (register), bir sinyal değerini saklayan devre öğesidir; bu değer bir bit ya da daha geniş bir bit dizisi olabilir. D girişindeki değer, etkin saat (clock) kenarında aynı genişlikteki Q çıkışına alınır. Saat kenarları arasında D değişse bile Q saklanan değerini korur. Atölyede bir tik, saatin yükselen kenarını temsil eder.</p>
    <h2 id="bir-tik">Bir tikte ne olur? <span class="docs-section-time">~1 dk</span></h2>
    <table class="mini-truth-table"><caption>Yazmaç değerinin örnek akışı</caption><thead><tr><th scope="col">An</th><th scope="col">D</th><th scope="col">Q</th></tr></thead><tbody>
      <tr><th scope="row">Başlangıç</th><td>0</td><td>X</td></tr><tr><th scope="row">Saat kenarından önce</th><td>1</td><td>X</td></tr><tr><th scope="row">Yükselen kenardan sonra</th><td>1</td><td class="truth-one">1</td></tr>
    </tbody></table>
    <p><code>X</code>, yazmacın başlangıç değeri bilinmiyor demektir; üçüncü bir kararlı mantık değeri değildir. Atölyede Reset yazmaçları 0'a çeker. Duraklatma ve durdurma saklanan değeri korur. Tablodaki 0 ve 1 örneği tek bit içindir; daha geniş yazmaçlarda aynı saklama kuralı bütün bitlere uygulanır.</p>
    <h2 id="kendini-dene">Kendini dene <span class="docs-section-time">~1 dk</span></h2>
    <form class="docs-practice" data-docs-practice data-answer="holds-zero" data-correct-text="Doğru. D değişti, fakat yükselen saat kenarı gelene kadar Q saklanan 0 değerini korur." data-retry-text="Yazmaç D'yi sürekli kopyalamaz; yeni değeri yükselen saat kenarında alır.">
      <fieldset>
        <legend>Reset uygulanıp bırakıldıktan sonra Q=0. D, sonraki yükselen kenardan önce 1 oldu. Q kaçtır?</legend>
        <div class="docs-practice-options">
          <label class="docs-practice-option"><input type="radio" name="register-check" value="updates-now" required> 1; Q, D değişir değişmez değişir</label>
          <label class="docs-practice-option"><input type="radio" name="register-check" value="holds-zero" required> 0; Q, saat kenarına kadar aynı kalır</label>
        </div>
        <button class="btn btn-sm btn-primary" type="submit">Yanıtı denetle</button>
        <p class="docs-practice-feedback" data-feedback aria-live="polite"></p>
      </fieldset>
    </form>
    <div class="docs-next"><a href="{{ '/docs/bloktan-verilog/' | relative_url }}">Sonraki: Bloktan Verilog'a</a></div>
  </article>
</div>
