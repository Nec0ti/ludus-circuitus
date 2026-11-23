export const outcomeLabels = {
  paralel: "Paralel mantık yolları",
  verilog: "Blok ile Verilog eşlemesi",
  sirali: "Clock ve yazmaç"
};

export const quizForms = {
  A: [
    { id: "p1", outcome: "paralel", skill: "iki_yol_deger", prompt: "A=1 ve B=0. Aynı girişler AND ve XOR kapılarına bağlı. İki çıkış nedir?", options: ["AND=1, XOR=0", "AND=0, XOR=1", "İkisi de 1", "İkisi de 0"], answer: 1, explanation: "AND iki giriş 1 olduğunda 1 verir; XOR farklı girişlerde 1 verir. Bu yüzden AND=0, XOR=1 olur." },
    { id: "p2", outcome: "paralel", skill: "assign_yollari", prompt: "Verilog'da `assign tasima = a & b;` ve `assign toplam = a ^ b;` satırları aynı devrede. A=1, B=1 iken hangi seçenek hem çıkış değerlerini hem yolların ilişkisini doğru söyler?", options: ["Taşıma=1, Toplam=0; toplam yolu taşıma yolunu bekler.", "Taşıma=0, Toplam=1; iki yol birlikte değerlendirilir.", "Taşıma=1, Toplam=0; iki bağımsız yol birlikte değerlendirilir.", "İki çıkış da 1; iki ifade aynı yolu anlatır."], answer: 2, explanation: "A=B=1 için AND taşıma=1, XOR toplam=0 verir. İki `assign` ayrı kombinasyonel çıkışları tanımlar; biri ötekinin bitmesini beklemez." },
    { id: "p3", outcome: "paralel", skill: "iki_farkli_kapi", prompt: "A=0, B=1. Aynı iki giriş bir AND ve bir OR kapısına bağlı. Çıkışlar nedir?", options: ["AND=1, OR=0", "İkisi de 1", "İkisi de 0", "AND=0, OR=1"], answer: 3, explanation: "AND için iki girişin de 1 olması gerekir; OR için en az bir 1 yeterlidir. Çıkışlar 0 ve 1 olur." },
    { id: "p4", outcome: "paralel", skill: "coklu_dallanma", prompt: "A=0 sinyali iki ayrı NOT kapısına dallanıyor. Devrenin iki çıkışı nedir?", options: ["İkisi de 1", "Birincisi 0, sonra ikincisi 1", "İkisi de 0", "Bilinemez"], answer: 0, explanation: "Her NOT kapısı aynı 0 girişini 1'e çevirir. Bir dalın çalışması diğer dalı bekletmez." },
    { id: "v1", outcome: "verilog", skill: "operator_esleme", prompt: "`assign toplam = a ^ b;` satırındaki `^` hangi kapıyı anlatır?", options: ["XOR", "AND", "OR", "NOT"], answer: 0, explanation: "Verilog'da `^` XOR işlemidir." },
    { id: "v2", outcome: "verilog", skill: "blok_assign", prompt: "Bir XOR bloğunun çıkışı `toplam` adlı çıkışa bağlı. Hangi satır bu bağlantıyı gösterir?", options: ["input wire toplam;", "assign toplam = ara_sinyal;", "always @(posedge clk) toplam <= ara_sinyal;", "module toplam;"], answer: 1, explanation: "`assign toplam = ara_sinyal;` kombinasyonel sinyal bağlantısını ifade eder." },
    { id: "s1", outcome: "sirali", skill: "clock_kenari", prompt: "Bir yazmaçta D=1 ve Q=0. Yükselen clock kenarı geldiğinde, reset etkin değilse Q ne olur?", options: ["0 olarak kalır", "X olur", "1", "D girişini siler"], answer: 2, explanation: "Yazmaç D girişindeki 1'i yükselen clock kenarında Q'ya saklar." },
    { id: "s2", outcome: "sirali", skill: "kenar_oncesi", prompt: "Clock kenarı gelmeden D girişini 0'dan 1'e değiştirdin. Q=0 ve reset etkin değil. Q hemen değişir mi?", options: ["Evet, hemen 1 olur", "Bilinmeyen X olur", "Q, clock beklemeden D'yi takip eder", "Hayır, yükselen kenara kadar 0 kalır"], answer: 3, explanation: "Yazmaç D'yi sürekli takip etmez; yeni değeri bir sonraki yükselen kenarda saklar." }
  ],
  B: [
    { id: "p1", outcome: "paralel", skill: "iki_yol_deger", prompt: "A=0 ve B=1. Aynı girişler AND ve XOR kapılarına bağlı. İki çıkış nedir?", options: ["AND=0, XOR=1", "AND=1, XOR=0", "İkisi de 1", "İkisi de 0"], answer: 0, explanation: "AND iki giriş 1 olduğunda 1 verir; XOR farklı girişlerde 1 verir. Bu yüzden AND=0, XOR=1 olur." },
    { id: "p2", outcome: "paralel", skill: "assign_yollari", prompt: "Verilog'da `assign tasima = a & b;` ve `assign toplam = a ^ b;` satırları aynı devrede. A=1, B=0 iken hangi seçenek hem çıkış değerlerini hem yolların ilişkisini doğru söyler?", options: ["Taşıma=0, Toplam=1; toplam yolu taşıma yolunu bekler.", "Taşıma=1, Toplam=0; iki yol birlikte değerlendirilir.", "İki çıkış da 0; iki ifade aynı yolu anlatır.", "Taşıma=0, Toplam=1; iki bağımsız yol birlikte değerlendirilir."], answer: 3, explanation: "A=1, B=0 için AND taşıma=0, XOR toplam=1 verir. İki `assign` ayrı kombinasyonel çıkışları tanımlar; biri ötekinin bitmesini beklemez." },
    { id: "p3", outcome: "paralel", skill: "iki_farkli_kapi", prompt: "A=1, B=0. Aynı iki giriş bir AND ve bir OR kapısına bağlı. Çıkışlar nedir?", options: ["AND=1, OR=0", "AND=0, OR=1", "İkisi de 1", "İkisi de 0"], answer: 1, explanation: "AND için iki girişin de 1 olması gerekir; OR için en az bir 1 yeterlidir. Çıkışlar 0 ve 1 olur." },
    { id: "p4", outcome: "paralel", skill: "coklu_dallanma", prompt: "A=1 sinyali iki ayrı NOT kapısına dallanıyor. Devrenin iki çıkışı nedir?", options: ["İkisi de 1", "Birincisi 1, sonra ikincisi 0", "İkisi de 0", "Bilinemez"], answer: 2, explanation: "Her NOT kapısı aynı 1 girişini 0'a çevirir. Bir dalın çalışması diğer dalı bekletmez." },
    { id: "v1", outcome: "verilog", skill: "operator_esleme", prompt: "`assign tasima = a & b;` satırındaki `&` hangi kapıyı anlatır?", options: ["OR", "NOT", "AND", "XOR"], answer: 2, explanation: "Verilog'da `&` AND işlemidir." },
    { id: "v2", outcome: "verilog", skill: "blok_assign", prompt: "Bir AND bloğunun çıkışı `tasima` adlı çıkışa bağlı. Hangi satır bu bağlantıyı gösterir?", options: ["output wire ara_sinyal;", "always @(posedge clk) tasima <= ara_sinyal;", "module ara_sinyal;", "assign tasima = ara_sinyal;"], answer: 3, explanation: "`assign tasima = ara_sinyal;` kombinasyonel sinyal bağlantısını ifade eder." },
    { id: "s1", outcome: "sirali", skill: "clock_kenari", prompt: "Bir yazmaçta D=0 ve Q=1. Yükselen clock kenarı geldiğinde, reset etkin değilse Q ne olur?", options: ["0", "1 olarak kalır", "X olur", "D girişini siler"], answer: 0, explanation: "Yazmaç D girişindeki 0'ı yükselen clock kenarında Q'ya saklar." },
    { id: "s2", outcome: "sirali", skill: "kenar_oncesi", prompt: "Clock kenarı gelmeden D girişini 1'den 0'a değiştirdin. Q=1 ve reset etkin değil. Q hemen değişir mi?", options: ["Evet, hemen 0 olur", "Hayır, yükselen kenara kadar 1 kalır", "Bilinmeyen X olur", "Q, clock beklemeden D'yi takip eder"], answer: 1, explanation: "Yazmaç D'yi sürekli takip etmez; yeni değeri bir sonraki yükselen kenarda saklar." }
  ]
};

export function scoreQuiz(form, answers) {
  const questions = quizForms[form];
  if (!questions) throw new Error("Quiz formu A veya B olmalı.");
  const outcomes = Object.fromEntries(Object.keys(outcomeLabels).map((key) => [key, { correct: 0, total: 0 }]));
  let correct = 0;
  for (const question of questions) {
    outcomes[question.outcome].total++;
    if (answers[question.id] === question.answer) {
      correct++;
      outcomes[question.outcome].correct++;
    }
  }
  return { correct, total: questions.length, percent: Math.round(correct * 100 / questions.length), outcomes };
}
