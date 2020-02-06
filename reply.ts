import { menuTextBuilder } from "./defaultText";
import { ApiCollection } from './superagents/index';
import { cities } from "./city";
import { Item } from "./interfaces/response.interface";

const API = new ApiCollection();



/**
 * 回复逻辑
 */
export async function replyFilter(text: string, name: string = '') {
    const hasCity = cities.filter(c => text.includes(c));
    let reply = '';
    if (text === '@防疫精灵') {
        reply = '本精灵来咯！您有何吩咐，尽管说～';
    }
    if (text.includes('帮助')) {
        reply = menuTextBuilder(name);
    } else if (hasCity.length !== 0) {
        const response = await API.getInfoByCity(hasCity[0]);
        if (response.code === 200) {
            // 默认只返回三条
            reply = concatInfo(response.result.list.slice(0, 3));
        }
    }
    else if (text.includes('实况')) {
        reply = await API.getYiQingShiKuang();
    } else if (text.includes('辟谣')) {
        reply = await API.getPiYao();
    } else if (text.includes('诊断') || text.includes('在线')) {
        reply = API.getZaiXianZhenDuan();
    } else if (text.includes('小区') || text.includes('附近')) {
        reply = API.getFeiYanXiaoQu();
    } else if (text.includes('症状')) {
        reply = API.getFeiYanZhengZhuang();
    } else if (text.includes('预防')) {
        reply = API.getFangHuZhiShi();
    } else {
        reply = '你难倒了一个机器人，你家里人知道么？回复 帮助 看看我的知识库~'
    }
    return reply;
}

/**
 * 信息聚合
 */
function concatInfo(items: Item[]) {
    return items.reduce((acc, next) => acc +
        `【标题】 ${next.content.slice(0, 60) + '...'}\n【时间】 ${next.sendTime}\n【来源】 ${next.fromName}\n【链接】 ${next.url} \n\n\n\n`,
        '');
}