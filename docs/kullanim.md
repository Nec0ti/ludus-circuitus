---
layout: default
title: Atölye kullanımı
description: Devre Atölyesi'nde bloklarla devre kur, mantıksal sinyalleri izle ve blueprint dosyalarını düzenle.
permalink: /docs/kullanim/
reading_time: 9
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Atölye rehberi</p>
    <h1>Atölye kullanımı</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Çalışma alanında soldan blok ekle, ortada bağla, sağdaki görünüm ve Verilog çıktısıyla sonucu incele. Bu sayfa dört ayrı işi sırayla anlatır.</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Adımlar</b><a href="#devre-kur">1. Devreyi kur <small>2 dk</small></a><a href="#girisleri-izle">2. Sinyalleri incele <small>2 dk</small></a><a href="#simulasyon">3. Görselleştirmeyi ve yazmacı çalıştır <small>1 dk</small></a><a href="#blueprint-dosyalari">4. Dosya ve modülleri yönet <small>3 dk</small></a></nav>

    <h2 id="devre-kur">1. Devreyi kur <span class="docs-section-time">~2 dk</span></h2>
    <h3>Blokları ekle ve yerleştir</h3>
    <p>Soldan Giriş, Çıkış, kapı, Sabit, Seçici, Ara Sinyal veya Yazmaç ekle. Bir bloğun başlığını tutup ızgarada taşı. Her blokta bit genişliğini başlıktaki menüden 1–32 arasında seç. Blok türlerinin görev ve portlarını <a href="{{ '/docs/bloklar/' | relative_url }}">blok kataloğunda</a> bulabilirsin.</p>
    <h3>Tuvalde gezin ve çoklu seçim yap</h3>
    <p>Tuval boşluğuna sağ tıkla: arama ve kısa açıklama içeren blok listesi açılır; bir öğeyi seç veya Escape/dışarı tıklamayla kapat. Boş alanda sol tuşu sürüklemek seçim kutusu oluşturur. Sağ tuşu basılı sürüklemek veya orta tuşu kullanmak tuvali kaydırır; tekerlek yakınlaştırır. Araçlıktaki bloğu tuvale sürükleyerek de ekleyebilirsin.</p>
    <h3>Portları birbirine bağla</h3>
    <p>Önce bir bloğun çıkış portuna, sonra hedef bloğun giriş portuna tıkla. Her giriş portuna tek bir kaynak bağlanır; bir çıkış birden fazla hedefe dallanabilir. Seçili bloğu Delete tuşuyla kaldırabilirsin.</p>

    <h2 id="girisleri-izle">2. Sinyalleri incele <span class="docs-section-time">~2 dk</span></h2>
    <h3>Giriş değerlerini değiştir</h3>
    <p>Alttaki Değişkenler bölümünde 1 bitlik girişe tıklayarak 0 ve 1 arasında geçiş yap. Daha geniş girişler için onluk bir değer gir; ekranda karşılık gelen bit dizisi de görünür. Blueprint tuvalindeki ve sağdaki Sinyal Görünümü'ndeki değerler birlikte güncellenir.</p>
    <h3>Değerleri ve yolları oku</h3>
    <p>Yeşil 1'i, gri 0'ı, kesik bakır çizgi henüz bilinmeyen <code>X</code> değerini gösterir. Bunlar mantıksal sinyallerdir; elektrik akımı canlandırması değildir. Bir değeri adlandırıp alttaki listede izlemek için Ara Sinyal ekle. Bu blok saklama yapmaz; değeri bağlı sinyalle birlikte değişir.</p>

    <h2 id="simulasyon">3. Görselleştirmeyi ve yazmacı çalıştır <span class="docs-section-time">~1 dk</span></h2>
    <h3>Oynat, duraklat ve durdur</h3>
    <p>Bu üç kontrol sağdaki mantıksal sinyal yayılımı görselleştirmesini yönetir. Girişleri değiştirmez ve yeni bir clock kenarı üretmez. Durdurma ya da duraklatma, yazmaçta saklanan değeri değiştirmez.</p>
    <h3>Tek tik ve reset</h3>
    <p>Bir tik, bir yükselen clock kenarını temsil eder. Yazmaçlar aynı önceki devre durumundan hesaplanan yeni değerleri birlikte alır; başlangıç değerleri bilinmiyorsa <code>X</code> görünür. Reset yazmaçları 0'a çeker. Bağımsız kombinasyonel yollar aynı giriş değişiminde birlikte değerlendirilir.</p>

    <h2 id="blueprint-dosyalari">4. Dosya ve modülleri yönet <span class="docs-section-time">~3 dk</span></h2>
    <h3>Blueprint dosyaları ve Verilog</h3>
    <p><em>Yeni BP</em> veya <code>+</code> ile yeni belge aç. Kaydet, açık belgeleri bu tarayıcıda saklar. Dışa aktar etkin belgeyi <code>.bp</code> JSON dosyası olarak indirir; İçe aktar en fazla 1 MB boyutundaki bir dosyayı açar. Geçerli blueprint için sağdaki Verilog çıktısı otomatik üretilir; bağlantı hatalarında açıklayıcı uyarı gösterilir.</p>
    <h3 id="moduller">.bp dosyalarını modül olarak birleştir</h3>
    <p>Bir modül, kendi giriş ve çıkışlarıyla tek blok gibi kullanılabilen başka bir açık blueprint'tir. Modülün içindeki kapılar ve yazmaçlar üst devreyle birlikte değerlendirilir.</p>
    <ol>
      <li><strong>Modül belgesini kur:</strong> Yeni BP ile ayrı bir blueprint aç. Giriş, kapı/yazmaç ve Çıkış bloklarını ekleyip portları bağla. Giriş ve Çıkış adları modül portlarının adıdır.</li>
      <li><strong>Üst belgeye dön:</strong> Sekmelerden ana devreyi seç. Diğer açık blueprint'ler sol araçlıkta modül olarak görünür.</li>
      <li><strong>Modül portlarını bağla:</strong> Modül girişlerini üst devredeki sinyal çıkışlarına; modül çıkışlarını sonraki blokların girişlerine bağla.</li>
    </ol>
    <p>Modül adları benzersiz olmalı ve çağrılar döngü oluşturmamalıdır. Sekmeye çift tıklayarak dosyayı yeniden adlandır; sekmedeki <code>×</code> ile kapat. Kullanılan bir modülü kapatınca onay istenir ve ona bağlı örnek bloklar ile kabloları da kaldırılır. Modülün giriş/çıkış bit genişlikleri, içindeki Giriş/Çıkış bloklarından gelir; ana devrede ilgili port genişliğini eşleştir. Projede en fazla 8 açık blueprint, modül başına 8 giriş ve 8 çıkış, birleşmiş devrede ise en fazla 500 blok desteklenir. Tuvalde modül tek blok görünür; Verilog çıktısında iç mantık üst modüle açılır. Sıralı alt modüller aynı tikte güncellenir.</p>
    <h3>Yerel kayıt ve gizlilik</h3>
    <p><em>Kaydet</em> açık blueprint dosyalarını bu tarayıcıda birlikte saklar. <em>Dışa aktar</em> yalnız etkin `.bp` dosyasını indirir; projeyi başka cihaza taşırken bağlı modül belgelerini de dışa aktarıp yeniden aç. Blueprint ve quiz verisi sunucuya gönderilmez; katılımcı verisi toplanmaz.</p>

    <div class="docs-next"><a href="{{ '/docs/bloklar/' | relative_url }}">Sonraki: Blok kataloğu</a></div>
  </article>
</div>
