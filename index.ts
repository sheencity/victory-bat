import { Wechaty, Friendship, Contact, Message, ScanStatus, Room } from 'wechaty';
import { ContactSelf } from 'wechaty/dist/src/user';
import * as qrcodeTerminal from 'qrcode-terminal';
import { textBuilder } from './defaultText';

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
    const hasAt = msg.to();
    console.log(hasAt);
    const hasAtBot = room && (content.includes('@防疫卫士') || content.includes('@Tycho'));
    const alias = await contact.alias() ?? contact.name(); // 发消息人备注
    const isText = msg.type() === bot.Message.Type.Text;
    console.log(`发消息人: ${contact.name()} 内容: ${content}`);
    if (msg.self()) {
        return;
    }

    // 私聊
    if (contact.friend() && !room) {
        console.log(`是 friend`);
        // 加延迟，防封号
        await delay(2000);
        await contact.say(textBuilder(alias));
    }

    // 群聊
    if (room && isText) {
        // 如果是群消息 目前只处理文字消息
        const topic = await room.topic();
        if (hasAtBot) {
            console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`);
            await delay(2000);
            room.say(textBuilder());
        }
    }
}

// 加好友
function onFriendship(friendship: Friendship) {
    friendship.accept();
}

// 进群
async function onRoomJoin(room: Room, inviteeList: Contact[], inviter: Contact, ) {
    const nameList = inviteeList.map(c => c.name()).join(',')
    await delay(2000);
    room.say(textBuilder(nameList));
    console.log(`Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`)
}

const bot = new Wechaty({ name: '防疫卫士' });

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);
bot.on('friendship', onFriendship);
bot.on('room-join', onRoomJoin);
bot
    .start()
    .then(() => console.log('开始登陆微信'))
    .catch(e => console.error(e));
