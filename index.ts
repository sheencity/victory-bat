import { Wechaty, Friendship, Contact, Message, ScanStatus, Room } from 'wechaty';
import { ContactSelf } from 'wechaty/dist/src/user';
import * as qrcodeTerminal from 'qrcode-terminal';
import { text } from './defaultText';

// 延时函数，防止检测出类似机器人行为操作
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

//  二维码生成
function onScan(qrcode: string, status: ScanStatus) {
    qrcodeTerminal.generate(qrcode); // 在console端显示二维码
    const qrcodeImageUrl = [
        'https://api.qrserver.com/v1/create-qr-code/?data=',
        encodeURIComponent(qrcode)
    ].join('');
    console.log(status);
    console.log(qrcodeImageUrl);
}

// 登录
async function onLogin(user: ContactSelf) {
    console.log(`bot ${user}登录了`);
}

//登出
function onLogout(user: ContactSelf) {
    console.log(`${user} 已经登出`);
}

// 监听对话
async function onMessage(msg: Message) {

    const contact = msg.from() as Contact; // 发消息人
    const content = msg.text().trim(); // 消息内容
    const room = msg.room(); // 是否是群消息
    const hasAtBot = room && (content.includes('@防疫卫士') || content.includes('@Tycho'));
    const alias = await contact.alias(); // 发消息人备注
    const isText = msg.type() === bot.Message.Type.Text;
    if (msg.self()) {
        return;
    }
    if (room && isText) {
        // 如果是群消息 目前只处理文字消息
        const topic = await room.topic();
        console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`);
        if (hasAtBot) {
            const thisRoom = await Room.find({ id: room.id });
            await thisRoom?.say(text);
        }
    }
}

function onFriendship(friendship: Friendship) {
    friendship.accept();
}

const bot = new Wechaty({ name: 'WechatEveryDay' });

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);
bot.on('friendship', onFriendship);
bot
    .start()
    .then(() => console.log('开始登陆微信'))
    .catch(e => console.error(e));
