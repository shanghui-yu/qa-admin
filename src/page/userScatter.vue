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
                <Menu mode="horizontal" theme="dark" active-name="2" @on-select="onSelect">
                    <div class="layout-nav">
                        <MenuItem name="1"><Icon type="ios-navigate"></Icon>用户信息</MenuItem>
                        <MenuItem name="2"><Icon type="ios-navigate"></Icon>用户分布</MenuItem>
                    </div>
                </Menu>
            </Header>
            <Content :style="{padding: '0 50px'}">
                <Card>
                    <div class="content" ref="table">
                      <Table class="ivu-table-auto" border :height="wh" :columns="columns" :data="allData"></Table>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
import XHR from '../api'
export default {
  data () {
    return {
      columns: [
        {
          title: '地区',
          key: 'province'
        },
        {
          title: '人数',
          key: 'total'
        }
      ], // table数据内容
      allData: [],
      wh: 400,
      total:0
    }
  },
  created () {
    this.getUserTotalByProvince()
    this.total = localStorage.getItem('total')
  },
  mounted () {
    this.wh = this.$refs.table.offsetHeight
  },
  methods: {
    getUserTotalByProvince () {
      XHR.getUserTotalByProvince().then(res => {
        let {status, data} = res.data
        if (!status) {
          let datas = this.packing(data)
          this.allData = datas
        }
      })
    },
    packing(datas){
      let totalNum = 0
      if(datas && datas.length){
        datas.forEach(element => {
          totalNum = parseInt(element.total)+totalNum
        })
      }
      let json = {
        province:'其他',
        total:parseInt(this.total) - totalNum
      }
      datas.push(json)
      return datas
    },
    pageChange (e) {
      this.page = e - 1
      this.getUserList()
    },
    onSelect(name){
      switch (name) {
        case '1':
          this.$router.replace('/Home/')
          break;
        case '2':
          this.$router.replace('/UserScatter/')
          break;
      }
    }
  }
}
</script>
