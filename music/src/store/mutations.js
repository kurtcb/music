
export default {
      changeFullScreen(state, flag) {
            state.isFullScreen = flag
      },
      changeMiniPlayer(state, flag) {
            state.isShowMiniPlayer = flag
      },
      changeListPlayer(state, flag) {
            state.isShowListPlayer = flag
      },
      changeIsPlaying(state, flag) {
            state.isPlaying = flag
      },
      changeSongDetail(state, list) {
            state.songs = list
      },
      changeModeType(state, flag) {
            state.modeType = flag
      },
      changeCurrentLyric(state, lyric) {
            state.currentLyric = lyric
      },
      changDelSong(state, index) {
            if (index!==undefined){
                  state.songs.splice(index,1)
                
            }else{
                  state.songs =[];
                  state.isShowMiniPlayer=false;
                  state.isShowListPlayer=false;              
            }     
            if(index<state.currentIndex){
                  state.currentIndex=state.currentIndex-1
            }      
      },
      changCurrentIndex(state, index) {
            if(index<0){
                  index = state.songs.length-1
            }else if(index>state.songs.length-1){
                  index = 0
            }
                  state.currentIndex = index
                        
      },
      changeCurTime(state, flag) {
            state.curTime = flag
      },
      changeFavorateList(state, song) {
         let result=   state.favorateList.find(function(currentValue){
            return currentValue.id===song.id
            })
            if(result===undefined){
                  state.favorateList.push(song)
            }
      },
      changeFavorateSong(state, list) {
            state.favorateList = list
      },
      changeHistorySong(state, song) {
            let result = state.historyList.find(function (currentValue) {
                  return currentValue.id === song.id
                })
                if (result === undefined) {
                  if (state.historyList.length > 30) {
                    state.historyList.splice(0, 1)
                  }
                  state.historyList.push(song)
                }
         },
      changeHistoryList(state, list) {
            state.historyList = list
      },

    

}
