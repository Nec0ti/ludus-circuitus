---
layout: default
title: Hata kodları
description: Devre Atölyesi bağlantı, bit genişliği, blueprint ve simülasyon hata kodlarını anla ve düzelt.
permalink: /docs/errors/
reading_time: 3
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Sorun giderme</p>
    <h1>Hata kodları</h1>
    <p class="docs-reading-time">Okuma süresi · 3 dk</p>
    <p class="docs-intro">Atölye bir bağlantıyı veya tasarımı çalıştırmayı reddederse konsolda hata kodu ve kısa bir açıklama görünür. Kodu seçerek nedenini ve düzeltme adımlarını açabilirsin.</p>
    <aside class="docs-callout"><b>Konsol nerede?</b><p>Devre Atölyesi'nde tuvalin altındaki Konsol düğmesini aç. Hata kodları bağlantı içerir; her açıklama yeni sekmede açılır.</p></aside>

    <h2 id="baglanti">Bağlantı ve portlar</h2>
    <ul>
      <li><a href="{{ '/docs/errors/vl1001/' | relative_url }}"><code>VL1001</code> Geçersiz port bağlantısı</a></li>
      <li><a href="{{ '/docs/errors/vl1002/' | relative_url }}"><code>VL1002</code> Giriş portu zaten bağlı</a></li>
      <li><a href="{{ '/docs/errors/vl1003/' | relative_url }}"><code>VL1003</code> Boş giriş portu</a></li>
      <li><a href="{{ '/docs/errors/vl1004/' | relative_url }}"><code>VL1004</code> Kombinasyonel döngü</a></li>
    </ul>

    <h2 id="bitler">Bit genişliği ve değerler</h2>
    <ul>
      <li><a href="{{ '/docs/errors/vl0001/' | relative_url }}"><code>VL0001</code> Bit genişlikleri uyuşmuyor</a></li>
      <li><a href="{{ '/docs/errors/vl2001/' | relative_url }}"><code>VL2001</code> Geçersiz bit genişliği</a></li>
      <li><a href="{{ '/docs/errors/vl2002/' | relative_url }}"><code>VL2002</code> Genişliğe uymayan değer</a></li>
    </ul>

    <h2 id="bp">Blueprint ve adlandırma</h2>
    <p>Bu kodlar `.bp` tasarımının yapısını veya Verilog'da kullanılacak sinyal adlarını anlatır. Uygulamada kullanıcı yazdığı Verilog kodunu derleyen bir sözdizimi denetleyicisi yoktur.</p>
    <ul>
      <li><a href="{{ '/docs/errors/vl3001/' | relative_url }}"><code>VL3001</code> Blueprint biçimi</a></li>
      <li><a href="{{ '/docs/errors/vl3002/' | relative_url }}"><code>VL3002</code> Blok kimliği veya konumu</a></li>
      <li><a href="{{ '/docs/errors/vl3003/' | relative_url }}"><code>VL3003</code> Verilog sinyal adı</a></li>
      <li><a href="{{ '/docs/errors/vl3004/' | relative_url }}"><code>VL3004</code> Çıkış bloğu eksik</a></li>
    </ul>

    <h2 id="modul">Modül birleştirme</h2>
    <ul>
      <li><a href="{{ '/docs/errors/vl4001/' | relative_url }}"><code>VL4001</code> Modül bulunamadı</a></li>
      <li><a href="{{ '/docs/errors/vl4002/' | relative_url }}"><code>VL4002</code> Modül port sınırı</a></li>
      <li><a href="{{ '/docs/errors/vl4003/' | relative_url }}"><code>VL4003</code> Modül döngüsü</a></li>
      <li><a href="{{ '/docs/errors/vl4004/' | relative_url }}"><code>VL4004</code> Modül birleştirme sınırı</a></li>
    </ul>

    <h2 id="simulasyon">Simülasyon ve dosyalar</h2>
    <ul>
      <li><a href="{{ '/docs/errors/vl5001/' | relative_url }}"><code>VL5001</code> Simülasyon değeri</a></li>
      <li><a href="{{ '/docs/errors/vl6001/' | relative_url }}"><code>VL6001</code> Blueprint dosyası açılamadı</a></li>
      <li><a href="{{ '/docs/errors/vl6002/' | relative_url }}"><code>VL6002</code> Dosya boyutu sınırı</a></li>
      <li><a href="{{ '/docs/errors/vl9999/' | relative_url }}"><code>VL9999</code> Beklenmeyen atölye hatası</a></li>
    </ul>

    <h2 id="sentez">Sentez ve harici derleyici hataları</h2>
    <p>Devre Atölyesi Verilog üretir; sentez veya harici Verilog derleyicisi çalıştırmaz. Bu yüzden sentez ve compiler hataları için burada uydurma kodlar yoktur. Üretilen kodu dışarıda kullandığında o aracın kendi hata mesajına bak.</p>
  </article>
</div>
