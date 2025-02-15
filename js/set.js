/*
作者:D.Young
主页：https://yyv.me/
github：https://github.com/5iux/sou
日期：2019-07-26
版权所有，请勿删除
========================================
由 yeetime 修改
github：https://github.com/yeetime/sou2
日期：2019-12-13
========================================
由 imsyy 二次修改
github：https://github.com/imsyy/sou2
日期：2022-03-10
========================================
由 btjawa 二次修改
github：https://github.com/btjawa/Snavigation-Chrome-Extension
日期：2025-02-15
修改cookies api为chrome.storage api，删除搜索引擎选择，使用chrome.search api
*/

// 默认快捷方式
var quick_list_preinstall = {
    '1': {
        title: "Vercel",
        url: "https://vercel.com/",
    },
    '2': {
        title: "GitHub",
        url: "https://github.com/",
    },
    '3': {
        title: "Cloudflare",
        url: "https://dash.cloudflare.com/",
    },
    '4': {
        title: "W3school",
        url: "https://www.w3school.com.cn/",
    },
    '5': {
        title: "腾讯云",
        url: "https://console.cloud.tencent.com/",
    },
    '6': {
        title: "阿里云",
        url: "https://console.aliyun.com/",
    },
    '7': {
        title: "百度网盘",
        url: "https://pan.baidu.com/",
    },
    '8': {
        title: "阿里云盘",
        url: "https://www.aliyundrive.com/drive/",
    },
    '9': {
        title: "Office",
        url: "https://www.office.com/",
    },
    '10': {
        title: "又拍云",
        url: "https://console.upyun.com/",
    },
    '11': {
        title: "CSDN",
        url: "https://www.csdn.net/",
    },
    '12': {
        title: "哔哩哔哩",
        url: "https://www.bilibili.com/",
    }
};

//背景图片
var bg_img_preinstall = {
    "type": "2", // 1:使用主题默认的背景图片 2:关闭背景图片 3:使用自定义的背景图片
    "path": "", //自定义图片
};

// 获取背景图片
async function getBgImg() {
    const result = await chrome.storage.sync.get('bg_img');
    var bg_img_local = result['bg_img'];
    if (bg_img_local && bg_img_local !== "{}") {
        return bg_img_local;
    } else {
        setBgImg(bg_img_preinstall);
        return bg_img_preinstall;
    }
}

// 设置背景图片
function setBgImg(bg_img) {
    if (bg_img) {
        chrome.storage.sync.set({ bg_img });
        return true;
    }
    return false;
}

// 设置-壁纸
//$('#bg').attr('src','https://api.dujin.org/bing/1920.php')
async function setBgImgInit() {
    var bg_img = await getBgImg();
    if (bg_img["type"] === "5") {
        $("#wallpaper-url").val(bg_img["path"]);
        $("#wallpaper-button").fadeIn(100);
        $("#wallpaper_url").fadeIn(100);
    } else {
        $("#wallpaper_url").fadeOut(300);
        $("#wallpaper-button").fadeOut(300);
    }

    switch (bg_img["type"]) {
        case "1":
            var pictures = new Array();
            pictures[0] = './img/background1.webp';
            pictures[1] = './img/background2.webp';
            pictures[2] = './img/background3.webp';
            pictures[3] = './img/background4.webp';
            pictures[4] = './img/background5.webp';
            pictures[5] = './img/background6.webp';
            pictures[6] = './img/background7.webp';
            pictures[7] = './img/background8.webp';
            pictures[8] = './img/background9.webp';
            pictures[9] = './img/background10.webp';
            var rd = Math.floor(Math.random() * 10);
            $('#bg').attr('src', pictures[rd]) //随机默认壁纸
            break;
        case "2":
            $('#bg').attr('src', 'https://api.dujin.org/bing/1920.php') //必应每日
            break;
        case "3":
            $('#bg').attr('src', 'https://tu.ltyuanfang.cn/api/fengjing.php') //随机风景
            break;
        case "4":
            $('#bg').attr('src', 'https://t.mwm.moe/pc') //随机二次元
            break;
        case "5":
            $('#bg').attr('src', bg_img["path"]) //自定义
            break;
    }
}

// 搜索框高亮
function focusWd() {
    $("body").addClass("onsearch");
}

// 搜索框取消高亮
function blurWd() {
    $("body").removeClass("onsearch");
    //隐藏输入
    $(".wd").val("");
}

// 获取快捷方式列表
async function getQuickList() {
    const result = await chrome.storage.sync.get('quick_list');
    var quick_list_local = result['quick_list'];
    if (quick_list_local !== "{}" && quick_list_local) {
        return quick_list_local;
    } else {
        setQuickList(quick_list_preinstall);
        return quick_list_preinstall;
    }
}

