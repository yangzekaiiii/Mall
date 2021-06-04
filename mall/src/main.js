import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import api from '@/assets/config/api.js'
import { Search } from 'vant';
import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import { Grid, GridItem } from 'vant';
import { Cell, CellGroup } from 'vant';
import { Image as VanImage } from 'vant';
import { Card } from 'vant';
import { Tabbar, TabbarItem } from 'vant';
import { Sidebar, SidebarItem } from 'vant';
import { TreeSelect } from 'vant';
import { Tab, Tabs } from 'vant';
import { NavBar } from 'vant';
import { GoodsAction, GoodsActionIcon, GoodsActionButton } from 'vant';
import { Sku } from 'vant';
import { Checkbox, CheckboxGroup } from 'vant';
import { SubmitBar } from 'vant';
import { Icon } from 'vant';

Vue.use(Icon);
Vue.use(SubmitBar);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(Sku);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(NavBar);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(TreeSelect);
Vue.use(Sidebar);
Vue.use(SidebarItem);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Card);
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(VanImage);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App),
    data: {
        api: api
    }
}).$mount('#app')