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
  height: calc(100vh - 175px);
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <HeaderTop selectNum='1'></HeaderTop>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Card>
                    <div class="content" ref="table">
                      <Table class="ivu-table-auto" border :height="wh" :columns="columns" :data="allData"></Table>
                    </div>
                    <div style="margin-top:20px;">
                      <Page :total='total' :page-size="20" show-total @on-change="pageChange"></Page>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import XHR from '../api'
import provinces from '../../static/provinces'
import HeaderTop from '../components/header-top'
export default {
  data () {
    return {
      columns: [
        {
          title: '用户名',
          key: 'nickname'
        },
        {
          title: '省份',
          key: 'province'
        },
        {
          title: '城市',
          key: 'city'
        },
        {
          title: '用户openid',
          key: 'uid'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '性别',
          key: 'sex'
        }
      ], // table数据内容
      allData: [],
      page: 0,
      wh: 400,
      total: 0
    }
  },
  components: {
    HeaderTop
  },
  created () {
    this.getUserList()
  },
  mounted () {
    this.wh = this.$refs.table.offsetHeight
  },
  methods: {
    getUserList () {
      let json = {
        page: this.page,
        size: 20
      }
      XHR.getUserList(json).then(res => {
        let {status, data, total} = res.data
        this.total = total
        localStorage.setItem('total',total)
        if (!status) {
          let datas = this.packing(data)
          this.allData = datas
        }
      })
    },
    packing(datas){
      if(datas && datas.length){
        datas.forEach(element => {
          for (const key in provinces) {
            if(key == element.province){
              element.province = provinces[key]
            }
          }
        })
      }
      return datas
    },
    pageChange (e) {
      this.page = e - 1
      this.getUserList()
    }
  }
}
</script>
