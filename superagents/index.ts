// https://github.com/dragon-yuan/2019-nCoV-news
//  https://github.com/fangzesheng/free-api
const superagent = require('superagent');
class util {
    public async  getnCoVInfo(keyword: string,page: number) {
       const a =  await superagent.get(`http://ncov.news.dragon-yuan.me/api/news`).query({ search: keyword, page: page });
        return a;
    }
    public async getPiYao() {
        const result = await superagent.get(`https://ncov.dxy.cn/ncovh5/view/pneumonia_rumors?from=dxy&source=undefined`);
        const piyaoUrl = `https://ncov.dxy.cn/ncovh5/view/pneumonia_rumors?from=dxy&source=undefined`;
        return piyaoUrl;
    }
}

async function run() {
    const a = new util();
    console.log( await a.getPiYao());}
run();