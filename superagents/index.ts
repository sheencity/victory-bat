// https://github.com/dragon-yuan/2019-nCoV-news
//  https://github.com/fangzesheng/free-api


import { get } from 'superagent';
import { writeFileSync } from 'fs';
import { IResponse } from '../interfaces/response.interface';
export class ApiCollection {

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
    public getZaiXianZhenDuan() {
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
    public getFeiYanXiaoQu() {
        const FeiYanXiaoQuUrl = `https://ncov.html5.qq.com/community?channelid=17&from=groupmessage&isappinstalled=0`;
        return FeiYanXiaoQuUrl;
    }

    /** 
     * 根据城市名称查询疫情
     */
    public async getInfoByCity(city: string) {
        const result = await this.getnCoVInfo(city);
        return JSON.parse(result.text) as IResponse;
    }
    /**
     * 防护知识
     */
    public getFangHuZhiShi() {
        const FangHuZhiShiUrl = `https://ncov.dxy.cn/ncovh5/view/pneumonia_recommends?from=dxy`;
        return FangHuZhiShiUrl;
    }
    /**
     * 肺炎症状
     */
    public getFeiYanZhengZhuang() {
        const FeiYanZhengZhuangUrl = `https://ask.dxy.com/ama/index#/disease/24677/info/1`;
        return FeiYanZhengZhuangUrl;
    }
}
