# Teknik doğrulama kapıları

**Durum:** Uygulama benchmark şartnamesi, 2026-11-23. Bu kapılar kod davranışını doğrular; öğrenme etkisi veya quiz geçerliği ölçmez.

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