// 设置快捷方式列表
function setQuickList(quick_list) {
    if (quick_list) {
        chrome.storage.sync.set({ quick_list });
        return true;
    }
    return false;
}

// 快捷方式数据加载
async function quickData() {
    var html = "";
    var quick_list = await getQuickList();
    for (var i in quick_list) {
        html += `<div class="quick">
                    <a href="${quick_list[i]['url']}" target="_blank">${quick_list[i]['title']}</a>
                </div>`;
    }
    $(".quick-all").html(html + `<div class="quick"><a id="set-quick"><i class="iconfont icon-tianjia-"></i></a></div>`);
}

// 设置-快捷方式加载
async function setQuickInit() {
    var quick_list = await getQuickList();
    var html = "";
    for (var i in quick_list) {
        tr = `
        <div class='quick_list_div'>
            <div class='quick_list_div_num'>${i}</div>
            <div class='quick_list_div_name'>${quick_list[i]['title']}</div>
            <div class='quick_list_div_button'>
                <button class='edit_quick' value='${i}' style='border-radius: 8px 0px 0px 8px;'>
                <i class='iconfont icon-xiugai'></i></button>
                <button class='delete_quick' value='${i}' style='border-radius: 0px 8px 8px 0px;'>
                <i class='iconfont icon-delete'></i></button>
            </div>
        </div>`;
        html += tr;
    }
    $(".quick_list_table").html(html);
}

/**
 * 下载文本为文件
 * @param filename 文件名
 * @param text     内容
 */
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

// 打开设置
function openSet() {
    $("#menu").addClass('on');

    openBox();

    //更改设置图标
    $("#icon-menu").attr("class", "iconfont icon-home");

    //隐藏书签打开设置
    $(".mark").css({
        "display": "none",
    });
    $(".set").css({
        "display": "flex",
    });
}

// 关闭设置
function closeSet() {
    $("#menu").removeClass('on');

    closeBox();

    //更改设置图标
    $("#icon-menu").attr("class", "iconfont icon-shezhi");

    //隐藏设置
    $(".set").css({
        "display": "none",
    });

    quickData();
}

// 书签显示
function openBox() {
    $("#content").addClass('box');
    $(".mark").css({
        "display": "flex",
    });
    //时间上移
    $(".tool-all").css({
        "transform": 'translateY(-160%)'
    });
    //背景模糊
    $('#bg').css({
        "transform": 'scale(1.08)',
        "filter": "blur(10px)",
        "transition": "ease 0.3s",
    });
}

// 书签关闭
function closeBox() {
    $("#content").removeClass('box');
    $(".mark").css({
        "display": "none",
    });
    //时间下移
    $(".tool-all").css({
        "transform": 'translateY(-120%)'
    });
    //背景模糊
    $('#bg').css({
        "transform": 'scale(1)',
        "filter": "blur(0px)",
        "transition": "ease 0.3s",
    });
}

//显示设置快捷方式列表
function showQuick() {
    $(".quick_list").show();
    $(".se_add_preinstalls").show();
}

//隐藏设置快捷方式列表
function hideQuick() {
    $(".quick_list").hide();
    $(".se_add_preinstalls").hide();
}


