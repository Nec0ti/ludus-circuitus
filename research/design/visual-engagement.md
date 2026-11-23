# Görsel dil ve sağlıklı öğrenme etkileşimi

**Durum:** Kaynaklara dayalı tasarım önerisi; uygulama kararı henüz verilmedi.
**Hazırlanma tarihi:** 2026-11-23
**Kapsam:** Koyu ama yumuşak palet, okunabilirlik, öğrenme etkileşimi ve çocukların dijital iyi oluşu.

## Kısa sonuç

“Öğrenmeyi artıran renk” diye evrensel ve güçlü biçimde kanıtlanmış bir palet yok. Renk psikolojisi araştırmaları algılanan rengin duygu, biliş ve davranışla ilişkilenebileceğini inceliyor; ancak bulguların sınır koşulları ve gerçek ürüne genellenmesi hâlâ belirsiz. Kırmızı ve bilişsel başarı üzerine meta-analiz de sağlam ve genellenebilir bir renk etkisini desteklemiyor. Palet bu nedenle psikolojik etki vaadiyle değil; metin okunabilirliği, işlev ayrımı ve Ludus'un sakin teknik karakteri için öneriliyor.

| Token | Önerilen renk | Kullanım |
|---|---|---|
| `page` | `#1B232B` | Sayfa zemini; siyaha yakın olmayan mavi-gri |
| `surface` | `#232E37` | Kartlar ve ana paneller |
| `raised` | `#2D3B44` | Üst yüzeyler, açılır menüler ve seçili olmayan bloklar |
| `border-strong` | `#75858D` | Kontrol/şekil sınırı gerektiğinde |
| `text` | `#F1F3EE` | Ana yazı; saf beyaz yerine yumuşak fildişi |
| `text-muted` | `#B5C0C0` | İkincil metin; küçük puntoda da yeterli karşıtlık |
| `signal-high` | `#72D6B5` | 1/yüksek sinyal ve birincil eylem vurgusu |
| `attention` | `#F1B866` | Clock kenarı, odak ve dikkat işareti |
| `error` | `#E8897B` | Hata ve tehlikeli işlem durumu |
| `on-primary` | `#172126` | `signal-high` dolu düğmelerinin yazısı |

Koyu arka plan kullanımı için “gözü yormaz” veya “daha iyi öğretir” iddiası kurulmayacak; bu seçim ürünün istenen görsel kimliğidir. Küçük yazıların hâlâ rahat okunup okunmadığı gerçek ekranlarda görsel incelemeyle doğrulanmalı.

## Karşıtlık hesabı

WCAG 2.2 AA normal metin için en az 4.5:1, büyük metin için en az 3:1 karşıtlık ister. İşlevi anlamak için gerekli kontrol sınırı, ikon ve grafik öğeleri komşu renklerine karşı en az 3:1 olmalı. Aşağıdaki değerler WCAG göreli parlaklık formülünden hesaplanmıştır; eşik kararı yuvarlanmamış değer üzerinden verilir.

| Önemli eşleşme | Karşıtlık | Sonuç |
|---|---:|---|
| `text` / `page` | 14.22:1 | Normal metin eşiğini geçer |
| `text` / `surface` | 12.39:1 | Normal metin eşiğini geçer |
| `text-muted` / `surface` | 7.42:1 | Normal metin eşiğini geçer |
| `signal-high` / `surface` | 7.91:1 | Metin veya önemli sinyal çizgisi için geçer |
| `attention` / `surface` | 7.77:1 | Metin veya önemli sinyal çizgisi için geçer |
| `error` / `surface` | 5.47:1 | Normal metin eşiğini geçer |
| `on-primary` / `signal-high` | 9.36:1 | Dolu birincil düğme metni için geçer |
| `border-strong` / `surface` | 3.62:1 | Kontrol sınırı için geçer |

Paletin son sürümü uygulanınca otomatik karşıtlık testi ve ana sayfa, dokümanlar, quiz ve Devre Atölyesi için tarayıcı ekran görüntüsü incelemesi gerekir. Durum anlamı yalnızca renkle verilmemeli: 0/1/X ayrıca sayı veya harfle, gerektiğinde çizgi biçimiyle gösterilmeli. Renk görme farklılıkları ve gri ton görünümü bu yüzden ayrı kontrol edilmeli.

