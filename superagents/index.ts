// https://github.com/dragon-yuan/2019-nCoV-news
//  https://github.com/fangzesheng/free-api


import { get } from 'superagent';
class util {

    /**
     * 疫情信息
     */
    public async  getnCoVInfo(keyword: string, page: number) {
        const a = await get(`http://ncov.news.dragon-yuan.me/api/news`).query({ search: keyword, page: page });
        return a;
    }

    /**
     * 辟谣信息
     */
    public async getPiYao() {
        const result = await get(`https://ncov.dxy.cn/ncovh5/view/pneumonia_rumors?from=dxy&source=undefined`);
        const piyaoUrl = `https://ncov.dxy.cn/ncovh5/view/pneumonia_rumors?from=dxy&source=undefined`;
        return result;
    }
    public async getZaiXianZhenDuan() {
        const ZaiXianZhenDuanUrl = `https://ask.dxy.com/ama/index#/activity-share?activity_id=111`;
        return ZaiXianZhenDuanUrl;
    }
    public async getYiQingShiKuang() {
        const YiQingShiKuangUrl = `https://ncov.dxy.cn/ncovh5/view/pneumonia?entrysource=APPiOS&from=groupmessage`;
        return YiQingShiKuangUrl;
    }

    
}

async function run() {
    const a = new util();
    console.log(await a.getPiYao());
}
run();