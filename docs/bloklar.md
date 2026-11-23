---
layout: default
title: Bloklar
description: Devre Atölyesi'nde kullanılabilen dijital mantık blokları.
permalink: /docs/bloklar/
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Blok kataloğu</p>
    <h1>Bloklar</h1>
    <p class="docs-intro">Atölye şu anda 1 bitlik sinyallerle çalışır. Sinyal 0, 1 veya başlangıçta bilinmeyen <code>X</code> olabilir. Her kapı ayrı bir donanım yoludur; devreye bağlı yollar aynı anda değerlendirilir.</p>
    <h2 id="giris-cikis">Giriş ve çıkış</h2>
    <div class="block-list">
      <div><span class="block-swatch swatch-input">A</span><p><b>Giriş</b><small>Devrenin dışından 0 veya 1 alan sinyal.</small></p></div>
      <div><span class="block-swatch swatch-output">Y</span><p><b>Çıkış</b><small>Devrenin hesapladığı mantıksal sonucu gösterir.</small></p></div>
    </div>
    <h2 id="mantik-kapilari">Mantık kapıları</h2>
    <div class="block-list">
      <div><span class="logic-block logic-block-small">AND</span><p><b>AND</b><small>İki giriş de 1 ise 1 üretir.</small></p></div>
      <div><span class="logic-block logic-block-small">OR</span><p><b>OR</b><small>En az bir giriş 1 ise 1 üretir.</small></p></div>
      <div><span class="logic-block logic-block-small">NOT</span><p><b>NOT</b><small>0 değerini 1'e, 1 değerini 0'a çevirir.</small></p></div>
      <div><span class="logic-block logic-block-small">XOR</span><p><b>XOR</b><small>Girişler farklıysa 1 üretir.</small></p></div>
    </div>
    <h2 id="yazmac">Clock ve yazmaç (register)</h2>
    <div class="block-list">
      <div><span class="block-swatch swatch-register">D</span><p><b>Register</b><small>D girişindeki değeri her yükselen clock kenarında Q çıkışına saklar. Başlangıç değeri <code>X</code>'tir.</small></p></div>
    </div>
    <h2>Portlar ve clock</h2>
    <p>Kapıların soldaki portları giriş, sağdaki portu çıkıştır. Her giriş portuna bir kaynak bağlanır; bir çıkış birden fazla hedefe dallanabilir. Clock ayrı bir mantık bloğu değildir: simülasyon araç çubuğundaki Tek tik bir yükselen kenardır. Reset eylemi register'ları ayrı olarak 0 yapar.</p>
    <aside class="docs-callout"><b>Bir bitlik başlangıç modeli</b><p>Onluk ekranda 0 ve 1 gösterilir; bu araç henüz çok bitli sayıları veya FPGA kartına yüklemeyi desteklemez.</p></aside>
  </article>
</div>
