import React, {
    Component
} from 'react';

// anim
import QueueAnim from 'rc-queue-anim';

// fetch
import promise from 'es6-promise';
promise.polyfill();
import 'isomorphic-fetch';

class Area extends Component {
    constructor() {
        super();
        this.imgs = [];
    };
    componentDidMount() {
        // fetch areaData
        const areaData = 'http://topic.it168.com/factory/huawei1703/reactjs/json/area.json';
        fetch(areaData)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then(areaData => {
                areaData = (data => {
                    for (let i = 0; i < data.length; i++) {
                        let singe = data[i];
                        singe.imageUrl = require('../../../../images/' + singe.image);
                        data[i] = singe;
                    }
                    return data;
                })(areaData);
                areaData.forEach((item, index) => {
                    this.imgs.push(
                        <li key={index}><img src={item.imageUrl} alt=""/></li>
                    );
                });
            });
    };
    render() {
        const {
            area
        } = this.props.show;

        let style = {};
        if (area.layer) {
            style = {
                display: 'block'
            };
        } else {
            style = {
                display: 'none'
            }
        }

        return (
            <QueueAnim className={area.show?'main active':'main'} type={['right', 'left']}>
                {area.show?[
                    <div className="title" key="area-title">展区风采</div>,
                    <QueueAnim type="scale" component="ul" className="area-list clearfix" key="area-list" onClick={(e)=>{this.areaHandle(e)}}>
                        {area.show?this.imgs:null}
                    </QueueAnim>,
                    <div className="area-photo" style={style} key="area-photo">
                        <ul>
                            {area.show?this.imgs:null}
                        </ul>
                        <div className="area-close" onClick={()=>{this.areaClose()}}><img src={require('../../../../images/17.png')} alt=""/></div>
                    </div>
                ]:null}
            </QueueAnim>
        );
    };
    areaHandle(e) {
        const index = $(e.target).parent().index();
        let iNow = index;
        let layer = $('.area-photo');
        let layerUl = layer.find('ul');
        let liLength = layerUl.find('li').length;
        layerUl.css({
            'width': liLength * 6.04 + 'rem',
            'left': -6.04 * iNow + 'rem'
        });

        let startPos, endPos, deltaX, deltaY, moveLength;
        layerUl.on('touchstart', function(e) {
            e.stopPropagation();
            const touch = e.touches[0];
            startPos = {
                x: touch.pageX,
                y: touch.pageY
            };
        }).on('touchmove', function(e) {
            e.stopPropagation();
            const touch = e.touches[0];
            endPos = {
                x: touch.pageX,
                y: touch.pageY
            };
            deltaX = endPos.x - startPos.x;
            deltaY = endPos.y - startPos.y;
            // moveLength 手指移动的距离
            moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        }).on('touchend', function(e) {
            e.stopPropagation();
            // 向左滑动
            if (deltaX < -60) {
                if (iNow == liLength - 1) {
                    return;
                };
                iNow++;
                $(this).animate({
                    left: -6.04 * iNow + 'rem'
                });
            }
            // 向右滑动
            else if (deltaX > 60) {
                if (iNow == 0) {
                    return;
                }
                iNow--;
                $(this).animate({
                    left: -6.04 * iNow + 'rem'
                });
            }
        })

        this.props.show.area.layer = true;
        this.props.openLayerHandle(this.props.show);
    };
    areaClose() {
        this.props.show.area.layer = false;
        this.props.closeLayerHandle(this.props.show);
    };
};

export default Area;