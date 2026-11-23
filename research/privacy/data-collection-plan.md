# Katılımcı verisi, KVKK ve MEB izin planı

**Durum:** Kaynaklı planlama notu; yayıma/uygulamaya hazır KVKK aydınlatma metni, açık rıza formu veya hukuk görüşü değildir. Kaynaklar 2026-11-23 tarihinde kontrol edildi. Veri sorumlusu, örneklem ve araştırma yöntemi henüz belirlenmedi.

## İlk karar: isim-soyisim quiz/API verisine konmamalı

Necati ilk akış için isim-soyisim, yaş, eğitim düzeyi/sınıf, 100 üzerinden puan ve Playground süresi önermiştir. Resmî TTKB kılavuzu bu alanlardan kritik birini doğrudan yanıtlıyor: **katılımcı adı/soyadı imzalı katılım/veli onam formlarında istenir; veri toplama araçlarında (ölçek, anket vb.) ad-soyad gibi kişisel bilgiler istenmemelidir.** TÜBİTAK başvurusu ve MEB izin aracı bu gereğe göre düzenlenmeli. Bu yüzden isim ve soyisim quiz formunda veya POST JSON'unda olmamalı. İmzalı veli/katılım evrakı ile puan/süre kayıtları ayrı tutulmalı; aralarında adla eşleme dosyası oluşturulmamalı. Kaynak: [TTKB başvuru kılavuzu, §6](https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_07/19211911_arastirmauygulamaizinleribasvuruvedegerlendirmekilavuzu.pdf).

**Örneklem güncellendi:** Adil Karaağaç MTAL hem ekip hem planlanan katılımcı okulu; katılımcılar lise öğrencileri olacak. Bu çalışma ortaokul öğrencilerindeki etkiyi kanıtlamaz. Tam yaşın hangi analiz sorusuna yanıt vereceği belli değil; tek okul ve sınırlı örneklemde ön-test başlangıç düzeyi için daha doğrudan bir ölçüdür. Şimdilik yaş toplamama önerisi. Birden çok sınıf düzeyi katılırsa yaş/sınıf değişkenini ancak araştırma sorusuyla gerekçelendirip danışman ve MEB'e sunulan araçta onaylatın.

### Araştırma sorusuna göre veri minimizasyonu

| Önerilen alan | Araştırma değeri | İlk öneri |
|---|---|---|
| Ad-soyad | Puanı eşleştirmeye bilimsel olarak gerek yok; consent/veli formu için gerekir | Quiz/API'de **toplama**. İmzalı MEB evrakında ayrı tut ve erişimi sınırlı danışman/yetkili yetişkin yönetsin. |
| Tam yaş | Aynı okuldan lise örnekleminde sınıf/pre-test bilgisine ek az değer; küçük kohortta yeniden tanımayı kolaylaştırabilir | Şu aşamada toplamama önerisi. Önceden planlanmış ve MEB'e onaylatılmış yaş alt-grup sorusu doğarsa en kaba yaş bandını değerlendir. |
| Eğitim düzeyi/sınıf | Başlangıç seviyesi ve yaş grubu farkı için yararlı olabilir | Gerekli en kaba kategori (örn. sınıf düzeyi veya sınıf bandı); aynı kişiyi tanımlayabilecek okul/sınıf/yaş birleşimlerini API'ye yazma. |
| Okul/şube/sınıf adı | İzin/örneklem tanımı için yararlı; bireysel quiz sonucu için çoğunlukla gereksiz | Örneklem yeri MEB başvurusunda ve yöntem raporunda tarif edilir. Satır bazlı quiz kaydına okul/şube adı koyma. Uygulama deneyi/araç uygulamasıyla anket-ölçek türü başvuru ayrımını danışman/Konya İl MEM ile teyit et. |
| Ön/son quiz puanı veya yanıtları | Birincil öğrenme sonucunu hesaplamak için gerekli | Her oturum için rastgele çalışma kodu ve test formu/sürümü. Puanlama için yanıtlar gerekiyorsa yalnız onaylanan maddeleri gönder; yanıt içeriği kişisel tanımlayıcı istemesin. 100'lük toplam puan tek başına yöntem/yanlış analizi için zayıftır. |
| Playground süresi | Kullanılabilirlik/etkinlik süresi için ikincil sonuç | Yalnız etkinlik boyunca tek toplam aktif süre. Tıklama geçmişi, tuş kaydı, serbest gezinme veya ayrıntılı olay izi yok. Süreyi öğrenme kanıtı yerine koyma. |
| IP, cihaz bilgisi, user-agent, serbest metin | Birincil öğrenme sorusu için gerekli görünmüyor | İçerik ve proxy/access loglarında PII'yi kapat/minimize et; saldırı önleme için geçici log gerekirse saklama süresi/erişimi önceden belirle. IP de kişisel veriyle ilişkilendirilebilir. |

