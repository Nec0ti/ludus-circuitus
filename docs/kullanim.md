---
layout: default
title: Kullanım
description: Devre Atölyesi taslağında sinyalleri ve Verilog'u incele.
permalink: /docs/kullanim/
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Atölye rehberi</p>
    <h1>Kullanım</h1>
    <p class="docs-intro">Atölye ekranı, bloklarla kurulan tasarımı ve onun Verilog karşılığını yan yana görmen için tasarlanıyor. Aşağıdaki örnek, bugün çalışan küçük bir arayüz taslağıdır.</p>
    <h2>Blueprint aç</h2>
    <p>Bir blueprint, proje içindeki bir dijital modülü temsil eder. Örneğin <code>top.bp</code>, giriş ve çıkışları bir araya getiren üst modül olabilir. Daha büyük tasarımlarda başka blueprint’ler ayrı modülleri temsil edebilir.</p>
    <h2>Giriş değerlerini değiştir</h2>
    <p>Giriş anahtarları 0 ve 1 değerlerini seçer. Atölye taslağında “Oynat” dört olası giriş birleşimini sırayla gösterir; bu, çizimdeki mantık ilişkisini inceleyen kombinasyonel örnektir. Henüz kullanıcının blok sürükleyip bağladığı editör değildir.</p>
    <h2>Çıkışları ve kodu birlikte oku</h2>
    <p>Örnek devre iki bağımsız yol kullanır: XOR toplam bitini, AND taşıma bitini üretir. Gerçek Verilog kodunda bu yollar ayrı <code>assign</code> ifadeleriyle tarif edilir. İki yol, birinin diğerini beklemesi gerekmeden hesaplanabilir.</p>
    <h2>Saat ve sıfırlama</h2>
    <p>Bir tik hedefi tek yükselen clock kenarıdır. Duraklatma ve durdurma saklanan register değerini koruyacak, sıfırlama ayrı bir eylem olacaktır. Bu prototipte sıralı devre simülasyonu henüz yoktur; bu açıklama gelecek davranışın sözleşmesidir.</p>
    <aside class="docs-callout"><b>Örnek henüz veri toplamıyor.</b><p>Atölye taslağı puan, isim, süre veya blueprint kaydetmez; bir API'ye veri göndermez.</p></aside>
    <div class="docs-next"><a href="{{ '/docs/bloklar/' | relative_url }}">Sonraki: Bloklar <span aria-hidden="true">↗</span></a></div>
  </article>
</div>
