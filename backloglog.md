# Görev günlüğü

Her görevden sonra tarihli bir kayıt ekle. Nelerin değiştiğini, hangi kontrollerin yapıldığını ve açık kalanları yaz.

## 2026-11-22 — Çalışma alanının kurulması

- `AGENTS.md`, `const.md`, `backlog.md`, `backloglog.md`, `notes.md`, `README.md` ve `raports/.gitkeep` oluşturuldu.
- Blok tabanlı Verilog öğrenme fikri, ilk sürüm önerisi ve açık sorular `notes.md` içine alındı.
- Başlangıçta Git metadata'sı yoktu ve `gh` kimlik doğrulaması geçersizdi.

### GitHub ve Playwright denemeleri

- GitHub bağlantısının depo okuma/yazma araçları yeni depo oluşturamıyordu; ilk denemede `Nec0ti/ludus-circuitus` bulunamadı.
- İlk Playwright Chromium denemeleri Nix kütüphaneleri ve süreç yalıtımı kısıtları nedeniyle açılamadı.
- Daha sonra `gh auth status` geçerli hesaba döndü. `npx --yes playwright@1.56.1 --version` 1.56.1 verdi. Yeni Chromium arşivi indi, ancak çıkartma alt süreci ilerlemediği için durduruldu.
- Playwright 1.56.1, mevcut Chromium headless-shell 1255 ve onaylanmış `chromiumSandbox: false` ayarıyla çalıştırıldı; GitHub giriş sayfasına ulaştı.
- Yerel Git `main` dalında başlatıldı. İlk commit `df98ea45699295f03412b815ba0bca4dfb5bbfc8` ile özel `https://github.com/Nec0ti/ludus-circuitus` deposu oluşturulup push edildi.
- GitHub deposunun özel olduğu ve varsayılan dalın `main` olduğu; uzak `main` SHA'sinin yerel HEAD ile eşleştiği doğrulandı.

## 2026-11-22 — Ürün ve arayüz dump'ının kaydı

- Site üç ana bölüm olarak kaydedildi: tanıtım, dokümantasyon ve Devre Atölyesi. Yayın kararı GitHub Pages + Jekyll; sunucu tarafı bileşen gerekmiyor.
- Necati'nin ek yönlendirmesiyle tüm kullanıcıya dönük ürün yazılarının ve dokümantasyonun Türkçe olması kalıcı kurala eklendi.
- Tanıtım içeriği, dört dokümantasyon başlığı, çok panelli blueprint editörü, `.bp` modülleri, değişkenler, gerçek zamanlı devre/Verilog çıktısı ve az sayıda blok hedefi `notes.md` içine düzenlendi.
- Playwright ile Hamartia sayfası incelendi. Verilen `necoti` URL'sinde `o` harfi vardı ve 404 verdi; doğru kullanıcı adı `nec0ti` (sıfır), doğru sayfa `https://nec0ti.github.io/hamartia/`. Hamartia yardım sayfasının üst gezinme + sol konu ağacı + ana içerik + sağ sayfa içi başlık düzeni not edildi.
- Unity User Manual dokümantasyon gezinmesi için ikinci referans olarak eklendi.
- Saat/tik kontrollerinin sıralı mantığı kesinleştirmediği; mantık sinyali ile fiziksel akımın farklı kapsamlar olduğu açık soru olarak işaretlendi.
- `AGENTS.md`, `const.md`, `README.md`, `notes.md`, `backlog.md` ve bu günlük Türkçeleştirildi/güncellendi.
- Doğrulama: `git fetch origin` temiz `main` üzerinde yeni upstream commit göstermedi. Dokümantasyon değişiklikleri için benchmark çalıştırılmadı; kod uygulanmadı.
- Kalan işler yeni `backlog.md` içinde sıralandı.

## 2026-11-22–23 — Ürün dump'ı dosyalara işlendi

