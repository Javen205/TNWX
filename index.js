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


module.exports.DefaultAccessTokenCache = require('./dist/cache/DefaultAccessTokenCache').DefaultAccessTokenCache;
module.exports.IAccessTokenCache = require('./dist/cache/IAccessTokenCache').IAccessTokenCache;

module.exports.ApiConfig = require('./dist/entity/ApiConfig').ApiConfig;
module.exports.BatchUserInfo = require('./dist/entity/BatchUserInfo').BatchUserInfo;

// 菜单
module.exports.Button = require('./dist/entity/menu/Button').Button;
module.exports.ClickButton = require('./dist/entity/menu/ClickButton').ClickButton;
module.exports.ComButton = require('./dist/entity/menu/ComButton').ComButton;
module.exports.Matchrule = require('./dist/entity/menu/Matchrule').Matchrule;
module.exports.MediaButton = require('./dist/entity/menu/MediaButton').MediaButton;
module.exports.Menu = require('./dist/entity/menu/Menu').Menu;
module.exports.ViewButton = require('./dist/entity/menu/ViewButton').ViewButton;

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

// 模板消息 
module.exports.MiniProgram = require('./dist/entity/template/MiniProgram').MiniProgram;
module.exports.TemplateData = require('./dist/entity/template/TemplateData').TemplateData;
module.exports.TemplateItem = require('./dist/entity/template/TemplateItem').TemplateItem;


module.exports.AccessToken = require('./dist/AccessToken').AccessToken;
module.exports.AccessTokenApi = require('./dist/AccessTokenApi').AccessTokenApi;
module.exports.ApiConfigKit = require('./dist/ApiConfigKit').ApiConfigKit;
module.exports.MsgAdapter = require('./dist/MsgAdapter').MsgAdapter;
module.exports.SnsAccessTokenApi = require('./dist/SnsAccessTokenApi').SnsAccessTokenApi;
module.exports.WeChat = require('./dist/WeChat').WeChat;