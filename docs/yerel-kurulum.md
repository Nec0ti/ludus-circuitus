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
    <p class="docs-intro">Site Jekyll ile üretilir. Tailwind CSS ve daisyUI, yayınlanan statik CSS dosyasını geliştirme sırasında oluşturur; sayfalar sunucu tarafında API çalıştırmaz.</p>
    <h2>Gerekenler</h2>
    <ul><li>Node.js ve npm</li><li>Ruby ve Bundler</li><li>Git</li></ul>
    <h2>Projeyi hazırla</h2>
    <p>Depo şu anda erişim kısıtlı olabilir. GitHub hesabına erişim verildiyse:</p>
    <div class="install-code"><code>git clone https://github.com/Nec0ti/ludus-circuitus.git<br>cd ludus-circuitus<br>npm ci<br>npm run build:css<br>bundle install</code></div>
    <h2>Yerel önizleme</h2>
    <div class="install-code"><code>bundle exec jekyll serve</code></div>
    <p>Jekyll yerel sunucunun adresini terminalde gösterir. CSS'i değiştirirken başka terminalde <code>npm run watch:css</code> çalıştırabilirsin.</p>
    <h2>GitHub Pages yayını</h2>
    <p>PR kontrolleri siteyi derler; yayın adımı varsayılan olarak kapalıdır. Depo yöneticisi GitHub Settings → Pages içinden GitHub Actions kaynağını etkinleştirdikten ve sitenin görünürlüğünü kararlaştırdıktan sonra depo Actions değişkeni <code>PAGES_ENABLED=true</code> yapılırsa ana dala gelen değişiklikler yayımlanır. GitHub Pages, plan izin verdiğinde özel depodan yayımlansa bile siteyi internetten herkese açık sunabilir.</p>
    <h2>Katkı ve doğrulama</h2>
    <p>Önce <code>AGENTS.md</code>, <code>const.md</code> ve ilgili backlog maddelerini oku. Kullanıcıya dönük bütün metinler Türkçe olmalı. Sıralı mantık ve Verilog doğruluğunu etkileyen değişiklikler, tanımlı test/benchmark kapıları geçmeden gönderilmemeli.</p>
    <p>Henüz veri toplama API'si veya quiz kaydı yoktur. Kişisel verileri GitHub deposuna, issue'lara veya örnek çıktı dosyalarına ekleme.</p>
  </article>
</div>