Tam sınıf + okul + yaş veya nadir performans birleşimleri küçük örneklemde kişiyi dolaylı tanıtabilir. Sadece adı kaldırmak veriyi anonim yapmaz. Ön-son eşleştirme için rastgele çalışma kodu kullanılırsa bağlantı imkânı sürdüğü ölçüde kayıt takma adlı kişisel veridir; anahtar/ek bilgi ayrı ve erişim kontrollü tutulmalıdır. MEB'in onayladığı araç, işleme amacının en az gerektirdiği alanları içermeli.

## MEB öğrenci projesi izin yolu ve Konya başvurusu

MEB'e bağlı okullardaki öğrencilerle eğitim-öğretim bağlamında yapılan araç/etkinlik uygulaması yönerge kapsamındadır. 2204-A için zorunlu eğitime devam eden öğrenciler başvuruyu danışman aracılığıyla yapar. Kılavuzdaki gerekli belgeler: Araştırma/Proje Bilgileri; danışmanın imzaladığı başvuru taahhütnamesi; ayrıntılı bilgilendirme ve gönüllü katılım formu; bütün quiz/ön-son test ve veri toplama araçları; örneklemde öğrenciler varsa veli onam formu; yeniden kullanılan ölçme aracının kaynak/kullanım izni. Bu özel öğrenci başvuru türünde etik kurul onay belgesi istenmediği kılavuzda belirtilir. [TTKB kılavuzu §§2.2.1, 3, 6](https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_07/19211911_arastirmauygulamaizinleribasvuruvedegerlendirmekilavuzu.pdf).

MEB kılavuzu risk, mahremiyet, güvenlik, ayrımcılıktan korunma ve çocukların üstün yararının başvuruda açıklanmasını ister. TTKB'nin güncel SSS'sine göre tek il başvurusu ilgili İl MEM tarafından en fazla 15 günde sonuçlandırılır. 1–6 il başvurularında ilgili İl MEM'ler karar verir; farklı karar oluşursa merkez birimlerine gider. MEB, araştırmacının okul türünü belirttiğini, uygun okul adlarını İl MEM'in seçtiğini söylüyor. Eylem araştırması/deney veya araç uygulamasında okul özel bilgi alanında belirtilebilir; anket/ölçek/görüşmede okul adı belirtilmemelidir. Adil Karaağaç MTAL'in hem ekip hem örneklem okulu olduğu artık net; danışman/Konya İl MEM ile uygulama türü ve okul alanı teyit edilmeli. [TTKB canlı SSS §§ izin süresi/okul seçimi](https://ttkb.meb.gov.tr/www/sss.php?DIL=tr); [MEB başvuru sistemi](https://arastirmaizinleri.meb.gov.tr/).

Önceki yönergede geçen **uygulamadan 90 gün önce başvuru şartı 2025 kılavuzunda kaldırılmış** (TTKB guide §6), ancak belge değerlendirme, okul belirleme ve revizyon için zaman gerekir. İzin gelmeden prototip/quiz katılımcı verisi toplama; başvuruya gidecek quiz ve prosedürü son hâliyle ekle. Öğrenci katılımı gönüllü olmalı ve ayrılma notu katılımcının seviyesine uygun yazılmalı.

