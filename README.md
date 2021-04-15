# 概述

baseURL：http://119.23.65.235:5008/

所有的服务端接口在接收到请求后，均响应以下JSON格式：

```json
{
  "code": 0,        // 消息码
  "msg": "",        // 消息
  "data": null      // 具体的消息内容
}
```

其中，`code`、`msg`、`data`对应的结果如下：

| code                      | msg                    | data           |
| ------------------------- | ---------------------- | -------------- |
| 0: 无错误                 | 成功                   | 具体的业务结果 |
| 401: 无权限               | 无权限的消息           | null           |
| 406: 验证失败             | 具体验证错误的错误消息 | null           |
| 500: 服务器内部的未知错误 | "服务器内部错误"       | null           |



# 接口规格

## 全局设置

### 获取全局设置

**请求规格：**

```yaml
path: /api/setting
method: GET
```

**响应规格：**

```yaml
{
    code: 0,
    msg: "",
    data: {
        avatar: "http://www.duyiedu.com/source/img/logo.png", #头像
        siteTitle: "刘胤麟的文章", #标题
        github: "https://github.com/13886912431", #github地址
        qq: "619030878", #qq号
        qqQrCode: "http://www.duyiedu.com/source/img/%E5%B0%8F%E6%B8%A1%E5%BE%AE%E4%BF%A1%E4%BA%8C%E7%BB%B4%E7%A0%81.png", #qq二维码
        weixin: "LYL619030878", #微信
        weixinQrCode: "http://www.duyiedu.com/source/img/%E5%85%AC%E4%BC%97%E5%8F%B7%E4%BA%8C%E7%BB%B4%E7%A0%81.png", #微信二维码
        mail: "619030878@qq.com", #邮箱
        icp: "", #备案号
        githubName: "Serein.", #github名称
        favicon: "http://mdrs.yuanjin.tech/Fs4CDlC6mwe_WXLMIiXcmSJLHO4f", #网站的favicon地址
  }
}
```




## 文章

### 获取所有文章分类

**请求规格：**

```yaml
path: /api/classify
method: GET
```

**响应规格：**

```yaml
{
    code: 0,
    msg: "",
    data: [{
        id: <id>,
        name: "分类1",
        articleCount: 10, #该分类下文章的数量
    }, {
        id: <id>,
        name: "分类2",
        articleCount: 10,
        order: 2
    }, {
        id: <id>,
        name: "分类3",
        articleCount: 10,
    }]
}
```


### 分页获取文章

**请求规格：**

```yaml
path: /api/article
method: GET
```

说明：

- params列表：

  | key        | 必填 | default | 含义                 |
  | ---------- | ---- | ------- | -------------------- |
  | page       | 否   | 1       | 当前页码             |
  | limit      | 否   | 10      | 页容量               |
  | classifyId | 否   | -1      | 所属分类，-1表示全部 |
  
  

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: { 
		total: 786, #总数
		rows: [ # 当前页列表数据
			{
				id:<id>,
				title: "标题",
				desc: "描述",
				classify: { #所属分类
					id: 3,
					name: "分类3"
				},
				scanCount: 10,
				commentCount: 30,
				thumb: "缩略图地址",
                station: "临时站位图片地址",
				createdAt: 1604976798936
			}
		]
	}
