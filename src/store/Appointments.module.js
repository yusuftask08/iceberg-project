import {
    API_URL,
    API_KEY,
    APP_ID,
    API_POST_CODES_URL,
    FIXED_POST_CODE,
} from "@/common/config.js";
import axios from "axios"
import {
    APP_GET_TABLE_LISTED,
    APP_PUT_DATA,
    APP_PERSONEL,
    APP_POST_CODES_API_GET,
    APP_POST_CODES_ADRESS,
    APP_CREATE_RECORDS,
    APP_CREATE_CONTACT_RECORDS
} from "./actions.type";
import {
    SET_TABLE_DATA,
    SET_POST_CODE,
    SET_AGENT_DATA,
    SET_APP_ADRESS,
    SET_CONTACT_ID
} from "./mutations.type"
const state = {
    tableData: [],
    agent: [],
    WorkplaceLocation: [],
    adress: [],
    contactId: null,
};
const getters = {
    setTableData(state) {
        return state.tableData;
    },
    setAgentData(state) {
        return state.agent;
    },
    setWorkLocation() {
        return state.WorkplaceLocation;
    },
    setAppAdress() {
        return state.adress;
    },
    setContactId() {
        return state.contactId;
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
            context.commit(SET_AGENT_DATA, data.data.records)

        }).catch(err => {
            console.log(`err`, err);
        })
    },
    [APP_POST_CODES_API_GET](context) {
        axios.get(API_POST_CODES_URL + '/' + FIXED_POST_CODE).then(data => {
            context.commit(SET_POST_CODE, data.data.result)
        }).catch(err => {
            console.log(`err`, err);
        })
    },
    [APP_POST_CODES_ADRESS](context, credentials) {
        axios.get(API_POST_CODES_URL + `?lon=${credentials.lng}&lat=${credentials.lat}`).then(data => {
            context.commit(SET_APP_ADRESS, data.data.result[0])
        }).catch(err => {
            console.log(`err`, err);
        })
    },
    [APP_CREATE_RECORDS](context, credentials) {
        axios.post(API_URL + APP_ID + "/Appointments", {
                fields: {
                    appointment_date: credentials.appdate,
                    appointment_postcode: credentials.postcode,
                    contact_id: [
                        credentials.contactId
                    ],
                    agent_id: [
                        credentials.agentId
                    ]
                }
            }, {
                headers: {
                    Authorization: "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                }
            })
            .then(data => {}).catch(err => {
                console.log(`err`, err);
            })
    },
    [APP_CREATE_CONTACT_RECORDS](context, credentials) {
        console.log(`credentials contact`, credentials)
        axios.post(API_URL + APP_ID + "/Contacts", {
            fields: {
                contact_name: credentials.name,
                contact_surname: credentials.surname,
                contact_email: credentials.email,
                contact_phone: credentials.tel,
                Appointments: []
            }
        }, {
            headers: {
                Authorization: "Bearer " + API_KEY,
                "Content-Type": "application/json"
            }
        }).then(data => {
            context.commit(SET_CONTACT_ID, data.data.id)
            this.dispatch(APP_GET_TABLE_LISTED);
        }).catch(err => {
            console.log(`err`, err);
        })
    },
}
const mutations = {
    [SET_TABLE_DATA](state, payload) {
        state.tableData = payload;
    },
    [SET_AGENT_DATA](state, payload) {
        state.agent = payload;
    },
    [SET_POST_CODE](state, payload) {
        state.WorkplaceLocation = payload;
    },
    [SET_APP_ADRESS](state, payload) {
        state.adress = payload
    },
    [SET_CONTACT_ID](state, payload) {
        state.contactId = payload;
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};