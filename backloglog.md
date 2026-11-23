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
- PR'daki ilk GitHub Actions build'i, depo Pages ayarı etkin olmadığı için `configure-pages` adımında başarısız oldu. GitHub kaynakları, özel repo kullanılsa bile Pages'in plan koşuluna göre halka açık olabileceğini doğruladı. PR build'i artık Pages ayarından bağımsız çalışıyor; deploy yalnızca Settings/Pages etkinleştirilip `PAGES_ENABLED=true` ayarlanırsa koşacak. Yayın görünürlüğü kararı verilmediği için bu ayar açılmadı.
- PR #1'in sonraki uzak GitHub Actions build'i geçti; deploy gate nedeniyle yayın adımı beklendiği gibi atlandı.
- PR birleşince `main` üzerindeki Jekyll build ve Pages artifact yüklemesi geçti; deploy kapalı kaldı. Node 20 uyarısı sonrası action'lar resmi güncel Node 24 sürümlerine yükseltildi (`checkout@v7`, `setup-node@v7`, `upload-pages-artifact@v5`, `configure-pages@v6`, `deploy-pages@v5`); son action sürümleriyle uzak CI build'i de geçti ve Node 20 uyarısı kalmadı.
# 2026-11-23 — Ölçüm kararları ve açık repo hazırlığı

- Necati'nin onayladığı karşılaştırma yaklaşımı kaydedildi: yeterli gönüllü varsa eşit süreli Ludus/statik anlatım koşullarına rastgele atama; örneklem küçükse nedensel iddiasız tek grup ön-test/Ludus/son-test pilotu. Quiz'de ad-soyad yok; kaba sınıf/eğitim bandı yalnız gerekçelendirilip izin aracında onaylanırsa.
- Değişenler: `notes.md`, `research/measurement/learning-study.md`, `research/privacy/data-collection-plan.md`, `backlog.md`, `.github/workflows/pages.yml`.
- Hazırlık doğrulaması: `git diff --check` geçti; gitleaks 8.30.1 mevcut dosyalar ve tüm yerel Git geçmişinde bulgu döndürmedi. İlk merge commit'inde kişisel yazar metadatası bulunduğu için public depoda görünür; geçmiş yeniden yazılmadı. Araştırma kararları `e92e0a7` ile gönderildi. Repo public yapıldı ve Pages workflow ayarı etkinleştirildi.
- İlk Pages build'i geçti, ancak değişken workflow başlatıldıktan sonra ayarlandığı için deploy işi atlandı; `workflow_dispatch` deploy desteği eklendi. Kalan: bu workflow değişikliğini doğrula ve yayın URL'sini kontrol et. MVP uygulama hedefi açıldı.

## 2026-11-23 — Tam ekran Devre Atölyesi ilk çalışan dilimi

- `playground/` site nav/footer'ından ayrıldı; `_layouts/workbench.html` tam ekran çalışma alanı sağlıyor. Koyu teknik panel düzeni, canlı ızgaralı blueprint tuvali, araçlık, dosya tabları, değişken şeridi, sinyal görünümü ve canlı Verilog paneli eklendi.
- `assets/js/playground.mjs` blok ekleme, 20-birim ızgara sürükleme, port bağlama, giriş değiştirme, kombinasyonel/playclock akışı, duraklat/durdur/reset, localStorage, `.bp` JSON içe/dışa aktarım, kopyalama ve her blok için yeni sekmede hedef docs yardımı sağlıyor. API veya katılımcı verisi yok.
- `assets/js/engine.mjs` dört-durumlu simülasyon ve codegen için doğrulayıcı, 0/1/X kapı mantığı, comb-cycle reddi, yükselen kenarda eşzamanlı yazmaç ve async resetli Verilog üretimi içeriyor. `tests/` altında Node testleri, Icarus oracle ve Playwright uçtan uca akışları eklendi. README ve mevcut kullanım/blok/kurulum dokümanları güncellendi; test dosyaları Pages yayınının dışında bırakıldı.
- Doğrulama: temiz `npm ci` (0 npm vulnerability); `npm test` 6/6; Icarus 4 binary + 4 X yarım-toplayıcı vektörü ve yazmaç reset/tik izi; CSS derlemesi; Jekyll build; `npm run test:e2e` 7/7 (desktop tam yükseklik, 320/390/768/1440 taşma, port kablolama, localStorage, import/export, clock, drag, yardım tooltip/hedef); `actionlint`, `git diff --check` geçti.
- Görsel benchmark ilk turda 320 px'de tooltip'in layout genişliğini taşırdığını yakaladı. Tooltip viewport'a sabitlenip JS ile sınır içinde konumlandırıldı; aynı test turu temiz geçti. Yerel Playwright Chromium için Nix binary kullanıldı çünkü dağıtılan Playwright chromium NixOS'ta `libglib` olmadan açılamıyordu.
- Açık: alt `.bp` belgelerini modül instance olarak çağırma/bileştirme yok; quiz yok; docs henüz içindekiler/süreli modüler eğitim portalı değil; landing ve genel palet araştırma/redesign bekliyor. Bu nedenle henüz MVP değil.

## 2026-11-23 — Saf simülasyon ve Verilog motoru

- `assets/js/engine.mjs` eklendi. Tek bir blueprint JSON'u doğrulanıp 1-bit 0/1/X değerlendirmesi, kombinasyonel döngü reddi, açık reset, yükselen kenarda eşzamanlı register güncellemesi ve Verilog çıktısı üretebiliyor. İlk sabit yarım toplayıcı bu motorun JSON fixture'ı oldu.
- `tests/engine.test.mjs` ve `npm test` eklendi; yarım toplayıcı dört giriş birleşimi, AND/OR/XOR/NOT dört-durum doğruluk tabloları, geçersiz bağlantılar, iki register'ın aynı eski durumdan güncellenmesi ve HDL çıktısı doğrulanıyor.
- Doğrulama: `npm test` 5/5 geçti; `node --check assets/js/engine.mjs` ve `git diff --check` geçti. İlk test koşusunda döngü fixture'ında çoklu sürücüyle erken reddetme ve yalnız register içeren devreye gereksiz giriş şartı yakalandı; test ve doğrulama kökü düzeltildi, sonra tamamı geçti.
- Kalan: Icarus Verilog ile codegen oracle, editör bağlantısı/drag-drop, sinyal SVG, `.bp` kayıt-yükleme, kullanıcıya görünen hata ve sequential UI; Pages dağıtım URL'si hâlâ kontrol bekliyor. Bu dal henüz push edilmedi.
# 2026-11-23 — Blok yardım bağlantısı doğrulaması

