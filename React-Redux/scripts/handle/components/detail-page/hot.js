import React, {
    Component
} from 'react';

// queueAnim
import QueueAnim from 'rc-queue-anim';

// fetch
// require('es6-promise').polyfill();
import promise from 'es6-promise';
promise.polyfill();
import 'isomorphic-fetch';

class Hot extends Component {
    constructor() {
        super();
        this.hots = [];
        this.hotLayers = [];
    };
    componentDidMount() {
        // fetch hotJson
        const hotJson = 'http://topic.it168.com/factory/huawei1703/reactjs/json/hot.json';
        fetch(hotJson)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(hotJson => {
                hotJson = (data => {
                    for (let i = 0; i < data.length; i++) {
                        let singe = data[i];
                        singe.imageUrl = require('../../../../images/' + singe.image);
                        data[i] = singe;
                    }
                    return data;
                })(hotJson);
                hotJson.forEach((item, index) => {
                    this.hots.push(
                        <li className="clearfix" key={index}>
                            <a href={item.href} key={index}>
                                <div className="hot-img" key="hot-img"><img src={item.imageUrl} alt=""/></div>
                                <div className="hot-main" key="hot-main">
                                    <div className="hot-title" key="hot-title">{item.title}</div>
                                    <div className="hot-text" key="hot-text">{item.text}</div>
                                </div>
                            </a>
                        </li>
                    );
                });
            });

        // fetch hotLayerJson
        const hotLayerJson = 'http://topic.it168.com/factory/huawei1703/reactjs/json/hot-layer.json';
        fetch(hotLayerJson)
            .then(response => {
                if (response.status >= 400) {
                    throw new Error("Bad response from server");
                }
                return response.json();
            })
            .then(hotLayerJson => {
                hotLayerJson.forEach((item, index) => {
                    this.hotLayers.push(
                        <li key={index}><a href={item.href}>{item.text}</a></li>
                    );
                });
            })
    };
    render() {
        const {
            hot
        } = this.props.show;

        let style = {};
        if (hot.layer) {
            style = {
                display: 'block'
            };
        } else {
            style = {
                display: 'none'
            }
        }

        return (
            <QueueAnim className={hot.show?'main active':'main'} type={['right', 'left']}>
                {hot.show?[
                    <div className="title" key="title">热门报道</div>,
                    <QueueAnim type="scale" component="ul" className="host-list" key="host-list">
                        {hot.show?this.hots:null}
                    </QueueAnim>,
                    <div className="hot-btn" key="hot-btn" onClick={()=>{this.hotHandle()}}><img src={require('../../../../images/6.png')} alt=""/></div>,
                    <div className="hot-layer" key="hot-layer" style={style}>
                        <ul>
                            {hot.show?this.hotLayers:null}
                        </ul>
                        <div className="hot-close" onClick={()=>{this.closeLayer()}}><img src={require('../../../../images/7.png')} alt=""/></div>
                    </div>
                ]:null}
            </QueueAnim>
        );
    };
    hotHandle() {
        this.props.show.hot.layer = true;
        this.props.openLayerHandle(this.props.show);
    };
    closeLayer() {
        this.props.show.hot.layer = false;
        this.props.closeLayerHandle(this.props.show);
    };
};

export default Hot;