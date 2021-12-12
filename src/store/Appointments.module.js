import {
    API_URL,
    API_KEY,
    APP_ID
} from "@/common/config.js";
import axios from "axios"
import {
    APP_GET_TABLE_LISTED,
    APP_PUT_DATA,
    APP_PERSONEL
} from "./actions.type";
import {
    SET_TABLE_DATA,
    SET_AGENT_DATA
} from "./mutations.type"
const state = {
    tableData: [],
    agent: [],
};
const getters = {
    setTableData(state) {
        return state.tableData;
    },
    setAgentData(state) {
        return state.agent;
    }
};
const actions = {
    [APP_GET_TABLE_LISTED](context) {
        axios
            .get(
                API_URL +
                APP_ID +
                "/Appointments?api_key=" +
                API_KEY, {
                    headers: {
                        Authorization: "Bearer " + API_KEY,
                    },
                }
            )
            .then((data) => {
                console.log(`data`, data)
                context.commit(SET_TABLE_DATA, data.data.records)
            });
    },
    [APP_PUT_DATA](context, credentials) {
        console.log(`credentials`, credentials)
        axios.put(API_URL + APP_ID + "/Contacts/" + credentials.fields.contact_id, {
            fields: {
                contact_name: credentials.fields.contact_name[0],
                contact_surname: credentials.fields.contact_surname[0],
                contact_email: credentials.fields.contact_email,
                contact_phone: credentials.fields.contact_phone[0],
                Appointments: [credentials.id]
            }
        }, {
            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-Type": "application/json"
            }
        }).then(_ => {
            this.dispatch(APP_GET_TABLE_LISTED);
        }).catch(err => {
            console.log(`err`, err);
        })
    },
    [APP_PERSONEL](context) {
        axios.get(API_URL + APP_ID + "/Agents?fields%5B%5D=agent_name", {
            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-Type": "application/json"
            }
        }).then(data => {
            console.log(`data`, data.data.records)
            context.commit(SET_AGENT_DATA, data.data.records)

        }).catch(err => {
            console.log(`err`, err);
        })
    }
}
const mutations = {
    [SET_TABLE_DATA](state, payload) {
        state.tableData = payload;
    },
    [SET_AGENT_DATA](state, payload) {
        state.agent = payload;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};