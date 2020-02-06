import { Wechaty, Friendship, Contact, Message, ScanStatus, Room } from 'wechaty';
import { ContactSelf } from 'wechaty/dist/src/user';
import * as qrcodeTerminal from 'qrcode-terminal';
import { textBuilder } from './defaultText';
import { replyFilter, keywords } from './reply';

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
    const content = msg.text().trim() as string; // 消息内容
    const room = msg.room(); // 是否是群消息
    const hasAtBot = room && await msg.mentionSelf();
    const msgSenderName = contact.name(); // 发消息人备注
    const isText = msg.type() === bot.Message.Type.Text;

    console.log(`发消息人: ${msgSenderName} 内容: ${content}  是否 @我了？: ${await msg.mentionSelf()}`);
    if (msg.self()) {
        return;
    }

    // 私聊
    if (contact.friend() && !room) {
        // 优先使用昵称
        const name = await contact.alias() || msgSenderName;
        if (keywords.some(k => content.includes(k))) {
            // 加延迟，防封号
            await delay(2000);
            await contact.say(await replyFilter(content, name));
        }
    }

    // 群聊
    if (room && isText && hasAtBot) {
        // 如果是群消息 目前只处理文字消息
        const topic = await room.topic();
        console.log(`群名: ${topic} 发消息人: ${msgSenderName}  内容: ${content} `);
        const msg = await replyFilter(content, msgSenderName);
        await delay(2000);
        await room.say(msg);
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

const bot = new Wechaty({ name: '防疫精灵' });

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);
bot.on('friendship', onFriendship);
bot.on('room-join', onRoomJoin);
bot
    .start()
    .then(() => console.log('开始登陆微信'))
    .catch((e: Error) => console.error(e));
