# Jekyll sayfa metadata'sı — teknik referans

**Etiket:** PRIMARY / RESMÎ yazılım dokümantasyonu  
**Erişim:** 2026-11-24

Jekyll SEO Tag, sayfa başlığını, açıklamasını ve Open Graph alanlarını kendisi üretir. `_config.yml` içinde `locale` değeri `language_TERRITORY` biçiminde tanımlanabilir; paket aksi hâlde `en_US` kullanır. İlgili kurallar [resmî kullanım rehberinde](https://jekyll.github.io/jekyll-seo-tag/usage/) açıklanıyor.

## Projeye uygulanan karar

- Ana layout ve tam ekran atölye layout'u yalnızca `{% seo %}` etiketini kullanır; ayrıca bir `<title>` veya açıklama metatag'ı yazmaz. Böylece aynı HTML `<head>`'inde yinelenen title/description kalmaz.
- Site locale'i `tr_TR` olarak tanımlıdır; erişilebilir sayfalarda `og:locale` Türkçe bölgesel etiket taşır. Belge kökündeki `lang="tr"` insan ve yardımcı teknoloji dilini belirtmeye devam eder.
- Bu metadata değişikliği eğitim etkisi, erişilebilirlik uyumu veya SEO başarısı kanıtı değildir.