- `const.md` içine üç bölümlü Jekyll/GitHub Pages sitesi, Türkçe içerik kuralı, blueprint modülleri, editör bölgeleri, doğruluk ilkeleri ve test/benchmark/PR akışı işlendi.
- `notes.md` içine tanıtım sayfasının mesajları, dört Türkçe dokümantasyon konusu, Devre Atölyesi düzeni, `.bp` dosyaları, değişken paneli, görsel referanslar ve çözülmemiş zaman/sinyal soruları eklendi.
- `AGENTS.md`, `README.md`, `backlog.md` ve görev günlüğü Türkçeleştirildi. Yeni işler ve benchmark taslağı backlog'a eklendi.
- Hamartia adresini düzeltip Playwright ile doğru sayfayı açtım: `https://nec0ti.github.io/hamartia/`. Sayfada üst gezinme, sol konu listesi, orta içerik ve sağ sayfa içi gezinme; koyu tema ve mavi vurgu kullanılıyor. Verilen `necoti` adresi 404 veriyor.
- Unity User Manual sayfası açılarak konu hiyerarşisi/gezinme örneği olarak kaydedildi.
- Kontrol: `git fetch origin` öncesinde yerel çalışma ağacı temizdi; fetch sonrası `main` ile `origin/main` arasında gelen commit yoktu. Kod değişmediği için uygulama benchmarkı çalıştırılmadı.
- Açık teknik ve araştırma kararları `backlog.md` içinde sıralandı.
- 2026-11-23 açıklaması: Necati, iç geliştirme notlarının İngilizce olabileceğini; ana uygulama ve istemcinin gördüğü bütün yazıların Türkçe olması gerektiğini netleştirdi. Kural `const.md` ve `notes.md` içinde bu ayrımla güncellendi.

## 2026-11-23 — Sıralı mantık ve FPGA paralelliği kararları

- Necati sıralı mantığın kesinlikle kapsamda olduğunu, FPGA'ların paralel donanım yaklaşımının özellikle anlatılması gerektiğini ve görselleştirmenin akım değil mantıksal sinyal animasyonu kullanacağını netleştirdi.
- `const.md` ve `notes.md` bu kararları; bağımsız yolların eşzamanlılığı, register'ların clock kenarındaki durumu ve veri bağımlılıklarının etkisini doğru anlatacak şekilde kaydetti. `AGENTS.md` proje özetini buna göre güncelledi.
- Benchmark taslağına register clock izleri ve paralel/bağımlı yol davranışı eklendi. Eski açık sorular kapatıldı; saat adımı, reset/başlangıç semantiği ve `X` görünümü gibi henüz kararlaştırılmamış ayrıntılar açık bırakıldı.
- Doğrulama: `git diff --check` ve değişiklik kapsamı incelendi; bu dokümantasyon görevinde uygulama testi/benchmarkı gerekmiyor.
- Kalan: Kullanıcıdan hedef öğrenci/araştırma ölçütü, en küçük blok ve ilk sürüm donanım kapsamı ile temel simülasyon/dosya davranışı tercihlerini al.

## 2026-11-23 — TÜBİTAK araştırması, öğrenen hedefi ve beceri kurulumu

