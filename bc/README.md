# i 山大服务端

## 安装

```bash
$ git clone git@github.com:SDUStudentOnline/isdu-server.git
$ cd isdu-server
$ npm i
```

## 开发

### 分支说明

- main: 生产环境分支
- dev: 开发/测试环境分支
- feat/\*: 功能分支
- fix/{date}-\*: 错误修复分支
- hotfix/\*: 紧急修复分支
- refactor/\*: 重构分支

Example:

```plain
feat/course-table
fix/20210230-course-table
hotfix/course-table
refactor/course-table
```

### 开发

```bash
$ npm run dev
```

### 测试

```bash
$ npm test
```

### Commit 规范

```plain
[build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test](scope): subject
```

- type: 类型，一般只用 `feat`、`fix`、`refactor`、`test`、`chore`
- scope: 覆盖范围，可省略
- subject: 主题，动词开头，结尾不加符号

### 提交前

判断当前是否存在风格或代码问题：

```bash
$ npm run lint
```

如果代码不符合规范将无法合并

## 数据脱敏

- 测试环境数据库账号密码开发成员单独分配
- 所有敏感数据通过 `YAML` 进行配置

## 部署需求

- 试验：推送到 `dev` 分支后自动部署

## 规范

- 业务中间件：统一以 `koa` 开头
- 文件命名：全小写，使用 `-` 连接
- 变量名命名：驼峰式

## 业务开发

1. 创建或使用已有的服务，`src/service`
2. 创建具体服务的单例类，单个服务的功能不易过多
3. 创建路由，`src/routes`
