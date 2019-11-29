import { mapState, mapMutations } from 'vuex'
import localforage from 'localforage'
import { convertQueriesToStr } from '@/utils/helpers'
import { openWindow } from '../../common/util/openWindow'

export const ReaderMixins = {
  data() {
    return {
      readerDialog: false,
      readerParams: {},
      readerId: '',
    }
  },
  methods: {
    async goReader(id, item = {}) {
      if (!this.$isUserLogin()) {
        return
      }
      if (!this.userInfo || !this.userInfo.vip) {
        this.TOGGLE_VIP_PANEL(true)
        return
      }
      let query = convertQueriesToStr({
        id,
        ...item,
      })
      let url = `${location.pathname}#/reader${query}`
      openWindow(url)
    },
    tabClickHandle(row) {
      this.goReader(row.book_id, {
        chapterRid: row.catalog_pid,
        chapterId: row.b_id,
      })
      return
      this.$goRead({
        readerId: row.book_id,
        params: { chapterRid: row.catalog_pid, chapterId: row.b_id }, //chapterRid - 根id chapterId - 章节id
      })
    },
    ...mapMutations('panel', ['TOGGLE_LOGIN_PANEL', 'TOGGLE_VIP_PANEL']),
  },
  computed: {
    ...mapState('user', {
      userInfo: state => state.info,
    }),
  },
}
