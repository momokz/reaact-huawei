import React, {
    Component
} from 'react';

// anim
import QueueAnim from 'rc-queue-anim';

// fetch
import promise from 'es6-promise';
promise.polyfill();
import 'isomorphic-fetch';

class Date extends Component {
    constructor() {
        super()
        this.scheduleFirstDatas = [];
        this.scheduleSecDatas = [];
    };
    componentDidMount() {
        // fetch first
        const scheduleFirstData = 'http://topic.it168.com/factory/huawei1703/reactjs/json/schedule-first.json';
        fetch(scheduleFirstData)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then(firstData => {
                firstData.forEach((item, index) => {
                    this.scheduleFirstDatas.push(
                        <li key={index}>
                            <span>{item.time}</span>
                            {item.text}
                        </li>
                    );
                });
            })

        // fetch scheduleSecData
        const scheduleSecData = 'http://topic.it168.com/factory/huawei1703/reactjs/json/schedule-sec.json';
        fetch(scheduleSecData)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error('Bad response from server');
                }
                return response.json();
            })
            .then(secData => {
                secData.forEach((item, index) => {
                    this.scheduleSecDatas.push(
                        <li key={index}>
                            <span>{item.time}</span>
                            {item.text}
                        </li>
                    );
                });
            })
    };
    render() {
        const {
            date
        } = this.props.show;

        return (
            <QueueAnim className={date.show?'main active':'main'} type={['right', 'left']}>
                {date.show?[
                    <div className="title" key="title">大会日程</div>,
                    <div className="date-title" key="date-title1">3月9日 主会场日程</div>,
                    <div className="date-main1" key="date-main1">
                        <QueueAnim type={['right', 'left']} component="ul" className="date-list">
                            {date.show?this.scheduleFirstDatas:null}
                            <div className="date-comment" key="date-comment">*仅供参考，以现场安排为准</div>
                        </QueueAnim>
                    </div>,
                    <div className="date-title date-title1" key="date-title2">3月10日 主会场日程</div>,
                    <div className="date-main1 date-main2" key="date-main2">
                        <QueueAnim type={['right', 'left']} component="ul" className="date-list">
                            {date.show?this.scheduleSecDatas:null}
                        </QueueAnim>
                    </div>
                ]:null}
            </QueueAnim>
        );
    };
};

export default Date;