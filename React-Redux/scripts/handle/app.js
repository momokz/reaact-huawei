import React, {
    Component
} from 'react';

// connect
import {
    connect
} from 'react-redux';

// components
import First from './components/first';
import Second from './components/second';
import Detail from './components/detail';

// action
import {
    secondAction,
    openLayerAction,
    closeLayerAction,
    navTabAction
} from './action';

// load image
const requireContext = require.context("../../images", true, /^\.\/.*\.(jpg|png)$/);
const images = requireContext.keys().map(requireContext);
// console.log(images);

class App extends Component {
    render() {
        const {
            dispatch,
            secondReducer,
            show
        } = this.props;

        return (
            <div className="container" ref="container">
                <First
                    onTouchHandle={boolean=>{dispatch(secondAction(boolean))}}
                />
                <Second
                    onTouchHandle={boolean=>{dispatch(secondAction(boolean))}}
                    secondState={secondReducer}
                    show={show}
                    navTabHandle={show=>{dispatch(navTabAction(show))}}
                />
                <Detail
                    onTouchHandle={boolean=>{dispatch(secondAction(boolean))}}
                    show={show}
                    openLayerHandle={layer=>{dispatch(openLayerAction(layer))}}
                    closeLayerHandle={layer=>{dispatch(closeLayerAction(layer))}}
                    navTabHandle={show=>{dispatch(navTabAction(show))}}
                />
            </div>
        );
    };
    componentDidMount() {
        const container = $(this.refs.container);
        const contents = container.find('.content');
        container.css({
            width: contents.length * 6.4 + 'rem'
        });

        let iNow = 0;
        let startPos, endPos, deltaX, deltaY, moveLength;
        container.on('touchstart', function(e) {
            const touch = e.touches[0];
            startPos = {
                x: touch.pageX,
                y: touch.pageY
            };
        }).on('touchmove', function(e) {
            const touch = e.touches[0];
            endPos = {
                x: touch.pageX,
                y: touch.pageY
            };
            deltaX = endPos.x - startPos.x;
            deltaY = endPos.y - startPos.y;
            // moveLength 手指移动的距离
            moveLength = Math.sqrt(Math.pow(Math.abs(deltaX), 2) + Math.pow(Math.abs(deltaY), 2));
        }).on('touchend', function() {
            // 向左滑动
            if (deltaX < -60) {
                if (iNow == contents.length - 1) {
                    return;
                };
                iNow++;
                $(this).animate({
                    left: -6.4 * iNow + 'rem'
                });
            }
            // 向右滑动
            else if (deltaX > 60) {
                if (iNow == 0) {
                    return;
                }
                iNow--;
                $(this).animate({
                    left: -6.4 * iNow + 'rem'
                });
            }
        })
    };
};

// mapStateToProps
const mapStateToProps = state => {
    console.log(state);
    return {
        secondReducer: state.secondReducer,
        show: state.showReducer
    }
};

export default connect(mapStateToProps)(App);