- Necati, lise kategorisinde iki öğrenciyle 2204-A'ya katılım hedefini; ürünü ortaokul başlangıç seviyesine kadar anlaşılır kılmayı, öğrenme kazanımını quiz/test ile ölçmeyi ve MVP'yi yalnız web tarayıcısında tutmayı netleştirdi. FPGA kartına yükleme ve masaüstü uygulaması MVP dışında. Tek tik bir yükselen clock kenarı; duraklat/durdur durumu korur; reset ayrı; başlangıç `X` görünür; `.bp` yerelde saklanır ve içe/dışa aktarılır.
- Resmî 2026–2027 çağrısı ve 2027 rehberi incelendi. İki öğrencilik ekip sınır içinde; öğrenci uygunluğu/yaş, proje tamamlanmışlığı, son başvuru tarihi 4 Ocak 2027 17.30, Yazılım + E-Öğrenme olası eşleşmesi, MEB izni/veli onamı ve 20 sayfalık rapor sınırı `research/tubitak/2027-2204-a.md` içinde kaynak ve bölüm sayfalarıyla kaydedildi. 2025 MEB yönergesi ayrıca doğrulandı: tek ildeki başvuru için 15 güne kadar değerlendirme süresi, 2–6 ilde 60 güne kadar; 90 gün önceden başvuru şartı kaldırılmış. Altı haftalık takvim hâlâ sıkışık ancak tek il için 90 günlük engel yok.
- Özgünlük taramasında doğrudan yakın araç CircuitVerse bulundu: resmi dokümanları browser editor/simülasyon, sequential elemanlar, hiyerarşik alt-devreler, birden çok tab, yerel kayıt, decimal converter ve deneysel Verilog export'u belgeliyor. VPLAS da temel Verilog için web tabanlı öğretim aracı. Bu nedenle yalnızca bu özellikleri birleştirmek “ilk/benzersiz” katkı olarak sunulmayacak; aynı görevlerle karşılaştırma ve daha dar ölçülebilir öğrenme farkı backlog'a eklendi.
- `research/references/` içinde Unreal Blueprint, Unity Docs, IEEE/Accellera, HDLBits, Intel FPGA ve hakemli eğitim araştırmaları etiketlendi. Üç özgün Verilog örneği; bağımsız paralel yollar, clock'lu register ve onluk sayaç için eklendi.
- Kullanıcının verdiği DaisyUI becerisi ve ek olarak Anthropic `frontend-design` becerisi proje kapsamında kuruldu. DaisyUI 5'in Tailwind CSS 4 gereksinimi not edildi; CSS/Node bağımlılığı eklenmedi. Beceri dosyaları yerel tooling olarak `.gitignore`'da hariç tutuldu.
- `AGENTS.md`, `const.md`, `notes.md`, `README.md`, backlog ve bu günlük güncellendi; `research/` indeksi çalışma girişine eklendi.
- Doğrulama: `git diff --check`, link/path ve eski karar metni araması yapıldı. Uygulama kodu değişmediği için benchmark/test çalıştırılmadı.
- Kalan: quiz'in tam kazanımı/soru tasarımı, danışman/iki üyenin uygunluğu, insan katılımcı izin takvimi ve MVP'nin çağrı son tarihine yetişme kararı ekip/danışmanla netleştirilecek. Ön değerlendirme linki 2025 dosyasına gittiğinden 2027 başvurusu öncesi tekrar doğrulanmalı.

## 2026-11-23 — Öğrenme ölçümü, MEB/KVKK ve POST araştırması