## Renk psikolojisi kanıtı ve sınırı

- Elliot ve Maier'in renk psikolojisi değerlendirmesi, rengin bazı bağlamlarda anlam ve psikolojik işlev taşıyabileceğini bildiriyor; aynı çalışma alanın henüz gelişmekte olduğunu, sınır koşulları ve gerçek yaşam genellenebilirliği için daha çok araştırma gerektiğini söylüyor.
- Gnambs'ın kırmızı renk meta-analizi; başarı koşullarında kırmızının bilişsel performansı güçlü ve tutarlı biçimde düşürdüğü varsayımına az destek buluyor. İlk küçük çalışmaların etkileri daha büyük; yayın yanlılığı düzeltmesinden sonra akıl yürütme için de güvenilir bir etki kalmıyor.
- Dolayısıyla turkuazı “öğretici”, sarıyı “dikkat artırıcı”, kırmızıyı “öğrenmeye zararlı” diye sunmuyoruz. Yukarıdaki renk rolleri okunabilirlik, görsel düzen ve sinyal durumlarının kodlanması için bir tasarım önerisidir; başarı oranı vaadi değildir.

## Sağlıklı öğrenme etkileşimi

Öğrenme aracı merak uyandırsın; oturum süresini kendi başına başarı saymasın. Bu önerileri dayandırdığımız araştırmalar doğrudan Ludus için test edilmiş kurallar değil, ürün tasarımı için dikkatli uyarlamalardır.

1. **Özerklik:** Kullanıcı istediği devre örneğini seçebilsin, adım atlayabilsin, duraklatabilsin ve kolayca çıkabilsin. Quiz isteğe bağlı olsun.
2. **Yetkinlik hissi:** “Yanlış” etiketiyle bırakmak yerine hangi giriş/port/clock adımının sonucu değiştirdiğini göster. Doğru yanıtı ve kısa gerekçesini ver; cezalandırıcı mesaj kullanma.
3. **Kısa, tamamlanabilir işler:** Her alıştırmanın açık bir sorusu ve doğal bitişi olsun; tamamlanınca sonuç ve yeniden çözme seçeneği sun. Daha fazlası için sürekli kaydırma ya da sınırsız görev akışı kurma.
4. **Dikkat ekonomisini değil öğrenmeyi destekle:** Günlük seri/streak kaybı, geri sayım baskısı, değişken ödül, zorunlu bildirim, leaderboard ve devamlı “bir tane daha” çağrısı kullanma. Ölçülen oturum süresini öğrenme başarısının vekili sayma.
5. **Sağlıklı durma:** Görevi açıkça tamamla; “istersen burada durabilirsin” gibi sakin bir çıkış ver. Uzun oturum raporlarını teşvik etme. Gönüllü, yerel bir mola hatırlatıcısı ileride düşünülürse varsayılan olarak kapalı ve kolayca kapatılabilir olmalı.
6. **Çocukları tasarıma dahil et:** Güvenli okul içi kullanıcı incelemesi mümkün ve izinli olduğunda, öğrencilere metin, görsel anlaşılabilirlik ve çıkış seçeneklerini sor. UNICEF Innocenti raporu farklı ülkelerden 200'den fazla çocukla görüşmeye dayanıyor; rapor katılımcı görüşlerinin bütün çocuklara genellenemeyeceğini ayrıca belirtiyor.

### Kanıtın gücü

