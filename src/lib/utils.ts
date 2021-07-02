// 空白文字を取り除いて文字数カウントする
export const countTextLength = (text: string) => {
    const trimText = text.replace(/\s+/g, "");
    return trimText.length;
};

// ファイル名からフォルダ情報を削除
export const getFileName = (text: string) => {
    const splitText = text.split('/');
    return splitText[splitText.length - 1];
};
