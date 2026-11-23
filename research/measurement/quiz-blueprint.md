# Mantık Kontrolü: kazanım belirtkesi ve madde taslağı

**Durum:** Ürün içi alıştırmayı düzenlemek için taslak. Danışman tarafından onaylanmış ölçme aracı, geçerliği/güvenirliği kanıtlanmış ölçek veya TÜBİTAK/MEB onaylı protokol değildir. Katılımcı verisi toplamaya izin vermez.

## Amaç ve örneklem sınırı

Uygulamadaki `/quiz/` sayfası Ludus'un temel kavramlarına ait kısa geri bildirimli bir alıştırmadır. Lise öğrencileri örnekleminde sınanması planlanan araştırma sorusu için henüz araştırma aracı sayılmaz. Aracın hedef kitlesi başlangıç seviyesindeki lise öğrencileri; ürün arayüzü ise ortaokul öğrencisinin de izleyebileceği sadelikte olmalıdır. Mevcut soruların konu eşleşmesi ve kod testleri içerik planının teknik olarak korunduğunu gösterir; bu, yaş grubunda anlaşılabilirlik, ölçme geçerliği, madde güçlüğü veya A/B form eşdeğerliği kanıtı değildir.

**Birincil kazanım adayı:** Öğrenci, aynı devredeki iki bağımsız kombinasyonel mantık yolunun davranışını bir Verilog örneği üzerinden okuyup verilen girişlerde her iki çıkış değerini doğru tahmin eder; bir yolun diğerini sırf metinde önce yazıldığı için beklemediğini açıklar.

**İkincil kazanım adayları:** (1) bir mantık kapısını Verilog operatörü ve `assign` ifadesiyle eşleme; (2) yazmacın D değerini yükselen clock kenarında sakladığını ve kenarlar arasında Q'yu tuttuğunu anlama. İkincil iki maddeli puanlar yalnız betimseldir; ayrı beceri teşhisi veya öğrenci sınıflandırması için yeterli değildir.

## Belirtke tablosu

Her formda 8 madde bulunur. A/B satırları şimdilik **tasarım gereği eşlenmiş aday maddelerdir**; istatistiksel olarak eşdeğer oldukları iddia edilmez.

| Madde çifti | Sonuç | Ölçülen işlem | A ve B'deki biçim | Doğru seçenek A/B |
|---|---|---|---|---|
| p1 | Birincil | Aynı girişten AND ve XOR çıkışlarını birlikte hesaplama | A: 1,0; B: 0,1 | B / A |
| p2 | Birincil | İki bağımsız Verilog `assign` yolunun çıkışını tahmin etme ve paralel ilişkiyi açıkça seçme | Her iki formda aynı iki ifade; A: 1,1; B: 1,0 | C / D |
| p3 | Birincil | Aynı girişleri alan AND ve OR yollarını birlikte hesaplama | A: 0,1; B: 1,0 | D / B |
| p4 | Birincil | Tek girişin iki NOT yoluna dallanması; iki çıkışın eşzamanlı değerlendirilmesi | A: A=0; B: A=1 | A / C |
| v1 | İkincil | `^` veya `&` operatörünü XOR/AND kapısıyla eşleme | A: XOR; B: AND | A / C |
| v2 | İkincil | Bir kapı çıkışını Verilog `assign` bağlantısına eşleme | A: XOR/`toplam`; B: AND/`tasima` | B / D |
| s1 | İkincil | Yükselen kenarda D değerini Q'ya alma | A: D=1; B: D=0 | C / A |
| s2 | İkincil | Clock kenarları arasında Q'yu koruma | A: D 0→1; B: D 1→0 | D / B |

Bu eşleme ve cevap anahtarı `assets/js/quiz-data.mjs` içinde soru `skill` alanı ve `answer` indeksleriyle uygulanır. Bir formun cevap anahtarı A–D arasında dengelidir (her konum iki kez doğru); iki formdaki aynı beceri maddeleri farklı cevap konumundadır. Bu, seçenek konumu ipucunu azaltır; madde niteliği veya form eşitliği sağlamaz.

## Puanlama taslağı

- Her madde bir puandır; yanlış/boş cevap sıfırdır. Arayüz bütün maddeler yanıtlanmadan sonucu göstermediğinden mevcut denemede boş yanıt gönderilemez.
- Toplam yüzde: `doğru / 8 × 100`; arayüz bunu `/100` biçiminde gösterir. Bir madde toplamda 12,5 puan etkiler.
- Birincil sonuç: `paralel` kategorisindeki 4 maddenin doğru sayısı (`0–4`), ayrıca betimleme için yüzde olarak gösterilebilir. Bu kısa ölçek yalnız 25 puanlık basamaklarla değişir.
- İkincil sonuçlar: `verilog` ve `sirali` kategorilerinin ayrı ayrı `0–2` doğru sayısı. Her bir madde 50 puanlık alt ölçek değişimine yol açacağından bunlar kararlı öğrenci puanı gibi yorumlanmamalıdır.
- Quiz'de harcanan süre puana katılmaz ve alıştırma prototipinde saklanmaz/gönderilmez. Süre daha sonra izinli çalışmada toplanırsa yalnızca ikincil süreç ölçütü olarak değerlendirilmelidir.
- Geri bildirimli deneme sayfasında doğru cevap ve açıklama sonuç ekranında görünür. Bu sürüm araştırma ön-son uygulaması için doğrudan kullanılamaz: katılımcı önceki cevap anahtarını görmüş olabilir.

