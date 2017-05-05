import React, {
    Component
} from 'react';

// anim
import QueueAnim from 'rc-queue-anim';

class Activities extends Component {
    render() {
        const {
            activities
        } = this.props.show;

        return (
            <QueueAnim className={activities.show?'main active':'main'} type="scale">
                {activities.show?[
                    <div style={{display:'none'}} className="return-index" key="return-index"><img src={require('../../../../images/16.png')} alt=""/></div>,
                    <div className="review-main1" key="review-main1">
                        <img src={require('../../../../images/9.png')} alt=""/>
                    </div>,
                    <div className="review-main2" key="review-main2">
                        <a href="http://topic.it168.com/game/huawei2016/"><img src={require('../../../../images/10.png')} alt=""/></a>
                    </div>,
                    <div className="review-main3" key="review-main3">
                        <a href="http://topic.it168.com/game/huawei201503/"><img src={require('../../../../images/11.png')} alt=""/></a>
                    </div>,
                    <div className="review-main4" key="review-main4">
                        <a href="http://www.it168.com/remen/huawei2014/"><img src={require('../../../../images/12.png')} alt=""/></a>
                    </div>,
                    <div className="review-main5" key="review-main5">
                        <img src={require('../../../../images/13.png')} alt=""/>
                    </div>,
                    <div className="review-main6" key="review-main6">
                        <img src={require('../../../../images/14.png')} alt=""/>
                    </div>
                ]:null}
            </QueueAnim>
        );
    };
};

export default Activities;