- Atölyedeki Giriş, Çıkış, AND, OR, XOR, NOT ve Yazmaç araçlarında soru işareti bağlantısı bulunuyor. İmleçle veya klavye odağıyla kısa Türkçe açıklama gösteriyor; tıklama hedefi ilgili docs başlığına gidiyor ve `target="_blank"` ile yeni sekme açıyor.
- Mevcut Playwright testini kullandım; AND yardımında yeni sekme hedefi, doküman anchor'ı ve tooltip metni doğrulandı. Nix Chromium ile `npm run test:e2e`: 7/7 geçti. Sistem Playwright Chromium'u eksik `libglib` nedeniyle açılamadı; Nix Chromium bu ortam için çalışan test ikilisi oldu.
- Değişen dosyalar: `backlog.md`, `backloglog.md`. Uygulama kodu değişmedi; özellik daha önceki atölye commit'inde yer alıyordu.
- Kalan: yardım davranışı diğer bloklarda aynı ortak görünüm ve anchor yapısını kullanıyor; her blok için ayrı tarayıcı testi henüz yok.

## 2026-11-23 — Blok yardımı kapsam testi

- Giriş, Çıkış, AND, OR, XOR, NOT ve Yazmaç yardımlarının her biri için kısa açıklama, hedef doküman bölümü ve yeni sekme niteliğini tarayıcı testine ekledim. AND yardımına tıklayınca Bloklar dokümanının yeni sekmede açıldığını da doğruladım.
- Açık blueprint modüllerinin yardımında tooltip rolü eksikti; dinamik yardım balonuna `role="tooltip"` eklendi. Test, modül yardımının anchor'ını ve özetini de kontrol ediyor.
- Yerel baseurl ile açılan yeni sekmenin Jekyll çıktısında doğru sayfaya ulaşması için Playwright isteği yönlendirmesi sayfa bağlamına taşındı.
- Doğrulama: CSS üretimi, Jekyll build, tam Playwright E2E 13/13 ve `git diff --check` geçti.
- Kalan: blok yardım davranışı doğrulandı; yeni ürün işi gerekmiyor.
# 2026-11-23 — Birden çok `.bp` modülünü birleştirme

- `assets/js/project.mjs` eklendi: 1–8 blueprint proje doğrulaması, adlandırılmış modül portları, modül döngüsü/eksik port reddi, iç içe blueprint düzleştirme, proje simülasyonu, yazmaç tick/reset ve birleşik Verilog üretimi.
- Devre Atölyesi diğer açık blueprint'leri `BP MODÜLLERİ` araçlığında gösteriyor; modül blokları isimli input/output portlarıyla kablolanabiliyor. Açık proje sekmeleri localStorage'da birlikte korunuyor. Geçersiz içe aktarma mevcut belgeyi değiştirmiyor; açılışta okunamayan yerel kayıt otomatik silinmiyor.
- `tests/project.test.mjs` yarım-toplayıcı modülünü tüm giriş birleşimlerinde, iç içe yazmacı, eksik modül/portu ve bağımlılık döngüsünü denetliyor. `tests/project-verilog-oracle.mjs`, Icarus ile hem kombinasyonel modül hem de iç yazmaçlı sıralı modül çıktısını derleyip simüle ediyor. `npm test`: 9/9; Icarus oracle; Jekyll/CSS build; Playwright: 8/8 geçti.
- Değişenler: `assets/js/project.mjs`, `assets/js/playground.mjs`, `assets/css/input.css`, `playground/index.html`, `tests/project.test.mjs`, `tests/project-verilog-oracle.mjs`, `tests/e2e/playground.spec.mjs`, `package.json`, `README.md`, `notes.md`, `backlog.md`.
- Kalan: dışa aktarma etkin `.bp` dosyasıyla sınırlı; modül bağımlılıkları başka cihaza ayrı dosyalar olarak taşınmalı. Görsel inceleme ve modül API sınırları üzerinde daha geniş kod denetimi henüz yapılmadı.

# 2026-11-23 — Dokümantasyon eğitim portalı

- Sol dokümantasyon menüsü Temeller, Atölyeyi Kullan ve Geliştirici Rehberi adlı açılır konu gruplarına ayrıldı; sayfa ve alt bölüm bağlantıları ile yaklaşık okuma süreleri eklendi. Doküman sayfalarına sayfa süresi, içindekiler ve bölüm süreleri eklendi.
- Kullanım ve Bloklar rehberleri çalışan modül arayüzüne göre güncellendi: açık dosyayı araçlıktan ekleme, isimli portları bağlama, sınırlar ve yerel proje saklama adımları anlatılıyor. Yardım bağlantısı `BP modülleri` anchor'ına gidiyor.
- `tests/e2e/docs.spec.mjs` menü aç/kapa davranışını, okuma sürelerini, 320–1440 px taşma kontrolünü ve yayımlanan sayfalardaki bütün dokümantasyon anchor hedeflerini doğrular. İzole worktree'de E2E test sunucusu çakışmasını çözmek için Playwright portu `PLAYWRIGHT_PORT` ortam değişkeniyle seçilebilir hale getirildi.
- Doğrulama: `npm ci` (0 audit bulgusu), `npm run build:css`, Jekyll build, `npm run test:e2e` 9/9 (Chromium, port 4179), `npm test` 6/6 ve `git diff --check` geçti; 1440 px kullanım rehberi screenshot'ı gözle incelendi.
- Değişen dosyalar: `_includes/docs-nav.html`, dört `docs/*.md`/`docs/index.html` sayfası, `assets/css/input.css`, `assets/css/site.css`, `playwright.config.mjs`, `tests/e2e/docs.spec.mjs`, `backlog.md`, bu günlük.
- Kalan: genel koyu tema ve landing tasarımı; eğitim portalı içeriği geçerli kılındı.

# 2026-11-23 — Yerel anonim quiz prototipi

