# Teknik doğrulama kapıları

**Durum:** Uygulama benchmark şartnamesi, 2026-11-23; çok-bit oracle kapsamı 2026-11-24 eklendi. Bu kapılar kod davranışını doğrular; öğrenme etkisi veya quiz geçerliği ölçmez.

## Girdi sınırları

- Bir projede en fazla 8 `.bp` belgesi ve her blueprint'te en fazla 500 blok / 2.000 bağlantı vardır.
- `.bp` içe aktarma dosyası en fazla 1 MiB olabilir; fazla büyük dosya metin/JSON parse edilmeden reddedilir ve açık blueprint korunur.
- Birleşmiş (flatten edilmiş) blueprint en fazla 500 blok içerebilir. Modül fanout'u bu sınırı aşacaksa proje flatten edilmeden reddedilir.
- Bir modülde en fazla 8 giriş ve 8 çıkış bulunur. Modül bağımlılıkları döngüsüz olmalıdır.
- Bu sınırlar geçerli projelerin arayüz/Verilog üretim maliyetini sınırlarken, tekrarlı modül örneklemesinin üstel bellek tüketmesini önler. Daha yüksek sınır gerekirse önce tarayıcıda performans ölçümü yapılmalıdır.

## Deterministik Verilog oracle corpus'u

`tests/verilog-oracle.mjs` sabit tohumla 12 ayrı, 40 kapılı yönlü kombinasyonel devre üretir. AND, OR, XOR ve NOT kapıları önceki sinyallerden seçilir; her modül dört giriş ve bir çıkış kullanır. Icarus Verilog çıktısı saf JS motoruyla karşılaştırılır:

- Her devrede 16 ikili giriş birleşimi;
- `X` içeren beş ek giriş birleşimi;
- Toplam 252 devre/vektör sonucu.

Oracle, başarısızlıkta kesin sıra ve çıktıyı göstererek `generateVerilog` ile `evaluate` arasındaki davranış farkını yakalar. Dizinin tohumu ve ölçüsü kod içinde sabittir; CI tekrarında farklı devre üretmez.

## Sabit tohumlu çok-bit ve sıralı oracle

`tests/vector-verilog-oracle.mjs`, 1, 2, 7, 31 ve 32 bit genişliklerde AND/NAND/OR/NOR/XOR/XNOR/NOT/MUX için 48 sabit ve seeded giriş vektörü üretir; her genişlik ve blok çıktısı Icarus Verilog ile saf JS evaluator arasında karşılaştırılır (1.920 vektör-çıkış sonucu). Her genişlikte 0/1 seçimleri, X seçimleri, ortak bitleri koruyan belirsiz MUX seçimi, tüm-X sınırı ve deterministik rastgele vektörler vardır. Aynı oracle register için başlangıç X, asenkron reset, yükselen kenarda örnekleme ve kenarlar arasında tutma davranışını da kontrol eder. Bu, standart simülatörle tutarlılık kanıtıdır; gerçek FPGA zamanlamasını veya öğrenme etkisini ölçmez.

## Hiyerarşi ve kaynak sınırı

`tests/project.test.mjs` 498 modül örneğiyle her seviyede genişleyen, her `.bp` dosyası 500 blok sınırında kalan bir derinlikli modül ağacı kurar. Validator bu projeyi 500 birleşmiş blok sınırında, `expand()` büyük ara liste oluşturmadan reddetmelidir. Ayrı sınır testi 500 birleşmiş düğümün kabul edildiğini, dosya başına 501'in reddedildiğini doğrular. E2E, 1 MiB üstü içe aktarmanın reddedildiğini ve önceki belgenin korunduğunu kontrol eder.

## PR ve yayın kapısı

`.github/workflows/pages.yml` içindeki tek `build` check'i şu kapıların tümünü çalıştırır: bağımsız Node testleri, Icarus oracle'ları, Jekyll build'i ve Playwright E2E. Main Pages deploy'u yalnız `build` başarılı olduktan sonra başlar. Herhangi bir check başarısızsa PR merge edilmemelidir. GitHub'da `main-requires-green-build` ruleset'i (ID `27927079`) aktif: `main` güncel `build` check'i başarılı PR dışında güncellenemez. Başka bypass aktörü tanımlı değildir; onay sayısı sıfır olduğu için tek geliştiricinin PR'ı kendi başına onaylaması gerekmez. Ruleset gerçek GitHub API ile açıldı ve `GET /repos/Nec0ti/ludus-circuitus/rules/branches/main` ile doğrulandı ([GitHub rules API](https://docs.github.com/en/rest/repos/rules?apiVersion=2022-11-28)).

## Komutlar ve geçiş şartı

```sh
npm test
npm run test:verilog
npm run build:css
bundle exec jekyll build
npm run test:e2e
git diff --check
```

Geçiş şartı: komutların tümü başarılı, rastgele oracle'ın her sonucu Icarus ile aynı, tanımlı girdi sınırları korumalı ve desktop/mobil E2E kapıları yeşil olmalıdır. Yerel işlem süresi için makineden bağımsız milisaniye hedefi koyulmaz; OOM veya CI job timeout'ı başarısızlıktır. Araç sürümleri `package-lock.json`, Ruby/Bundler lockfile'ı ve workflow'ta sabitlenir.

Bu testlerin güvence verdiği alan güncel 1-bit block set'i, desteklenen `.bp` hiyerarşisi ve seçilen vektör kümesidir. Donanım zamanlaması, gerçek FPGA, formal equivalence veya ölçülmüş pedagojik etki iddiası vermez.
