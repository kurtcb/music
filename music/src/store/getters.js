export default {
  isFullScreen(state) {
    return state.isFullScreen
  },
  isShowMiniPlayer(state) {
    return state.isShowMiniPlayer
  },
  isPlaying(state) {
    return state.isPlaying
  },
  isShowListPlayer(state) {
    return state.isShowListPlayer
  },
 songs(state) {
    return state.songs
  },
  currentSong(state) {
    let obj={
      name:'',
      singer:'',
      picUrl:null,
      id:'',
      url:'',
    }
    if (state.songs.length!==0)
    {obj=state.songs[state.currentIndex]}
    return obj
  },
  modeType(state) {
    return state.modeType
  },
  currentLyric(state) {
    return state.currentLyric
  },
  currentIndex(state) {
    return state.currentIndex
  },
  curTime(state) {
    return state.curTime
  },
  favorateList(state) {
    return state.favorateList
  },
  historyList(state) {
    return state.historyList
  },
}