- `/quiz/` sayfasına sekiz soruluk A/B alıştırma formları eklendi: her formda dört paralel mantık yolu tahmini birincil puanı; iki blok-Verilog eşlemesi ve iki clock/yazmaç sorusu ikincil puanları oluşturuyor. Sonuç ekranı genel yüzdeyi ve alt puanları açıklamalarla sunuyor; form değiştirme ve yeniden deneme var.
- Cevaplar yalnız açık sayfa belleğinde tutuluyor. İsim, yaş, sınıf, süre, puan kaydı, localStorage/sessionStorage, API/POST ve analitik yok; sayfadaki gizlilik notu da alıştırmanın okul onaylı araştırma aracı olmadığını belirtiyor. Quiz masaüstü/mobil gezinmeye eklendi.
- Eş form yapısını ve puanlamayı `tests/quiz.test.mjs`; tamamlama, puan, alt puanlar, sıfırlama, form değiştirme, ağ isteği/kalıcı saklama ve 320/390/768/1440 px taşmayı `tests/e2e/quiz.spec.mjs` doğruluyor. 768 px kontrolü gezinme çubuğunun taşmasını yakaladı; mobil menü eşiği 56 rem'e çıkarıldı.
- Değişenler: `quiz/`, `assets/js/quiz*.mjs`, `assets/css/input.css`, derlenmiş `assets/css/site.css`, `_includes/nav.html`, testler, `playwright.config.mjs`, `package.json`, `README.md`, `notes.md`, `backlog.md`.
- Doğrulama: `npm ci` audit 0 açık bulgu; `npm test` 9/9; `npm run build:css`; Jekyll build; tam Playwright E2E 10/10. Yeni quiz E2E'leri son kalıcı kayıt doğrulaması eklendikten sonra ayrıca 3/3 geçti; `git diff --check` temiz.
- Kalan: A/B formları aynı konu dağılımı ve doğru seçenek konumu ile eşleştirildi, ancak madde güçlüğü/ölçüm geçerliği danışmanla değerlendirilmedi; MEB izin dosyası veya katılımcı araştırma ölçümü olarak kullanıma hazır değiller. Ortaokul öğrencileriyle kullanılabilirlik testi yapılmadı.

# 2026-11-23 — Görsel dil ve sağlıklı öğrenme etkileşimi araştırması

- `research/design/visual-engagement.md` oluşturuldu: renk psikolojisi kanıtının sınırları, öneri paleti ve WCAG 2.2 karşıtlık hesapları, gamification/özerklik-yetkinlik kanıtı ve çocuklara uygun manipülatif olmayan etkileşim önerileri.
- `research/README.md` kaynak dizinine eklendi; `notes.md` öneriyi ve karar durumunu kaydetti; `backlog.md` kaynak araştırması ve etkileşim ilkeleri maddelerini tamamlandı olarak işaretledi.
- Değişenler: `research/design/visual-engagement.md`, `research/README.md`, `notes.md`, `backlog.md`, `backloglog.md`.
- Doğrulama: WCAG göreli parlaklık hesabı Node ile bağımsız hesaplandı; metin kontrastları normal metinde 4.5:1'i, kritik kontur/işaret kontrastı 3:1'i geçiyor. Kaynak iddiaları meta-analizler, hakemli derlemeler, UNICEF Innocenti raporu ve W3C WCAG sayfalarıyla sınırlandırıldı. `git diff --check` geçti; yeni araştırma dosyasında satır sonu boşluğu da bulunmadı.
- Kalan: palet ürün genelinde uygulanmadı ve onaylanmadı; mobil/masaüstü ekranlarda görsel ve erişilebilirlik incelemesi uygulama görevi kapsamında yapılmalı. Tasarım ilkeleri çocuk kullanıcı testi veya öğrenme etkisi kanıtı yerine geçmez.

## 2026-11-23 — Koyu site teması ve etkileşimli landing

- Kaynaklı öneri paleti site teması olarak seçilip uygulandı; Jekyll'in doküman, quiz ve genel sayfaları `ludus`, tam ekran Devre Atölyesi ise kendi `ludus-cad` temasını kullanıyor.
- Landing yeniden düzenlendi: büyük ama üç satıra yakın başlık, paralel AND/XOR yollarını gösteren etkileşimli yarım toplayıcı, A/B giriş kontrolleri, sinyal ve Verilog eşlemesi, dört giriş çiftini yerel sayfa belleğinde izleyen sınırlı keşif göstergesi ve her bölüm için yaklaşık okuma süresi. Araç ilk yüklemede çizgi animasyonu başlatmıyor; kullanıcı giriş değiştirince ilgili mantık yolları hareket ediyor.
- Docs koyu palete taşındı; mantık kapısı katalog örnekleri açık renkli eski prototip görünümünden paletle uyumlu blok örneklerine çevrildi. Public README ve proje notları da güncellendi.
- İlk masaüstü/mobil ekran görüntüleri ve ayrı worktree ön eleştirisi incelendi. Eski başlığın beş satıra çıkması ve statik demo bulguları düzeltilmiş durumda. Tanıtım, docs ve atölye için yeni bağımsız görsel incelemeler ve CI hizalama/kontrast kapıları backlog'da açık.
- Doğrulama: CSS build, Jekyll build, `npm test` 12/12, Icarus Verilog oracle (kombinasyonel + nested `.bp` clock/register), tam Playwright E2E 15/15; landing giriş/output doğruluğu ve 320/390/768/1440 px yatay taşma kontrolü dahil; `git diff --check` geçti.
- Değişenler: `index.html`, `assets/js/landing.mjs`, `assets/css/input.css` ve derlenmiş `assets/css/site.css`, default/workbench layouts, `docs/bloklar.md`, `tests/e2e/home.spec.mjs`, `README.md`, `notes.md`, araştırma/backlog kayıtları.
- Kalan: üç sayfanın yeni bağımsız görsel QA'sı, okunabilirlik/kontrast benchmarklarının CI'a bağlanması, landing sonrası uzaktaki PR kontrolü; bu commit henüz push edilmedi.


## 2026-11-23 — Görsel benchmarkları ve bağımsız arayüz incelemesi

