/**
 * 空白文字を取り除いて文字数カウントする
 *
 * @param text 文字数カウントの対象のテキスト
 * @return カウント数
 */
export const countTextLength = (text: string): number => {
  const trimText = text.replace(/\s+/g, "");
  return trimText.length;
};

/**
 * ファイル名からフォルダ情報を削除
 *
 * @param text ファイル名（eg. hoge/fugo.txt）
 * @return フォルダ情報を削除したファイル名（eg. fugo.txt）
 */
export const getFileName = (text: string): string => {
  const splitText = text.split("/");
  return splitText[splitText.length - 1];
};
