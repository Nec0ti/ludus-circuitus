# Proje notları

Bu dosya proje hakkında paylaşılan bilgilerin düzenlendiği çalışma belleğidir. Her yeni bilgi için kaynağı, karar durumunu ve belirsizliği koru. Necati'nin açıkça kararlaştırmadığı ayrıntıları kesinleşmiş gibi yazma.

## Proje fikri

**Çalışma tanımı:** Ludus Circuitus, Verilog öğrenmeye görsel bloklarla başlanan; kullanıcının oluşturduğu blueprint'i gerçek Verilog kodu ve devre davranışıyla yan yana gösteren açık kaynaklı bir eğitim projesidir. Unreal Engine Blueprint fikri, çok modüllü proje kurma deneyimine ilham veriyor.

Verilog'da modüller, bağlantılar ve HDL sözdizimi başlangıç düzeyinde öğrenmeyi zorlaştırabilir. Ürün; görsel kurulumdan gerçek HDL'e geçişi görünür kılarak bu öğrenme eşiğini düşürmeyi hedefliyor. Bu bir amaç ve tanıtım yönüdür; öğrenme etkisi ölçülmeden kanıtlanmış sonuç olarak sunulmayacak.

## Ürün ve yayın kararı

- Site GitHub Pages ve Jekyll ile yayımlanacak.
- Sunucu tarafı dinamik sisteme gerek yok. Devre Atölyesi etkileşimli olacaksa bu etkileşim tarayıcıda çalışabilir; sunucu tarafı bileşen gereksinimi şu an yok.
- Ana uygulama ve istemcinin gördüğü her içerik Türkçe olacak: tanıtım metni, yayımlanan dokümantasyon, menüler, araç ipuçları, hatalar ve Devre Atölyesi etiketleri. İç geliştirme notları İngilizce olabilir. Verilog anahtar sözcükleri, kod örnekleri, `top.bp` gibi dosya adları ve teknik özel adlar çevrilmeyecek.
- Ana site üç bölüm: **Tanıtım**, **Dokümantasyon**, **Devre Atölyesi**. Bunlar Türkçe arayüz için geçici adlardır.

### Tanıtım sayfasında anlatılacaklar

- Verilog öğrenirken görülen başlangıç güçlükleri ve dijital mantıkla HDL arasındaki geçiş.
- Bloklarla kurulan devrenin nasıl gerçek Verilog'a dönüştüğü.
- Görsel devre, benzetim ve HDL çıktısının birlikte öğrenmeye nasıl hizmet ettiği.
- Projenin açık kaynaklı oluşu ve katkı biçimi.
- Öğrenme sürecini hızlandırma/öğrenme eğrisini dikleştirme hedefi. İddia sonuç gibi değil, projenin hedefi olarak anlatılacak; etki araştırma/benchmark ile ölçülürse sonuç sonradan eklenir.

## Site haritası ve dokümantasyon

Dokümantasyon kısa tutulacak ama temel parçaları kapsayacak. Her blok kendi amacı, giriş/çıkışları ve örneğiyle açıklanacak.

| Bölüm | İçerik taslağı |
|---|---|
| Başlangıç | Devre Atölyesi'ni açma, ilk blueprint'i oluşturma, giriş ve çıkış ekleyip ilk devreyi çalıştırma |
| Kullanım | Arayüzün ana bölgeleri, dosya/sekme düzeni, benzetim kontrolleri ve kaydetme |
| Bloklar | Desteklenen her bloğun ne yaptığı, portları ve kısa kullanım örneği |
| Yerel Kullanım ve Kurulum | Depoyu indirme, Jekyll bağımlılıkları, yerel önizleme ve değişiklik katkısı |

Bu sayfa başlıkları Türkçe arayüz için geçici karşılıklardır; asıl bölüm kapsamları kullanıcının verdiği taslağı izler.

## Görsel yön ve referanslar

