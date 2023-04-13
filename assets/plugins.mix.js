// Docsify plugin functions
function plugin(hook, vm) {
    let text = vm.config.timeUpdater.text
    hook.beforeEach(function (content) {
        let words = content.match(/([\u4e00-\u9fa5]+?|[a-zA-Z0-9]+)/g).length
        let wordShow = words + " 字", needMinte = "时长 " +Math.ceil(words / 400) + " 分钟";
        let displayHtml = "" +
        "<div style='float:right;margin-top:30px;font-size:.9em;color:gray'>" +
            "<span style='display:block;text-align:right;margin-bottom:5px'>" + text + "</span>" +
            "<span style='display:block;text-align:right;'>" + wordShow + "&nbsp;&nbsp;|&nbsp;&nbsp;" + needMinte + "&nbsp;&nbsp;|&nbsp;&nbsp;<span id='busuanzi_container_page_pv'>浏览&nbsp;&nbsp;<span id='busuanzi_value_page_pv'></span>&nbsp;&nbsp;次</span></span>" + 
        "</div>"
        return content + "\n\n" + displayHtml
    });
    hook.mounted(function(){
        var e = Docsify.dom;
        // gitalk
        var n = e.create("div");
        n.id = "gitalk-container";
        var t = e.getNode("#main");
        n.style = "width: " + t.clientWidth + "px; margin: 40px auto 20px;";
        e.appendTo(e.find(".content"), n)
        // Copy Right
        var m = e.create("div");
        
        m.style = "width: " + t.clientWidth + "px; height:60px; text-align:center;color:gray;font-size:14px";
        m.innerHTML = "" +
        "<span id='busuanzi_container_site_pv'>本站总访问量<span id='busuanzi_value_site_pv'></span>次</span>" +
        "<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;© 2023 DamonLee</span>"
        e.appendTo(e.find(".content"), m)
    });
    hook.doneEach(function(i) {
        for (var n = document.getElementById("gitalk-container"); n.hasChildNodes();) n.removeChild(n.firstChild);
        gitalk.render("gitalk-container")
        // 重新计算不蒜子访问数
        bszCaller.fetch("//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback", function(a) {
            bszTag.texts(a), bszTag.shows()
        })
    })
}

window.$docsify.formatUpdated = window.$docsify["timeUpdater"] ? window.$docsify["timeUpdater"].formatUpdated : "{YYYY}/{MM}/{DD}"
window.$docsify = (window.$docsify || {})
window.$docsify.plugins = (window.$docsify.plugins || []).concat(plugin)