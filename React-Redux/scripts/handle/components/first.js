import React, {
    Component
} from 'react';

class First extends Component {
    constructor() {
        super();
        this.pos = {};
    };
    render() {
        return (
            <div className="content content1" onTouchMove={e=>{this.touchMoveHandle(e)}} onTouchStart={e=>{this.touchStartHandle(e)}} onTouchEnd={e=>{this.touchEndHandle(e)}}>
                <div className="main">
                    <div className="arrow"><img src="React-Redux-work/images/2.png" alt=""/></div>
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
        if (deltaX < -60) {
            setTimeout(() => {
                this.props.onTouchHandle(true);
            }, 400);
        } else if (deltaX > 60) {
            setTimeout(() => {
                this.props.onTouchHandle(false);
            }, 400);
        }
    };
};

export default First;