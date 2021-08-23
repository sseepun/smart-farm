<template>
  <div class="main-wrapper">
    <NavLeft :activeIndex="navActiveIndex" />
    
    <!-- Read -->
    <template v-if="process == 'read'">
      <div v-if="farm" class="main-content">
        <NavTop page="ฟาร์ม" />
        <div class="middle-sidebar-bottom header-padding pb-4" data-aos="fade-up" data-aos-delay="0">
          <div class="middle-sidebar-left pr-0">
            <div class="d-flex ai-center jc-space-between fw-wrap">
              <div class="mr-2 mb-3 mb-md-0">
                <h2 class="fw-600 font-lg m-0">
                  {{farm.name}} 
                  <a 
                    class="btn px-1 py-0 m-0 bg-current font-xsss fw-500 text-white ml-1" 
                    href="javascript:" @click="refreshData()"
                  >
                    รีเฟรช
                  </a>
                </h2>
                <h6 class="font-xsss text-grey-600 fw-400 m-0 mt-1">
                  {{farm.description}}
                </h6>
              </div>
              <div class="btns">
                <router-link 
                  :to="backLink()" 
                  class="btn px-3 py-2 m-0 bg-current font-xsss fw-500 text-white mr-2"
                >
                  ย้อนกลับ
                </router-link>
                <a 
                  href="javascript:" @click="changeProcess('update')" 
                  class="btn px-3 py-2 m-0 text-current bcolor-current font-xsss fw-500"
                >
                  แก้ไข
                </a>
              </div>
            </div>

            <div class="grids">
              
              <div class="grid sm-100">
                <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden">
                  <div class="font-xxxxs text-grey-900 fw-500 m-0 d-flex ai-center jc-space-between fw-wrap">
                    <div>
                      <span class="fw-600 mr-1">เวลารายงาน :</span>{{reportTime? reportTime: '-'}}
                    </div>
                    <div>
                      <span class="fw-600 mr-1">สถานะการเชื่อมต่อเซนเซอร์ :</span>
                      <SimpleTag v-if="mqttLatestData && mqttLatestData.se" type="Primary" label="เชื่อมต่อ" />
                      <SimpleTag v-else type="Danger" label="ไม่เชื่อมต่อ" />
                    </div>
                  </div>
                </div>
              </div>

              <div class="grid xl-1-3 lg-50 md-1-3">
                <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden">
                  <h2 class="font-md text-grey-900 fw-500 m-0 text-center">
                    ความชื้นในดิน
                  </h2>
                  <div class="mt-3">
                    <div ref="meterChart01"></div>
                  </div>
                </div>
              </div>
              <div class="grid xl-1-3 lg-50 md-1-3">
                <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden">
                  <h2 class="font-md text-grey-900 fw-500 m-0 text-center">
                    ความชื้นในโรงเรือน
                  </h2>
                  <div class="mt-3">
                    <div ref="meterChart02"></div>
                  </div>
                </div>
              </div>
              <div class="grid xl-1-3 lg-50 md-1-3">
                <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden">
                  <h2 class="font-md text-grey-900 fw-500 m-0 text-center">
                    อุณหภูมิในโรงเรือน
                  </h2>
                  <div class="mt-3">
                    <div ref="meterChart03"></div>
                  </div>
                </div>
              </div>

              <div class="grid md-50 sm-50">
                <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden h-full" style="height:100%;">
                  <div class="d-flex ai-center jc-space-between fw-wrap">
                    <h2 class="font-md text-grey-900 fw-500 m-0 mb-2 mr-2">
                      คำสั่งเปิดน้ำปัจจุบัน
                    </h2>
                    <h4 class="text-grey-600 fw-500 font-xsss m-0 mb-2">
                      สถานะการเปิดน้ำ 
                      <SimpleTag v-if="mqttLatestData && mqttLatestData.op" type="Primary" label="เปิด" />
                      <SimpleTag v-else type="Danger" label="ปิด" />
                    </h4>
                  </div>
                  <div class="mt-3" :class="{ 'disabled': mqttConfig && mqttConfig.opmode }">
                    <SwitchToggle 
                      textInactive="ปิด" textActive="เปิด" :value="springleValue" 
                      @change="onChangeSpringleValue($event)"
                    />
                  </div>
                </div>
              </div>

              <div class="grid xl-50 lg-2-3 md-50 sm-100">
                <div class="card w-100 p-adaptive border-0 m-0 rounded-lg bg-white shadow-xs overflow-hidden" style="height:100%;">
                  <div class="d-flex ai-center jc-space-between fw-wrap">
                    <h2 class="font-md text-grey-900 fw-500 m-0 mb-2 mr-2">
                      คำสั่งการเปิดน้ำปัจจุบัน
                    </h2>
                  </div>
                  <div class="mt-3">
                    <SwitchToggle 
                      textInactive="ควบคุมเอง" textActive="อัตโนมัติ" :value="autoMode" 
                      @change="autoMode = $event" 
                    />
                  </div>
                  <form @submit.prevent="onSubmitConfig">
                    <table class="table-setup mt-4">
                      <tr>
                        <td><div class="font-xs text-black">ค่าต่ำสุด</div></td>
                        <td>
                          <FormGroup 
                            type="number" :min="0" :max="soilmax" :step="1" 
                            :value="soilmin" @change="soilmin = $event.target.value" 
                          />
                        </td>
                        <td rowspan="2">
                          <ButtonSubmit label="ตั้งค่า" classer="bg-current border-0 p-0 w-100" />
                        </td>
                      </tr>
                      <tr>
                        <td><div class="font-xs text-black">ค่าสูงสุด</div></td>
                        <td>
                          <FormGroup 
                            type="number" :min="soilmin" :max="100" :step="1" 
                            :value="soilmax" @change="soilmax = $event.target.value" 
                          />
                        </td>
                      </tr>
                    </table>
                  </form>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<style scoped>
  .disabled{opacity:.4; pointer-events:none;}
