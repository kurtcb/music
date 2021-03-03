import exporter from "vue-awesome-swiper/dist/exporter";

import mode from './modeType'
export default {
    isFullScreen:false,
    isShowMiniPlayer:false,
    isShowListPlayer:false,
    isPlaying:false,
    songs:[],
    currentSong:{},
    currentIndex:0,
    modeType:mode.loop,
    currentLyric:{},
    curTime:0,
    favorateList:[],
    historyList:[],
}