- Landing, docs ve atölye ayrı worktree'lerde masaüstü/mobil boyutlarda incelendi; üç ajanın düzeltmeler sonrası geri kontrolü de geçti. Mobil devre etiketleri büyütüldü; docs yalnız etkin grubu açıyor, menü okuma süresi düzeltildi ve satır aralıkları sıkılaştırıldı; atölye küçük yardımcı metinleri büyütülüp aydınlatıldı.
- Görsel kapılar eklendi: 1440 px ana alan hizaları, landing başlık satırı, docs mobil içerik başlangıcı ve aktif menü, atölye sütun kenarları. Kontrast Node testi site tema renklerini ve seçili atölye yardımcı metinlerini ölçüyor.
- Değişenler: `_includes/docs-nav.html`, `assets/css/input.css`, derlenmiş `assets/css/site.css`, `tests/e2e/visual.spec.mjs`, `tests/visual-colors.test.mjs`, `backlog.md`, `notes.md`, `raports/visual-review-2026-11-23.md`, bu günlük.
- Doğrulama: CSS ve Jekyll build geçti; `npm test` 14/14; Playwright E2E 17/17; Icarus Verilog kombinasyonel ve çok modüllü clock/register oracle'ları geçti; `git diff --check` temiz. Ajan incelemeleri landing/docs/workbench için ayrı worktree'de; son geri kontrollerinde mobil/desktop hizalama ve okunabilirlikte regresyon yok.
- Kalan: mobil Devre Atölyesi tuvali yatay kaydırılır ama kaydırma gereksinimi açıkça işaretlenmiyor. Commit `ebc6b9e` gönderildi; PR #2 CI run `45228751303` build başarıyla tamamlandı, Pages deploy PR aşamasında beklendiği üzere atlandı.


## 2026-11-23 — Görsel kalite kapılarının birleşmesi ve canlı yayın

- PR #2, tüm bölüm incelemeleri ve benchmarklar geçince `bfaf4b18` merge commit'iyle `main`e birleştirildi. PR CI (`45229055964`) başarılıydı; `main` Pages build + Icarus + E2E (`45229361530`) ve deploy adımı da başarılı tamamlandı.
- Yayın adresi `https://nec0ti.github.io/ludus-circuitus/` üzerinde landing ve docs 200 döndü. Canlı Playwright 390×844'te landing temasını ve 20 px SVG yazısını; docs başlığını y=642.875, tek açık grubu ve taşmasızlığı; atölyede `ludus-cad` temasını, 7 blok yardım işaretini ve site nav/footer bulunmadığını doğruladı. Üç sayfada tarayıcı hatası yok.
- Yerel çalışma ağacı `origin/main` ile fast-forward eşitlendi ve temiz. İnsan katılımcılı araştırma/kişisel veri toplama ve API işleri gerekli danışman-okul-MEB/KVKK koşulları tamamlanana kadar açık backlog'da.


## 2026-11-23 — Quiz belirtkesi ve dengeli A/B cevap anahtarı

- Bağımsız quiz denetimi ilk sürümde doğru seçeneklerin yalnız B/C olduğunu, birincil havuzun paralellikten çok doğruluk tablosu hesapladığını buldu. A/B anahtar konumları A–D arasında form başına 2/2/2/2 dengelendi, eşli maddelerin doğru seçeneği farklılaştırıldı; soru beceri anahtarı eklendi.
- p2 iki `assign` ifadesindeki AND/XOR sonuçlarını tahmin eder. Denetim p2'nin ilk düzeltmesinde paralellik bilgisinin doğru seçenek için gerekli olmadığını ayrıca fark etti; artık her seçenek hem değerleri hem yol ilişkisini içeriyor ve doğru cevap ikisini birden gerektiriyor. Bu gereklilik test edildi.
- `research/measurement/quiz-blueprint.md` kazanım belirtkesi, A/B madde haritası, cevap anahtarı, puanlama, geçerlik/eşdeğerlik sınırları ve izin öncesi gereken adımları kaydeder. Kaynak önerileri araştırma dosyasında. Quiz yerel ve anonim kalır; araştırma uygulaması değildir.
- Değişenler: `assets/js/quiz-data.mjs`, `tests/quiz.test.mjs`, `research/measurement/quiz-blueprint.md`, `research/measurement/learning-study.md`, `research/README.md`, `backlog.md`, `notes.md`, bu günlük.
- Doğrulama: CSS build ve Jekyll build geçti; `npm test` 15/15; tüm Playwright E2E 17/17; Icarus Verilog oracle'ları geçti; quiz E2E 3/3; `git diff --check` temiz. Ayrı worktree'deki quiz denetimi anahtarları/form eşlemesini kontrol etti; p2 eleştirisi uygulanıp yeni koda test eklendi.
- Kalan: danışman/alan öğretmeni, öğrencilerle anlaşılabilirlik incelemesi, madde güçlük/eşdeğerlik kanıtı, okul/MEB onaylı protokol ve örneklem. Bunlar tamamlanana kadar quiz araştırma aracı veya öğrenme etkisi kanıtı olarak kullanılmayacak. Commit `ce89a00` PR #3 ile gönderildi; `52ae1ebb` ile `main`e birleştirildi. PR CI ve `main` Pages build/deploy run `45232526762` başarılı oldu. Canlı `/quiz/` sayfasında yeni p2 sorusu, 390 px taşmasızlığı, yerel storage boşluğu ve hiç POST isteği çıkmaması Playwright ile doğrulandı.


## 2026-11-23 — Adlandırılmış ara sinyal

- Devre Atölyesi'ne tek girişli/tek çıkışlı `signal` bloğu eklendi. Kullanıcı bloğu araçlıktan ekler, başlığına çift tıklayıp İngilizce Verilog tanımlayıcısı verir; blok değeri alttaki Değişkenler panelinde canlı görünür. Üretilen HDL'de aynı adla `wire` ve `assign` bulunur. Sinyal 0/1/X'i aynen geçirir, durum saklamaz; feedback kombinasyonel döngü olarak reddedilir.
- Proje/blueprint doğrulaması geçersiz, anahtar kelime, yinelenen ve `clk`/`reset` çakışmalı adları engeller. Modül düzleştirme her modül örneğinin ara sinyaline ayrı kapsam adı verir. Eski `.bp` sürüm 1 dosyaları geçerliliğini korur. Blok yardımı ve Bloklar/Kullanım dokümanları güncellendi.
- Bağımsız kod denetimi bütün entegrasyon noktalarını ve modül ad çakışması riskini belirledi; uygulama ve testler buna göre tamamlandı.
- Doğrulama: `npm test` 16/16; Icarus Verilog iki oracle (yarım toplayıcıda 4 binary + 4 X vektörü, iç ara sinyalli ve iki örnekli `.bp` modülü); CSS build; Jekyll 4.4.1 ile site build; Playwright E2E 18/18; `git diff --check` geçti. Araçlar yerel Nix paketleriyle sağlandı.
- Bağımsız görsel inceleme iki turda yapıldı: 1440×900 ve 390×844 ölçülerinde hizalama/taşma sorunu yok. Ara Sinyal Giriş/Çıkış grubuna alındı; son kontrolde sınıflandırma daha açık, yeni satır ve yardım işareti hizalı. Ekranlar `/tmp/ludus-ab3a75f-1440.png` ve `/tmp/ludus-ab3a75f-390.png` olarak kaydedildi.


