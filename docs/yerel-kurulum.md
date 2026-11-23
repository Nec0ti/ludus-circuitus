---
layout: default
title: Yerel kullanım ve kurulum
description: Ludus Circuitus sitesini yerel bilgisayarında çalıştırma.
permalink: /docs/yerel-kurulum/
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Geliştirici rehberi</p>
    <h1>Yerel kullanım ve kurulum</h1>
    <p class="docs-intro">Site Jekyll ile üretilir. Tailwind CSS ve daisyUI statik görünümü oluşturur; Devre Atölyesi tarayıcıda çalışır ve bir sunucu API'si kullanmaz.</p>
    <h2>Gerekenler</h2>
    <ul><li>Node.js ve npm</li><li>Ruby ve Bundler</li><li>Git</li></ul>
    <h2>Projeyi hazırla</h2>
    <p>Açık kaynak depoyu klonla ve bağımlılıkları yükle:</p>
    <div class="install-code"><code>git clone https://github.com/Nec0ti/ludus-circuitus.git<br>cd ludus-circuitus<br>npm ci<br>npm run build:css<br>bundle install</code></div>
    <h2>Yerel önizleme</h2>
    <div class="install-code"><code>bundle exec jekyll serve</code></div>
    <p>Jekyll yerel sunucunun adresini terminalde gösterir. CSS'i değiştirirken başka terminalde <code>npm run watch:css</code> çalıştırabilirsin.</p>
    <h2>Doğrulama testleri</h2>
    <p>Motorun mantık testleri Node.js ile, üretilen Verilog'un bağımsız çalışması Icarus Verilog ile, kullanıcı akışları Playwright ve Chromium ile sınanır.</p>
    <div class="install-code"><code>npm test<br>npm run test:verilog<br>npx playwright install chromium<br>npm run test:e2e</code></div>
    <h2>GitHub Pages yayını</h2>
    <p>Site <a href="https://nec0ti.github.io/ludus-circuitus/">GitHub Pages'te</a> yayımlanır. Ana dala gelen değişiklikler derleme ve doğrulamalardan geçince otomatik dağıtılır.</p>
    <h2>Katkı ve doğrulama</h2>
    <p>Önce <code>AGENTS.md</code>, <code>const.md</code> ve ilgili backlog maddelerini oku. Kullanıcıya dönük bütün metinler Türkçe olmalı. Sıralı mantık ve Verilog doğruluğunu etkileyen değişiklikler, tanımlı test/benchmark kapıları geçmeden gönderilmemeli.</p>
    <p>Quiz ve öğrenci veri toplama henüz uygulamada etkin değildir. Katılımcı izni gelene kadar API'ye veri yollama. Kişisel verileri depoya, issue'lara veya örnek çıktı dosyalarına ekleme.</p>
  </article>
</div>
