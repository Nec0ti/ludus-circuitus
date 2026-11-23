export const outcomeLabels = {
  paralel: "Paralel mantık yolları",
  verilog: "Blok ile Verilog eşlemesi",
  sirali: "Clock ve yazmaç"
};

export const quizForms = {
  A: [
    { id: "p1", outcome: "paralel", prompt: "A=1 ve B=0. A ve B ayrı ayrı AND ve XOR kapılarına bağlı. AND ile XOR çıkışları nedir?", options: ["AND=1, XOR=0", "AND=0, XOR=1", "İkisi de 1", "İkisi de 0"], answer: 1, explanation: "AND iki giriş de 1 olduğunda 1 verir. XOR girişler farklı olduğunda 1 verir. İki kapı bağımsızdır; aynı girişleri birlikte değerlendirir." },
    { id: "p2", outcome: "paralel", prompt: "A=1 ve B=1. AND ve XOR yolları aynı devrede çalışıyor. Çıkışlar nedir?", options: ["İkisi de 1", "AND=0, XOR=1", "AND=1, XOR=0", "İkisi de 0"], answer: 2, explanation: "AND iki 1 için 1, XOR eşit girişler için 0 üretir. Bir kapının sonucu ötekinin başlamasını beklemez." },
    { id: "p3", outcome: "paralel", prompt: "A=0, B=1. Devrede AND ve OR yolları var. Çıkışlar nedir?", options: ["AND=1, OR=0", "AND=0, OR=1", "İkisi de 1", "İkisi de 0"], answer: 1, explanation: "AND girişlerin ikisi de 1 değilse 0 verir. OR girişlerden en az biri 1 olduğunda 1 verir." },
    { id: "p4", outcome: "paralel", prompt: "A=0. A sinyali iki bağımsız NOT kapısına dallanıyor. Kapıların çıkışı ne olur?", options: ["İkisi de 0", "Önce biri, sonra diğeri değişir", "İkisi de 1", "Bilinemez"], answer: 2, explanation: "Her iki NOT kapısı da kendi girişindeki 0'ı 1'e çevirir. Bağımsız yollar aynı devrede birlikte değerlendirilebilir." },
    { id: "v1", outcome: "verilog", prompt: "`assign toplam = a ^ b;` satırındaki `^` hangi işlemi gösterir?", options: ["AND", "OR", "XOR", "NOT"], answer: 2, explanation: "Verilog'da `^` XOR işlemidir. Blok görünümünde XOR kapısı olarak gösterilir." },
    { id: "v2", outcome: "verilog", prompt: "Bir XOR bloğunun çıkışı `toplam` adlı çıkışa bağlı. Hangi satır bu ilişkiyi anlatır?", options: ["input wire toplam;", "assign toplam = ara_sinyal;", "always @(posedge clk) toplam <= ara_sinyal;", "module toplam;"], answer: 1, explanation: "`assign` kombinasyonel bir bağlantıyı anlatır. `ara_sinyal`, XOR bloğunun ürettiği değeri temsil eder." },
    { id: "s1", outcome: "sirali", prompt: "Bir yazmaçta D=1, Q=0. Yükselen clock kenarı geldiğinde, reset etkin değilse Q ne olur?", options: ["0 olarak kalır", "X olur", "1", "D girişini siler"], answer: 2, explanation: "Yazmaç D girişindeki değeri yükselen clock kenarında saklar; Q bundan sonra 1 olur." },
    { id: "s2", outcome: "sirali", prompt: "Clock kenarı gelmeden D girişini 0'dan 1'e değiştirdin. Yazmaç Q=0 ve reset etkin değil. Q hemen değişir mi?", options: ["Evet, hemen 1 olur", "Hayır, yükselen clock kenarına kadar 0 kalır", "1 ve 0 arasında gidip gelir", "Yazmaç silinir"], answer: 1, explanation: "Yazmaç D'yi sürekli takip etmez. Yeni değeri bir sonraki yükselen clock kenarında saklar." }
  ],
  B: [
    { id: "p1", outcome: "paralel", prompt: "A=0 ve B=1. A ve B ayrı ayrı AND ve XOR kapılarına bağlı. AND ile XOR çıkışları nedir?", options: ["AND=1, XOR=0", "AND=0, XOR=1", "İkisi de 1", "İkisi de 0"], answer: 1, explanation: "AND iki giriş de 1 olduğunda 1 verir. XOR girişler farklı olduğunda 1 verir. İki kapı bağımsızdır; aynı girişleri birlikte değerlendirir." },
    { id: "p2", outcome: "paralel", prompt: "A=1 ve B=0. AND ve XOR yolları aynı devrede çalışıyor. Çıkışlar nedir?", options: ["İkisi de 1", "AND=1, XOR=0", "AND=0, XOR=1", "İkisi de 0"], answer: 2, explanation: "AND girişlerin ikisi de 1 değilse 0 verir. XOR farklı girişler için 1 üretir. Bir kapının sonucu ötekinin başlamasını beklemez." },
    { id: "p3", outcome: "paralel", prompt: "A=1, B=0. Devrede AND ve OR yolları var. Çıkışlar nedir?", options: ["AND=1, OR=0", "AND=0, OR=1", "İkisi de 1", "İkisi de 0"], answer: 1, explanation: "AND girişlerin ikisi de 1 değilse 0 verir. OR girişlerden en az biri 1 olduğunda 1 verir." },
    { id: "p4", outcome: "paralel", prompt: "A=1. A sinyali iki bağımsız NOT kapısına dallanıyor. Kapıların çıkışı ne olur?", options: ["İkisi de 1", "Önce biri, sonra diğeri değişir", "İkisi de 0", "Bilinemez"], answer: 2, explanation: "Her iki NOT kapısı da kendi girişindeki 1'i 0'a çevirir. Bağımsız yollar aynı devrede birlikte değerlendirilebilir." },
    { id: "v1", outcome: "verilog", prompt: "`assign sonuc = a & b;` satırındaki `&` hangi işlemi gösterir?", options: ["OR", "NOT", "AND", "XOR"], answer: 2, explanation: "Verilog'da `&` AND işlemidir. Blok görünümünde AND kapısı olarak gösterilir." },
    { id: "v2", outcome: "verilog", prompt: "Bir AND bloğunun çıkışı `tasima` adlı çıkışa bağlı. Hangi satır bu ilişkiyi anlatır?", options: ["output wire ara_sinyal;", "assign tasima = ara_sinyal;", "always @(posedge clk) tasima <= ara_sinyal;", "module ara_sinyal;"], answer: 1, explanation: "`assign` kombinasyonel bir bağlantıyı anlatır. `ara_sinyal`, AND bloğunun ürettiği değeri temsil eder." },
    { id: "s1", outcome: "sirali", prompt: "Bir yazmaçta D=0, Q=1. Yükselen clock kenarı geldiğinde, reset etkin değilse Q ne olur?", options: ["1 olarak kalır", "X olur", "0", "D girişini siler"], answer: 2, explanation: "Yazmaç D girişindeki değeri yükselen clock kenarında saklar; Q bundan sonra 0 olur." },
    { id: "s2", outcome: "sirali", prompt: "Clock kenarı gelmeden D girişini 1'den 0'a değiştirdin. Yazmaç Q=1 ve reset etkin değil. Q hemen değişir mi?", options: ["Evet, hemen 0 olur", "Hayır, yükselen clock kenarına kadar 1 kalır", "1 ve 0 arasında gidip gelir", "Yazmaç silinir"], answer: 1, explanation: "Yazmaç D'yi sürekli takip etmez. Yeni değeri bir sonraki yükselen clock kenarında saklar." }
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
