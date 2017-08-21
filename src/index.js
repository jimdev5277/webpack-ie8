import './css/main.scss';

$(function () {
    let temp = $('#js-logisticsArr').val();
    if (temp) {
        let logisticsArr = JSON.parse(temp);
        if (logisticsArr instanceof Array && logisticsArr.length > 0) {
            uiLogisticsArr(logisticsArr);
        } else {
            let $warp = $('#js-logistics-detail-top');
            if ($warp.length !== 0) {
                let $tip = `<h2 style="margin-top: 30px;color: #343434;font-size: 16px;font-weight: 700;line-height: 32px;/position: relative;text-align: center;background-color: #f8f8f8;padding: 12px 0;">无物流详细信息</h2>`;
                $warp.after($($tip));
            } else {
                console.info('无物流信息');
            }
        }
    } else {
        console.error('物流值错误');
    }
});

const uiLogisticsArr = (logisticsArr) => {
    if ($('#js-logistics-detail-top').length !== 0) {
        if ($('#js-logistics-detail-wrap').length !== 0) {
            console.info('请注意显示物流dom已经存在!');
        } else {
            let $logistice = `<div id="js-logistics-detail-wrap">
        <h2 class="bp-title" style="margin-top: 30px">物流详情</h2>
        <div class="logistics-detail-tab">
            <ul class="logistics-detail-ul" id="js-logistics-com">
            </ul>
            <div class="logistics-detail-cc">
                <p class="number" id="js-logistics-nu"></p>
                <p id="js-logistics-message" class="message"></p>
                <ul class="cc-list" id="js-logistics-cc">
                </ul>
            </div>
        </div>
    </div>`;
            $('#js-logistics-detail-top').after($($logistice));
        }
    }
    $('.logistics-detail-ul').on('click', 'li', function () {
        let $that = $(this);
        $that.addClass('current').siblings().removeClass('current');
        fillContent($that.index());
    });

    let logisticsData = [];
    let comArr = [];

    for (let [index, logisticsItem] of logisticsArr.entries()) {
        let data = {};
        data['number'] = `快递单号：${logisticsItem.number}`;
        data['comp'] = logisticsItem.comp;
        data['status'] = logisticsItem.status;
        if (index === 0) {
            comArr.push(`<li class="current">${logisticsItem.comp}</li>`);
        } else {
            comArr.push(`<li>${logisticsItem.comp}</li>`);
        }
        data['context'] = [];
        if (data['status'] === '1') {
            for (let dataItem of logisticsItem.data) {
                data['context'].push(`<li>${dataItem.time}<br>${dataItem.context}</li>`);
            }
        } else {
            data['message'] = logisticsItem.message;
        }
        logisticsData.push(data);
    }

    const fillContent = (idx) => {
        $('#js-logistics-nu').html(logisticsData[idx].number);
        if (logisticsData[idx].status === '1') {
            $('#js-logistics-cc').empty().html(logisticsData[idx].context.join(''));
            $('#js-logistics-message').hide();
        } else {
            $('#js-logistics-cc').empty();
            $('#js-logistics-message').show().html(logisticsData[idx].message);
        }
    };

    fillContent(0);

    $('#js-logistics-com').empty().html(comArr.join(''));
};