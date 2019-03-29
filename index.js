'use strict';

// 工具集合
module.exports.CryptoKit = require('./dist/kit/CryptoKit').CryptoKit;
module.exports.HttpKit = require('./dist/kit/HttpKit').HttpKit;

// 常用API
module.exports.CustomServiceApi = require('./dist/api/CustomServiceApi').CustomServiceApi;
module.exports.MenuApi = require('./dist/api/MenuApi').MenuApi;
module.exports.QrcodeApi = require('./dist/api/QrcodeApi').QrcodeApi;
module.exports.ShortUrlApi = require('./dist/api/ShortUrlApi').ShortUrlApi;
module.exports.TagApi = require('./dist/api/TagApi').TagApi;
module.exports.TemplateApi = require('./dist/api/TemplateApi').TemplateApi;
module.exports.UserApi = require('./dist/api/UserApi').UserApi;
module.exports.AutoReplyInfoApi = require('./dist/api/AutoReplyInfoApi').AutoReplyInfoApi;
module.exports.SubscribeMsgApi = require('./dist/api/SubscribeMsgApi').SubscribeMsgApi;
module.exports.SnsAccessTokenApi = require('./dist/api/SnsAccessTokenApi').SnsAccessTokenApi;


module.exports.DefaultAccessTokenCache = require('./dist/cache/DefaultAccessTokenCache').DefaultAccessTokenCache;
module.exports.IAccessTokenCache = require('./dist/cache/IAccessTokenCache').IAccessTokenCache;

module.exports.ApiConfig = require('./dist/entity/ApiConfig').ApiConfig;
module.exports.BatchUserInfo = require('./dist/api/UserApi').BatchUserInfo;

// 菜单
module.exports.Button = require('./dist/entity/menu/Menu').Button;
module.exports.ClickButton = require('./dist/entity/menu/Menu').ClickButton;
module.exports.ComButton = require('./dist/entity/menu/Menu').ComButton;
module.exports.Matchrule = require('./dist/entity/menu/Menu').Matchrule;
module.exports.MediaButton = require('./dist/entity/menu/Menu').MediaButton;
module.exports.Menu = require('./dist/entity/menu/Menu').Menu;
module.exports.ViewButton = require('./dist/entity/menu/Menu').ViewButton;

// 接收消息
module.exports.InMsgParser = require('./dist/entity/msg/InMsgParser').InMsgParser;
module.exports.InImageMsg = require('./dist/entity/msg/in/InImageMsg').InImageMsg;
module.exports.InLinkMsg = require('./dist/entity/msg/in/InLinkMsg').InLinkMsg;
module.exports.InLocationMsg = require('./dist/entity/msg/in/InLocationMsg').InLocationMsg;
module.exports.InNotDefinedMsg = require('./dist/entity/msg/in/InNotDefinedMsg').InNotDefinedMsg;
module.exports.InShortVideoMsg = require('./dist/entity/msg/in/InShortVideoMsg').InShortVideoMsg;
module.exports.InSpeechRecognitionResults = require('./dist/entity/msg/in/InSpeechRecognitionResults').InSpeechRecognitionResults;
module.exports.InTextMsg = require('./dist/entity/msg/in/InTextMsg').InTextMsg;
module.exports.InVideoMsg = require('./dist/entity/msg/in/InVideoMsg').InVideoMsg;
module.exports.InVoiceMsg = require('./dist/entity/msg/in/InVoiceMsg').InVoiceMsg;

// 事件消息
module.exports.EventInMsg = require('./dist/entity/msg/in/event/EventInMsg').EventInMsg;
module.exports.InFollowEvent = require('./dist/entity/msg/in/event/InFollowEvent').InFollowEvent;
module.exports.InLocationEvent = require('./dist/entity/msg/in/event/InLocationEvent').InLocationEvent;
module.exports.InMenuEvent = require('./dist/entity/msg/in/event/InMenuEvent').InMenuEvent;
module.exports.InNotDefinedEvent = require('./dist/entity/msg/in/event/InNotDefinedEvent').InNotDefinedEvent;
module.exports.InQrCodeEvent = require('./dist/entity/msg/in/event/InQrCodeEvent').InQrCodeEvent;
module.exports.InTemplateMsgEvent = require('./dist/entity/msg/in/event/InTemplateMsgEvent').InTemplateMsgEvent;
module.exports.ScanCodeInfo = require('./dist/entity/msg/in/event/ScanCodeInfo').ScanCodeInfo;
module.exports.InCustomEvent = require('./dist/entity/msg/in/event/InCustomEvent').InCustomEvent;
module.exports.InMassEvent = require('./dist/entity/msg/in/event/InMassEvent').InMassEvent;
module.exports.InPoiCheckNotifyEvent = require('./dist/entity/msg/in/event/InPoiCheckNotifyEvent').InPoiCheckNotifyEvent;
module.exports.InVerifyFailEvent = require('./dist/entity/msg/in/event/InVerifyFailEvent').InVerifyFailEvent;
module.exports.InVerifySuccessEvent = require('./dist/entity/msg/in/event/InVerifySuccessEvent').InVerifySuccessEvent;
module.exports.InWifiEvent = require('./dist/entity/msg/in/event/InWifiEvent').InWifiEvent;

