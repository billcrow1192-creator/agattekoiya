// 文字の正規化：全角/半角を統一（NFKC）、カタカナ→ひらがな、小文字化、空白と記号を除去
export function normalize(text) {
  if (!text) return '';
  return String(text)
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60))
    .replace(/[\s　、。，．,.!！?？「」『』（）()…・〜~ー-]/g, '');
}
