// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        uncookedCounter: {
            default: null,
            type: cc.Label
        },
        connectionDisplay: {
            default: null,
            type: cc.Label
        },
        player1Count: {
            default: null,
            type: cc.Label
        },
        player2Count: {
            default: null,
            type: cc.Label
        },
        plusBtn: {
            default: null,
            type: cc.Button
        },
        minusBtn: {
            default: null,
            type: cc.Button
        },
        cookBtn: {
            default: null,
            type: cc.Button
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad() {
        this.uncooked = 0;
        this.uncookedCounter.string = this.uncooked;
    },

    start () {

    },

    plusBtnOnClicked () {
        this.uncooked++;
    },

    minusBtnOnClicked () {
        if((this.uncooked - 1) < 0)
            return
        else
            this.uncooked--;
    },

    cookBtnOnClicked () {

    },

    update(dt) {
        this.uncookedCounter.string = this.uncooked;
    }
    // update (dt) {},
});
