---
layout: default
title: Bloklar
description: Ludus Circuitus için düşünülen başlangıç blokları.
permalink: /docs/bloklar/
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Blok kataloğu</p>
    <h1>Bloklar</h1>
    <p class="docs-intro">Blok kataloğu olabildiğince küçük kalacak. Aşağıdaki gruplar ilk taslak içindir; giriş/çıkış portları ve kesin davranış sözleşmesi henüz tamamlanmadı.</p>
    <h2>Giriş ve çıkış</h2>
    <div class="block-list">
      <div><span class="block-swatch swatch-input">A</span><p><b>Giriş</b><small>Devrenin dışından 0 veya 1 alan sinyal.</small></p></div>
      <div><span class="block-swatch swatch-output">Y</span><p><b>Çıkış</b><small>Devrenin hesapladığı mantıksal sonucu gösterir.</small></p></div>
    </div>
    <h2>Mantık kapıları</h2>
    <div class="block-list">
      <div><span class="logic-block logic-block-small">AND</span><p><b>AND</b><small>İki giriş de 1 ise 1 üretir.</small></p></div>
      <div><span class="logic-block logic-block-small">OR</span><p><b>OR</b><small>En az bir giriş 1 ise 1 üretir.</small></p></div>
      <div><span class="logic-block logic-block-small">NOT</span><p><b>NOT</b><small>0 değerini 1'e, 1 değerini 0'a çevirir.</small></p></div>
      <div><span class="logic-block logic-block-small">XOR</span><p><b>XOR</b><small>Girişler farklıysa 1 üretir.</small></p></div>
    </div>
    <h2>Clock ve register</h2>
    <div class="block-list">
      <div><span class="block-swatch swatch-clock">↑</span><p><b>Clock</b><small>Durumun hangi saat kenarında güncelleneceğini gösterir.</small></p></div>
      <div><span class="block-swatch swatch-register">Q</span><p><b>Register</b><small>Bir değeri saklar ve tanımlı kenarda yeni değeri alır.</small></p></div>
    </div>
    <aside class="docs-callout"><b>Bu liste karar taslağıdır.</b><p>Kesin başlangıç bloğu sayısı, reset davranışı ve sinyal türleri geliştirme öncesi araştırma/backlog kararına bağlanacak.</p></aside>
  </article>
</div>