## KVKK aydınlatma, rıza ve veri sorumlusu

- KVKK Kurumunun 2026/347 sayılı İlke Kararı (18.02.2026) açık rıza metni ile aydınlatma metninin **ayrı** düzenlenmesini ve aydınlatmanın veri işleme hukuki sebebinden bağımsız yapılmasını istiyor. Aydınlatma metnini “okudum, onaylıyorum” rıza kutusuna dönüştürme. Eğer işleme şartı açık rızaysa açık, belirli ve bilgilendirilmiş rıza metnini ayrıca al; hangi hukuki işleme sebebinin uygulanacağını danışman ve yetkin KVKK danışmanıyla netleştirmeden metin yayınlama. [2026/347 duyurusu](https://www.kvkk.gov.tr/Icerik/8710/veri-sorumlulari-tarafindan-acik-riza-ve-aydinlatma-metinlerinin-ayri-ayri-duzenlenmesi-gerektigi-hakkinda-kisisel-verilerin-korunmasi-kurulunun-18-02-2026-tarihli-ve-2026-347-sayili-ilke-kararina-iliskin-kamuoyu-duyurusuna), [aydınlatma yükümlülüğü](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-).
- Aydınlatmada veri sorumlusunun kimliği/iletişim bilgisi, amaç, işlenen veri kategorileri, toplama yöntemi, hukuki sebep, aktarım alıcıları/amaçları ve ilgili kişi hakları açıkça belirtilmelidir. Bu metnin şu an tamamlanamayış sebebi alanların eksik olmasıdır: sorumlu kişi/kurum, irtibat, hukuki sebep, kesin veri alıcıları (ev sunucusu/tünel/yedek), saklama-imha süresi ve örneklem belli değil.
- KVKK çocuk broşürü veri minimizasyonunu, çocuğun algı düzeyine uygun ayrı ve sade bilgilendirmeyi, çocuk verilerinde daha hassas teknik/idari güvenlik tedbirlerini öneriyor. MEB'in veli onamı zorunluluğu ve gönüllü katılım formu, KVKK işleme hukuki sebebi ve çocuk/veli rıza rolleriyle otomatik olarak aynı şey kabul edilmemeli. Çocuğun kendi gönüllü olma/çekilme durumu da açıklanmalı. [KVKK çocuk verileri broşürü, özellikle ürün geliştiriciler s.14–15](https://www.kvkk.gov.tr/SharedFolderServer/CMSFiles/35b708d7-449d-417d-87cb-d52f46dd570f.pdf).
- Veri sorumlusu “sunucunun sahibi” olarak varsayımla belirlenmez; işleme amaç ve araçlarını belirleyen kişi/kurumdur. Veri sorumlusunu, muhtemelen yetişkin danışman/okul ile birlikte, veri akışı netleşince belirleyin. Sunucu sahibi olmak tek başına veri sorumlusu rolünü çözmez. [KVKK veri güvenliği yükümlülükleri](https://www.kvkk.gov.tr/Icerik/2040/Veri-Guvenligine-Iliskin-Yukumlulukler).
- Kişisel veri güvenliğinde yetkisiz erişim/işlemeyi önleme, erişimi rol bazında sınırlama, güncel yazılım, yedekleme ve saklama/imha planı gerekir. Gereklilik sona erince veriler silinmeli/yok edilmeli ya da geri döndürülemeyecek biçimde anonimleştirilmelidir. [KVKK güvenlik rehberi](https://www.kvkk.gov.tr/Icerik/2040/Veri-Guvenligine-Iliskin-Yukumlulukler), [imha yükümlülüğü](https://www.kvkk.gov.tr/Icerik/2038/kisisel-verilerin-silinmesi-yok-edilmesi-veya-anonim-hale-getirilmesi).
- Yerel Türkiye sunucusu seçmek tüm aktarım değerlendirmelerini bitirmez: CDN, tünel, yedek, loglama/izleme veya sağlayıcılar veriyi Türkiye dışına taşıyorsa güncel KVKK m.9 aktarım şartları ayrıca incelenmelidir. Mümkünse quiz yanıtlarını/süre/puanı GitHub, üçüncü taraf analitik, e-posta veya yabancı tünel hizmetlerine göndermeyin. [Güncel KVKK Kanunu/m.9](https://www.kvkk.gov.tr/Icerik/6649/Personal-Data-Protection-Law).

### Henüz doldurulamayacak belge şablonu alanları

KVKK aydınlatma taslağı yazılmadan önce aşağıdakiler karara bağlanmalı; placeholder'lı metni katılımcıya göstermeyin:

- Veri sorumlusu (gerçek kişi/kurum), irtibat adresi ve başvuru kanalı.
- Tam ve ayrı amaçlar: eğitim araştırması/ön-son test, puan analizi, etkinlik süresi; yayınlanacak sonuç yalnız toplulaştırılmış mı?
- Veri minimizasyonuyla kesin alan listesi ve varsa takma adlı çalışma kodu.
- İşleme şartı ve ilgili kişi/veli/çocuk onamının rolü; danışman/okul/KVKK uzmanı görüşü.
- GitHub Pages erişim kayıtları dahil tüm alıcılar, API barındırma, reverse proxy/tünel, yedek, dış aktarım.
- Saklama süresi ve hangi tarihte ham satır, çalışma kodu ve onam belgelerinin silineceği; bilimsel rapor için tutulan toplu verinin geri tanımlanamazlığı.
- Çocuk ve velinin hak başvurusu, katılımdan çekilme, veri silme talebi ve araştırma sırasında etkisi.
- Ayrı aydınlatma metni; gerekiyorsa ayrı açık rıza; MEB gönüllü katılım formu; veli onamı. Bunlar birbirinin yerine geçmez.

Bu belgedeki içerik KVKK uyum garantisi değildir; bu projeye özgü hukuki form hazırlanmadan önce veri sorumlusu, danışman ve okul yönetimiyle gözden geçirilmeli.

### Kaynaklar

- **PRIMARY / MEB:** [2025 Araştırma Uygulama İzinleri Yönergesi](https://mevzuat.meb.gov.tr/dosyalar/2275.pdf), [TTKB kılavuzu](https://ttkb.meb.gov.tr/meb_iys_dosyalar/2025_07/19211911_arastirmauygulamaizinleribasvuruvedegerlendirmekilavuzu.pdf), [TTKB canlı SSS](https://ttkb.meb.gov.tr/www/sss.php?DIL=tr), [MEB izin portalı](https://arastirmaizinleri.meb.gov.tr/).
- **PRIMARY / KVKK:** [2026/347 ilke kararı](https://www.kvkk.gov.tr/Icerik/8710/veri-sorumlulari-tarafindan-acik-riza-ve-aydinlatma-metinlerinin-ayri-ayri-duzenlenmesi-gerektigi-hakkinda-kisisel-verilerin-korunmasi-kurulunun-18-02-2026-tarihli-ve-2026-347-sayili-ilke-kararina-iliskin-kamuoyu-duyurusuna), [aydınlatma yükümlülüğü](https://www.kvkk.gov.tr/Icerik/2033/Aydinlatma-Yukumlulugu-), [çocuk verileri broşürü](https://www.kvkk.gov.tr/SharedFolderServer/CMSFiles/35b708d7-449d-417d-87cb-d52f46dd570f.pdf), [veri güvenliği](https://www.kvkk.gov.tr/Icerik/2040/Veri-Guvenligine-Iliskin-Yukumlulukler), [güncel KVKK m.9](https://www.kvkk.gov.tr/Icerik/6649/Personal-Data-Protection-Law).
