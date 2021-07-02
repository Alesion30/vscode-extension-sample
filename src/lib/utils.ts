// 空白文字を取り除いて文字数カウントする
export const countTextLength = (text: string) => {
    const trimText = text.replace(/\s+/g, "");
    return trimText.length;
};