- 2019 tarihli gamification meta-analizinde ortalama bilişsel etki küçük ve yüksek metodolojik titizlik alt grubunda daha kararlıydı. Motivasyon ve davranış sonuçları aynı titizlik analizinde kararlı değildi; çalışmalar arasında belirgin değişkenlik vardı. Bu, küçük görev ve açıklayıcı geri bildirimi denemek için makul bir gerekçe verir; bağımlılık yapmaya veya uzun süre uygulamada tutmaya dayanak oluşturmaz.
- Wang ve arkadaşlarının 2024 meta-analizi 36 eğitim müdahalesi ve 11.792 katılımcıyı kapsıyor. Bulgular özerklik ve yetkinlik ihtiyaçlarını desteklemeyi; içsel motivasyon için kısmi etkiyi destekledi, ilişkilenme sonucu genel analizde anlamlı değildi. Bu çerçeveyi Ludus'a uyarlamak araştırma hipotezidir; uygulamanın etkili olduğunu kanıtlamaz.
- UNICEF Innocenti'nin 2026 raporu çocukların tasarım süreçlerine anlamlı katılımını, yaşa uygun anlaşılır iletişimi, iyi oluşu ve özerkliği vurguluyor. Katılımcı çocuklar zaman kontrolünü destekleyen esnek ve cezalandırıcı olmayan özellikleri tercih etti; raporun kendi örneklem sınırları saklı tutulmalı.

## Ürün için önerilen sınırlar

- Bir kullanıcı oturumu bir devre sorusu veya quiz setiyle sınırlı, sonu görünür bir deneyim olsun.
- Quiz sonucu sayfada anlık gösterilsin; kullanıcı açıkça istemedikçe yerel depoya, sunucuya veya analitiğe yazılmasın. İnsan katılımcı araştırması ancak danışman, okul/MEB izni, aydınlatma ve veri sorumluluğu netleştikten sonra açılabilir.
- Ürün içi başarı; doğru tahmin, bağlantı, açıklamayı anlama gibi öğrenme davranışlarıyla tarif edilsin. Harcanan süre, streak ve tekrar sayısı “öğrendi” sonucunun yerine geçmesin.
- Bu tasarım notu çocuklarla gerçek kullanılabilirlik değerlendirmesi veya öğrenme deneyi yerine geçmez.

## Kaynaklar

| Etiket | Kaynak ve kullanım |
|---|---|
| **REVIEW / PEER-REVIEWED** | Elliot & Maier (2014), [Color Psychology: Effects of Perceiving Color on Psychological Functioning in Humans](https://doi.org/10.1146/annurev-psych-010213-115035), Annual Review of Psychology 65:95–120. Renk ve psikolojik işlev üzerine değerlendirme; literatürün erken aşamada oluşu ve genellenebilirlik sınırı. |
| **META-ANALYSIS / PEER-REVIEWED** | Gnambs (2020), [Limited evidence for the effect of red color on cognitive performance](https://doi.org/10.3758/s13423-020-01772-1), Psychonomic Bulletin & Review 27:1374–1395. Renk iddialarının küçülmesi ve yayın yanlılığı kontrolü. |
| **META-ANALYSIS / PEER-REVIEWED** | Sailer & Homner (2019/2020), [The Gamification of Learning: a Meta-analysis](https://doi.org/10.1007/s10648-019-09498-w), Educational Psychology Review 32:77–112. Bilişsel, motivasyonel ve davranışsal sonuçların ortalama etkileri ve metodolojik titizlik sınırı. |
| **SYSTEMATIC REVIEW + META-ANALYSIS / PEER-REVIEWED** | Wang vd. (2024), [A systematic review and meta-analysis of self-determination-theory-based interventions in the education context](https://doi.org/10.1016/j.lmot.2024.102015), Learning and Motivation 87, 102015. Özerklik, yetkinlik ve eğitim motivasyonu. |
| **CHILD-CENTRED POLICY RESEARCH / PRIMARY REPORT** | UNICEF Innocenti (2026), [Children’s Best Interests in Digital Policy and Practice](https://www.unicef.org/innocenti/reports/childrens-best-interests-digital-policy-and-practice). Çocuk katılımcıların görüşleri ve yüksek düzeyli dijital ürün önerileri; çalışma görüşülen çocukların ötesine genellenmemeli. |
| **ACCESSIBILITY STANDARD / PRIMARY** | W3C, [WCAG 2.2 Success Criterion 1.4.3 — Contrast (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum) ve [1.4.11 — Non-text Contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast). Metin ve işlevsel kontrol/grafik karşıtlığı eşikleri. |

**Araştırma erişim tarihi:** 2026-11-23. Renk karşıtlık hesabı proje içi olarak yukarıdaki hex değerleri için WCAG göreli parlaklık formülüyle yapıldı.
