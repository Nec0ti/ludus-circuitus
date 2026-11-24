---
layout: default
title: Dijital sinyaller
description: 0 ve 1'in dijital devrede ne anlattığını öğren.
permalink: /docs/dijital-sinyaller/
reading_time: 4
docs_practice: true
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Temel ders · 1 / 6</p>
    <h1>0 ve 1: dijital sinyaller</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Bu dersin sorusu: Bir dijital devredeki 0 ve 1 neyi anlatır?</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#iki-deger">İki değer <small>1 dk</small></a><a href="#ikilik-gosterim">İkilik gösterim <small>1 dk</small></a><a href="#sinyal">Sinyal <small>1 dk</small></a><a href="#kendini-dene">Kendini dene <small>1 dk</small></a></nav>
    <h2 id="iki-deger">Bir sinyalin iki hali <span class="docs-section-time">~1 dk</span></h2>
    <p>Dijital devre, bilgiyi belirli ve kolay ayırt edilen durumlarla taşır. <b>Bit</b>, 0 ya da 1 olabilen en küçük bilgi parçasıdır. Konuya kolay başlamak için bu derste her sinyali bir bit olarak ele alacağız. Düğmeyi düşün: 0 “basılmadı”, 1 “basıldı” anlamına gelebilir. Bu, öğrenmek için kullandığımız basit bir örnektir.</p>
    <h2 id="ikilik-gosterim">İkilik sistem ne demek? <span class="docs-section-time">~1 dk</span></h2>
    <p>Günlük hayatta sayıları onluk sistemle yazarız; bu sistemde 0'dan 9'a kadar rakamlar vardır. İkilik sistem yalnızca iki rakam kullanır: 0 ve 1. Tek bitlik değerlerde onluk ve ikilik yazım aynı görünür: 0 yine 0, 1 yine 1'dir. Ekrandaki tek bitlik girişler bu nedenle kolayca okunur. Atölye daha geniş yolları da destekler: örneğin 4 bitlik <code>1001</code>, onluk sistemde <code>9</code> değeridir.</p>
    <h2 id="sinyal">Sinyal, bilginin yoludur <span class="docs-section-time">~1 dk</span></h2>
    <p>Bir sinyal, bir devre noktasındaki mantıksal değeri başka bir noktaya taşır. Giriş, dışarıdan değiştirdiğin değeri alır; çıkış, devrenin sonucunu gösterir. Sinyal çizgileri elektriğin fiziksel akışını canlandırmaz; hangi mantıksal değerin hangi yola gittiğini gösterir.</p>
    <aside class="docs-callout"><b>Hatırla</b><p>Bu dersteki örnekler tek bit kullanır. Atölyede ise bir sinyal birden çok bitten oluşabilir. Yazmaç için gösterilen <code>X</code>, sonraki derste göreceğin başlangıçta bilinmeyen değerdir.</p></aside>
    <h2 id="kendini-dene">Kendini dene <span class="docs-section-time">~1 dk</span></h2>
    <form class="docs-practice" data-docs-practice data-answer="pressed" data-correct-text="Doğru. Bu örnekte 1, düğmeye basıldığını gösteriyor." data-retry-text="Bir daha dene: örnekte 0, düğmenin basılmadığını anlatıyor.">
      <fieldset>
        <legend>Bu örnekte 1 ne anlama geliyor?</legend>
        <div class="docs-practice-options">
          <label class="docs-practice-option"><input type="radio" name="signal-check" value="released" required> Düğmeye basılmadı</label>
          <label class="docs-practice-option"><input type="radio" name="signal-check" value="pressed" required> Düğmeye basıldı</label>
        </div>
        <button class="btn btn-sm btn-primary" type="submit">Yanıtı denetle</button>
        <p class="docs-practice-feedback" data-feedback aria-live="polite"></p>
      </fieldset>
    </form>
    <div class="docs-next"><a href="{{ '/docs/mantik-kapilari/' | relative_url }}">Sonraki: Mantık kapıları</a></div>
  </article>
</div>
