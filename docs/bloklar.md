---
layout: default
title: Bloklar
description: Devre Atölyesi'nde kullanılabilen dijital mantık blokları.
permalink: /docs/bloklar/
reading_time: 11
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Blok kataloğu</p>
    <h1>Bloklar</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu başvuru sayfası blokları görevlerine göre toplar: dış giriş/çıkış, kombinasyonel hesap, sabit değer, seçilen yol, adlandırılmış sinyal, saklanan durum ve modül bağlantısı.</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Kategoriler</b><a href="#giris-cikis">Dış bağlantılar <small>1 dk</small></a><a href="#mantik-kapilari">Kombinasyonel mantık <small>3 dk</small></a><a href="#sabit">Sabit ve seçici <small>2 dk</small></a><a href="#ara-sinyal">Adlandırılmış sinyal <small>1 dk</small></a><a href="#yazmac">Sıralı mantık <small>1 dk</small></a><a href="#baglanti-kurallari">Port ve modüller <small>3 dk</small></a></nav>
    <h2 id="giris-cikis">Dışarıyla giriş ve çıkış <span class="docs-section-time">~1 dk</span></h2>
    <h3>Giriş ve Çıkış blokları</h3>
    <div class="block-list">
      <div><span class="block-swatch swatch-input">A</span><p><b>Giriş</b><small>Devrenin dışından 0 veya 1 alan sinyal.</small></p></div>
      <div><span class="block-swatch swatch-output">Y</span><p><b>Çıkış</b><small>Devrenin hesapladığı mantıksal sonucu gösterir.</small></p></div>
    </div>
    <h2 id="sabit">Sabit değer ve seçici <span class="docs-section-time">~2 dk</span></h2>
    <h3 id="sabit-blok">Sabit</h3>
    <p>Sabit bloğu, kullanıcı tarafından girilen onluk değeri devrede değişmeyen bir sinyal olarak üretir. Başlıktaki bit genişliğini ayarlayıp değer rozetine tıklayarak yeni değer girebilirsin. Örneğin 4 bit genişliğinde <code>9</code>, Verilog'da <code>4'b1001</code> olur.</p>
    <h3 id="secici">Seçici (MUX)</h3>
    <p>Seçici, <code>sel</code> girişinin tek bitlik değerine göre <code>a</code> veya <code>b</code> yolunu <code>out</code> çıkışına bağlar. <code>sel=0</code> ise <code>a</code>, <code>sel=1</code> ise <code>b</code> seçilir. Veri girişleri ve çıkış aynı genişlikte olabilir; <code>sel</code> daima 1 bittir.</p>
    <h2 id="mantik-kapilari">Kombinasyonel mantık yolları <span class="docs-section-time">~3 dk</span></h2>
    <h3>AND, OR, NOT ve XOR</h3>
    <div class="block-list">
      <div><span class="block-swatch gate-swatch">AND</span><p><b>AND</b><small>İki giriş de 1 ise 1 üretir.</small></p></div>
      <div><span class="block-swatch gate-swatch">OR</span><p><b>OR</b><small>En az bir giriş 1 ise 1 üretir.</small></p></div>
      <div><span class="block-swatch gate-swatch">NOT</span><p><b>NOT</b><small>0 değerini 1'e, 1 değerini 0'a çevirir.</small></p></div>
      <div><span class="block-swatch gate-swatch">XOR</span><p><b>XOR</b><small>Girişler farklıysa 1 üretir.</small></p></div>
    </div>
    <p>Bu kısa açıklama ve doğruluk tabloları tek bit içindir. Bir kapının veri genişliğini 1–32 bit seçebilirsin: geniş girişlerde aynı kapı kuralı her bit konumunda ayrı uygulanır. Örneğin <code>0101 AND 0011 = 0001</code>. Kapılar toplama yapmadığı için bitler arasında taşıma oluşmaz.</p>
    <h3 id="tamamlayici-kapilar">NAND, NOR ve XNOR</h3>
    <p>NAND, NOR ve XNOR, tanıdık kapıların çıkışını tersine çevirir. Adın başındaki <code>N</code>'i “sonucun değili” gibi düşünebilirsin: NAND, AND'in; NOR, OR'un; XNOR, XOR'un tersidir.</p>
    <div class="block-list">
      <div><span class="block-swatch gate-swatch">NAND</span><p><b>NAND</b><small>Yalnızca A ve B ikisi de 1 iken 0 üretir.</small></p></div>
      <div><span class="block-swatch gate-swatch">NOR</span><p><b>NOR</b><small>Yalnızca A ve B ikisi de 0 iken 1 üretir.</small></p></div>
      <div><span class="block-swatch gate-swatch">XNOR</span><p><b>XNOR</b><small>Girişler aynıysa 1 üretir.</small></p></div>
    </div>
    <table class="mini-truth-table"><caption>NAND, NOR ve XNOR doğruluk tablosu</caption><thead><tr><th scope="col">A</th><th scope="col">B</th><th scope="col">NAND</th><th scope="col">NOR</th><th scope="col">XNOR</th></tr></thead><tbody>
      <tr><td>0</td><td>0</td><td class="truth-one">1</td><td class="truth-one">1</td><td class="truth-one">1</td></tr><tr><td>0</td><td>1</td><td class="truth-one">1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>0</td><td class="truth-one">1</td><td>0</td><td>0</td></tr><tr><td>1</td><td>1</td><td>0</td><td>0</td><td class="truth-one">1</td></tr>
    </tbody></table>
    <h2 id="ara-sinyal">Bir sinyale ad ver <span class="docs-section-time">~1 dk</span></h2>
    <h3>Ara Sinyal bloğu</h3>
    <div class="block-list"><div><span class="block-swatch gate-swatch">SIG</span><p><b>Ara sinyal</b><small>Bir bağlantıya isim verir. Girişindeki 0, 1 veya X değerini anında çıkışına aktarır; aynı işareti değişkenler panelinde izleyebilirsin.</small></p></div></div>
    <p>Ara sinyali, bir mantık sonucunu birden fazla yerde kullanırken kabloyu dallandırmak veya devreyi okunur bölümlere ayırmak için ekle. Bloğa çift tıklayıp anlamlı bir ad ver; Verilog çıktısında bu ad bir <code>wire</code> olur. Ara sinyal değer saklamaz ve clock beklemez.</p>
    <h2 id="yazmac">Saat kenarında değer sakla <span class="docs-section-time">~1 dk</span></h2>
    <h3>Yazmaç (register)</h3>
    <div class="block-list">
      <div><span class="block-swatch swatch-register">D</span><p><b>Register</b><small>D girişindeki değeri her yükselen clock kenarında aynı genişlikte Q çıkışına saklar. Başlangıç değeri <code>X</code>'tir.</small></p></div>
    </div>
    <h2 id="baglanti-kurallari">Bloklar ve blueprint'ler nasıl bağlanır? <span class="docs-section-time">~3 dk</span></h2>
    <h3 id="portlar">Portların giriş/çıkış sözleşmesi</h3>
    <p>Her blok türünün sabit port adları vardır. Bir giriş portuna tek kaynak, bir çıkışa birden fazla hedef bağlanabilir:</p>
    <table class="mini-truth-table"><caption>Blueprint bloklarının giriş ve çıkış portları</caption><thead><tr><th scope="col">Blok</th><th scope="col">Giriş</th><th scope="col">Çıkış</th></tr></thead><tbody>
      <tr><th scope="row">Giriş / Sabit</th><td>—</td><td><code>out</code></td></tr>
      <tr><th scope="row">Çıkış</th><td><code>in</code></td><td>—</td></tr>
      <tr><th scope="row">AND / NAND / OR / NOR / XOR / XNOR</th><td><code>a</code>, <code>b</code></td><td><code>out</code></td></tr>
      <tr><th scope="row">Seçici (MUX)</th><td><code>sel</code>, <code>a</code>, <code>b</code></td><td><code>out</code></td></tr>
      <tr><th scope="row">NOT</th><td><code>in</code></td><td><code>out</code></td></tr>
      <tr><th scope="row">Ara Sinyal</th><td><code>in</code></td><td><code>out</code></td></tr>
      <tr><th scope="row">Yazmaç</th><td><code>d</code></td><td><code>out</code> (Q)</td></tr>
      <tr><th scope="row">.bp modülü</th><td>Belgede tanımlı girişler</td><td>Belgede tanımlı çıkışlar</td></tr>
    </tbody></table>
    <p>Ara Sinyal yalnızca isim verilmiş bir <code>wire</code>'dır: değeri anında geçirir, saklamaz. Değer saklayan blok Yazmaç'tır. Saat ayrı bir mantık bloğu değildir: Tek tik yükselen kenar oluşturur; Reset yazmaçları saati beklemeden 0'a çeker. Verilog çıktısında bu davranış aktif-yüksek asenkron <code>reset</code> ile eşleşir.</p>
    <aside class="docs-callout"><b>Genişlik ve değerler</b><p>Her blok başlığından 1–32 bit genişlik seçebilirsin. Bağlanan iki portun genişliği aynı olmalı; genişlik dönüşümü otomatik yapılmaz. Değerleri onluk girip ikilik bit dizisini birlikte görürsün. Girişler başlangıçta 0, yazmaçlar ise bilinmeyen başlangıç nedeniyle <code>X</code> olur. Sinyal renkleri mantıksal değerleri gösterir; fiziksel kapı gecikmesini veya ölçülmüş sinyal hızını göstermez.</p></aside>
    <h3 id="bp-modulleri">Açık `.bp` belgesini modül olarak kullan</h3>
    <p>Açık bir `.bp` sekmesini üst blueprint'te tekrar kullanılabilen tek bir blok olarak ekleyebilirsin. Modülün Giriş ve Çıkış bloklarının adları, dışarıda görünen portların adıdır. Modülün içindeki kapı ve yazmaçlar tek tasarım olarak değerlendirilir; modül bağımlılıkları döngü oluşturamaz.</p>
    <p>Atölye en fazla 8 açık blueprint ve modül başına 8 giriş/8 çıkış portu destekler. Birleşik davranış ve Verilog için adımları görmek istersen <a href="{{ '/docs/kullanim/#moduller' | relative_url }}">modül kullanım rehberine</a> geç.</p>
  </article>
</div>