## Denetim bulgusu ve yapılan değişiklik

Bağımsız quiz denetiminde ilk sürümde 8 doğru yanıtın yalnız B/C seçeneklerinde olduğu ve dört birincil maddenin çoğunun kapı doğruluk tablosu hesaplaması kaldığı görüldü. Bunun için:

1. Doğru şık konumları her formda dengelendi ve eşlenmiş maddelerde farklılaştırıldı.
2. Birincil havuza iki ayrı `assign` ifadesini beraber okuyup hem çıkış değerlerini hem yolların paralel ilişkisini doğru seçtiren p2 eklendi. Her seçenek hem değerleri hem bekleme ilişkisini söyler; yalnız doğru değer+paralellik birleşimi anahtardır.
3. Her maddeye beceri kimliği eklendi; kod testi A/B form eşleşmesini ve cevap konumu dengesini doğrular.

Bunlar içerik planı/teknik tutarlılık iyileştirmeleridir. Birincil kazanımın davranışsal açıklamasını, distractorların tanılayıcılığını veya araç geçerliğini kanıtlamaz.

## Araştırma öncesi gerekli işler

- Danışman/alan öğretmeni ve başlangıç düzeyindeki birkaç gönüllüyle, izin gerekliliklerine uygun biçimde, yönerge ve her maddenin anlaşılabilirliğini gözden geçir.
- Hangi yanlış anlama ve yanılgıların hedefleneceğini önceden belirt; distractorları bu yanılgılarla eşleştir. Şu an bazı distractorlar makul öğrenci yanılgısı olduğuna dair kanıta dayanmıyor.
- Eşlenmiş A/B maddelerini küçük örneklemde aynı beceri düzeyi ve benzer dil yükü açısından incele. Gerçek güçlük/eşdeğerlik için madde verisi ve uygun uzman yorumu gerekir; aynı konu ve cevap anahtarı eşlemesi yeterli değildir.
- A/B formları ön/son ölçümde kullanılacaksa form sırasını dengele (katılımcıların yarısı A→B, yarısı B→A) ve form puanı/madde doğru oranlarını raporla. Küçük örneklemde sonucu sınırlı pilot olarak yorumla.
- Ön-test/son-test formunda cevap açıklamalarını son-test tamamlanana kadar gösterme; varsa öğretim koşulları arasında quiz geri bildirimini aynı tut.
- Protokol, soru formları, yönerge, cevap anahtarı ve veri alanlarını danışmanla netleştirip MEB başvuru dosyasına ekle. İzin çıkmadan öğrenci üzerinde deneme veya veri toplama yapma.
- Canlı quiz hâlâ anonim/yerel prototiptir. İsim, yaş, sınıf, süre veya yanıtlar sunucuya gönderilmez; çalışma kodu da eklenmiş değildir.

## Kaynaklar ve uygulama sınırı

- **PRIMARY / RESMÎ KILAVUZ:** Spencer, M. (1982), *Testing Instruments, Packet 2*. Alternatif formların aynı alan/yapıyı ölçmesi, maddelerin form içinde neden eşlendiğinin gerekçelendirilmesi ve karşılaştırılabilirliğe dair kanıt gereği. [ERIC tam metin](https://files.eric.ed.gov/fulltext/ED227692.pdf), özellikle “Alternate Form Reliability” bölümü.
- **PRIMARY / KAMU KURUMU EL KİTABI:** IOX Assessment Associates (1988), *Nutrition Education Program Evaluation Handbook*. Ön-test/son-testte alternatif formların eşdeğerliği, form puanlarının ve madde doğru oranlarının incelenmesi, eşdeğerlik kanıtı yoksa A→B ve B→A sırasını dengeleme önerisi. [ERIC tam metin](https://files.eric.ed.gov/fulltext/ED320859.pdf), bölüm 4, “Alternate-forms reliability”. Kaynak beslenme programı değerlendirmesi için yazılmıştır; buradaki prensipler genel ölçme notu olarak kullanılmış, doğrudan Verilog eğitimine aktarılmış araştırma sonucu sayılmamıştır.
- **PRIMARY / TEKNİK RAPOR:** New Meridian (2020), *2018–2019 Alternate Blueprint Technical Report*. Operasyonel sınavlarda blueprint, madde güçlüğü ve bilişsel karmaşıklıkla form karşılaştırmasının raporlanmasına örnek. [ERIC tam metin](https://files.eric.ed.gov/fulltext/ED604242.pdf). Bu ölçekli değerlendirme süreci küçük sınıf pilotu için gerekli eşik diye sunulmamaktadır.

Bu kaynaklar yöntem gereksinimlerini gerekçelendirir; Ludus sorularının geçerli veya güvenilir olduğunu göstermez. Araştırma taslağının tamamı: [`learning-study.md`](learning-study.md).