```

说明：

- 结果按照创建时间的倒序排序


### 添加文章

**请求规格：**
```yaml
path: /api/article
method: POST
body: {
	title: "文章标题",
    classifyName: "vue",    #文章分类名，没有则自动创建
    desc: "文章描述，显示到列表页",  #文章描述，显示到列表页
    toc:  [ # 文章章节目录
        { name: "章节1", anchor: "title-1" },
        {
            name: "章节2",
            anchor: "title-2",
            children: [
                { name: "章节2-1", anchor: "title-2-1" },
                { name: "章节2-2", anchor: "title-2-2" },
            ],
        },
        {
          name: "章节3",
          anchor: "title-3",
        },
    ],
    htmlContent: "....", #文章的html内容
    mdContent: "....", # markdown内容
    thumb: "缩略图地址" #显示到列表页
}
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: {
		文章数据
	},
}
```



### 获取单个文章

**请求规格：**

```yaml
path: /api/article/:id
method: GET
```

说明：

- `:id`为文章的id

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: { 
		id: <id>,
    	title: "文章标题",
        classify: {
        	id: 1,
        	name: "分类3",
        },
        scanCount: 0, #浏览次数
        commentCount: 0, #评论数
        desc: "文章描述，显示到列表页",  #文章描述，显示到列表页
        createdAt: 1604976798936, #时间戳，创建日期
        toc:  [ # 文章章节目录
            { name: "章节1", anchor: "title-1" },
            {
                name: "章节2",
                anchor: "title-2",
                children: [
                    { name: "章节2-1", anchor: "title-2-1" },
                    { name: "章节2-2", anchor: "title-2-2" },
                ],
            },
            {
              name: "章节3",
              anchor: "title-3",
            },
        ],
        htmlContent: "....", #文章的html内容
        thumb: "缩略图地址" #显示到列表页
	}
```

### 修改文章

**请求规格：**

```yaml
path: /api/article/:id
method: PUT
body: {
	下列数据可选
	title: "文章标题",
    classifyName: "vue",    #文章分类名，没有则自动创建
    desc: "文章描述，显示到列表页",  #文章描述，显示到列表页
    toc:  [ # 文章章节目录
        { name: "章节1", anchor: "title-1" },
        {
            name: "章节2",
            anchor: "title-2",
            children: [
                { name: "章节2-1", anchor: "title-2-1" },
                { name: "章节2-2", anchor: "title-2-2" },
            ],
        },
        {
          name: "章节3",
          anchor: "title-3",
        },
    ],
    mdContent: "....", # markdown内容
    htmlContent: "....", #文章的html内容
    thumb: "缩略图地址" #显示到列表页
}
```


### 删除文章

**请求规格：**

```yaml
path: /api/article/:id
method: DELETE
```


**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: null
}
```


### 提交评论

**请求规格：**

```yaml
path: /api/comment
method: POST
body: {
	nickname: "昵称",
	content: "评论内容，纯文本",
	articleId: <id>	#评论的文章id
}
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: {
        id: <id>,
        nickname: "昵称",
        content: "评论内容，纯文本",
        createdAt: 1604976798936,
        avatar: "随机的头像地址",
        article: {
        	id: 1,
        	title: "分类3",
        },
	}
}
```

说明：

- 有可能出现验证错误，如：

  - 昵称不能为空
  - 评论内容不能为空
  - 文字id不能为空



### 分页获取评论

**请求规格：**

```yaml
path: /api/comment
method: GET
```

说明：

- params列表：

  | key       | 必填 | default | 含义                 |
  | --------- | ---- | ------- | -------------------- |
  | page      | 否   | 1       | 当前页码             |
  | limit     | 否   | 10      | 页容量               |
  | articleid | 否   | -1      | 所属文章，-1表示不限 |

  

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: { 
		total: 786, #总数
		rows: [ # 当前页列表数据
			{
                id: <id>,
                nickname: "昵称",
                content: "评论内容，纯文本",
                createdAt: 1604976798936,
                avatar: "头像地址",
                article: {
                	id: 1,
                	title: "分类3",
                },
            }
		]
	}
```


## 首页标语

### 获取标语

**请求规格：**

```yaml
path: /api/banner
method: GET
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: [
    	{
        	id: "1",
        	title: "听我怒吼",
        	img: "",
        	desc: "兰尼斯特有债必偿",
    	},
    	{
        	id: "2",
        	title: "听我怒吼",
        	img: "",
        	desc: "兰尼斯特有债必偿",
    	},
	]
}
```

### 添加标语

**请求规格：**

```yaml
path: /api/banner
method: POST
body: {
	title: "凛冬将至",
     img: "",			img必须
     desc: "人唯有恐惧的时候方能勇敢",
}
还可以一次添加多条
body: [
    {
        title: "凛冬将至",
        img: "",
        desc: "人唯有恐惧的时候方能勇敢",
    },
    {
        title: "血火同源",
        img: "",
        desc: "如果我回头，一切都完了",
    },
]
```

