//IDX 保活程序，配合actions

const allhosts=[
	'8080-firebase-mypy-1760252708776.cluster-wedahaehd5aywvfphtlyiyof4i.cloudworkstations.dev',
	'8080-firebase-python-flask-1761118309624.cluster-edb2jv34dnhjisxuq5m7l37ccy.cloudworkstations.dev'
]
const puppeteer = require('puppeteer');

const generateRandomUA = () => {
  const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.1 Safari/605.1.15'
  ];
  const randomUAIndex = Math.floor(Math.random() * userAgents.length);
  return userAgents[randomUAIndex];
}
async function delayTime(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function account_login(host) {
    // 启动浏览器
    const browser = await puppeteer.launch({
        headless: true, // 设置为false可以看到浏览器界面，方便调试
        args: ['--start-maximized'],// 最大化窗口
        defaultViewport: {
            width: 1280,
            height: 1180
        }
    });
    // 打开新页面
    const page = await browser.newPage();
    const customUA = generateRandomUA();
    await page.setUserAgent(customUA);    
    try {
        await page.goto('https://'+host, {
            waitUntil: 'networkidle2', // 等待网络空闲
            timeout: 60000 // 超时时间设置为60秒
        });
        const delay = Math.floor(Math.random() * 10) + 30;
        await delayTime(delay*1000);
		page.reload({ waitUntil: 'networkidle0' })

    } catch(error) {
        console.error(error);
    } finally {
        const delay = Math.floor(Math.random() * 3) + 30;
        await delayTime(delay*1000);
        await browser.close();
    }
    return true;
}


async function main(allhosts) {
    const results = await Promise.all(allhosts.map(host => account_login(host)));
    console.log('results:', results);
}
if(allhosts.length>0){
    main(allhosts);
}
