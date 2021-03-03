import { getSongDetail, getSongLyric,getSongURL } from '../api/index'
export default {
  setFullScreen({ commit }, flag) {
    commit('changeFullScreen', flag)
  },
  setMiniPlayer({ commit }, flag) {
    commit('changeMiniPlayer', flag)
  },
  setListPlayer({ commit }, flag) {
    commit('changeListPlayer', flag)
  },
  setIsPlaying({ commit }, flag) {
    commit('changeIsPlaying', flag)
  },
  async setSongDetail({ commit }, ids) {
    let result = await getSongDetail({ ids: ids.join(',') })
    let urls = await getSongURL({ id: ids.join(',') })
    // console.log(urls);
    let list = []
    result.songs.forEach(function (value,i) {
      let obj = {}
      // obj.url = urls.data[i].url
      for(let j=0;j<urls.data.length;j++){
        let item=urls.data[j]
        if (value.id===item.id){
          obj.url=item.url
          break
        }
      }
      
      obj.name = value.name
      let singer = ''
      value['ar'].forEach(function (item, index) {
        if (index === 0) {
          singer = item.name
        } else {
          singer += '/' + item.name
        }
      })
      obj.singer = singer
      obj.picUrl = value['al'].picUrl
      obj.id=value.id
      list.push(obj)
    })
    commit('changeSongDetail', list)
  },
  setModeType({ commit }, flag) {
    commit('changeModeType', flag)
  },
  async getSongLyric({ commit }, id) {
    let result = await getSongLyric({ id: id })
    // console.log(result.lrc.lyric)
    let obj=parseLyric(result.lrc.lyric)
    // console.log(obj);
    commit('changeCurrentLyric', obj)
  },
  setDelSong({ commit }, index) {
    commit('changDelSong', index)
  },
  setCurrentIndex({ commit }, index) {
    commit('changCurrentIndex', index)
  },
  setCurTime({ commit }, flag) {
    commit('changeCurTime', flag)
  },
  setFavorateList({ commit }, song) {
    commit('changeFavorateList', song)
  },
  setFavorateSong({ commit }, list) {
    commit('changeFavorateSong', list)
  },
  setHistorySong({ commit }, song) {
    commit('changeHistorySong', song)
  },
  setHistoryList({ commit }, list) {
    commit('changeHistoryList', list)
  },

  
}
// 格式化歌词方法
function parseLyric (lrc) {
  let lyrics = lrc.split('\n')
  // [00:00.000] 作曲 : 林俊杰
  // 1.定义正则表达式提取[00:00.000]
  let reg1 = /\[\d*:\d*\.\d*\]/g
  // 2.定义正则表达式提取 [00
  let reg2 = /\[\d*/i
  // 3.定义正则表达式提取 :00
  let reg3 = /\:\d*/i
  // 4.定义对象保存处理好的歌词
  let lyricObj = {}
  lyrics.forEach(function (lyric) {
    // 1.提取时间
    let timeStr = lyric.match(reg1)
    if (!timeStr) { return }
    timeStr = timeStr[0]
    // 2.提取分钟
    let minStr = timeStr.match(reg2)[0].substr(1)
    // 3.提取秒钟
    let secondStr = timeStr.match(reg3)[0].substr(1)
    // 4.合并时间, 将分钟和秒钟都合并为秒钟
    let time = parseInt(minStr) * 60 + parseInt(secondStr)
    // 5.处理歌词
    let text = lyric.replace(reg1, '').trim()
    // 6.保存数据
    lyricObj[time] = text
  })
  return lyricObj
}