**响应规格：**

```yaml

{
	code: 0,
	msg: "",
	根据传入的数据
	data: {
        id: <id>,
        title: "血火同源",
        img: "",
        desc: "如果我回头，一切都完了",
	}
	或者
	data: [
    	{	
        	id: "1",
        	title: "听我怒吼",
        	img: "",
        	desc: "兰尼斯特有债必偿",
    	},
    	{
        	id: "2",
        	title: "听我怒吼",
        	img: "",
        	desc: "兰尼斯特有债必偿",
    	},
	]
}
```

### 删除标语

**请求规格：**

```yaml
path: /api/banner/:id
method: DELETE
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: null
}
```

### 修改标语

**请求规格：**

```yaml
path: /api/banner/:id
method: PUT
body: {
	title: "",
	desc: ''，
	img: ""
}
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: {
        id: "2",
        title: "听我怒吼",
        img: "",
        desc: "兰尼斯特有债必偿",
    },
}
```

## 留言板

### 提交留言

**请求规格：**

```yaml
path: /api/message
method: POST
body: {
	nickname: "昵称",
	content: "留言内容，纯文本"
}
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: {
        id: <id>,
        nickname: "昵称",
        content: "留言内容，纯文本",
        createdAt: 1604976798936,
        avatar: "随机的头像地址",
	}
}
```



### 分页获取留言

**请求规格：**

```yaml
path: /api/message
method: GET
```

说明：

- params列表：

  | key   | 必填 | default | 含义     |
  | ----- | ---- | ------- | -------- |
  | page  | 否   | 1       | 当前页码 |
  | limit | 否   | 10      | 页容量   |

  

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: { 
		total: 786, #总数
		rows: [ # 当前页列表数据
			{
              	id: <id>,
              	nickname: "昵称",
              	content: "留言内容，纯文本",
              	createAt: 1604976798936,
              	avatar: "头像地址",
          	}
		]
	}
}	
```


## 项目&demo

### 获取所有项目

**请求规格：**

```yaml
path: /api/project
method: GET
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: [
        {
          id: <id>,
          name: "个人文章系统",
          url: "...",
          github: "...",
          desc: ["...", "..."],
          thumb: "...",
          station: "临时站位图片地址",
        },
        {
          id: <id>,
          name: "像素鸟",
          url: "...",
          github: "...",
          desc: ["...", "..."],
          thumb: "...",
          station: "临时站位图片地址",
        },
    ]
}
```

### 添加项目

**请求规格：**

```yaml
path: /api/project
method: POST
body: {
	name: "", 必须
	github: "",
	desc: [], 必须
	thumb: "",
	url: ""
}
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: {
          id: <id>,
          name: "个人文章系统",
          url: "...",
          github: "...",
          desc: ["...", "..."],
          thumb: "...",
    },
}
```

### 删除项目

**请求规格：**

```yaml
path: /api/project/1
method: DELETE
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: null,
}
```

### 修改项目

**请求规格：**

```yaml
path: /api/project/1
method: PUT
body: {
	name: "个人文章系统",
    url: "...",
    github: "...",
    desc: ["...", "..."],
    thumb: "...",
}
```

**响应规格：**

```yaml
{
	code: 0,
	msg: "",
	data: {
		 id: <id>,
          name: "个人文章系统",
          url: "...",
          github: "...",
          desc: ["...", "..."],
          thumb: "...",
	}
}
```

## 

## 上传图片

**请求规格：**

```yaml
path: /api/upload
method: POST
headers: {
	'Content-Type': multipart/form-data;
}
body: {
	img: ""
}
```

-   文件最大5MB
-   支持：.png，.jpg，.jpeg，.gif格式

**响应规格**：

```yaml
{
	"code": 0,
    "msg": "上传成功",
    "data": {
        "url": "http://119.23.65.235/upload/1617888685046-lqqjgz.jpg"
    },
}
```

