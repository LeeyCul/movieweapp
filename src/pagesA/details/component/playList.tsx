import Taro, { RewardedVideoAd } from '@tarojs/taro';
import { View, Text, Button } from '@tarojs/components';
import classNames from 'classnames';
import { useSelector, useDispatch } from '@tarojs/redux';

import './playlist.scss';

import { actions } from '../../../store/actions';

interface IProps {
  style?: React.CSSProperties;
  title?: string;
  data: string;
  copy?: boolean;
  gotoPlay?: () => void;
  ids?: any;
  isJump?: boolean;
  appId?: string[];
}

function PlayList({
  ids,
  appId = [],
  style,
  title = '点击播放',
  data,
  copy = false,
  isJump = false,
  gotoPlay,
}: IProps) {
  const dataArr = data && JSON.parse(data);
  const { anthology } = useSelector((state: any) => state.counter);
  const dispatch = useDispatch();

  function handleClick(url: string, key: number) {
    if (copy) {
      Taro.setClipboardData({ data: url });
    } else {
      dispatch(actions.setAnthology(key));
      dispatch(actions.setPlayUrl(url));
      // gotoPlay && gotoPlay();
      if (isJump) {
        const myAppId = 'wxde754dca42bb4f96';
        const appIdList =
          appId.length && appId.filter(item => item !== myAppId);
        const result = appIdList
          ? appIdList[Math.floor(Math.random() * appIdList.length)]
          : '';
        let videoAd;
        // 获取当前时间
        let currentTime = new Date().getTime();
        let lastTime = Taro.getStorageSync('time');
        let temp = (currentTime - lastTime) / 1000 / 60 / 60;
        if (temp < 12) {
          Taro.navigateToMiniProgram({
            appId: result,
            path: 'pagesA/play/index',
            extraData: {
              id: ids,
              url,
              key,
            },
            envVersion: 'release',
            success: function(res) {
              console.log('res :>> ', res);
              // 打开成功
            },
          });
        } else {
          Taro.showModal({
            title: '提示',
            content: '每天观赏一次广告可解锁所有视频观看，快去观看吧！',
            showCancel: false,
            success: res => {
              if (res.confirm) {
              }
            },
          });
          if (Taro.createRewardedVideoAd) {
            videoAd = Taro.createRewardedVideoAd({
              adUnitId: 'adunit-b4aece957d251d77',
            });
            videoAd.onLoad(() => {
              console.log('广告加载成功');
            });
            videoAd.onError(err => {
              console.log('广告错误');
            });
            videoAd.onClose(res => {
              const { isEnded } = res;
              if (isEnded) {
                // 观看完毕更新时间
                let timestamp = new Date().getTime();
                Taro.setStorage({ key: 'time', data: timestamp });
                Taro.navigateToMiniProgram({
                  appId: result,
                  path: 'pagesA/play/index',
                  extraData: {
                    id: ids,
                    url,
                    key,
                  },
                  envVersion: 'release',
                  success: function(res) {
                    console.log('res :>> ', res);
                    // 打开成功
                  },
                });
              } else {
                Taro.showModal({
                  title: '提示',
                  content: '观看完视频才可以进入影片观赏',
                  showCancel: false,
                  success: function(res) {},
                });
              }
            });
          }
          if (videoAd) {
            videoAd.show().catch(() => {
              // 失败重试
              videoAd
                .load()
                .then(() => videoAd.show())
                .catch(err => {
                  console.log('激励视频 广告显示失败');
                });
            });
          }
        }
      }
    }
  }
  return (
    <View className="palylist_box">
      <Text className="title">{title}</Text>
      <View className="list">
        {dataArr &&
          dataArr.map((item, key) => {
            return (
              <Button
                key={key + ''}
                className={classNames('btn', {
                  active: key === anthology,
                })}
                style={style}
                onClick={() => handleClick(item.url, key)}
              >
                {item.name}
              </Button>
            );
          })}
      </View>
    </View>
  );
}

export default PlayList;