- PR #4, son Ara Sinyal yerleşimiyle PR CI (`45236581066`) yeşil olduktan sonra `452c539` merge commit’iyle `main`e alındı. Main build ve Pages deploy (`45236869647`) başarıyla tamamlandı.
- Canlı Pages Playwright kontrolü atölyenin 200 döndüğünü, Ara Sinyal/yardım bağlantısını ve docs `#ara-sinyal` hedefini doğruladı; yalnız GET istekleri oluştu. Öğrenci verisi veya API yok.


## 2026-11-23 — Yerel kurulum kılavuzunun MVP ile eşleştirilmesi

- `docs/yerel-kurulum.md`, güncel package scriptleri ve Pages workflow'u ile karşılaştırıldı. Node.js 22, Python 3 ve Icarus Verilog gereksinimleri eklendi; Ruby sürümü sabitlenmiş gibi gösterilmedi.
- E2E adımlarına önce `bundle exec jekyll build` eklenerek Playwright'ın `_site` klasörünü Python HTTP sunucusuyla servis ettiği açıklandı. Linux için Chromium sistem bağımlılıklarını kuran `npx playwright install --with-deps chromium`, macOS/Windows için tarayıcı kurulum komutu belirtildi. Yayın kapısının PR build'i ve Pages dağıtımıyla ilişkisi güncellendi; okuma süresi ve içindekiler eşleştirildi.
- Yeni docs E2E kontrolü gereken araçları, okuma süresini ve E2E öncesi Jekyll build adımını doğruluyor. Doğrulama: Jekyll build; docs Playwright E2E 3/3; `npm test` 16/16; `git diff --check` geçti.
- Bağımsız görsel inceleme 1440×900/390×844 ölçülerinde geçti; kod satırları taşmıyor. Ekranlar `/tmp/ludus-doc-setup-1440-viewport.png` ve `/tmp/ludus-doc-setup-390-viewport.png`. Mobilde docs menüsü yazının önünde yaklaşık 378 px yer kaplıyor; başlık yine ilk ekranda görünür ve bu mevcut docs düzenidir.


- PR #5, CI build kapısı ve görsel inceleme geçtikten sonra `6276373` merge commit’iyle `main`e alındı. Main Pages build ve deploy (`45238310345`) başarılı. Canlı `docs/yerel-kurulum/` sayfasında Node.js 22, Python 3, Icarus, `bundle exec jekyll build`, Linux Chromium komutu ve 6 dk okuma süresi `curl` ile doğrulandı.


## 2026-11-23 — MVP blok kümesi ve port sözleşmesi

- Bağımsız kod/pedagoji denetimi mevcut blokları MVP kazanımları için yeterli buldu; yeni mantık bloğu eklenmedi. AND/OR/NOT temel işlemleri, XOR parite/yarım toplayıcıyı; Ara Sinyal adlandırılmış gözlemlenebilir `wire`'ı; Yazmaç saatli durumu; açık `.bp` modülü yeniden kullanımı sağlar.
- `docs/bloklar.md` artık giriş/çıkış portlarını tablo halinde tanımlar: kapı girişleri `a`/`b` veya `in`, tek çıkış `out`; yazmaçta `d` ve Q; modül portları açık belgedeki Giriş/Çıkış adlarından türetilir. Ara Sinyal'in state saklamadığı, yalnız Yazmaç'ın sakladığı; saat/reset, `X` başlangıcı, 1-bit değer, mantıksal paralel görünümün fiziksel kapı gecikmesi olmadığı açıklanır. Reset eylemi ile generated Verilog'un aktif-yüksek asenkron reseti eşleştirilir.
- MVP kapsamı sabit, MUX, çok bit ve fiziksel FPGA yüklemesini içermiyor; herhangi biri öğrenme gereksinimi doğurursa ayrı gerekçeyle ele alınacak.
- Docs E2E port tablosunu, süreyi, reset/wire ayrımını, 0/1 onluk→tek-bit Verilog eşlemesini ve 320/390/768/1440 px taşmasızlığını doğruluyor. Jekyll build ve docs E2E 4/4 geçti. Kalan: bağımsız görsel kontrol ve PR CI.

- Son görsel geri kontrolü 390 px mobilde callout'un taşmadan doğal biçimde sarıldığını doğruladı. PR #6 CI (run `45239958700`) geçti ve PR `3d499b5` ile main'e squash merge edildi; main build, Icarus, E2E ve Pages deploy (`45240327987`) başarılı oldu. Canlı atölye HTML'inde Giriş, Çıkış, AND, OR, XOR, NOT, Ara Sinyal ve Yazmaç yardım bağlantıları yeni sekme hedefleriyle doğrulandı; E2E ayrıca `.bp` modül yardımını ve AND bağlantısının açtığı sekmeyi denetliyor. Çalışma ağacı temiz.

## 2026-11-23 — Blok yardımı isteğinin canlı doğrulaması

- İstenen küçük `?` yardımları zaten her statik blok aracında ve dinamik `.bp` modül aracında bulunuyordu. Hover/klavye odağı Türkçe kısa özeti gösteriyor; bağlantı ilgili `docs/bloklar/` başlığını `target="_blank"` ile yeni sekmede açıyor.
- Değişenler: `backlog.md`, `backloglog.md`.
- Doğrulama: mevcut Playwright testi bütün blokların özet ve hedeflerini, AND yardımı popup'ını ve modül yardımını doğruluyor; main Pages build/E2E/deploy geçti; canlı sayfada sekiz yardım bağlantısı yayımlanmış HTML'de görüldü. `git diff --check` geçti.
- Kalan: bu isteğin gerektirdiği ek uygulama değişikliği yok.

## 2026-11-23 — Zorlayıcı doğrulama ve zorunlu main merge kapısı

