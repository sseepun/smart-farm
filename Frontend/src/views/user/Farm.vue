<template>
  <div class="main-wrapper">
    <NavLeft />
    
    <div class="main-content">
      <NavTop page="ฟาร์มของฉัน" />
      
      <div v-if="farm" class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
        <div class="middle-sidebar-left pr-0">
          <div class="d-flex ai-center jc-space-between fw-wrap">
            <h2 class="fw-600 font-lg m-0 mr-3">{{farm.name}}</h2>
            <div class="btns">
              <router-link to="/user/dashboard" class="btn p-2 m-0 lh-24 w100 d-block bg-current font-xsss fw-500 text-white">
                ย้อนกลับ
              </router-link>
            </div>
          </div>
          <div class="grids">

            <div class="grid sm-100">
              <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden">
                <div class="d-flex ai-center jc-space-between fw-wrap">
                  <h2 class="font-lg text-grey-900 fw-500 m-0 mb-2 mr-2">
                    ความชื้นในดิน
                    <SimpleTag type="Primary" label="เชื่อมต่อ" />
                  </h2>
                  <h4 class="text-grey-600 fw-500 font-xsss m-0 mb-2">
                    ข้อมูลจากเซนเซอร์ 07/10/2021 15:36
                  </h4>
                </div>
                <div class="grids ai-center">
                  <div class="grid xl-1-3 lg-40 md-1-3 sm-40">
                    <div ref="meterChart"></div>
                  </div>
                  <div class="grid xl-2-3 lg-60 md-2-3 sm-60">
                    <div ref="areaChart"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid md-50 sm-100">
              <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden h-full">
                <div class="d-flex ai-center jc-space-between fw-wrap">
                  <h2 class="font-lg text-grey-900 fw-500 m-0 mb-2 mr-2">
                    คำสั่งเปิดน้ำปัจจุบัน
                  </h2>
                  <h4 class="text-grey-600 fw-500 font-xsss m-0 mb-2">
                    สถานะการรดน้ำ 
                    <SimpleTag v-if="springleValue" type="Primary" label="เปิด" />
                    <SimpleTag v-else type="Danger" label="ปิด" />
                  </h4>
                </div>
                <div class="mt-3">
                  <SwitchToggle 
                    textInactive="ปิด" textActive="เปิด" :value="springleValue" 
                    @change="springleValue = $event"
                  />
                </div>
              </div>
            </div>

            <div class="grid md-50 sm-100">
              <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden">
                <div class="d-flex ai-center jc-space-between fw-wrap">
                  <h2 class="font-lg text-grey-900 fw-500 m-0 mb-2 mr-2">
                    ระบบสั่งงานด้วยตนเอง
                  </h2>
                </div>
                <div class="mt-3">
                  <SwitchToggle 
                    textInactive="ควบคุมเอง" textActive="อัตโนมัติ" :value="autoMode" 
                    @change="autoMode = $event"
                  />
                </div>
                <form @submit.prevent="onSubmit">
                  <table class="table-setup mt-4">
                    <tr>
                      <td><div class="font-xs text-black">ค่าต่ำสุด</div></td>
                      <td><FormGroup type="number" :min="0" :max="100" :step="1" :value="45" /></td>
                      <td rowspan="2">
                        <ButtonSubmit label="ตั้งค่า" classer="bg-current border-0 p-0 w-100" />
                      </td>
                    </tr>
                    <tr>
                      <td><div class="font-xs text-black">ค่าสูงสุด</div></td>
                      <td><FormGroup type="number" :min="0" :max="100" :step="1" :value="70" /></td>
                    </tr>
                  </table>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { onMounted } from '../../helpers/frontend';
import { mapGetters, mapActions, mapState } from 'vuex';
import SimpleTag from '../../components/SimpleTag';
import SwitchToggle from '../../components/SwitchToggle';

export default {
  name: 'UserFarmPage',
  components: {
    SimpleTag,
    SwitchToggle
  },
  data() {
    return {
      meterChart: null,
      areaChart: null,
      springleValue: false,
      autoMode: false
    };
  },
  mounted() {
    var that = this;
    if(!that.$route.params.id){
      that.$router.push('/user/dashboard');
    }else{
      onMounted();
      that.getFarm({ user: that.user, farmId: that.$route.params.id }).then(function(){
        that.createMeterChart();
        that.createAreaChart();
      });
    }
  },
  beforeUnmount() {
    if(this.meterChart) this.meterChart.destroy();
    if(this.areaChart) this.areaChart.destroy();
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
      farm: 'farm/single'
    })
  },
  methods: {
    ...mapActions({
      getFarm: 'farm/getSingle'
    }),

    createMeterChart() {
      var options = {
        chart: {
          type: 'radialBar'
        },
        series: [ 76.43 ],
        colors: [ 'rgb(210,218,72)' ],
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            gradientToColors: [ 'rgb(181,187,70)' ],
            stops: [ 0, 100 ]
          }
        },
        plotOptions: {
          radialBar: {
            startAngle: 0,
            endAngle: 360,
            track: {
              background: '#eeeeee',
              strokeWidth: '100%',
              dropShadow: {
                enabled: true,
                top: 4,
                left: 0,
                color: '#dddddd',
                opacity: 1,
                blur: 2
              }
            },
            hollow: { size: '70%', imageClipped: false },
            dataLabels: {
              name: { show: false },
              value: {
                fontSize: '28px',
                fontWeight: '600',
                color: '#000000',
                lineHeight: '28px'
              }
            }
          }
        },
        grid: { padding: { top: -12 } },
        stroke: { lineCap: 'round' },
        labels: [ 'unit' ]
      };
      this.meterChart = new ApexCharts(this.$refs.meterChart, options);
      this.meterChart.render();
    },

    createAreaChart() {
      var options = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May' ,'Jun', 'Jul', 'Aug', 'Sep', 'Oct' , 'Nov', 'Dec'],
        series: [{
          name: '',
          data: [35, 66, 34, 56, 18 ,35, 66, 34, 56, 18 , 56, 18]
        }],
        colors: [ 'rgb(210,218,72)' ],
        chart: {
          type: 'area',
          height: 320,
          toolbar: { show: false },
          zoom: { enabled: false }
        },
        dataLabels: { enabled: false },
        legend: { show: false },
        // stroke: { curve: 'straight' },
        responsive: [
          {
            breakpoint: 1199.98,
            options: { chart: { height: 300 } },
          },{
            breakpoint: 767.98,
            options: { chart: { height: 240 } },
          }
        ]
      };
      this.areaChart = new ApexCharts(this.$refs.areaChart, options);
      this.areaChart.render();
    },

    onSubmit() {

    }
  }
}
</script>
