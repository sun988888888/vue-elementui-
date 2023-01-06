let contentForm = [
  {
    name: "vlog",
    id: "vlog",
  },
  {
    name: "测评",
    id: "测评",
  },
  {
    name: "开箱",
    id: "开箱",
  },
  {
    name: "教程",
    id: "教程",
  },
  {
    name: "沉浸式",
    id: "沉浸式",
  },
  {
    name: "剧情",
    id: "剧情",
  },
  {
    name: "好物分享",
    id: "好物分享",
  },
  {
    name: "干货",
    id: "干货",
  },
  {
    name: "其他",
    id: "其他",
  },
];
/* 平台选择 */
let platform = [
  {
    name: "小红书",
    id: "1",
  },
  {
    name: "抖音",
    id: "2",
  },
  {
    name: "微博",
    id: "3",
  },
  {
    name: "淘宝逛逛",
    id: "4",
  },
];
/* 领域选择 */
let domain = [
  {
    name: "时尚",
    id: "时尚",
    children: [
      {
        name: "时尚穿搭",
        id: "时尚穿搭",
      },
      {
        name: "颜值",
        id: "颜值",
      },
      {
        name: "其他",
        id: "其他时尚",
      },
    ],
  },
  {
    name: "美妆个护",
    id: "美妆个护",
    children: [
      {
        name: "美妆",
        id: "美妆",
      },
      {
        name: "个护",
        id: "个护",
      },
      {
        name: "香水",
        id: "香水",
      },
      {
        name: "美妆个护综合",
        id: "美妆个护综合",
      },
    ],
  },
  {
    name: "美食",
    id: "美食",
  },
  {
    name: "科技数码",
    id: "科技数码",
  },
  {
    name: "文化艺术",
    id: "文化艺术",
    children: [
      {
        name: "绘画",
        id: "绘画",
      },
      {
        name: "手写",
        id: "手写",
      },
      {
        name: "手账",
        id: "手账",
      },
      {
        name: "手工制作",
        id: "手工制作",
      },
      {
        name: "其他",
        id: "其他文化艺术",
      },
    ],
  },
  {
    name: "旅游出行",
    id: "旅游出行",
  },
  {
    name: "萌宠",
    id: "萌宠",
    children: [
      {
        name: "猫",
        id: "猫",
      },
      {
        name: "狗",
        id: "狗",
      },
      {
        name: "猫狗齐全",
        id: "猫狗齐全",
      },
      {
        name: "其他",
        id: "其他萌宠",
      },
    ],
  },
  {
    name: "影视综",
    id: "影视综",
  },
  {
    name: "生活记录",
    id: "生活记录",
  },
  {
    name: "母婴",
    id: "母婴",
  },
  {
    name: "游戏动漫",
    id: "游戏动漫",
    children: [
      {
        name: "游戏",
        id: "游戏",
      },
      {
        name: "动漫",
        id: "动漫",
      },
      {
        name: "cos",
        id: "cos",
      },
      {
        name: "其他",
        id: "其他游戏动漫",
      },
    ],
  },
  {
    name: "探店",
    id: "探店",
    children: [
      {
        name: "时尚探店",
        id: "时尚探店",
      },
      {
        name: "美食探店",
        id: "美食探店",
      },
    ],
  },
  {
    name: "运动健身",
    id: "运动健身",
  },
  {
    name: "好物推荐",
    id: "好物推荐",
  },
  {
    name: "健康养生",
    id: "健康养生",
  },
  {
    name: "知识",
    id: "知识",
    children: [
      {
        name: "学习",
        id: "学习",
      },
      {
        name: "科普",
        id: "科普",
      },
    ],
  },
  {
    name: "财经",
    id: "财经",
  },
  {
    name: "家居家装",
    id: "家居家装",
  },
  {
    name: "汽车",
    id: "汽车",
  },
  {
    name: "情感",
    id: "情感",
  },
  {
    name: "萌娃",
    id: "萌娃",
  },
  {
    name: "职场",
    id: "职场",
  },
  {
    name: "情侣",
    id: "情侣",
  },
  {
    name: "其他",
    id: "其他",
  },
];
/* 账号人设选择 */
let accountSetting = [
  {
    name: "模特",
    id: "模特",
  },
  {
    name: "学生",
    id: "学生",
  },
  {
    name: "摄影师",
    id: "摄影师",
  },
  {
    name: "创业者",
    id: "创业者",
  },
  {
    name: "插画师",
    id: "插画师",
  },
  {
    name: "化妆师",
    id: "化妆师",
  },
  {
    name: "甜点师",
    id: "甜点师",
  },
  {
    name: "室内设计师",
    id: "室内设计师",
  },
  {
    name: "教练",
    id: "教练",
  },
  {
    name: "厨师",
    id: "厨师",
  },
  {
    name: "品牌创始人",
    id: "品牌创始人",
  },
  {
    name: "造型师",
    id: "造型师",
  },
  {
    name: "画家",
    id: "画家",
  },
  {
    name: "平面设计师",
    id: "平面设计师",
  },
  {
    name: "服装设计师",
    id: "服装设计师",
  },
  {
    name: "主播",
    id: "主播",
  },
  {
    name: "医生",
    id: "医生",
  },
  {
    name: "编辑",
    id: "编辑",
  },
  {
    name: "律师",
    id: "律师",
  },
  {
    name: "老师",
    id: "老师",
  },
  {
    name: "妈妈",
    id: "妈妈",
  },
  {
    name: "萌娃",
    id: "萌娃",
  },
  {
    name: "情侣",
    id: "情侣",
  },
  {
    name: "夫妻",
    id: "夫妻",
  },
  {
    name: "家庭",
    id: "家庭",
  },
  {
    name: "爸爸",
    id: "爸爸",
  },
  {
    name: "其他",
    id: "其他",
  },
];
/* 皮肤选择 */
let skinOptions = [
  {
    value: "皮肤特质",
    label: "皮肤特质",
    children: [
      {
        value: "干皮",
        label: "干皮",
      },
      {
        value: "油皮",
        label: "油皮",
      },
      {
        value: "混合皮",
        label: "混合皮",
      },
    ],
  },
  {
    value: "肤色",
    label: "肤色",
    children: [
      {
        value: "白色",
        label: "白色",
      },
      {
        value: "黄色",
        label: "黄色",
      },
      {
        value: "黑皮",
        label: "黑皮",
      },
      {
        value: "黄黑皮",
        label: "黄黑皮",
      },
      {
        value: "橄榄皮",
        label: "橄榄皮",
      },
    ],
  },
  {
    value: "敏感肌",
    label: "敏感肌",
    children: [
      {
        value: "是",
        label: "是",
      },
      {
        value: "否",
        label: "否",
      },
    ],
  },
];
/* 互动数据类型 */
let interactOptions = [
  {
    value: "likeMid",
    label: "点赞中位数",
  },
  {
    value: "cmtMid",
    label: "评论中位数",
  },
  {
    value: "collectMid",
    label: "收藏中位数",
  },
  {
    value: "likeMean",
    label: "点赞平均数",
  },
  {
    value: "cmtMean",
    label: "评论平均数",
  },
  {
    value: "collectMean",
    label: "收藏平均数",
  },
];
/* 报价类型 */
let offerOptions = [
  {
    value: "bbpprice",
    label: "图文报备",
  },
  {
    value: "article_price",
    label: "图文非报备",
  },
  {
    value: "article_collect_price",
    label: "图文非报备合集",
  },
  {
    value: "bbvprice",
    label: "视频报备",
  },
  {
    value: "video_price",
    label: "视频非报备",
  },
  {
    value: "video_collect_price",
    label: "视频非报备合集",
  },
];
/* 年龄段分布 */
let ageOptions = [
  {
    value: "<18",
    label: "<18",
  },
  {
    value: "18-24",
    label: "18-24",
  },
  {
    value: "25-34",
    label: "25-34",
  },
  {
    value: "35-44",
    label: "35-44",
  },
  {
    value: ">44",
    label: ">44",
  },
];
/* 导出表格表头 */
let excelCommons = [
  {
    title: "昵称",
    key: "nickname",
    type: "text",
  },
  {
    title: "平台",
    key: "type",
    type: "text",
  },
  {
    title: "平台id",
    key: "account_id",
    type: "text",
  },
  {
    title: "主页链接",
    key: "link",
    type: "text",
  },
  {
    title: "性别",
    key: "sex",
    type: "text",
  },
  {
    title: "领域",
    key: "domain",
    type: "text",
  },
  {
    title: "账号人设",
    key: "persona",
    type: "text",
  },
  {
    title: "内容形式",
    key: "content_type",
    type: "text",
  },
  {
    title: "是否可探店",
    key: "isDip",
    type: "text",
  },
  {
    title: "宝宝信息",
    key: "babyDes",
    type: "text",
  },
  {
    title: "皮肤特质",
    key: "skin",
    type: "text",
  },
  {
    title: "最近笔记时间",
    key: "nearNoteDate",
    type: "text",
  },
  {
    title: "粉丝数",
    key: "fans",
    type: "text",
  },
  {
    title: "点赞数",
    key: "liked",
    type: "text",
  },
  {
    title: "收藏数",
    key: "collected",
    type: "text",
  },
  {
    title: "关注数",
    key: "follows",
    type: "text",
  },
  {
    title: "8篇点赞平均数",
    key: "likeMean",
    type: "text",
  },
  {
    title: "8篇收藏平均数",
    key: "collectMean",
    type: "text",
  },
  {
    title: "8篇评论平均数",
    key: "cmtMean",
    type: "text",
  },
  {
    title: "8篇点赞中位数",
    key: "likeMid",
    type: "text",
  },
  {
    title: "8篇收藏中位数",
    key: "collectMid",
    type: "text",
  },
  {
    title: "8篇评论中位数",
    key: "cmtMid",
    type: "text",
  },
  {
    title: "视频完播率",
    key: "videoPlay",
    type: "text",
  },
  {
    title: "图文报备报价",
    key: "article_report_price",
    type: "text",
  },
  {
    title: "图文非报备报价",
    key: "article_noreport_price",
    type: "text",
  },
  {
    title: "图文合集报价",
    key: "article_collect_price",
    type: "text",
  },
  {
    title: "视频报备报价",
    key: "video_report_price",
    type: "text",
  },
  {
    title: "视频非报备报价",
    key: "video_noreport_price",
    type: "text",
  },
  {
    title: "视频合集报价",
    key: "video_collect_price",
    type: "text",
  },
  {
    title: "返点",
    key: "rebate",
    type: "text",
  },
  {
    title: "最新报价时间",
    key: "new_price_date",
    type: "text",
  },
  {
    title: "其余备注",
    key: "otherRemark",
    type: "text",
  },
  {
    title: "微信号",
    key: "wechat_code",
    type: "text",
  },
  {
    title: "手机号",
    key: "phone",
    type: "text",
  },
  {
    title: "图文cpe",
    key: "article_cpe",
    type: "text",
  },
  {
    title: "视频cpe",
    key: "video_cpe",
    type: "text",
  },
  {
    title: "图文cpm",
    key: "article_cpm",
    type: "text",
  },
  {
    title: "视频cpm",
    key: "video_cpm",
    type: "text",
  },
  {
    title: "ip地址",
    key: "ip_site",
    type: "text",
  },
  {
    title: "常驻地",
    key: "often_site",
    type: "text",
  },
  {
    title: "粉丝性别分布",
    key: "fans_gender",
    type: "text",
  },
  {
    title: "粉丝地域分布",
    key: "fans_cities",
    type: "text",
  },
  {
    title: "粉丝年龄占比",
    key: "fans_ages",
    type: "text",
  },
  {
    title: "签约mcn",
    key: "is_mcn",
    type: "text",
  },
  {
    title: "mcn名称",
    key: "mcn_name",
    type: "text",
  },
  {
    title: "关注17.5公众号",
    key: "is_official_accounts",
    type: "text",
  },
  {
    title: "关注17.5小程序",
    key: "is_mini",
    type: "text",
  },
  {
    title: "添加企业微信",
    key: "is_enterprise_mini",
    type: "text",
  },
  {
    title: "来源",
    key: "source",
    type: "text",
  }
];
/* 精准匹配data */
let accurateCheckData=[
  {
    value: "美妆个护",
    label: "美妆个护",
    children:[
      {
        value: "美妆",
        label: "美妆",
      },
      {
        value: "彩妆",
        label: "彩妆",
        children: [
          {
            value: "口红",
            label: "口红",
          },
          {
            value: "眼影",
            label: "眼影",
          },
        ],
      },
      {
        value: "个护",
        label: "个护",
      },
      {
        value: "综合",
        label: "综合",
      },
    ]
  },

]
export {
  contentForm,
  platform,
  domain,
  accountSetting,
  skinOptions,
  interactOptions,
  offerOptions,
  ageOptions,
  excelCommons,
  accurateCheckData
};