- `assets/js/project.mjs`, `.bp` hiyerarşisinin birleşmiş blok sayısını tahmini olarak flatten öncesi hesaplıyor ve 500 üstünü reddediyor. Saldırganca 498 fanout'lu, her kaynağı tek başına 500 blokta kalan iç içe tasarım artık büyük ara graph kurmadan durduruluyor.
- Icarus oracle'ı sabit tohumla üretilmiş 12 farklı 40 kapılı AND/OR/XOR/NOT devresini 16 ikili + 5 X giriş vektöründe karşılaştırıyor: 252 devre/vektör sonucu. Sıralı ve çok modüllü oracle'lar önceki örneklerle birlikte çalışmaya devam ediyor.
- Boyut sınırı E2E ile belirtili hâle geldi: tam 1 MiB `.bp` içe aktarımı kabul edilir; 1 MiB üstü reddedilir ve etkin blueprint/code korunur. Kullanım ve yerel kurulum docs sınırı ve merge kapısını açıklar.
- GitHub ruleset `main-requires-green-build` ID `27927079` main için PR ve `build` status check istiyor; bypass aktörü yok, approval sayısı 0. Gerçek dal kuralları API yanıtından doğrulandı. Ruleset `/repos/Nec0ti/ludus-circuitus/rules/branches/main` ile kontrol edildi.
- Değişenler: `assets/js/project.mjs`, `tests/project.test.mjs`, `tests/verilog-oracle.mjs`, `tests/e2e/{docs,playground}.spec.mjs`, `docs/{kullanim,yerel-kurulum}.md`, `research/quality/benchmark-gates.md`, `research/README.md`, `notes.md`, backlog ve günlük.
- Yerel doğrulama: `npm test` 18/18; Icarus oracle (`nix shell nixpkgs#iverilog -c npm run test:verilog`) başarılı, 252 sonuç eşleşti; Tailwind CSS build; Nix Jekyll build; Playwright E2E 21/21; `git diff --check` temiz. Standart Playwright Chromium bu NixOS shell'inde `libglib` yüzünden açılamadı; Nix Chromium ile tüm E2E geçti.
- PR #7 (`45243309555`) `97d1791` ile main'e squash merge edildi; main `build`, Icarus, E2E ve Pages deploy (`45243550641`) başarılı. Canlı `/docs/kullanim/` ve `/docs/yerel-kurulum/` metinleri `curl` ile, atölye URL'si HTTP 200 ile kontrol edildi.
- Kalan: ölçülmüş runtime/bellek profili çeşitli gerçek cihazlarda yapılmadı; 500 düğüm sınırı statik boyut kuralı, makineden bağımsız gecikme iddiası değildir. Quiz etkisi ve insan katılımcı onayları ayrı açık backlog işleridir.
## 2026-11-23 — Rakip araç kanıtlarını düzeltme ve sınırları kayıt

- CircuitVerse resmî dokümanları ve misafir simülatörü yeniden incelendi. Misafir arayüzünde Input/Output/Gates/Sequential Elements paleti ile tuval, timing diagram ve testbench alanları görüldü. Aynı yarım-toplayıcı akışını kurma denemesi tekrarlanan `transformCallback` tarayıcı hataları nedeniyle tamamlanmadı; uygulamalı kıyas tamamlanmış gibi işaretlenmedi.
- VPLAS 2025 makalesinin Related Information alanında kod açıklamalarına devre şeması/zaman waveform'u desteği ve GUP/Value Trace görevleri olduğu kaydedildi. 2026 IEICE raporunda 8 EFP görevi ve 99 lisans öğrencisi bildiriliyor. 2025 makalesinde özetin 50, sonuç kısmının 112 öğrenci bildirmesi kaynak içi sayı tutarsızlığı olarak açıkça işaretlendi.
- Özgünlük ifadesi “blok + Verilog + devre/sinyal görünümü”nden, öğrencinin grafiği kendisinin bloklarla kurması ve bu grafikten kod/değer gösterimlerini birlikte alması şeklinde sınırlı bir ürün hipotezine daraltıldı. Bunun bile tüm araçlar karşısında benzersiz olduğu ileri sürülmüyor.
- Değişenler: `research/references/related-tools.md`, `research/references/education-studies.md`, `research/references/index.md`, `research/measurement/learning-study.md`, `notes.md`, `backlog.md`, bu günlük.
- Doğrulama: birincil CircuitVerse, MDPI ve IEICE web kaynakları incelendi; canlı CircuitVerse simülatörü Nix Chromium ile açıldı ve sınırlı arayüz gözlemi kaydedildi. Proje testleri çalıştırılmadı; bu değişiklik araştırma dokümantasyonu. `git diff --check` geçti.
- PR #9 `05c3be0` ile birleştirildi; CI build geçti, Pages deploy (`45246752372`) başarılı. Canlı `https://nec0ti.github.io/ludus-circuitus/` HTTP 200 döndürdü; yayındaki `/docs/bloklar/` başlığı ve ilgili bölüm metinleri doğrulandı.
- Aynı kayıt güncellemesinde `notes.md` içindeki eski açık kararlar, uygulamadaki reset, `.bp` modül bileşimi, sinyal paneli ve 1-bit semantiğiyle eşleştirildi.
- Kalan: CircuitVerse üzerinde yarım-toplayıcıyı aynı adımlarla kurup sonucu/Verilog görünürlüğünü doğrulamak; VPLAS canlı demosunu bulmak veya makale kapsamıyla sınırlı kaldığını korumak; rakip arayüzlerde aynı görevi gerekirse bağımsız bir gözlemciyle yeniden incelemek. Özgünlük ve öğrenme etkisi onaylanmış/kanıtlanmış değildir.

## 2026-11-23 — Sonsuz blueprint tuvali ve ders yolunun modülerleştirilmesi