module.exports.InCardPassCheckEvent = require('./dist/entity/msg/in/card/InCardPassCheckEvent').InCardPassCheckEvent;
module.exports.InCardPayOrderEvent = require('./dist/entity/msg/in/card/InCardPayOrderEvent').InCardPayOrderEvent;
module.exports.InCardSkuRemindEvent = require('./dist/entity/msg/in/card/InCardSkuRemindEvent').InCardSkuRemindEvent;
module.exports.InMerChantOrderEvent = require('./dist/entity/msg/in/card/InMerChantOrderEvent').InMerChantOrderEvent;
module.exports.InUpdateMemberCardEvent = require('./dist/entity/msg/in/card/InUpdateMemberCardEvent').InUpdateMemberCardEvent;
module.exports.InUserCardEvent = require('./dist/entity/msg/in/card/InUserCardEvent').InUserCardEvent;
module.exports.InUserConsumeCardEvent = require('./dist/entity/msg/in/card/InUserConsumeCardEvent').InUserConsumeCardEvent;
module.exports.InUserGetCardEvent = require('./dist/entity/msg/in/card/InUserGetCardEvent').InUserGetCardEvent;
module.exports.InUserGiftingCardEvent = require('./dist/entity/msg/in/card/InUserGiftingCardEvent').InUserGiftingCardEvent;
module.exports.InUserPayFromCardEvent = require('./dist/entity/msg/in/card/InUserPayFromCardEvent').InUserPayFromCardEvent;

// 被动回复消息
module.exports.Article = require('./dist/entity/msg/out/Article').Article;
module.exports.MenuMsg = require('./dist/entity/msg/out/MenuMsg').MenuMsg;
module.exports.News = require('./dist/entity/msg/out/News').News;
module.exports.OutImageMsg = require('./dist/entity/msg/out/OutImageMsg').OutImageMsg;
module.exports.OutMsg = require('./dist/entity/msg/out/OutMsg').OutMsg;
module.exports.OutMusicMsg = require('./dist/entity/msg/out/OutMusicMsg').OutMusicMsg;
module.exports.OutNewsMsg = require('./dist/entity/msg/out/OutNewsMsg').OutNewsMsg;
module.exports.OutTextMsg = require('./dist/entity/msg/out/OutTextMsg').OutTextMsg;
module.exports.OutVideoMsg = require('./dist/entity/msg/out/OutVideoMsg').OutVideoMsg;
module.exports.OutVoiceMsg = require('./dist/entity/msg/out/OutVoiceMsg').OutVoiceMsg;
module.exports.OutCustomMsg = require('./dist/entity/msg/out/OutCustomMsg').OutCustomMsg;
module.exports.TransInfo = require('./dist/entity/msg/out/TransInfo').TransInfo;

// 模板消息 
module.exports.MiniProgram = require('./dist/entity/template/TemplateData').MiniProgram;
module.exports.TemplateData = require('./dist/entity/template/TemplateData').TemplateData;
module.exports.TemplateItem = require('./dist/entity/template/TemplateData').TemplateItem;
// 订阅消息
module.exports.SubscribeMsg = require('./dist/entity/subscribe/SubscribeMsg').SubscribeMsg;
module.exports.Content = require('./dist/entity/subscribe/SubscribeMsg').Content;
module.exports.Data = require('./dist/entity/subscribe/SubscribeMsg').Data;
module.exports.MiniProgram = require('./dist/entity/subscribe/SubscribeMsg').MiniProgram;

module.exports.AccessToken = require('./dist/AccessToken').AccessToken;
module.exports.AccessTokenApi = require('./dist/AccessTokenApi').AccessTokenApi;
module.exports.ApiConfigKit = require('./dist/ApiConfigKit').ApiConfigKit;
module.exports.MsgAdapter = require('./dist/MsgAdapter').MsgAdapter;
module.exports.SnsAccessTokenApi = require('./dist/SnsAccessTokenApi').SnsAccessTokenApi;
module.exports.WeChat = require('./dist/WeChat').WeChat;