import Vue from 'vue';
import eventBus from "@/utils/eventBus";
import VLazy from "@/directives/lazy";

Vue.prototype.$bus = eventBus;
Vue.directive('lazy', VLazy);