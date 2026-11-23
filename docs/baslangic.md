---
layout: default
title: Başlangıç
description: Dijital mantığa ve Verilog'a ilk adım.
permalink: /docs/baslangic/
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">İlk kavramlar</p>
    <h1>Başlangıç</h1>
    <p class="docs-intro">Dijital devreler bilgi taşımak için iki mantıksal değerden yararlanır: 0 ve 1. Bu değerler kapılardan geçerek yeni çıkışlar oluşturur.</p>
    <h2>Bir devre ne yapar?</h2>
    <p>Devre, girişlerine göre çıkış üretir. Örneğin AND kapısı, iki giriş de 1 olduğunda 1 verir. OR kapısı girişlerden en az biri 1 olduğunda 1 verir. NOT kapısı ise giriş değerini tersine çevirir.</p>
    <table class="mini-truth-table">
      <caption>AND kapısının doğruluk tablosu</caption>
      <thead><tr><th scope="col">A</th><th scope="col">B</th><th scope="col">A AND B</th></tr></thead>
      <tbody>
        <tr><td>0</td><td>0</td><td>0</td></tr>
        <tr><td>0</td><td>1</td><td>0</td></tr>
        <tr><td>1</td><td>0</td><td>0</td></tr>
        <tr><td>1</td><td>1</td><td class="truth-one">1</td></tr>
      </tbody>
    </table>
    <h2>Paralel yolları fark et</h2>
    <p>Bir devredeki iki bağımsız yol aynı girişlerden beslenebilir ve aynı anda kendi mantık işlemini yapabilir. Bir Verilog dosyasındaki satırları sırayla okumak, donanımın da satır satır çalıştığı anlamına gelmez. Bir yolun sonucuna başka bir yol bağlıysa o sinyal bağımlılığını ayrıca izle.</p>
    <h2>Verilog neyi anlatır?</h2>
    <p>Verilog, dijital donanımı tarif etmek için kullanılan bir dildir. <code>assign</code> gibi bir ifade, girişler arasındaki mantık ilişkisini sürekli tanımlar. Devre Atölyesi bu kodun hangi blok ve sinyal yoluyla ilişkili olduğunu göstermeyi hedefler.</p>
    <h2>Sıralı mantığa ilk bakış</h2>
    <p>Register (yazmaç), bir değeri saklayan devre öğesidir. Bir clock (saat) kenarında yeni değeri tutabilir. Kombinasyonel çıkışlar girişlere göre değişirken register durumu yalnızca tanımlı saat kenarında güncellenir.</p>
    <div class="docs-next"><a href="{{ '/docs/kullanim/' | relative_url }}">Sonraki: Kullanım <span aria-hidden="true">↗</span></a></div>
  </article>
</div>