- Devre Atölyesi'nde sınırlandırılmış kaydırma alanı yerine kamera ile pan/zoom yapan blueprint düzlemi kuruldu. Mouse tekerleği imlecin altındaki dünya noktasını sabit tutuyor; Space+sürükleme ve orta tuş pan yapıyor. Dokunmatik ekranda sürükleme pan, kısa dokunma blok araması açıyor. Sığdır görünümü mevcut `.bp` node koordinatlarına göre çerçeveliyor; kaydedilmiş sürüm 1 belgeleri değişmedi.
- Araçlıktaki bloklar tıklamayla mevcut ekleme davranışını koruyor; drag/drop bırakıldığı grid koordinatında oluşturuyor. Boş tuval araması isimle blok ekliyor. Ortogonal kablo köşeleri yuvarlatıldı.
- NAND/NOR/XNOR eklendi: port ve geçerli tür sözleşmesi, 0/1/X benzetimi, Verilog kod üretimi, `.bp` modül doğrulama/düzleştirme, yardım ve doğruluk tabloları eşlendi. 12 × 40 sabit tohumlu devre, 16 ikili + 5 X vektörüyle toplam 252 Icarus sonucu kontrol etti.
- Kullanıcı “dokümantasyon hâlâ karışık” geri bildirimi verdi. Başlangıç sayfası kurs haritasına döndü; dijital sinyaller, mantık kapıları, yarım toplayıcı, paralel yollar, saat/yazmaç ve bloktan Verilog'a altı kısa sayfaya ayrıldı. Kullanım, blok kataloğu ve yerel kurulum ayrı katlanabilir gruplar olarak kaldı; yaklaşık toplam rehber süresi 41 dk.
- Bağımsız docs QA: masaüstü/mobilde sıra, etkin menü, sonraki ders bağlantıları, tablo sığması ve taşma kontrol edildi; bloklayıcı sorun yok. Mobilde menü 381 px yüksekliğinde ve konu içindekiler aşağıda kalıyor; ders başlığı ilk ekranda görünüyor. Görseller `raports/docs-curriculum-review-2026-11-23.md` içinde.
- İlk bağımsız workbench görsel incelemesi mobil ölçekte küçük node ve pan eksikliği buldu. İçeriğe göre fit, %58 asgari ilk görünüm, resize'da otomatik sığdırma, dokunmatik pan ve mobil üst satır düzeni eklendi. Son bağımsız workbench görsel geri kontrolü bekleniyor.
- Değişenler: `assets/js/{engine,project,playground}.mjs`, `playground/index.html`, CSS çıktısı/kaynağı, `tests/{engine,project}.test.mjs`, E2E ve iverilog oracle, docs gezinmesi ve altı yeni ders sayfası, `const.md`, `notes.md`, backlog, raporlar.
- Doğrulama: Tailwind CSS build ve Jekyll build geçti; Node **20/20**; Icarus 252 kapı vektörü ve hiyerarşik `.bp` oracle'ları geçti; Playwright E2E **26/26** geçti (tam ekran, mobil fit, arama, imleç-zoom, pan, drag/drop, kayıt/bağlantı, gate yardımı, docs gezinme ve süreler dahil); `git diff --check` temiz.
- İlk ve ikinci uygulama commitleri `a2955cc` ve `30a031b`. Son workbench masaüstü/mobil ekran incelemesi sürüyor; bu log ekinde yalnız koordinat doğrulama güvenlik düzeltmesi `21/21` Node testinden geçti. Kalan: son görsel QA, bu küçük düzeltme için commit, PR CI ve yeşil kontroller sonrası main merge/Pages yayını.

## 2026-11-23 — Mobil yakınlaştırmada node etiketlerini okunur tutma

- Son mobil görsel inceleme node kartlarının sığdığını, fakat kamera transformunun 9 px başlıkları yaklaşık 5 px'e düşürdüğünü belirtti. Node başlığı, ikon, silme düğmesi, değer ve modül port metinleri artık kamera zoom oranına ters ölçeklenerek ekranda sabit ölçüde çiziliyor; graph geometrisi ve node konumu değişmiyor.
- Doğrulama: CSS ve Jekyll build; Playwright **26/26**, mobil test tüm başlangıç bloklarının sığdığını ve etiketin ekranda 9 px kaldığını doğruluyor. Dokunma pan ve tıklama davranışı önceki akışla korunuyor. `git diff --check` geçti.
- Kalan: bağımsız ekran geri kontrolü, bu son görsel düzeltme commit'i, PR CI ve Pages yayın doğrulaması.

## 2026-11-23 — Ana blueprint kablolarını görünür ve portlara hizalı yapma

- Bağımsız inceleme, orta çalışma alanındaki SVG'nin sıfır boyutlu kaldığını ve bu yüzden kabloların görünmediğini buldu; sağdaki minik devre görünümü bunu gizlemişti. SVG'ye blueprint koordinat alanı verildi. Kablo uçları artık çizilmiş node portlarının gerçek DOM merkezlerinden hesaplanıyor; mini devredeki ayrı görünüm korunuyor.
- Yeni E2E testi ana SVG'nin görünür alanını ve altı kablonun iki ucunun da gerçek port merkezlerine 0.75 ekran pikselinden yakınlığını doğruluyor.
- Değişenler: `playground/index.html`, `assets/css/input.css`, derlenmiş `assets/css/site.css`, `assets/js/playground.mjs`, `tests/e2e/playground.spec.mjs`, bu rapor, backlog ve bu günlük.
- Doğrulama: Tailwind CSS ve Jekyll build geçti; Node **21/21**; Icarus 252 seeded kapı vektörü ve hiyerarşik `.bp` oracle'ları geçti; Playwright **27/27**; `git diff --check` temiz.
- Kalan: commit/push, ayrı worktree'de son masaüstü/mobil görsel geri kontrolü, güncel PR CI ve Pages yayın doğrulaması.

## 2026-11-23 — Son atölye masaüstü/mobil görsel kontrolü

- Bağımsız ajan temiz worktree'de `94350c0` commitini inceledi. Ana çalışma SVG'sinde desktop ve mobilde altı kablonun tamamı görünür; uçlar fit/zoom/dokunmatik pan sonrasında gerçek port merkezlerine kayan hata olmadan oturuyor ve yollar tuval dışına taşmıyor. Kablolar yumuşak dirsekli; mobil etiketler okunur; yatay taşma/toolbar çakışması yok.
- Ekran görüntüleri: `/tmp/ludus-wire-94350c0-1440-viewport.png`, `/tmp/ludus-wire-94350c0-390-viewport.png`, `/tmp/ludus-wire-94350c0-1440-canvas.png`, `/tmp/ludus-wire-94350c0-390-canvas.png`, `/tmp/ludus-wire-94350c0-1440-signal.png`. Yalnız küçük akış notu: 390×844 ilk görünüm node sırasının az üstünde biter; kullanıcı biraz kaydırınca tüm devre görünür.
- Güncel PR build'i geçti (`45260520482`). Yerel kontroller: CSS/Jekyll build, Node **21/21**, Icarus **252** seeded kapı vektörü ve hiyerarşik `.bp` oracle'ları, Playwright **27/27**, `git diff --check`.
- Değişenler: bu rapor, backlog ve günlük.
- Kalan: Pages yayın kanıtını bu kayıt dalında PR ile eklemek.

