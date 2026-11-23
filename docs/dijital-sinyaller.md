---
layout: default
title: Dijital sinyaller
description: 0 ve 1'in dijital devrede ne anlattığını öğren.
permalink: /docs/dijital-sinyaller/
reading_time: 3
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Temel ders · 1 / 6</p>
    <h1>0 ve 1: dijital sinyaller</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu dersin sorusu: Bir dijital devredeki 0 ve 1 neyi anlatır?</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#iki-deger">İki değer <small>1 dk</small></a><a href="#ikilik-gosterim">İkilik gösterim <small>1 dk</small></a><a href="#sinyal">Sinyal <small>1 dk</small></a></nav>
    <h2 id="iki-deger">Bir sinyalin iki hali <span class="docs-section-time">~1 dk</span></h2>
    <p>Dijital devre, bilgiyi belirli ve kolay ayırt edilen durumlarla taşır. <b>Bit</b>, 0 ya da 1 olabilen en küçük bilgi parçasıdır. Burada her sinyal bir bit taşır. Düğmeyi düşün: 0 “basılmadı”, 1 “basıldı” anlamına gelebilir. Bu, öğrenmek için kullandığımız basit bir örnektir.</p>
    <h2 id="ikilik-gosterim">İkilik sistem ne demek? <span class="docs-section-time">~1 dk</span></h2>
    <p>Günlük hayatta sayıları onluk sistemle yazarız; bu sistemde 0'dan 9'a kadar rakamlar vardır. İkilik sistem yalnızca iki rakam kullanır: 0 ve 1. Tek bitlik değerlerde onluk ve ikilik yazım aynı görünür: 0 yine 0, 1 yine 1'dir. Ekrandaki tek bitlik girişler bu nedenle kolayca okunur.</p>
    <h2 id="sinyal">Sinyal, bilginin yoludur <span class="docs-section-time">~1 dk</span></h2>
    <p>Bir sinyal, bir devre noktasındaki mantıksal değeri başka bir noktaya taşır. Giriş, dışarıdan değiştirdiğin değeri alır; çıkış, devrenin sonucunu gösterir. Sinyal çizgileri elektriğin fiziksel akışını canlandırmaz; hangi mantıksal değerin hangi yola gittiğini gösterir.</p>
    <aside class="docs-callout"><b>Hatırla</b><p>Bu başlangıç modelinde bir sinyal ya 0'dır ya 1. Yazmaç için gösterilen <code>X</code>, sonraki derste göreceğin başlangıçta bilinmeyen değerdir.</p></aside>
    <div class="docs-next"><a href="{{ '/docs/mantik-kapilari/' | relative_url }}">Sonraki: Mantık kapıları</a></div>
  </article>
</div>
