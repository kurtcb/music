// 这个JS文件就是专门用于管理请求各种接口地址的
import network from './network'
import Network from './network'

// 封装各种接口请求
export const getBanner = () => Network.get('banner?type=2')
export const getPersonalized = () => Network.get('personalized?limit=6')
export const getNewAlbum = () => Network.get('album/newest')
export const getNewSong = () => Network.get('/personalized/newsong')
export const getPlayList = (data) => Network.get('playlist/detail',data)
export const getAlbum = (data) => Network.get('album',data)
export const getSongDetail = (data) => Network.get('song/detail',data)
export const getSongLyric = (data) => Network.get('lyric', data)
export const getSongURL = (data) => Network.get('song/url', data)
export const getArtistsSong = (data) => Network.get('artists', data)
// export const getHotArtists = () => F, )
export const getHotArtists = () => {
  return new Promise(function(resolve,reject){
    Network.get('top/artists?offset=0&limit=5', )
    .then(function(result){
      resolve(result.artists)
    })
    .catch(function(err){
      reject(err)
    })
  })
}
export const getLetterArtists = (letter) => {
  return new Promise(function(resolve,reject){
    let letterArtists = []
    Network.all([
      Network.get(`artist/list?offset=0&limit=5&area=7&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&area=96&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&area=16&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&area=8&initial=${letter}`),
      Network.get(`artist/list?offset=0&limit=5&area=0&initial=${letter}`),
      // Network.get(`artist/list?offset=0&limit=5&area=96&initial=${letter}`)
    ])
      .then(function (result) {
        // console.log(result)
        result.forEach(function (item) {
          letterArtists.push(...item.artists)
        })
        // console.log(letterArtists)
        resolve(letterArtists)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getAllArtists = (letter) => {
  return new Promise(function (resolve, reject) {
    let keys = ['热']
    let list = [getHotArtists()]
    for (let i = 65; i < 91; i++) {
      let char = String.fromCharCode(i)
      keys.push(char)
      list.push(getLetterArtists(char))
    }
    Network.all(list)
      .then(function (result) {
        let obj = {}
        obj.keys = keys
        obj.list = result
        resolve(obj)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopListDetail = () => {
  return new Promise (function(resolve,reject){
    let category = {
      officialList: [
        { name: '飙升榜', id: 19723756 },
        { name: '新歌榜', id: 3779629 },
        { name: '原创榜', id: 2884035 },
        { name: '热歌榜', id: 3778678 }
      ],
      recList: [
        { name: '云音乐说唱榜', id: 991319590 },
        { name: '云音乐电音榜', id: 1978921795 },
        { name: '潜力爆款榜', id: 5338990334 },
        { name: '云音乐古风榜', id: 5059642708 },
        { name: '云音乐ACG榜', id: 71385702 },
        { name: '云音乐古典榜', id: 71384707 }
      ],
      globalList: [
        { name: '美国Billboard榜', id: 60198 },
        { name: 'UK排行榜周榜', id: 180106 },
        { name: 'Beatport全球电子舞曲榜', id: 3812895 },
        { name: '日本Oricon榜', id: 60131 },
        { name: 'iTunes榜', id: 11641012 },
        { name: "KTV唛榜", id: 21845217 }
      ],
      otherList: [
        { name: '云音乐摇滚榜', id: 5059633707 },
        { name: '法国 NRJ Vos Hits 周榜', id: 27135204 },
        { name: "云音乐欧美新歌榜", id: 2809513713 },
        { name: '云音乐韩语榜', id: 745956260 },
        { name: '云音乐日语榜', id: 5059644681 },
        { name: '云音乐欧美热歌榜', id: 2809577409 }
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('toplist/detail')
      .then(function (data) {
        data.list.forEach(function (obj) {
          let flag = false
          for (let key in category) {
            for (let i = 0; i < category[key].length; i++) {
              if (category[key][i].name === obj.name) {
                category[key][i].rank = obj
                flag = true
                break
              }
            }
            if (flag) {
              break
            }
          }
        })
        resolve(category)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}
export const getTopList = (data) => Network.get('top/list', data)
export const getSearchList = (data) => Network.get('search?type=1', data)
export const getSearchHot = () => Network.get('search/hot')