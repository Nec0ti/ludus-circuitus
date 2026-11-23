# Projeye hâkimiyet prova kartı

**Amaç:** İki ekip üyesinin de projeyi kendi sözcükleriyle anlatıp gösterebildiğini sınamak. Jüri konuşma metni veya hazır cevap değildir; cevapları öğrenciler kendileri yazmalı ve gerçekten anlayamadıkları yeri çalışma konusu yapmalıdır.

**Ölçüt bağlamı:** Yarışma sayfasında şu an bağlı bölge/final formunda sunum ve projeye hâkimiyet %40 olarak listeleniyor. PDF adı 2025 olduğu için bu ağırlığı 2027 için kesin kabul etmeden başvuru öncesinde resmî sayfadan tekrar doğrula. Ayrıntı: [`evaluation-alignment-2027.md`](evaluation-alignment-2027.md).

## Kısa canlı gösterim

Bu sırayı ezberlenmiş sunum gibi değil, her adımın neyi gösterdiğini açıklayarak uygulayın:

1. Devre Atölyesi'nde basit iki girişli bir devre açın veya kurun. A ve B değerlerini değiştirip iki çıkışı ayrı ayrı takip edin.
2. Aynı grafikteki iki kombinasyonel yolun girişleri paylaştığını; bir yolun diğer yolun metinde önce yazılmasını beklemediğini açıklayın. Veri bağımlılığı boyunca sinyalin yol üzerinde ilerlediğini de belirtin.
3. Sağdaki Verilog çıktısında portları ve ilgili `assign` ifadelerini bulun. Blok, canlı davranış ve üretilen kodun aynı blueprint'i anlattığını gösterin.
4. Sıralı bir örnekte D ve Q'yu izleyin. Tek tikin yükselen clock kenarında yazmacı güncellediğini; Play/Pause'un yalnızca sinyal animasyonunu yönettiğini, giriş veya yazmaç değiştirmediğini ayırt edin.
5. Bir testin sonucunu gösterin ve tam olarak neyi doğruladığını söyleyin. Ardından neyi doğrulamadığını da söyleyin.

## Kod haritası

- `assets/js/playground.mjs`: atölye etkileşimleri, çizim ve kullanıcı eylemlerinin uygulama motoruna bağlanması.
- `assets/js/engine.mjs`: tek blueprint'i doğrulama/değerlendirme, clock tiki/reset ve Verilog üretimi.
- `assets/js/project.mjs`: birden fazla `.bp` belgesini doğrulama, modülleri düzleştirme, değerlendirme ve proje Verilog'u.
- `tests/engine.test.mjs`, `tests/project.test.mjs`, `tests/*verilog-oracle.mjs`, `tests/e2e/`: mantık, Verilog eşdeğerliği, modüller ve gerçek arayüz akışları.
- `research/quality/benchmark-gates.md`: test corpus'u, sınırlar ve her kapının iddia sınırı.

Her öğrenci, bir kullanıcı eyleminin hangi dosya/fonksiyondan geçip hangi davranışı değiştirdiğini koddan işaretleyerek kendi başına açıklayabilmeli. Kod adı ezberlemek yerine akışı göstermek esastır.

## Birbirinize sorun

Her soruya önce notsuz cevap verin; sonra kod, test veya kaynakla kontrol edin:

1. Hangi öğrenme sorununu hedefliyoruz; ana kazanım nedir?
2. Aynı iki girişten beslenen iki kombinasyonel yol hangi anlamda bağımsız/paraleldir? Hangi veri bağımlılığı sıralı yayılma doğurur?
3. `assign` ile yazmaç/clock davranışının farkı nedir?
4. `X` neyi gösterir; neden her bilinmeyen değeri 0 varsaymıyoruz?
5. Play, Tek tik ve Reset tam olarak hangi state'i değiştirir?
6. Icarus oracle'ı ile kaç bit genişliği ve hangi blok davranışları karşılaştırılır? Bu sonuç gerçek FPGA donanımını veya öğrenme artışını kanıtlar mı?
7. Uygulama verisi nerede tutulur; hangi davranış sunucuya veri gönderir? Yayın sağlayıcısının erişim logları hakkında neyi henüz bilmiyoruz?
8. CircuitVerse ve VPLAS hangi komşu işleri zaten yapıyor? Ludus'un katkısı için elimizde hangi kanıt var, ne henüz yalnızca hipotez?
9. Öğrencilerle araştırma ne zaman yapılabilir; hangi okul/MEB/veli izinleri ve veri koruma belgeleri önce gerekir?
10. Her ekip üyesi projede gerçekte hangi karar/kod/test/dokümanı yaptı, hangisini başkasından veya araçtan aldı ve hangi bölümü hâlâ öğreniyor?

## Hazır olma eşiği

- Her iki öğrenci de diğerinin anlattığı bir teknik kavramı ve bir testin sınırını kendi cümleleriyle açıklayabilir.
- Basit bir devreyi birlikte canlı kurup girişten çıkışa kadar mantık, blueprint ve Verilog'u eşleyebilir.
- Bir değer bilinmiyorsa bunu varsayım diye etiketler; güncel olmayan kriter formu, rakip özellikleri veya öğrenme etkisi hakkında kesinlik uydurmaz.
- Katkı ve araç kullanımını doğru anlatır; ekibin yapmadığı işi kendi yapmış gibi sunmaz.
- Herhangi bir madde açıklanamıyorsa başvuru anlatısında iddia etmek yerine önce çalışır ve bunu sonraki provada tekrar sınar.

Bu kart ürünün teknik doğruluğunu ya da yarışma başarısını tek başına kanıtlamaz. Projeye hâkimiyet, öğrencilerin gerçek anlayışını ve sunumdaki açıklamasını gerektirir.
