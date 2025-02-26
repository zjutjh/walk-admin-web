# 精弘网络毅行管理端 web版

### 关于分支

 - master分支:

用于正式版打包、发布

 - dev分支:

用于测试、开发

- **关于分支合并**

需要更改的文件有`vite.config.ts`、`src/apis/axios.ts`。

vite.config.ts： 需要关闭代理，修改base。

src/apis/axios.ts：需要更改baseURL为正式环境。