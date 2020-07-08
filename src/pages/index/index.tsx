import Taro, { useEffect } from '@tarojs/taro';
import { View, Ad } from '@tarojs/components';
import { AtTabs, AtTabsPane } from 'taro-ui';
import { useSelector, useDispatch } from '@tarojs/redux';
import ListView from 'taro-listView';

import './index.scss';

import { actions } from '../../store/actions';
import SearchPut from '../../components/searchPut';
import MovieList from '../../components/movieList';

function Index() {
  const { data, tabCurrent, isStop } = useSelector(
    (state: any) => state.counter,
  );
  let len = data && data.length;
  const dispatch = useDispatch();
  const list = [
    { title: '热门推荐' },
    { title: '电影' },
    { title: '电视剧' },
    { title: '动漫' },
    { title: '综艺' },
  ];

  useEffect(() => {
    dispatch(actions.getDataList());
  }, []);

  function tabToggle(value: number) {
    dispatch(actions.resetData());
    dispatch(actions.setPage(0));
    dispatch(actions.setStopA(false));
    dispatch(actions.setTabCurrent(value));
    dispatch(actions.getDataList());
  }

  Taro.showShareMenu({
    withShareTicket: true,
  });

  function onPullDownRefresh() {
    dispatch(actions.getDataList());
  }

  const onScrollToLower = () => {
    if (!isStop) {
      dispatch(actions.setPage());
      dispatch(actions.getDataList());
    }
  };
  return (
    <View className="index_conainer">
      <View className="search_view">
        <SearchPut isJump={true} />
      </View>
      <View className="adconainer">
        <Ad
          unitId="adunit-70cf5c3bd6045384"
          ad-type="grid"
          grid-opacity="0.8"
          grid-count="5"
          ad-theme="white"
        />
      </View>
      <View className="tab_view">
        <AtTabs current={tabCurrent} tabList={list} onClick={tabToggle}>
          {list.map((item, index) => {
            return (
              <AtTabsPane current={tabCurrent} index={index}>
                <ListView
                  isLoaded={true}
                  hasMore={true}
                  isEmpty={len > 0 ? false : true}
                  footerLoadingText={isStop ? '已经到底了' : '加载中...'}
                  autoHeight
                  distanceToRefresh={50}
                  onScrollToLower={onScrollToLower}
                  onPullDownRefresh={onPullDownRefresh}
                  lazyStorage="lazyViewBlock"
                >
                  <MovieList data={data} />
                </ListView>
              </AtTabsPane>
            );
          })}
        </AtTabs>
      </View>
    </View>
  );
}

Index.config = {
  navigationBarTitleText: '首页',
};

export default Index;
