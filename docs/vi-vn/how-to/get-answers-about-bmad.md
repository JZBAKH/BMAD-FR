---
title: 'Cách tìm câu trả lời về BMad'
description: Sử dụng LLM để tự nhanh chóng trả lời các câu hỏi về BMad
sidebar:
  order: 4
---

Hãy dùng trợ giúp tích hợp sẵn của BMad, tài liệu nguồn, hoặc cộng đồng để tìm câu trả lời, theo thứ tự từ nhanh nhất đến đầy đủ nhất.

## 1. Hỏi BMad-Help

Cách nhanh nhất để có câu trả lời. Skill `bmad-help` có sẵn ngay trong phiên AI của bạn và xử lý được hơn 80% câu hỏi. Nó sẽ kiểm tra dự án, nhìn xem bạn đã hoàn thành đến đâu và cho bạn biết nên làm gì tiếp theo.

```text
bmad-help Tôi có ý tưởng SaaS và đã biết tất cả tính năng. Tôi nên bắt đầu từ đâu?
bmad-help Tôi có những lựa chọn nào cho thiết kế UX?
bmad-help Tôi đang bị mắc ở workflow PRD
```

:::tip
Bạn cũng có thể dùng `/bmad-help` hoặc `$bmad-help` tùy nền tảng, nhưng chỉ `bmad-help` là cách nên hoạt động mọi nơi.
:::

## 2. Đi sâu hơn với mã nguồn

BMad-Help dựa trên cấu hình bạn đã cài đặt. Nếu bạn cần tìm hiểu nội bộ, lịch sử, hay kiến trúc của BMad, hoặc đang nghiên cứu BMad trước khi cài, hãy để AI đọc trực tiếp mã nguồn.

Hãy clone hoặc mở [repo BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) rồi hỏi AI của bạn về nó. Bất kỳ công cụ nào có hỗ trợ agent như Claude Code, Cursor, Windsurf... đều có thể đọc mã nguồn và trả lời trực tiếp.

:::note[Ví dụ]
**Q:** "Hãy chỉ tôi cách nhanh nhất để xây dựng một thứ gì đó bằng BMad"

**A:** Dùng Quick Flow: Chạy `bmad-quick-dev` - nó sẽ làm rõ ý định, lập kế hoạch, triển khai, review và trình bày kết quả trong một workflow duy nhất, bỏ qua các giai đoạn lập kế hoạch đầy đủ.
:::

**Mẹo để có câu trả lời tốt hơn:**

- **Hãy hỏi thật cụ thể** - "Bước 3 trong workflow PRD làm gì?" sẽ tốt hơn "PRD hoạt động ra sao?"
- **Kiểm tra lại những câu trả lời nghe lạ** - LLM đôi khi vẫn sai. Hãy kiểm tra file nguồn hoặc hỏi trên Discord.

### Không dùng agent? Dùng trang docs

Nếu AI của bạn không đọc được file cục bộ như ChatGPT hoặc Claude.ai, hãy nạp [llms-full.txt](https://bmad-code-org.github.io/BMAD-METHOD/llms-full.txt) vào phiên làm việc. Đây là bản chụp tài liệu BMad trong một file duy nhất.

## 3. Hỏi người thật

Nếu cả BMad-Help lẫn mã nguồn vẫn chưa trả lời được câu hỏi của bạn, lúc này bạn đã có một câu hỏi rõ hơn nhiều để đem đi hỏi cộng đồng.

| Kênh                    | Dùng cho                     |
| ----------------------- | ---------------------------- |
| `help-requests` forum   | Câu hỏi                      |
| `#suggestions-feedback` | Ý tưởng và đề xuất tính năng |

**Discord:** [discord.gg/gk8jAdXWmj](https://discord.gg/gk8jAdXWmj)

**GitHub Issues:** [github.com/bmad-code-org/BMAD-METHOD/issues](https://github.com/bmad-code-org/BMAD-METHOD/issues)

_Chính bạn,_
_đang mắc kẹt_
_trong hàng đợi -_
_đợi_
_ai?_

_Mã nguồn_
_nằm ngay đó,_
_rõ như ban ngày!_

_Hãy trỏ_
_cho máy của bạn._
_Thả nó đi._

_Nó đọc._
_Nó nói._
_Cứ hỏi -_

_Sao phải chờ_
_đến ngày mai_
_khi bạn đã có_
_ngày hôm nay?_

_- Claude_