$(document).ready(function () {

    // 快捷方式数据加载
    quickData();

    // 壁纸数据加载
    setBgImgInit();

    // 时间点击
    $("#time_text").click(function () {
        if ($("#content").attr("class") === "box") {
            closeBox();
            closeSet();
            blurWd();
        } else {
            openBox();
        }
    });

    // 搜索框点击事件
    $(document).on('click', '.sou', function () {
        focusWd();
        $(".search-engine").slideUp(160);
    });

    $(document).on('click', '.wd', function () {
        focusWd();
        $(".search-engine").slideUp(160);
    });

    // 点击其他区域关闭事件
    $(document).on('click', '.close_sou', function () {
        blurWd();
        closeSet();
    });

    // 搜索
    $("form.search").on('submit', function (event) {
        event.preventDefault();
        const target = new FormData(event.target);
        const query = target.get('wd').trim();
        chrome.search.query({ text: query });
    });

    // 菜单点击
    $("#menu").click(function () {
        if ($(this).attr("class") === "on") {
            closeSet();
        } else {
            openSet();

            // 设置内容加载
            setQuickInit(); //快捷方式设置
        }
    });

    // 快捷方式添加按钮点击
    $("#set-quick").click(function () {
        openSet();

        // 设置内容加载
        setQuickInit(); //快捷方式设置

        //添加快捷方式
        $("#set-quick-menu").trigger('click');
        $(".set_quick_list_add").trigger('click');
    });

    // 关闭表单
    $(".se_add_cancel").click(function () {
        $(".se_add_content").hide();

        //显示列表
        showSe();
    });

    // 设置-快捷方式添加
    $(".set_quick_list_add").click(function () {
        $(".quick_add_content input").val("");
        $(".quick_add_content").show();

        //隐藏列表
        hideQuick();
    });

    // 设置-快捷方式保存
    $(".quick_add_save").click(async function () {
        var key_inhere = $(".quick_add_content input[name='key_inhere']").val();
        var key = $(".quick_add_content input[name='key']").val();
        var title = $(".quick_add_content input[name='title']").val();
        var url = $(".quick_add_content input[name='url']").val();
        var img = $(".quick_add_content input[name='img']").val();

        var num = /^\+?[1-9][0-9]*$/;
        if (!num.test(key)) {
            iziToast.show({
                timeout: 2000,
                message: '快捷方式 ' + key + ' 不是正整数'
            });
            return;
        }

        var quick_list = await getQuickList();
        if (quick_list[key]) {
            iziToast.show({
                timeout: 8000,
                message: '快捷方式 " + key + " 已有数据，是否覆盖？',
                buttons: [
                    ['<button>确认</button>', function (instance, toast) {
                        quick_list[key] = {
                            title: title,
                            url: url,
                            img: img,
                        };
                        setQuickList(quick_list);
                        setQuickInit();
                        $(".quick_add_content").hide();
                        //显示列表
                        showQuick();

                        instance.hide({
                            transitionOut: 'flipOutX',
                        }, toast, 'buttonName');
                        iziToast.show({
                            message: '覆盖成功'
                        });
                    }, true],
                    ['<button>取消</button>', function (instance, toast) {
                        instance.hide({
                            transitionOut: 'flipOutX',
                        }, toast, 'buttonName');
                    }]
                ]
            });
            return;
        }

        if (key_inhere && key != key_inhere) {
            delete quick_list[key_inhere];
        }

        quick_list[key] = {
            title: title,
            url: url,
            img: img,
        };
        setQuickList(quick_list);
        setQuickInit();
        $(".quick_add_content").hide();
        iziToast.show({
            timeout: 2000,
            message: '添加成功'
        });

        //显示列表
        showQuick();
    });

    // 设置-快捷方式关闭添加表单
    $(".quick_add_cancel").click(function () {
        $(".quick_add_content").hide();

        //显示列表
        showQuick();
    });

    //恢复预设快捷方式
    $(".set_quick_list_preinstall").click(function () {
        iziToast.show({
            timeout: 8000,
            message: '快捷方式数据将被清空',
            buttons: [
                ['<button>确认</button>', function (instance, toast) {
                    setQuickList(quick_list_preinstall);
                    setQuickInit();
                    instance.hide({
                        transitionOut: 'flipOutX',
                    }, toast, 'buttonName');
                    iziToast.show({
                        timeout: 2000,
                        message: '重置成功'
                    });
                    // setTimeout(function () {
                    //     window.location.reload()
                    // }, 1000);
                }, true],
                ['<button>取消</button>', function (instance, toast) {
                    instance.hide({
                        transitionOut: 'flipOutX',
                    }, toast, 'buttonName');
                }]
            ]
        });
    });

    // 快捷方式修改
    $(".quick_list").on("click", ".edit_quick", async function () {

        var quick_list = await getQuickList();
        var key = $(this).val();
        $(".quick_add_content input[name='key_inhere']").val(key);
        $(".quick_add_content input[name='key']").val(key);
        $(".quick_add_content input[name='title']").val(quick_list[key]["title"]);
        $(".quick_add_content input[name='url']").val(quick_list[key]["url"]);
        $(".quick_add_content input[name='img']").val(quick_list[key]["img"]);

        //隐藏列表
        hideQuick();

        $(".quick_add_content").show();
    });

    // 快捷方式删除
    $(".quick_list").on("click", ".delete_quick", function () {

        var key = $(this).val();

        iziToast.show({
            timeout: 8000,
            message: '快捷方式 ' + key + ' 是否删除？',
            buttons: [
                ['<button>确认</button>', async function (instance, toast) {
                    var quick_list = await getQuickList();
                    delete quick_list[key];
                    setQuickList(quick_list);
                    setQuickInit();
                    instance.hide({
                        transitionOut: 'flipOutX',
                    }, toast, 'buttonName');
                    iziToast.show({
                        timeout: 2000,
                        message: '删除成功'
                    });
                }, true],
                ['<button>取消</button>', function (instance, toast) {
                    instance.hide({
                        transitionOut: 'flipOutX',
                    }, toast, 'buttonName');
                }]
            ]
        });
    });

    // 壁纸设置
    $("#wallpaper").on("click", ".set-wallpaper", async function () {
        var type = $(this).val();
        var bg_img = await getBgImg();
        bg_img["type"] = type;

        if (type === "1") {
            $('#wallpaper_text').html("显示默认壁纸，刷新页面以生效");
            setBgImg(bg_img);
            iziToast.show({
                message: '壁纸设置成功，刷新生效',
            });
        }

        if (type === "2") {
            $('#wallpaper_text').html("显示必应每日一图，每天更新，刷新页面以生效 | API @ 缙哥哥");
            setBgImg(bg_img);
            iziToast.show({
                message: '壁纸设置成功，刷新生效',
            });
        }

        if (type === "3") {
            $('#wallpaper_text').html("显示随机风景图，每次刷新后更换，刷新页面以生效 | API @ 小歪");
            setBgImg(bg_img);
            iziToast.show({
                message: '壁纸设置成功，刷新生效',
            });
        }

        if (type === "4") {
            $('#wallpaper_text').html("显示随机二次元图，每次刷新后更换，刷新页面以生效 | API @ 小歪");
            setBgImg(bg_img);
            iziToast.show({
                message: '壁纸设置成功，刷新生效',
            });
        }

        if (type === "5") {
            $('#wallpaper_text').html("自定义壁纸地址，请输入正确地址，点击保存且刷新页面以生效");
            $("#wallpaper_url").fadeIn(100);
            $("#wallpaper-button").fadeIn(100);
            $("#wallpaper-url").val(bg_img["path"]);
        } else {
            $("#wallpaper_url").fadeOut(300);
            $("#wallpaper-button").fadeOut(300);
        }
    });

    // 自定义壁纸设置保存
    $(".wallpaper_save").click(async function () {
        var url = $("#wallpaper-url").val();
        var reg = /^http(s)?:\/\/(([\w-]+\.)+[\w-]|localhost)+(:[0-9]{1,5})?(\/[\w- ./?%&=]*)?$/g;
        if (!reg.test(url)) {
            iziToast.show({
                message: '请输入正确的链接',
            });
        } else {
            var bg_img = await getBgImg();
            bg_img["type"] = "5";
            bg_img["path"] = url;
            setBgImg(bg_img);
            iziToast.show({
                message: '自定义壁纸设置成功，刷新生效',
            });
        }
    });

    // 我的数据导出
    $("#my_data_out").click(async function () {
        var cookies = await chrome.storage.sync.get();
        var json = JSON.stringify(cookies);
        download("Snavigation-back-up-" + $.now() + ".json", json);
        iziToast.show({
            timeout: 2000,
            message: '已导出备份文件至下载目录'
        });
    });

    // 我的数据导入 点击触发文件选择
    $("#my_data_in").click(function () {
        $("#my_data_file").click();
    });

    // 选择文件后读取文件内容
    $("#my_data_file").change(function () {
        var selectedFile = document.getElementById('my_data_file').files[0];
        //var name = selectedFile.name;//读取选中文件的文件名
        //var size = selectedFile.size;//读取选中文件的大小
        //console.log("文件名:"+name+" 大小:"+size);

        var reader = new FileReader(); //这是核心,读取操作就是由它完成.
        reader.readAsText(selectedFile); //读取文件的内容,也可以读取文件的URL
        reader.onload = function () {
            //当读取完成后回调这个函数,然后此时文件的内容存储到了result中,直接操作即可
            //console.log(this.result);

            // json 格式校验
            var mydata;
            try {
                mydata = JSON.parse(this.result);
            } catch (e) {
                iziToast.show({
                    timeout: 2000,
                    message: '数据解析异常'
                });
                return;
            }
            if (typeof mydata != 'object') {
                iziToast.show({
                    timeout: 2000,
                    message: '数据格式错误'
                });
                return;
            }

            iziToast.show({
                timeout: 8000,
                message: '当前数据将会被覆盖！是否继续导入？',
                buttons: [
                    ['<button>确认</button>', function (instance, toast) {
                        for (var key in mydata) {
                            chrome.storage.sync.set({ [key]: mydata[key] });
                        }
                        instance.hide({
                            transitionOut: 'flipOutX',
                        }, toast, 'buttonName');
                        iziToast.show({
                            timeout: 2000,
                            message: '导入成功'
                        });
                        setTimeout(function () {
                            window.location.reload()
                        }, 1000);
                    }, true],
                    ['<button>取消</button>', function (instance, toast) {
                        instance.hide({
                            transitionOut: 'flipOutX',
                        }, toast, 'buttonName');
                        setTimeout(function () {
                            window.location.reload()
                        }, 1000);
                    }]
                ]
            });
        }
    });
});