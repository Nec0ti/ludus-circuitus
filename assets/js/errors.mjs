export const errorCatalog = {
  VL0001: { title: "Bit genişlikleri uyuşmuyor", category: "Bit genişliği ve değerler", slug: "vl0001" },
  VL1001: { title: "Bağlantı geçersiz bir porta ulaşıyor", category: "Bağlantı ve portlar", slug: "vl1001" },
  VL1002: { title: "Giriş portu zaten bağlı", category: "Bağlantı ve portlar", slug: "vl1002" },
  VL1003: { title: "Bir giriş portu boşta", category: "Bağlantı ve portlar", slug: "vl1003" },
  VL1004: { title: "Kombinasyonel devrede döngü var", category: "Bağlantı ve portlar", slug: "vl1004" },
  VL2001: { title: "Bit genişliği 1–32 aralığında olmalı", category: "Bit genişliği ve değerler", slug: "vl2001" },
  VL2002: { title: "Değer bit genişliğiyle uyuşmuyor", category: "Bit genişliği ve değerler", slug: "vl2002" },
  VL3001: { title: "Blueprint biçimi geçersiz", category: "Blueprint ve adlandırma", slug: "vl3001" },
  VL3002: { title: "Blok türü, kimliği veya konumu geçersiz", category: "Blueprint ve adlandırma", slug: "vl3002" },
  VL3003: { title: "Sinyal adı Verilog kurallarına uymuyor", category: "Blueprint ve adlandırma", slug: "vl3003" },
  VL3004: { title: "Blueprint'te çıkış bloğu yok", category: "Blueprint ve adlandırma", slug: "vl3004" },
  VL4001: { title: "Blueprint modülü bulunamadı veya geçersiz", category: "Modül birleştirme", slug: "vl4001" },
  VL4002: { title: "Modül port sınırı aşıldı", category: "Modül birleştirme", slug: "vl4002" },
  VL4003: { title: "Blueprint modülleri döngüsel bağlanmış", category: "Modül birleştirme", slug: "vl4003" },
  VL4004: { title: "Birleştirilmiş blueprint çözümlenemedi", category: "Modül birleştirme", slug: "vl4004" },
  VL5001: { title: "Simülasyon değeri geçersiz", category: "Simülasyon", slug: "vl5001" },
  VL6001: { title: "İçe aktarılan dosya açılamadı", category: "Dosya ve içe aktarma", slug: "vl6001" },
  VL6002: { title: "İçe aktarılan dosya çok büyük", category: "Dosya ve içe aktarma", slug: "vl6002" },
  VL9999: { title: "Beklenmeyen atölye hatası", category: "Uygulama hataları", slug: "vl9999" }
};

export function ludusError(code, message) {
  const error = new Error(message || errorCatalog[code]?.title || errorCatalog.VL9999.title);
  error.name = "LudusError";
  error.code = errorCatalog[code] ? code : "VL9999";
  return error;
}

export function normalizeLudusError(error) {
  if (errorCatalog[error?.code]) return error;
  return ludusError("VL9999", "Atölye beklenmeyen bir hatayla karşılaştı. Sayfayı yenilemeyi deneyebilirsin.");
}
