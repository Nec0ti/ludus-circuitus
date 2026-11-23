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
- Kalan: danışman/alan öğretmeni, öğrencilerle anlaşılabilirlik incelemesi, madde güçlük/eşdeğerlik kanıtı, okul/MEB onaylı protokol ve örneklem. Bunlar tamamlanana kadar quiz araştırma aracı veya öğrenme etkisi kanıtı olarak kullanılmayacak. Bu özellik dalı henüz commit/push edilmedi.
