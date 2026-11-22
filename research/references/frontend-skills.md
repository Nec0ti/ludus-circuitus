# Frontend becerileri: kurulum ve kullanım notu

**Kurulum tarihi:** 2026-11-23. Bu iki beceri proje kapsamına `npx codex-marketplace` ile yerel olarak kuruldu; kod/arayüz henüz yazılmadı.

| Beceri | Kurulan konum | Kaynak/revizyon | Ne için kullanacağız |
|---|---|---|---|
| `daisyui` | Yerel yol: `.codex/skills/daisyui/SKILL.md` | Kullanıcının verdiği `saadeghi/daisyui/skills/daisyui`; `43bc54e9ea25a0f26d85392c169dae6b9839d6e5` | HTML tabanlı arayüzde uygun bileşen rehberlerini okuyup daisyUI kullanımını doğru kurmak. |
| `frontend-design` | Yerel yol: `.codex/skills/frontend-design/SKILL.md` | Anthropic `anthropics/skills/skills/frontend-design`; `e4bb5d960d87126ff3b3a8af1a104b7db67560ba` | Projeye özgü görsel yön, renk/tipografi/yerleşim planı, erişilebilirlik ve ekran görüntüsü üzerinden eleştiri. |

Tekrar kurulum komutları:

```sh
npx --yes codex-marketplace add saadeghi/daisyui/skills/daisyui --skill --project
npx --yes codex-marketplace add anthropics/skills/skills/frontend-design --skill --project --yes
```

Kurulumda `--project` kullanıldı; CLI bu seçeneği etkileşimsiz kurulum için istedi. Skill dosyaları bu geliştirme ortamında yereldir ve `.gitignore` ile repoya eklenmez; yeniden kurulum komutları yukarıda kayıtlı kaynak/yolların aynı biçimidir. DaisyUI becerisinin kurulum rehberi DaisyUI 5'in Tailwind CSS 4 istediğini, Tailwind v4'te `tailwind.config.js` kullanılmamasını ve Jekyll gibi Node dışı kurulumda standalone veya CDN seçeneklerini belirtiyor. **Henüz DaisyUI CSS, Tailwind veya uygulama bağımlılığı yüklenmedi.** Jekyll yayın hedefi korunurken arayüz planında bundle boyutu/erişim/bağımlılık maliyetini inceleyip uygun entegrasyon seçilecek.

Frontend geliştirmesinden önce `frontend-design` tasarım planı çıkarılmalı; DaisyUI HTML/JSX sınıfları seçilirse ana `SKILL.md` içindeki kullanım, renk ve seçilen bileşen dokümanları okunmalı. Skill bileşen kataloğunun tamamını önceden projeye uygulama zorunluluğu yoktur.