</style>

<script>
import { onMounted } from '../../helpers/frontend';
import { mapGetters, mapActions, mapState } from 'vuex';
import moment from 'moment';
import SimpleTag from '../../components/SimpleTag';
import SwitchToggle from '../../components/SwitchToggle';

export default {
  name: 'UserFarmReadPage',
  components: {
    SimpleTag,
    SwitchToggle
  },
  data() {
    return {
      navActiveIndex: 1,
      process: 'read',
      farmId: this.$route.params.id,
      
      reportTime: null,
      meterChart01: null,
      meterChart02: null,
      meterChart03: null,

      springleValue: false,
      soilmin: 0,
      soilmax: 0,
      autoMode: false
    };
  },
  computed: {
    ...mapGetters({
      farm: 'farm/single',
      mqttClient: 'mqttConn/mqttClient',
      mqttDataList: 'mqttConn/dataList',
      mqttLatestData: 'mqttConn/latestData',
      mqttConfig: 'mqttConn/config'
    })
  },
  watch: {
    mqttLatestData: function(val) {
      this.reportTime = moment().format('MM/DD/YYYY HH:mm:ss');
      this.springleValue = this.mqttLatestData && this.mqttLatestData.op? true: false;
      this.updateMeterCharts();
    },
    mqttConfig: function(val) {
      this.soilmin = this.mqttConfig? this.makeCopy(this.mqttConfig.soilmin): 0;
      this.soilmax = this.mqttConfig? this.makeCopy(this.mqttConfig.soilmax): 0;
      this.autoMode = this.mqttConfig && this.mqttConfig.opmode? true: false;
    }
  },
  mounted() {
    onMounted();
    var that = this;
    that.getFarm({ farmId: that.farmId }).then(function(data){
      that.mqttConnect(data);
    });
    setTimeout(() => {
      that.initMeterCharts();
    }, 300);
  },
  beforeUnmount() {
    this.mqttDisconnect(this.farm);
    if(this.meterChart01) this.meterChart01.destroy();
    if(this.meterChart02) this.meterChart02.destroy();
    if(this.meterChart03) this.meterChart03.destroy();
  },
  methods: {
    ...mapActions({
      updateAlert: 'alert/updateAlert',
      getFarm: 'farm/getSingle',
      mqttConnect: 'mqttConn/connect',
      mqttDisconnect: 'mqttConn/disconnect',
      mqttRefreshData: 'mqttConn/refreshData',
      mqttSpringleCommand: 'mqttConn/springleCommand',
      mqttConfigCommand: 'mqttConn/configCommand'
    }),

    makeCopy(val) {
      return JSON.parse(JSON.stringify(val));
    },

    changeProcess(process) {
      this.$router.push('/user/farm/'+process+'/'+this.farmId);
    },
    backLink() {
      return '/user/profile';
    },

    refreshData() {
      this.mqttRefreshData();
    },

    initMeterCharts() {
      var options = {
        chart: {
          type: 'radialBar'
        },
        series: [ 0 ],
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
                formatter: function(val) {
                  return (Math.round(val * 100) / 100) + ' %';
                },
                fontSize: '28px',
                fontWeight: '600',
                color: '#000000',
                lineHeight: '28px'
              },
            }
          }
        },
        grid: { padding: { top: -20, bottom: -20 } },
        stroke: { lineCap: 'round' },
        labels: [ 'unit' ]
      };
      this.meterChart01 = new ApexCharts(this.$refs['meterChart01'], options);
      this.meterChart01.render();
      this.meterChart02 = new ApexCharts(this.$refs['meterChart02'], options);
      this.meterChart02.render();
      options.plotOptions.radialBar.dataLabels.value.formatter = function(val) {
        return (Math.round(val * 100) / 100) + ' ℃';
      }
      this.meterChart03 = new ApexCharts(this.$refs['meterChart03'], options);
      this.meterChart03.render();
    },
    updateMeterCharts() {
      if(this.mqttLatestData.so >= 0) {
        this.meterChart01.updateSeries([ this.mqttLatestData.so ]);
      }
      if(this.mqttLatestData.hu >= 0) {
        this.meterChart02.updateSeries([ this.mqttLatestData.hu ]);
      }
      if(this.mqttLatestData.te >= 0) {
        this.meterChart03.updateSeries([ this.mqttLatestData.te ]);
      }
    },

    onChangeSpringleValue(value) {
      this.springleValue = value;
      this.mqttSpringleCommand(value);
    },
    onSubmitConfig() {
      this.mqttConfigCommand({
        soilmin: this.soilmin, 
        soilmax: this.soilmax, 
        opmode: this.autoMode
      });
    } 
  }
}
</script>
