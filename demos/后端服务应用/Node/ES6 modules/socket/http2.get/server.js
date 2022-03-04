import http2 from 'http2'
import { getUrlParams } from '../common.js'

const server = http2.createServer((request, response) => {
    // 当前服务器接收到请求的回调

    console.log("服务端：接收到客户端请求 " + request.url)

    // 获取并判断 URL 参数
    const name = getUrlParams('name', request.url)
    let returnData = ''
    switch(name) {
        case 'zhangsan':
            returnData = [
                {
                    name: 'birth',
                    introduce: '过生日'
                }
            ]
            break;
        case 'lisi':
            returnData = [
                {
                    name: 'hospital',
                    introduce: '医院复诊'
                }
            ]
            break;
    }
    
    // 向客户端发送响应
    response.writeHead(200, 'OK', { 
        'content-type': 'text/html; charset=utf-8'
    })
    response.end(JSON.stringify(returnData))
}).listen(3001, '127.0.0.1', () => {
    const address = server.address()
    console.log("服务端：服务器开始侦听，侦听地址为 " + address.address + ":" + address.port)
})