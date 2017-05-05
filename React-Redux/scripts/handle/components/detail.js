import React, {
    Component
} from 'react';

import {
    findDOMNode
} from 'react-dom';

// components
import Hot from './detail-page/hot';
import Area from './detail-page/area';
import Date from './detail-page/date';
import Activities from './detail-page/activities';

class Detail extends Component {
    constructor() {
        super();
        this.pos = {};
        this.nav = {
            hot: {
                show: false
            },
            area: {
                show: false
            },
            date: {
                show: false
            },
            activities: {
                show: false
            }
        };
    };
    render() {
        const {
            show,
            openLayerHandle,
            closeLayerHandle
        } = this.props;

        return (
            <div className="content content3" 
                onTouchMove={e=>{this.touchMoveHandle(e)}} 
                onTouchStart={e=>{this.touchStartHandle(e)}} 
                onTouchEnd={e=>{this.touchEndHandle(e)}}>
                <ul className="clearfix nav-list" ref="nav" onClick={(e)=>{this.navTabHandle(e)}}>
                    <li className={show.hot.show?'active':''} data-name="hot">热门报道</li>
                    <li className={show.area.show?'active':''} data-name="area">展区风采</li>
                    <li className={show.date.show?'active':''} data-name="date">大会日程</li>
                    <li className={show.activities.show?'active':''} data-name="activities">往期回顾</li>
                </ul>
                <Hot 
                    show={show}
                    openLayerHandle={openLayerHandle}
                    closeLayerHandle={closeLayerHandle}    
                />
                <Area
                    show={show}
                    openLayerHandle={openLayerHandle}
                    closeLayerHandle={closeLayerHandle}   
                />
                <Date
                    show={show}
                />
                <Activities
                    show={show}
                />
            </div>
        );
    };
    touchStartHandle(e) {
        const touch = e.touches[0];
        this.pos.startPosX = touch.pageX;
    };
    touchMoveHandle(e) {
        const touch = e.touches[0];
        this.pos.endPosX = touch.pageX;
    };
    touchEndHandle(e) {
        const deltaX = this.pos.endPosX - this.pos.startPosX;
        if (deltaX > 60) {
            setTimeout(() => {
                this.props.onTouchHandle(true);
                this.props.navTabHandle({
                    hot: {
                        show: false
                    },
                    area: {
                        show: false
                    },
                    date: {
                        show: false
                    },
                    activities: {
                        show: false
                    }
                });
            }, 400);
        }
    };
    navTabHandle(e) {
        const li = $(e.target);
        const name = li.data('name');
        for (let x in this.nav) {
            if (name == x) {
                this.nav[x].show = true;
            } else {
                this.nav[x].show = false;
            }
        }
        this.props.navTabHandle(this.nav);
    };
};

export default Detail;