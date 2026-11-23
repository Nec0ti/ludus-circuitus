---
layout: default
title: Bloklar
description: Devre Atölyesi'nde kullanılabilen dijital mantık blokları.
permalink: /docs/bloklar/
reading_time: 7
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Blok kataloğu</p>
    <h1>Bloklar</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Atölye şu anda 1 bitlik sinyallerle çalışır. Sinyal 0, 1 veya başlangıçta bilinmeyen <code>X</code> olabilir. Her kapı ayrı bir donanım yoludur; devreye bağlı yollar aynı anda değerlendirilir.</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#giris-cikis">Giriş ve çıkış <small>1 dk</small></a><a href="#mantik-kapilari">Mantık kapıları <small>1 dk</small></a><a href="#ara-sinyal">Ara sinyal <small>1 dk</small></a><a href="#yazmac">Clock ve yazmaç <small>1 dk</small></a><a href="#portlar">Portlar ve bağlantı <small>2 dk</small></a><a href="#bp-modulleri">BP modülleri <small>1 dk</small></a></nav>
    <h2 id="giris-cikis">Giriş ve çıkış <span class="docs-section-time">~1 dk</span></h2>
    <div class="block-list">
      <div><span class="block-swatch swatch-input">A</span><p><b>Giriş</b><small>Devrenin dışından 0 veya 1 alan sinyal.</small></p></div>
      <div><span class="block-swatch swatch-output">Y</span><p><b>Çıkış</b><small>Devrenin hesapladığı mantıksal sonucu gösterir.</small></p></div>
    </div>
    <h2 id="mantik-kapilari">Mantık kapıları <span class="docs-section-time">~1 dk</span></h2>
    <div class="block-list">
      <div><span class="block-swatch gate-swatch">AND</span><p><b>AND</b><small>İki giriş de 1 ise 1 üretir.</small></p></div>
      <div><span class="block-swatch gate-swatch">OR</span><p><b>OR</b><small>En az bir giriş 1 ise 1 üretir.</small></p></div>
      <div><span class="block-swatch gate-swatch">NOT</span><p><b>NOT</b><small>0 değerini 1'e, 1 değerini 0'a çevirir.</small></p></div>
      <div><span class="block-swatch gate-swatch">XOR</span><p><b>XOR</b><small>Girişler farklıysa 1 üretir.</small></p></div>
    </div>
    <h2 id="ara-sinyal">Ara sinyal <span class="docs-section-time">~1 dk</span></h2>
    <div class="block-list"><div><span class="block-swatch gate-swatch">SIG</span><p><b>Ara sinyal</b><small>Bir bağlantıya isim verir. Girişindeki 0, 1 veya X değerini anında çıkışına aktarır; aynı işareti değişkenler panelinde izleyebilirsin.</small></p></div></div>
    <p>Ara sinyali, bir mantık sonucunu birden fazla yerde kullanırken kabloyu dallandırmak veya devreyi okunur bölümlere ayırmak için ekle. Bloğa çift tıklayıp anlamlı bir ad ver; Verilog çıktısında bu ad bir <code>wire</code> olur. Ara sinyal değer saklamaz ve clock beklemez.</p>
    <h2 id="yazmac">Clock ve yazmaç (register) <span class="docs-section-time">~1 dk</span></h2>
    <div class="block-list">
      <div><span class="block-swatch swatch-register">D</span><p><b>Register</b><small>D girişindeki değeri her yükselen clock kenarında Q çıkışına saklar. Başlangıç değeri <code>X</code>'tir.</small></p></div>
    </div>
    <h2 id="portlar">Portlar ve clock <span class="docs-section-time">~2 dk</span></h2>
    <p>Bu MVP'deki blok kümesi giriş/çıkış, dört temel kapı, adlandırılmış ara sinyal, yazmaç ve açık `.bp` belgelerinden oluşan modül bloklarıyla sınırlıdır. Kapıların port sözleşmesi şöyledir:</p>
    <table class="mini-truth-table"><caption>Blueprint bloklarının giriş ve çıkış portları</caption><thead><tr><th scope="col">Blok</th><th scope="col">Giriş</th><th scope="col">Çıkış</th></tr></thead><tbody>
      <tr><th scope="row">Giriş</th><td>—</td><td><code>out</code></td></tr>
      <tr><th scope="row">Çıkış</th><td><code>in</code></td><td>—</td></tr>
      <tr><th scope="row">AND / OR / XOR</th><td><code>a</code>, <code>b</code></td><td><code>out</code></td></tr>
      <tr><th scope="row">NOT</th><td><code>in</code></td><td><code>out</code></td></tr>
      <tr><th scope="row">Ara Sinyal</th><td><code>in</code></td><td><code>out</code></td></tr>
      <tr><th scope="row">Yazmaç</th><td><code>d</code></td><td><code>out</code> (Q)</td></tr>
      <tr><th scope="row">.bp modülü</th><td>Belgede tanımlı girişler</td><td>Belgede tanımlı çıkışlar</td></tr>
    </tbody></table>
    <p>Her giriş portuna bir kaynak bağlanır; bir çıkış birden fazla hedefe dallanabilir. Ara Sinyal yalnızca isim verilmiş bir <code>wire</code>'dır: değeri anında geçirir, saklamaz. Değer saklayan tek blok Yazmaç'tır. XOR farklılık/parite ve yarım toplayıcı örneklerini kurar. Saat ayrı bir mantık bloğu değildir; Tek tik bir yükselen kenar oluşturur. Reset saati beklemeden yazmaçları 0'a çeker. Verilog çıktısında <code>reset</code> girişi 1 olduğunda aynı sıfırlama clock kenarı beklemeden uygulanır (aktif-yüksek asenkron reset).</p>
    <aside class="docs-callout"><b>Bir bitlik başlangıç modeli</b><p>Girişler başlangıçta 0'dır; yazmaç ilk değerinin ne olduğunu bilmediğimiz için <code>X</code> gösterir. Ekrandaki 0/1 değerleri onluk gösterimdir ve tek bitlik modelde ikilik 0/1 ile aynıdır. Sinyal renkleri mantıksal değerleri gösterir; fiziksel kapı gecikmesini veya ölçülmüş sinyal hızını göstermez. Çok bitli sayılar, sabitler, seçici (MUX) blokları ve FPGA kartına yükleme MVP kapsamında değildir.</p></aside>
    <h2 id="bp-modulleri">Blueprint modülleri <span class="docs-section-time">~1 dk</span></h2>
    <p>Açık bir `.bp` sekmesini üst blueprint'te tekrar kullanılabilen tek bir blok olarak ekleyebilirsin. Modülün Giriş ve Çıkış bloklarının adları, dışarıda görünen portların adıdır. Modülün içindeki kapı ve yazmaçlar tek tasarım olarak değerlendirilir; modül bağımlılıkları döngü oluşturamaz.</p>
    <p>Atölye en fazla 8 açık blueprint ve modül başına 8 giriş/8 çıkış portu destekler. Birleşik davranış ve Verilog için adımları görmek istersen <a href="{{ '/docs/kullanim/#moduller' | relative_url }}">modül kullanım rehberine</a> geç.</p>
  </article>
</div>
