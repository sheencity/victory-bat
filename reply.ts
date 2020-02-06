import { textBuilder } from "./defaultText";
export const keywords = ['帮助', '辟谣' , '找门诊',  '疫情实况', '专家解读', '肺炎症状'];

/**
 * 回复逻辑
 */
export async function replyFilter(text: string, name: string = '') {
    let reply = '';
    if (text.includes('帮助')) {
        reply = textBuilder(name);
    } else if (text.includes('疫情实况')) {
        reply = '疫情实况';
    } else if (text.includes('辟谣')) {
        reply = '辟谣';
    } else if (text.includes('找门诊')) {
        reply = '找门诊';
    } else if (text.includes('专家解读')) {
        reply = '专家解读';
    } else if (text.includes('肺炎症状')) {
        reply = '肺炎症状';
    } else {
        reply = '你难道了一个机器人，你家里人知道么？'
    }
    return reply;
}