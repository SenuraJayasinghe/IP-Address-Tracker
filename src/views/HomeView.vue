<template>
    <div class="flex flex-col h-screen max-h-screen">
      <!-- Search/Result -->
      <div class="z-20 flex justify-center relative bg-hero-pattern bg.cover px-4 pt-8 pb-32">
        <!-- Search/Input -->
         <div class="w-full max-w-screen-sm">
          <h1 class="text-white text-center text-3xl pb-4">IP Address Tracker</h1>
          <div class="flex">
            <input v-model="queryIp" type="text" class="flex-1 py-3 px-2 rounded-tl-md rounded-bl-md focus:outline-none"
            placeholder="Search for any IP address or leave empty to get your ip info" />
            <i @click="getIpInfo" class="cursor-pointer
             bg-black text-white 
             px-4
            rounded-tr-md rounded-br-md 
            flex
            items-center
            fas fa-chevron-right"></i>
          </div>
        </div>
        <!-- IP info -->
        <IPInfo v-if="ipInfo" v-bind:ipInfo="ipInfo"/>
        </div>

         <!-- map -->
         <div id="map" class="h-full z-10"></div>

    </div>
</template>

<script>
import IPInfo from '../components/IPinfo.vue';
import leaflet from 'leaflet';
import { onMounted, ref } from '@vue/runtime-core';
import axios from 'axios'

export default {
  name:'HomeView',
  components: {
    IPInfo,
  },
  setup() {
    let map;
    const queryIp = ref("");
    const ipInfo = ref(null)
    onMounted(() => {
       map = leaflet.map('map').setView([7.8731, 80.7718], 9);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2VudXJhamF5IiwiYSI6ImNsMXY1dmdpbTBqN2kzZm81Z3FkcmFvajkifQ.mBhzo7ZOFS6wmSjlMN5oRQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1Ijoic2VudXJhamF5IiwiYSI6ImNsMXY1dmdpbTBqN2kzZm81Z3FkcmFvajkifQ.mBhzo7ZOFS6wmSjlMN5oRQ'
}).addTo(map);
    });
    
      const getIpInfo = async () => {
        try {
          const data = await axios.get(
            `https://geo.ipify.org/api/v2/country,city?apiKey=at_MVJFeiQqLOIkBsklvpCWhbbsTWhXy&ipAddress=${queryIp.value}`
            );
        const result = data.data;
         ipInfo.value ={
            address: result.ip,
            country: result.location.country,
            state: result.location.region,
            timezone: result.location.timezone,
            isp: result.isp,
            lat: result.location.lat,
            lng: result.location.lng,
         };
         leaflet.marker([ipInfo.value.lat, ipInfo.value.lng]).addTo(map);
        map.setView([ipInfo.value.lat, ipInfo.value.lng], 13);
        }
        catch (err) {
          alert(err.message)
        }
      }
      return {queryIp, ipInfo, getIpInfo};
  },
};
</script>