## 2026-11-23 — Atölye güncellemesini yayınlama

- PR #11 (`3ac1ca0`, squash) main'e alındı. Pages run `45261362299` build, 21 Node testi, Icarus oracle'ları, 27 Playwright testi ve deploy adımlarını başarıyla tamamladı.
- Canlı smoke kontrolü doğru Pages alan adından yapıldı: `https://nec0ti.github.io/ludus-circuitus/`, `/docs/` ve `/playground/` üçü de HTTP 200. Ana sayfada başlık/devre, docs sayfasında kurs içeriği ve atölyede standalone uygulama HTML'i mevcut.
- İlk smoke denemesinde alan adı yanlışlıkla `necoti` (harf o) yazıldığı için GitHub Pages'in Site not found yanıtı alındı; yapılandırmadaki doğru kullanıcı adı `nec0ti` (sıfır) üzerinden tekrar kontrol edildi ve tüm sayfalar 200 verdi.
- Değişenler: `backlog.md`, `raports/workbench-redesign-2026-11-23.md`, bu günlük.
- Kalan uygulama işi yok. Araştırma kapsamı, danışman/okul izinleri ve öğrenme ölçümü sonraki proje aşamalarında açık kalıyor.
## 2026-11-24 — Çok bitli çalışma alanı, tema/footer ve 2204-A ölçüt eşlemesi

- Necati'nin kapsam düzeltmesi uygulandı: RISC-V/assembly/CPU yok; dijital mantık ve Verilog içinde 1–32 bit sinyaller. Eski `.bp`'lerde genişlik alanı yoksa 1 bit varsayımı korunuyor. Sabit ve MUX blokları simülasyon, kod üretimi, değişken görünümü ve dokümana bağlandı. Animasyon Play/Pause/Stop ile giriş veya yazmaç tik/reset işlemi birbirinden ayrıldı.
- Tuval düzenlemesinde seçili node genişliği, seçim kutusu, aramalı sağ tık palette, sağ/orta tuş pan, grid snap ve `.bp` rename/delete/module ilişkisi test edildi. Mobilde uzun araçlık erişilebilir bir düğmeyle katlandı; tuval ilk ekranda, blok ekleme ve drag/drop korunuyor.
- Landing ve site footer'ı grafit-yeşil ürün görsel diliyle yenilendi; kaynak, öğrenme rehberi ve atölye linkleri sade footer'da. Independent desktop review hizalamayı temiz buldu; landing'de ürünün gerçek devre ve Verilog çıktısı öne çıkıyor. Üretilmiş/ölçülmüş olmayan öğrenme etkisi iddiası eklenmedi.
- TÜBİTAK 2026–27 2204-A çağrı sayfası ve bağlı değerlendirme formları incelendi. Ölçüt-açık iş tablosu `research/tubitak/evaluation-alignment-2027.md` içinde; 2027 sayfasındaki kriter PDF'leri dosya adında 2025 taşıdığı için form sürümü belirsizliği yazıldı. Araştırma sorusu, yöntem, yenilik/etki, tekrarlanabilir sonuç, uygulanabilirlik/karşılaştırma, öğrenci hâkimiyeti ve etik açıkları işaretlendi. Yazılım oracle testinin öğrenme kazanımı kanıtı olmadığı özellikle not edildi.
- Ders denetimi başlangıç örneklerinin tek-bit kapsamını ürün sınırından ayırdı; 4-bit sayı örneği, çok bitli kapıların bitwise/no-carry davranışı ve vector register D/Q açıklaması eklendi.
- Değişen ana dosyalar: `assets/js/playground.mjs`, `playground/index.html`, `assets/css/input.css`, `assets/css/site.css`, `_includes/{footer,nav,docs-nav}.html`, `_layouts/default.html`, `docs/`, `tests/e2e/`, `tests/visual-colors.test.mjs`, `const.md`, `notes.md`, `backlog.md`, `research/tubitak/`.
- Doğrulama: `npm test` 27/27; Icarus scalar/vector + sabit/MUX/register + seeded 12×40 gate oracle, hiyerarşik `.bp` oracle ve çok-bit 1.920 sonuç oracle geçti; CSS ve Jekyll build geçti; güncel CSS/katlanır araçlık/docs ile Playwright 35/35 geçti. Ders ajanının docs testleri de 8/8 geçti. İlk E2E turundaki genişlik menüsü test akışı seçili olmayan node'a tıklıyordu; kullanıcı akışına göre düzeltildi ve tam tur yeşil oldu.
- İşlenen commitler: `15d3f4d` UI entegrasyonu, `9dfb1e1` tasarım/docs/footer, `74ff760` 2204-A ölçüt haritası, `11b928e` çok bitli ders doğruluğu, `34fa13b` seeded vector oracle, `020eb06` bit-merge sınır örneği, `27deb7b` mobil shelf ve `2af6a3c` README. `8f5175b` vektör motoru commit'i daha önce branch'e alınmıştı.
- Icarus kapısı `tests/vector-verilog-oracle.mjs` ile genişletildi: 1/2/7/31/32 bit × sekiz gate/MUX türü × 48 sabit+seeded vektör (1.920 vektör-çıkış karşılaştırması) ve register X/async reset/posedge/hold; X-select MUX ortak bit davranışı deterministik vektörle kapsanıyor. `nix shell nixpkgs#iverilog -c npm run test:verilog` geçti.
- Final görsel geri kontrolü 1440px landing/footer ve docs ile 390px çalışma alanında kontrast, hizalama, taşma ve şablon hissi açısından bloklayıcı bulgu görmedi. Ekran görüntüleri `/tmp/ludus-final-{landing,mobile,docs}.png` (geçici yerel QA kanıtı).
- MIT lisans dosyası eklendi; daha önceki “açık kaynak” açıklamasında lisans dosyası yoktu. Kalan: son içerik güncellemesinden sonra tam kapıları, PR CI ve Pages smoke kontrolünü yeniden çalıştır. İnsan katılımcılı quiz/veri toplama, MEB izin/onam ve danışman onayı olmadan açılmaz.
- E2E hardening: right-click arama testi artık boş grid koordinatı kullanıyor, Escape ile menü kapanmasını ve odağın canvas'a dönmesini sınar. `-0` ile `0` aynı grid koordinatı olduğundan snap assertion'ı mutlak kalan kullanıyor. Hedefli Playwright testi 1/1 geçti.