- Necati, quiz ve Playground süresinden TÜBİTAK için öğrenme katkısı göstermeyi; ad-soyad, yaş, eğitim düzeyi/sınıf, 100 üzerinden puan ve süreyi kendi sunucusunda saklama fikrini; Konya/Adil Karaağaç MTAL ekibini; danışmanın henüz belli olmadığını ve yaklaşık altı haftalık hedefi paylaştı. Bu mesaj veri toplama/API uygulama onayı değildir.
- TÜBİTAK 2027 sayfasındaki ön değerlendirme linki hâlâ 2025 formuna gidiyor: problem/araştırma sorusu %20, yöntem %20, yaratıcılık/etki %30, sonuç/tartışma %30 görünüyor. 2027 kriterlerinin aynı kalacağı doğrulanmış değil. Yazılım rehberi ürün yanında alan yazını, yöntem, veri analizi, karşılaştırma ve tekrarlanabilir bilimsel bulgu istiyor.
- Ölçüm için dar hipotez taslağı çıkarıldı: blok↔Verilog eşlemesi ve paralel mantıksal sinyal izini kullanmanın, başlangıç öğrencilerinin basit Verilog devrelerinde bağımsız yol/çıktı tahmin başarısına eşdeğer anlatıma göre etkisi. Ön-son eşdeğer quiz ve mümkünse eşit süreli karşılaştırma grubu önerildi. Tek grupta artış Ludus'a nedensel etki atfetmeye yetmez; Playground süresi yalnız ikincil ölçüttür.
- Kritik MEB kuralı doğrulandı: MEB'in 2204-A öğrenci başvurusu için danışmanlı başvuru ve danışman imzalı taahhüt gerekir; proje bilgisi, gönüllü katılım/bilgilendirme, veri toplama aracı ve öğrenci örnekleminde veli onamı yüklenir. Bu özel zorunlu eğitim öğrencisi yolunda etik kurul belgesi istenmez. İmzalı katılım/onam formlarında isim bulunabilir, fakat veri toplama aracında katılımcı adı-soyadı/kişisel bilgi istenmemelidir. Olası ön-son eşleştirme için random kod ve ayrık onam dosyası araştırılmalı.
- TTKB canlı SSS tek il başvurusunu 15 güne kadar değerlendiriyor; okulun seçimi/özel bilgi alanının deneysel araç uygulamasıyla anket/ölçek/görüşme ayrımına göre değişebileceği not edildi. Örneklem okulu henüz belirsiz; Adil Karaağaç MTAL'in ekip okulu mu katılımcı okulu mu olduğu sorulmalı. İzin çıkmadan pilot veya veri toplama yok.
- KVKK'nın 2026/347 ilke kararı aydınlatma ve açık rıza metinlerini ayrı tutmayı vurguluyor. Veri sorumlusu, hukuki sebep, iletişim, aktarım alıcıları, retention/imha süresi ve sunucu/yedek akışı netleşmediğinden nihai KVKK formu yazılmadı; yalnızca form hazırlama girdileri ve veri minimizasyonu planı kaydedildi. KVKK çocuk broşüründeki minimizasyon, yaşa uygun aydınlatma ve güçlendirilmiş güvenlik noktaları eklendi.
- GitHub Pages statik frontend'ten API'ye POST atılabilir, fakat Pages backend çalıştırmaz. `localhost` katılımcının kendi cihazıdır; ev sunucusu internetten HTTPS ile erişilebilir kılınmalı. CORS/preflight, private-network permission, third-party tunnel, endpoint abuse ve veri güvenliği not edildi. Endpoint/veri tabanı kurulmadı, katılımcı verisi toplanmadı.
- Yeni araştırma belgeleri: `research/measurement/learning-study.md`, `research/privacy/data-collection-plan.md`, `research/architecture/github-pages-post.md`; research indeksi, `notes.md` ve `backlog.md` güncellendi.
- Doğrulama: TÜBİTAK çağrı sayfası/kriter PDF'si, 2027 rehberi, TTKB 2025 kılavuzu ve canlı SSS, KVKK ilke kararı/çocuk broşürü/güvenlik rehberi, GitHub Pages ve MDN/Chrome kaynakları okundu. `git diff --check` yapılacak; uygulama veya canlı veri benchmarkı çalıştırılmadı.
- Kalan: danışman; tam araştırma örneklemi/okul/yaş-sınıf; ölçülecek tek kazanım ve kontrol metodu; veri sorumlusu ve hukuki dayanak; gerekli alan/ eşleştirme kodu; ham veriyi görebilecek kişiler, API/host/tunnel ve silme tarihi. Bunlar gelmeden KVKK son metni ve API uygulanamaz.

## 2026-11-23 — Örneklem ve kazanım taslağının güncellenmesi

