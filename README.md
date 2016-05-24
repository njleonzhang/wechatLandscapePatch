# wechatLandscapePatch
微信ios浏览器开着键盘的情况下横屏会导致页面里的fixed和一些absolute boom元素消失。

# 问题
微信ios版的内置浏览器好像存在这样的一个bug

# 重现步骤：
页面上有个input
* input获得焦点，虚拟键盘弹出。
* 让页面从竖屏变成横屏
* 再从横屏变回竖屏

# bug现象：
* 页面上的一些position fixed，通过设置bottom吸附在页面底部的元素不见了。
* 如果是SPA，则不仅此页面的这类元素不见了，所有其他页面的元素也都会消失。

# root cause：
经过调试我们发现每次在做重现步骤里的一些列动作后，微信内置浏览器的window.innerHeight都会增加好几百px；这样就不难解释为什么会出现我们看到的bug现象了。position fixed的元素是以窗口为基础来偏移的，所以window.innerHeight变高，吸附在window底部的元素就看不见了啊。

# solution （主要是for SPA）： 
SPA都会有一个container，不管页面怎么切换，这个container是一致存在于页面里的。
在页面打开的时候，这个containner的高度设置为当前窗口的实际高度（减去status bar和navigation bar的高度）
然后将页面里所有的fixed bottom元素都改为absolute元素，并确保它们是相对于container的，这样问题就解决啦。

# 使用
自己看代码吧 :)

# 局限
没有考虑viewport缩放的情况。

# sample
我们的项目： 微信公众号: "找人上门"。
