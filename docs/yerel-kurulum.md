---
layout: default
title: Yerel kullanım ve kurulum
description: Ludus Circuitus sitesini yerel bilgisayarında çalıştırma.
permalink: /docs/yerel-kurulum/
reading_time: 6
---
<div class="site-width docs-shell">
  {% include docs-nav.html %}
  <article class="docs-article">
    <p class="eyebrow eyebrow-ink">Geliştirici rehberi</p>
    <h1>Yerel kullanım ve kurulum</h1>
    <p class="docs-reading-time">Yaklaşık {{ page.reading_time }} dakika</p>
    <p class="docs-intro">Site Jekyll ile üretilir. Tailwind CSS ve daisyUI statik görünümü oluşturur; Devre Atölyesi tarayıcıda çalışır ve bir sunucu API'si kullanmaz.</p>
    <nav class="docs-page-toc" aria-label="Bu sayfadaki konular"><b>Bu sayfada</b><a href="#gerekenler">Gerekenler <small>1 dk</small></a><a href="#projeyi-hazirla">Projeyi hazırlama <small>1 dk</small></a><a href="#yerel-onizleme">Yerel önizleme <small>1 dk</small></a><a href="#testler">Doğrulama testleri <small>1 dk</small></a><a href="#yayin">Yayın <small>1 dk</small></a><a href="#katki">Katkı <small>1 dk</small></a></nav>
    <h2 id="gerekenler">Gerekenler <span class="docs-section-time">~1 dk</span></h2>
    <ul><li>Node.js 22 ve npm (CI sürümüyle aynı)</li><li>Ruby ve Bundler (yerel Jekyll için)</li><li>Git</li><li>Python 3 (Playwright E2E sunucusu için)</li><li>Icarus Verilog: <code>iverilog</code> ve <code>vvp</code> (Verilog oracle testi için)</li></ul>
    <h2 id="projeyi-hazirla">Projeyi hazırla <span class="docs-section-time">~1 dk</span></h2>
    <p>Açık kaynak depoyu klonla ve bağımlılıkları yükle:</p>
    <div class="install-code"><code>git clone https://github.com/Nec0ti/ludus-circuitus.git<br>cd ludus-circuitus<br>npm ci<br>npm run build:css<br>bundle install</code></div>
    <p><code>npm ci</code> kilit dosyasındaki JavaScript paketlerini kurar. <code>bundle install</code> ise Gemfile'daki Jekyll/GitHub Pages bağımlılıklarını hazırlar.</p>
    <h2 id="yerel-onizleme">Yerel önizleme <span class="docs-section-time">~1 dk</span></h2>
    <div class="install-code"><code>bundle exec jekyll serve</code></div>
    <p>Jekyll yerel sunucunun adresini terminalde gösterir. CSS'i değiştirirken başka terminalde <code>npm run watch:css</code> çalıştırabilirsin.</p>
    <h2 id="testler">Doğrulama testleri <span class="docs-section-time">~1 dk</span></h2>
    <p>Motorun mantık testleri Node.js ile, üretilen Verilog'un bağımsız çalışması Icarus Verilog ile, kullanıcı akışları Playwright ve Chromium ile sınanır. E2E testleri Jekyll'i kendi başına çalıştırmaz; güncel <code>_site</code> klasörünü Python HTTP sunucusuyla açar. Bu nedenle önce siteyi üret:</p>
    <div class="install-code"><code>npm run build:css<br>npm test<br>npm run test:verilog<br>bundle exec jekyll build</code></div>
    <p>Ardından Playwright tarayıcısını kurup E2E testlerini çalıştır. Linux'ta <code>--with-deps</code> Chromium'un sistem bağımlılıklarını da kurar:</p>
    <div class="install-code"><code>npx playwright install --with-deps chromium<br>npm run test:e2e</code></div>
    <p>macOS ve Windows'ta işletim sistemi bağımlılık seçeneği olmadan <code>npx playwright install chromium</code> kullanabilirsin.</p>
    <h2 id="yayin">GitHub Pages yayını <span class="docs-section-time">~1 dk</span></h2>
    <p>Site <a href="https://nec0ti.github.io/ludus-circuitus/">GitHub Pages'te</a> yayımlanır. <code>main</code> dalı yalnızca çekme isteğiyle güncellenir; birleştirmeden önce Node testleri, Icarus oracle'ları, Jekyll build'i ve Playwright E2E'yi içeren yeşil <code>build</code> kontrolü gerekir. Kontroller geçerse ve Pages yayını açıksa ana dal otomatik dağıtılır.</p>
    <h2 id="katki">Katkı ve doğrulama <span class="docs-section-time">~1 dk</span></h2>
    <p>Önce <code>AGENTS.md</code>, <code>const.md</code> ve ilgili backlog maddelerini oku. Kullanıcıya dönük bütün metinler Türkçe olmalı. Sıralı mantık ve Verilog doğruluğunu etkileyen değişiklikler, tanımlı test/benchmark kapıları geçmeden gönderilmemeli.</p>
    <p>Quiz ve öğrenci veri toplama henüz uygulamada etkin değildir. Katılımcı izni gelene kadar API'ye veri yollama. Kişisel verileri depoya, issue'lara veya örnek çıktı dosyalarına ekleme.</p>
  </article>
</div>
