import 'jquery'
import Swiper from 'swiper'
import './modal'
require('../css/reset.scss');
require('../css/main.scss');



$(function () {


    $.get('/wx.php', function (data) {
        data = JSON.parse(data);
        wx.config({
            debug: false,
            appId: 'wxfc20fdccb4c0d3b0',
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.sign,
            jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        });
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: '舟济众生，《舟游》邀您预约',
                link: 'http://zy.order.tanyu.mobi',
                imgUrl: 'http://zy.order.tanyu.mobi/icon.png'
            });
            wx.onMenuShareTimeline({
                title: '舟济众生，《舟游》邀您预约',
                desc: '舟游预约',
                link: 'http://zy.order.tanyu.mobi',
                imgUrl: 'http://zy.order.tanyu.mobi/icon.png'
            });
        });
    });
    var type = 0; //默认的机器类型，1-ios，2-android
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        effect: 'fade',
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
    });

    var mySwiper2 = new Swiper('.swiper-container2', {
        autoplay: true,
        effect: 'fade',
        loop: true,
        navigation: {
            nextEl: '.swiper-button-next2',
            prevEl: '.swiper-button-prev2',
        }
    });
    new fullpage('#fullpage', {
        //options here
        // autoScrolling:true,
        // scrollHorizontally: true,
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
        // scrollOverflow: true
    });

    $("#android").click(function () {
        type = $(this).data('os-id');
    });
    $("#ios").click(function () {
        type = $(this).data('os-id');
    });
    var submitBtn = $('.submit');
    submitBtn.click(function (e) {
        e.preventDefault();
        var number = $('.phone').val();
        if (!number.match(/\d{11}/)) {
            alert('请输出正确的手机格式');
            return false;
        }
        if (type <= 0) {
            alert('请选择手机系统');
            return false;
        }
        $.get('/order.php?phone=' + number + '&type=' + type, function (data) {

        });
        $('#myModal').modal({
            backdrop: 'static'
        });
        return false;
    })
})