class RomeBoyMatchvsRep extends egret.EventDispatcher {

    private static _instance;


    private constructor() {
        super();
        MatchvsData.MatchvsRep.initResponse = this.initRsp.bind(this);
        MatchvsData.MatchvsRep.registerUserResponse = this.registerUserRsp.bind(this);
        MatchvsData.MatchvsRep.loginResponse = this.loginRsp.bind(this);
        MatchvsData.MatchvsRep.joinRoomResponse = this.joinRsp.bind(this);
        MatchvsData.MatchvsRep.joinRoomNotify = this.joinRoomNotify.bind(this);
        MatchvsData.MatchvsRep.createRoomResponse = this.createRoomRsp.bind(this);
        MatchvsData.MatchvsRep.leaveRoomNotify = this.leaveRoomNotify.bind(this);
        MatchvsData.MatchvsRep.leaveRoomResponse = this.leaveRoomRsp.bind(this);
        MatchvsData.MatchvsRep.kickPlayerResponse = this.kickPlayerRsp.bind(this);
        MatchvsData.MatchvsRep.kickPlayerNotify = this.KickPlayerNotify.bind(this);
        MatchvsData.MatchvsRep.networkStateNotify = this.networkStateNotify.bind(this);
        MatchvsData.MatchvsRep.teamNetworkStateNotify = this.teamNetworkStateNotify.bind(this);
        //todo 添加全局的一个异常监听
        MatchvsData.MatchvsRep.errorResponse = this.errorResponse.bind(this);
        MatchvsData.MatchvsRep.getRoomDetailResponse = this.getRoomDetailResponse.bind(this);
        MatchvsData.MatchvsRep.sendEventResponse = this.sendEventResponse.bind(this);
        MatchvsData.MatchvsRep.sendEventNotify = this.sendEventNotify.bind(this);
        MatchvsData.MatchvsRep.createTeamResponse = this.createTeamResponse.bind(this);
        MatchvsData.MatchvsRep.joinTeamResponse = this.joinTeamResponse.bind(this);
        MatchvsData.MatchvsRep.joinTeamNotify = this.joinTeamNotify.bind(this);
        MatchvsData.MatchvsRep.leaveTeamResponse = this.leaveTeamResponse.bind(this);
        MatchvsData.MatchvsRep.leaveTeamNotify = this.leaveTeamNotify.bind(this);
        MatchvsData.MatchvsRep.teamMatchResponse = this.teamMatchResponse.bind(this);
        MatchvsData.MatchvsRep.teamMatchStartNotify = this.teamMatchStartNotify.bind(this);
        MatchvsData.MatchvsRep.teamMatchResultNotify = this.teamMatchResultNotify.bind(this);
        MatchvsData.MatchvsRep.gameServerNotify = this.gameServerNotify.bind(this);
        MatchvsData.MatchvsRep.setReconnectTimeoutResponse = this.setReconnectTimeoutResponse.bind(this);
        MatchvsData.MatchvsRep.setTeamReconnectTimeoutResponse = this.setTeamReconnectTimeoutResponse.bind(this);
    }

    public static get getInstance(): RomeBoyMatchvsRep {
        if (this._instance == null) {
            this._instance = new RomeBoyMatchvsRep();
        }
        return this._instance;
    }