- Genel hedef: estetik, sürükleyici, teknik ama yeni başlayanları ürkütmeyen bir görünüm. Arayüz, oyun motoru editörlerinin tanıdık düzeninden esinlenebilir; doğrudan Unreal arayüzünü kopyalamak şart değil.
- Dokümantasyon için Unity yardımının başlık/konu hiyerarşisi ve gezinme düzeni referans olabilir.
- Hamartia yardım sayfası da referans: üstte ürün/gezinme çubuğu, solda konu ağacı, ortada okunabilir içerik, sağda sayfa içi başlıklar; koyu arka plan ve mavi vurgu kullanımı. Bu yapı Ludus Circuitus'un görsel kimliğine göre uyarlanacak.
- Hamartia adresinde yazım önemli: Necati'nin verdiği `https://necoti.github.io/hamartia/` adresi `o` harfi nedeniyle 404 veriyor. Depo sahibi `Nec0ti` (sıfır); etkin GitHub Pages adresi `https://nec0ti.github.io/hamartia/`. Sayfa Playwright ile 2026-11-22 tarihinde açılarak incelendi.
- Unity referansı: [Unity User Manual](https://docs.unity3d.com/Manual/index.html). Hamartia: [Hamartia yardım sayfası](https://nec0ti.github.io/hamartia/).

## Devre Atölyesi arayüz taslağı

İstenen masaüstü düzeni, birden fazla panelden oluşan klasik editör hissi verir:

1. **Üst menü:** sol üstte Dosya, Görünüm, Yeni BP gibi menüler; sekme/dosya işlemleri.
2. **Benzetim araçlığı:** Oynat, Duraklat, Durdur, tik hızı ve benzetimle ilgili kontroller.
3. **Sol araçlık:** seçilebilir/tuvale yerleştirilebilir küçük blok kümesi.
4. **Orta blueprint tuvali:** birden fazla `.bp` sayfası/sekmesi açılır; bağlantılar burada kurulur.
5. **Sağ panel:** blueprint ile eşzamanlı devre/kapı görünümü; altında gerçek Verilog çıktısı.
6. **Alt panel:** kullanıcı değişkenlerini ekleyip düzenlediği değişkenler alanı.

Blueprint modülleri Unreal Blueprint'in modüler çalışma fikrinden esinlenerek `top.bp`, `adder.bp` gibi ayrı belgeler olacak. Kullanıcı `.v` dosyalarını elle kurmak yerine `.bp` modülleri arasında geçiş yapar; sistem bunların karşılığında gerçek Verilog üretir. Dosya biçiminin iç şeması henüz kararlaştırılmadı.

### Açık teknik ayrımlar

- Devre animasyonundaki "akımın nereden nereye aktığı" mantıksal 0/1 sinyalinin devre boyunca yayılması mı, yoksa elektriksel akım modeli mi? İlk yorum dijital mantık simülasyonuna daha uygundur; fiziksel akım benzetimi ayrı kapsam ve fizik modeli gerektirir.
- Oynat/Duraklat/Durdur/tik hızı, animasyon zamanlamasını mı kontrol edecek yoksa clock/register gibi sıralı mantık da mı çalıştıracak? Mevcut tercih yalnızca bu kontrollerin arayüzde istenmiş olduğudur; sıralı mantık kararı açık.
- Değişken paneli hangi kavramları tutacak: giriş/çıkış, ara kablo, sabitler, parametreler veya durum/register değerleri? Ayrı kavramlar gereksiz blok çeşitliliği yaratmayacak şekilde seçilmeli.
- `.bp` belgesi nasıl kaydedilecek, başka bir modülü nasıl çağıracak ve Verilog modülüne nasıl eşlenecek?
- İlk sürüm için hangi en küçük blok kümesi yeterli olacak?
- Editörün telefon/tablet desteği hedefleniyor mu, yoksa Devre Atölyesi masaüstü öncelikli mi?

## İlk sürüm için önceki taslak

Henüz ekip kararı olarak doğrulanmamış önceki öneri: giriş/çıkış sinyalleri, AND/OR/NOT/XOR, görsel bağlantılar, devre görünümü, canlı Verilog ve doğruluk tablosu/benzetim. Yeni arayüz taslağı çok modüllü `.bp` dosyalarını, değişken panelini ve tik kontrollerini ekledi; bunların ilk sürüme mi yoksa sonraki aşamaya mı gireceği ekipçe netleşecek.

Başlangıçta kombinasyonel mantık kapsamı korunabilir. Tik kontrolleri isteniyor ama clock/register kapsamını tek başına kesinleştirmiyor.

## Test ve benchmark yaklaşımı

Necati'nin kuralı: zorlayıcı test veya benchmark başarısızsa değişikliği Git'e push etme. Benchmarklar yalnızca kod biçimlendirmesini değil, ürünün gerçekten doğru çalışmasını ölçmeli.

İlk taslak ölçümler (henüz benchmark şartnamesi değil):

- Desteklenen küçük devrelerde bütün giriş birleşimlerini değerlendir; simülatör sonucu, doğruluk tablosu ve üretilmiş Verilog simülasyonu eşleşmeli.
- Birden fazla `.bp` modülünün bağlantısı ve üst modülden alt modüle port eşlemesi doğru olmalı.
- Kaydet/yükle döngüsünde bağlantılar, değişkenler ve modül ilişkileri kaybolmamalı; geçersiz dosya anlaşılır hata vermeli.
- Devre Atölyesi'nde blok ekleme/bağlama/silme ve canlı sağ panel üretimi tutarlı kalmalı.
- Büyük veya hatalı blueprint'lerde süre, bellek ve doğrulama hataları ölçülmeli; eşikler ve benchmark veri kümesi ayrıca yazılmalı.

Sürekli tümleşim (CI) ve push engeli bu taslaklar kararlaştırıldıktan sonra kurulacak. Eşikler belirlenmeden performans sonucu iddia edilmez.

## Kararlar

- Site üç bölümden oluşacak: tanıtım, dokümantasyon ve Devre Atölyesi.
- Yayın platformu GitHub Pages; site üretimi Jekyll.
- Kullanıcıya dönük metinler ve dokümantasyon Türkçe.
- Devre Atölyesi çok modüllü `.bp` blueprint dosyalarını ve bunlardan üretilen gerçek Verilog'u gösterecek.
- Arayüzde sol blok araçlığı, üst menü/benzetim kontrolleri, orta çok sayfalı blueprint tuvali, sağ canlı devre ve Verilog paneli, alt değişkenler paneli fikri var.
- Blok sayısı en aza yakın ve öğrenmesi kolay tutulacak.
- Geliştirme sırasında alt ajanlar, zorlayıcı benchmark/test kapıları, sık commit ve büyük değişikliklerde çekme isteği (PR) kullanılacak. Başarısız kapıyla push veya birleştirme yapılmayacak.

## Açık ürün ve araştırma soruları

- İlk öğrenen grubu ve ölçülecek temel öğrenme kazanımı ne?
- Öğrenme eğrisi hedefi nasıl ölçülecek; tanıtım sayfasında ne kadar iddialı yazılabilir?
- İlk blok kümesi ve her bloğun davranış/port sözleşmesi ne?
- `.bp` veri modeli ve modül bağlantı kuralları ne olacak?
- Değişkenler, sinyaller, parametreler ve sıralı durum birbirinden nasıl ayrılacak?
- Tik, durdurma, reset ve zaman adımı ne anlama gelecek?
- Devre paneli mantık sinyali animasyonu mu gösterecek; fiziksel akım kesinlikle kapsam dışında mı?
- Zorlayıcı benchmarkların veri kümesi, süre/performans eşikleri ve sürekli tümleşim kapıları ne?
- Masaüstü önceliği ve dar ekran davranışı nasıl olacak?
- TÜBİTAK gereklilikleri, ekip kararı ve katılımcı çalışması izinleri neler?

## Kaynak ve dayanak

- Ürün kapsamı, `.bp` fikri, ekran düzeni, Türkçe gereksinimi ve geliştirme akışı Necati'nin 2026-11-22 tarihli bu oturumdaki proje dump'ından alınmıştır.
- Görsel/dokümantasyon örnekleri: [Hamartia yardım sayfası](https://nec0ti.github.io/hamartia/) (Playwright ile 2026-11-22 tarihinde incelendi) ve [Unity User Manual](https://docs.unity3d.com/Manual/index.html).
- Önceki proje taslağı: İkinci Beyin içindeki `notes/tubitak-fpga-egitim-araci.md` kaydı. Oradaki kapı/doğruluk tablosu önerileri bu depoda henüz uygulama kararı değildir.
- Güncel TÜBİTAK kuralları ve okul/veli izinleri bu çalışma sırasında yeniden doğrulanmadı; bunlara dair son tarih veya kesin hüküm iddiasında bulunma.
