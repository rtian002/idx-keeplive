# idx-keeplive
使用模拟浏览访问

## 部署节点
> 复制到命令行，运行即可(将该命令保存到程序目录下：start.sh,修改dev.nix启动时自动执行)
>
> 运行结果输出节点(base64编码)
```
export PORT=8080
export UUID=""
export DOMAIN=""
bash <(curl -sL https://128877.xyz/idx.sh)
```
> 第一次部署后，开放对应的端口，复制链接到DOMAIN
>
> 下次自动运行

## 配置IDX环境 `.idx/dev.nix`，让其自动执行程序
> 配置`idx.workspace.onStart`
```
idx={
...
  onStart={
    start-app="sh start.sh"
  }
}
```

## 说明
> 部署节点后，会自动删除程序和配置文件，不留痕迹