	/**
     * 引擎初始化回调
     */
    initRsp = function (status) {
        if (status === 200) {
            egret.log("初始化成功" + status);
            // RombBoyMatchvsEngine.getInstance.registerUser();
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_INIT, false, false, status));
        } else {
            egret.log("初始化失败，错误码" + status);
        }
    }

    /**
     * 注册
     */
    registerUserRsp = function (userInfo) {
        if (userInfo.status == 0) {
            egret.log("注册成功" + userInfo.status);
            GameData.userID = userInfo.userID;
            GameData.avatar = userInfo.avatar;
            console.log("GameData.userID:" + GameData.userID);
            console.log("GameData.avatar:" + GameData.avatar);
            // RombBoyMatchvsEngine.getInstance.login(userInfo.id,userInfo.token);
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_REGISTERUSER, false, false, userInfo));
        } else {
            egret.log("注册失败，错误码：" + userInfo.status);
        }

    }

    /**
     * 登录
     */
    loginRsp = function (loginRsp) {
        egret.log("登录:" + loginRsp.status);
        // 没有断线重连功能，登陆成功后发现还再房间中就退出房间
        // if(loginRsp.roomID != undefined && loginRsp.roomID != "") {
        //     RombBoyMatchvsEngine.getInstance.leaveRoom("");
        // }
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LOGIN, false, false, loginRsp));
    }

    /**
     * 进入房间的回调
     */
    joinRsp = function (status, roomUserInfonList, roomInfo) {
        if (status == 200) {
            egret.log("进入房间成功" + status);
            roomUserInfonList.roomID = roomInfo.roomID;
            roomUserInfonList.ownerId = roomInfo.ownerId;
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_JOINROOM_RSP, false, false, roomUserInfonList));
        } else {
            egret.log("进入房间失败，错误码：" + status);
            Toast.show("进入房间失败");
        }
    }

    /**
     * 其他玩家进入房间回调
     */
    joinRoomNotify = function (roomUserInfon) {
        egret.log(roomUserInfon.userId + "进入了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_JOINROOM_NOTIFY, false, false, roomUserInfon));
    }

    /**
     * 其他玩家离开房间通知
     */
    leaveRoomNotify = function (leaveRoomNotify) {
        egret.log(leaveRoomNotify.userId + "离开了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LEVAE_ROOM_NOTIFY, false, false, leaveRoomNotify));
    }

    /**
     * 离开房间回调函数
     */
    leaveRoomRsp = function (leaveRoomRsp) {
        egret.log("自己离开了房间");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_LEVAE_ROOM, false, false, leaveRoomRsp));
    }

    /**
     * 创建房间成功回调
     */
    createRoomRsp = function (createRoomRsp) {
        // if (createRoomRsp.status == 200) {
        // egret.log("进入房间成功");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_CREATE_ROOM, false, false, createRoomRsp));
        // } else {
        // egret.log("进入房间失败："+createRoomRsp.status);
        // }
    }

    /**
     * 踢出玩家的回调
     */
    kickPlayerRsp = function (kickPlayerRsp) {
        if (kickPlayerRsp.status == 200) {
            egret.log("玩家" + kickPlayerRsp.userID + "踢出房间成功");
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_KICK_PLAYER, false, false, kickPlayerRsp));
        } else {
            egret.log("玩家" + kickPlayerRsp.userID + "踢出房间失败 status" + kickPlayerRsp.status);
        }
    }

    /**
     * 有玩家被踢出的通知
     */
    KickPlayerNotify = function (KickPlayerNotify) {
        egret.log("通知玩家" + KickPlayerNotify.userId + "被踢出");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_KICK_PLAYER_NOTIFY, false, false, KickPlayerNotify));
    }

    /**
     * 错误回调
     */
    public errorResponse = function (errCode: number, errMsg: string) {
        console.log("errCode：" + errCode + " errMsg:" + errMsg);
        if (errCode == 1001) {
            if (errMsg != "" && errMsg.indexOf("hotel") >= 0) {
                errCode = 1002; //这里自定义把hotel断开改为 1002
            }
        }
        let data = {
            code: errCode,
            msg: errMsg
        }
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_ERROR, false, false, data));
    }

    /**
     * 排行榜正确回调
     */
    public onMsg(buf) {
        var buf = JSON.parse(buf);
        //var listData = this.ab2str(egret.Base64Util.decode(buf.data.dataList[0].value));
        // var listData = ArrayTools.Base64Decode(buf.data.dataList[0].value);
        // this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_RANK_LIST,false,false,listData));
    }

    public onErr(errCode, errMsg) {
        egret.log(errCode, errMsg);
    }

    /**
     * 获取房间详情
     */
    getRoomDetailResponse = function (rsp) {
        console.log("获取房间详情成功");
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_ROOM_DETAIL_RSP, false, false, rsp));
    }

    /**
     * 有人房间状态出现异常时回调
     */
    private networkStateNotify(netnotify: MsNetworkStateNotify) {
        let event = { userID: netnotify.userID, state: netnotify.state };
        egret.log("networkStateNotify", event);
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_NETWORKSTATE, false, false, event));
    }
    private teamNetworkStateNotify(netnotify: MsNetworkStateNotify) {
        console.log("teamNetworkStateNotify"+netnotify)
        egret.log("MATCHVS_TEAM_NETWORKSTATE", event);
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_TEAM_NETWORKSTATE, false, false, netnotify));
    }

    /**
     * 发送消息回调
     */
    private sendEventResponse(sendEventRsp) {
        if (sendEventRsp.status === 200) {
            this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_SEND_EVENT_RSP, false, false, sendEventRsp));
        } else {
            console.log("发送消息失败 status" + sendEventRsp.status);
        }
    }

    /**
     * 收到消息通知
     */
    private sendEventNotify(eventInfo) {
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_SEND_EVENT_NOTIFY, false, false, eventInfo));
        console.log("收到消息 status" + eventInfo);
    }

    /**
     * 创建队伍回调
     */
    private createTeamResponse(rsp) {
        var player = { "userID": GameData.userID, "avatar": GameData.avatar };
        this.teamUserInfoListChangeNotify([], "createTeam", player, rsp.owner, rsp.teamID, rsp.status);
        // this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_CREATE_TEAM_RSP,false,false,rsp));
        console.log("[RSP]createTeamResponse:" + JSON.stringify(rsp));
    }

    /**
     * 加入队伍回调
     */
    private joinTeamResponse(rsp) {
        var player = { userID: GameData.userID, avatar: GameData.avatar };
        for (var i = 0; i < rsp.userList; i++) {
            rsp.userList[i].avatar = rsp.userList[i].userProfile; 
        }
        this.teamUserInfoListChangeNotify(rsp.userList, "joinTeam", player, rsp.team.owner, rsp.team.teamID, rsp.status);
        console.log("[RSP]joinTeamResponse:" + JSON.stringify(rsp));
    }

    /**
     * 其他玩家加入队伍通知
     */
    private joinTeamNotify(notify) {
        var player = { userID: notify.user.userID, avatar: notify.user.userProfile };
        this.teamUserInfoListChangeNotify([], "joinTeamNotify", player, 0);
    }

    /**
     * 离开小队回调
     */
    private leaveTeamResponse(rsp) {
        var player = { userID: rsp.userID };
        this.teamUserInfoListChangeNotify([], "leaveTeam", player, 0);
    }

    /**
     * 离开小队通知
     */
    private leaveTeamNotify(rsp) {
        var player = { userID: rsp.userID };
        console.log("leaveTeamNotify:"+JSON.stringify(rsp));
        this.teamUserInfoListChangeNotify([], "leaveTeam", player, rsp.owner);
    }


    private leaderID;

    /**
     * 小队内玩家变化通知
     */
    private teamUserInfoListChangeNotify(data, action, player, ownerID, teamID?, status?) {
        switch (action) {
            case "createTeam":
                MatchvsData.TeamPlayerArray = data;
                MatchvsData.TeamPlayerArray.push(player);
                this.leaderID = ownerID;
                break;
            case "joinTeam":
                MatchvsData.TeamPlayerArray = data;
                this.leaderID = ownerID;
                break;
            case "joinTeamNotify":
                for (var t = 0 ; t < MatchvsData.TeamPlayerArray.length; t++) {
                    if (MatchvsData.TeamPlayerArray[t].userID === "") {
                          MatchvsData.TeamPlayerArray.splice(t, 1);
                          t--;
                    }
                }
                MatchvsData.TeamPlayerArray.push(player);
                break;
            case "leaveTeam":
                this.leaderID = ownerID === 0 ? this.leaderID: ownerID;
                if (player.userID === GameData.userID) {
                    MatchvsData.TeamPlayerArray.length = 0;
                } else {
                    for (var i = 0; i < MatchvsData.TeamPlayerArray.length; i++) {
                        if (MatchvsData.TeamPlayerArray[i].userID === player.userID || MatchvsData.TeamPlayerArray[i].userID === "") {
                            MatchvsData.TeamPlayerArray.splice(i, 1);
                            i--;
                        }
                    }
                }
                break;
        }
        MatchvsData.TeamPlayerArray.sort(SortUtils.sortNumber)
        for (var a = 0; a < MatchvsData.TeamPlayerArray.length; a++) {
            if ( this.leaderID === MatchvsData.TeamPlayerArray[a].userID) {
                if (a !== 0 ) {
                    SortUtils.swapArray(MatchvsData.TeamPlayerArray, a, 0);
                    break;
                }
            }
        }
        var rsp = { data: MatchvsData.TeamPlayerArray, action: action, player: player, ownerID: this.leaderID, teamID: teamID, status: status };
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_TEAM_USER_INFO_NOTIFY, false, false, rsp));
    }




    /**
     * 发起匹配回调
     */
    private teamMatchResponse(rsp) {
        this.teamMatchStar(rsp);
    }

    /**
     * 发起匹配通知
     */
    private teamMatchStartNotify(notify) {
        notify.status = 200;
        this.teamMatchStar(notify);
    }

    /**
     * 匹配成功通知。
     */
    private teamMatchResultNotify(notify) {
        console.log("teamMatchResultNotify:"+JSON.stringify(notify));
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_TEAM_MATCH_RESULT_NOTIFY, false, false, notify));
    }


    private teamMatchStar(rsp) {
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_TEAM_MATCH_STAR, false, false, rsp));
    }

    /**
     * gameServer推送消息
     */
    private gameServerNotify(eventInfo) {
        // console.log("gameServerNotify:"+JSON.stringify(eventInfo));
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_GAME_SERVER_NOTIFY,false,false,eventInfo));
    }
    private setReconnectTimeoutResponse(eventInfo) {
        console.log("setReconnectTimeoutResponse:"+JSON.stringify(eventInfo));
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_GAME_SERVER_NOTIFY,false,false,eventInfo));
    }
    private setTeamReconnectTimeoutResponse(eventInfo) {
        console.log("setTeamReconnectTimeoutResponse:"+JSON.stringify(eventInfo));
        this.dispatchEvent(new egret.Event(MatchvsMessage.MATCHVS_GAME_SERVER_NOTIFY,false,false,eventInfo));
    }



    private ab2str(buf) {
        return String.fromCharCode.apply(null, new Uint8Array(buf));
    }

}