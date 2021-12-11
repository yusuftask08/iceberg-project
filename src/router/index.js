import Vue from 'vue'
import VueRouter from 'vue-router'
import Apps from '../views/App/Apps.vue'
import Dashboard from '../views/App/Dashboard.vue'
import Appointments from '../views/App/Appointments.vue'
import AppointmentsCreate from '../views/App/AppointmentsCreate.vue'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    component: Apps,
    children: [{
            name: 'Dashboard',
            path: '',
            component: Dashboard,
        },
        {
            name: 'AppointmentsCreate',
            path: '/appointments-create',
            component: AppointmentsCreate,
        },
        {
            name: 'Appointments',
            path: '/appointments',
            component: Appointments,
        },
    ]
}];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router