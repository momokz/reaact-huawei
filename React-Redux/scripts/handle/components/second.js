import React, {
    Component
} from 'react';

class Second extends Component {
    constructor() {
        super();
        this.pos = {};
    };
    render() {
        const {
            secondState
        } = this.props;
        return (
            <div className="content content2" ref="second" onTouchMove={e=>{this.touchMoveHandle(e)}} onTouchStart={e=>{this.touchStartHandle(e)}} onTouchEnd={e=>{this.touchEndHandle(e)}}>
                <div className="main">
                    <div className="title">大会介绍</div>
                    <img src="React-Redux-work/images/4.png" alt="" className="anim-img1" className={secondState?'anim-img1':''}/>
                </div>
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
        if (deltaX < -60 || deltaX > 60) {
            setTimeout(() => {
                this.props.onTouchHandle(false);
            }, 400);
        }
        if (deltaX < -60) {
            this.props.navTabHandle({
                hot: {
                    show: true
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
        }
    };
};

export default Second;