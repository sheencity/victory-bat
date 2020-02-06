// https://github.com/dragon-yuan/2019-nCoV-news
//  https://github.com/fangzesheng/free-api

import { writeFileSync } from 'fs';

import { get, post } from 'superagent';
class util {

    /**
     * 疫情信息查询
     */
    public async  getnCoVInfo(keyword: string = '', page: number = 1) {
        const a = await get(`http://ncov.news.dragon-yuan.me/api/news`).query({ search: keyword, page: page });
        return a;
    }

    /**
     * 辟谣信息
     */
    public async getPiYao() {
        //const result = await get(`https://ncov.dxy.cn/ncovh5/view/pneumonia_rumors?from=dxy&source=undefined`);
        const piyaoUrl = `https://ncov.dxy.cn/ncovh5/view/pneumonia_rumors?from=dxy&source=undefined`;
        return piyaoUrl;
    }
    /**
     * 在线诊断
     */
    public async getZaiXianZhenDuan() {
        const ZaiXianZhenDuanUrl = `https://ask.dxy.com/ama/index#/activity-share?activity_id=111`;
        return ZaiXianZhenDuanUrl;
    }
    /**
     * 疫情实况
     */
    public async getYiQingShiKuang() {
        const YiQingShiKuangUrl = `https://ncov.dxy.cn/ncovh5/view/pneumonia?entrysource=APPiOS&from=groupmessage`;
        return YiQingShiKuangUrl;
    }
    /**
     * 获取身边的肺炎小区
     */
    public async getFeiYanXiaoQu() {
        const FeiYanXiaoQuUrl = `https://ncov.html5.qq.com/community?channelid=17&from=groupmessage&isappinstalled=0`;
        return FeiYanXiaoQuUrl;
    }

    /** 
     * 根据城市名称查询疫情
     */
    public async getInfoByCity(city: string) {
        return await this.getnCoVInfo(city);
    }
}

async function run() {
    const a = new util();
    console.log(await a.getFeiYanXiaoQu());
}
run();