- Necati, birden çok öğrenme kazanımı ölçmenin değerini sordu; örneklemin Adil Karaağaç MTAL'den lise öğrencileri olacağını ve kendi okulunda gönüllü çağrısının evden katılıma göre daha gerçekçi göründüğünü netleştirdi. Danışman öğretmeni gelecek hafta belirlemeyi planlıyor; isim-soyad veri formundan çıkarılmasını kabul etti, yaş alanının yararını sordu.
- Ölçüm önerisi güncellendi: bir birincil sonuç (paralel bağımsız mantık yollarını ve çıktılarını tahmin), iki ikincil sonuç (blok↔Verilog eşleme/okuma, clock kenarı/register durumu). Puanlama alt boyutları ayrı raporlansın; ikincil analizler örneklem küçükse keşfedici kalsın.
- Örneklemin lise olması araştırma bulgularının lise başlangıç öğrencilerine genellenebileceği, ortaokul etkisini kanıtlamayacağı sınırıyla yazıldı. Tam yaş yerine ön-test başlangıç bilgisini ve gerekiyorsa onaylı kaba sınıf bandını kullanma önerisi kaydedildi.
- Gönüllüler için okul içi, tarafsız davet; MEB izninden sonra uygulama; 18 yaş altı katılımcıda veli onamı ve öğrencinin özgür katılımı önerildi. Mümkünse aynı sınıf düzeyi/benzer başlangıç koşulunda gönüllüleri Ludus ve eşdeğer süreli metin/şema koşuluna rastgele ayırma; sayı yetmezse pilotu nedensel iddia olmadan raporlama önerisi eklendi.
- `research/measurement/learning-study.md`, `research/privacy/data-collection-plan.md`, `notes.md` ve `backlog.md` güncellendi. Danışman, örneklem sınıfları/sayısı, okul onayı, karşılaştırma koşulu, yaş/sınıf alt grup gerekçesi ve veri sorumlusu hâlâ açık.
- Doğrulama: yalnızca araştırma notları gözden geçirildi; uygulama, MEB başvurusu, okul izni, KVKK formu veya veri toplama başlatılmadı. Doküman değişikliklerinde `git diff --check` yapılacak.

## 2026-11-23 — Jekyll sitesi ve ilk playground prototipi

- `index.html` ile Türkçe tanıtım; `docs/` altında Başlangıç, Kullanım, Bloklar, Yerel kullanım ve kurulum; `playground/` altında responsive çok panelli yarım toplayıcı prototipi oluşturuldu. DaisyUI/Tailwind tema ve derlenmiş statik CSS eklendi; `README.md` mevcut durumla uyumlandı.
- Devre Atölyesi'nde A/B girişleri, toplam XOR, taşıma AND, devre yolları, blueprint değişken değerleri ve statik Verilog örneği birlikte gösteriliyor. Dört giriş vektörü, Oynat/Duraklat/Başa al ve hız seçimi çalışıyor. Blok sürükleme, gerçek kod üretimi, sıralı mantık, kayıt ve quiz kapsamda henüz yok; API veya kullanıcı verisi de yok.
- GitHub Pages Jekyll build/deploy workflow'u eklendi. `package.json`/`package-lock.json`, `.gitignore`, `_config.yml`, `Gemfile`, `.github/workflows/pages.yml`, `assets/`, `_layouts/`, `_includes/`, `docs/`, `playground/`, `README.md`, `notes.md`, `backlog.md` ve bu günlük değişti.
- Doğrulama: `npm ci` başarılı (audit: 0 açık vulnerability); `npm run build:css`, Nix Jekyll 4.4.1 `jekyll build`, `node --check assets/js/playground.js` ve `git diff --check` başarılı. Playwright 1.56.1 + Nix Chromium ile 7 route ve iç link, dört doğruluk vektörü, oynatma/hız/duraklat/reset, live-region durumu ve 320/390/768/1440 px taşma kontrolleri geçti; tarayıcı runtime hatası yok. Tasarım incelemesi sonrası landing şemasındaki sinyal gibi görünen animasyon kaldırıldı ve kapı/giriş etiketleri açıklandı.
- Yerel `bundle install` denemesi, Nix Ruby ortamında OpenSSL gem derleme başlıkları bulunmadığından tamamlanmadı; Jekyll build Nix paketli Jekyll komutuyla ayrıca başarıyla doğrulandı. GitHub Actions uzak build henüz çalıştırılmadı. npm `@parcel/watcher` install script'i onaylanmadı uyarısı verdi; mevcut CSS build/watch komutları CSS'i üretti.
- Yerel CSS izleyicisinin standart `--watch` seçeneği stdin kapalı olduğunda sona erdiği görüldü; script `--watch=always` olarak düzeltildi ve açık süreçte dosya değişikliğine yeniden derleme yaptığı doğrulandı.
- Kalan: PR workflow'unu uzak CI'da doğrula; Pages ayarını ve yayının görünürlüğünü kontrol et. Danışman, karşılaştırma grubu, quiz tasarımı, MEB/KVKK izinleri bu frontend görevinden ayrı açık işlerdir.
