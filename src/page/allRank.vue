<style scoped>
.layout-nav{
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
.ivu-layout-content{
  margin:20px auto;
}
.ivu-card-body .content{
  height: calc(100vh - 170px);
}
.totals{
  float: right;
}
.totals .number{
  color: #333;
  font-size: 22px;
  font-style: normal;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
              <HeaderTop selectNum='4'></HeaderTop>
            </Header>
            <Content :style="{padding: '0 50px'}">
               <!-- 总榜 -->
              <div>
                <Card>
                    <div class="content" ref="table" id="allRank">
                      <Table :loading="allList.loading"  class="ivu-table-auto" border :height="wh" :columns="batchColumns" :data="allList.list"></Table>
                    </div>
                </Card>
              </div>
            </Content>
        </Layout>
    </div>
</template>
<script>
import XHR from '../api'
import HeaderTop from '../components/header-top'
export default {
  data () {
    return {
      batchColumns: [
        {
          title: '索引',
          type: 'index'
        },
        {
          title: '昵称',
          key: 'nickname'
        },
        {
          title: '得分',
          key: 'total'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '省份',
          key: 'province'
        }
      ], // table数据内容
      wh: 400,
      value1: '',
      tabValue: 'name1',
      time: '',
      batch: '',
      page: 0,
      loading: false,
      loamore: false,
      allList: {
        list: [],
        loading: false,
        loamore: false,
        page: 0
      }
    }
  },
  components: {
    HeaderTop
  },
  created () {
    this.getAllList()
  },
  mounted () {
    this.wh = this.$refs.table.offsetHeight
  },
  methods: {
    getAllList () {
      let json = {
        project: 'king_of_answer',
        page: this.allList.page,
        size: 100,
        time: +new Date()
      }
      XHR.getTop(json).then(res => {
        let {status, data} = res.data
        if (!status) {
          if (data.length) {
            this.allList.loading = false
            this.allList.loamore = false
            this.allList.list = [...this.allList.list, ...data]
          } else {
            this.allList.loamore = true
          }
          this.$nextTick(() => {
            setTimeout(() => {
              let tables = document.querySelector('#allRank .ivu-table-overflowY')
              tables.addEventListener('scroll', e => {
                if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight && !this.allList.loamore) {
                  this.allList.loamore = true
                  this.allList.loading = true
                  this.allList.page++
                  this.getAllList()
                }
              })
            }, 200)
          })
        }
      })
    }
  }
}
</script>
