import { homeofficeService } from '../_services/HomeofficeService'


const GET_HOMEOFFICE = 'GET_HOMEOFFICE'
const SET_SELECTEDDATES = 'SET_SELECTEDDATES'
const CANCEL_EVENT = 'CANCEL_EVENT'

const state = {
    selectedDates: [],
    homeofficeDates: []
}

const mutations = {
    [GET_HOMEOFFICE]: (state, payload) => {
        state.homeofficeDates = payload
    },
    [SET_SELECTEDDATES]: (state, payload) => {
        state.selectedDates = payload
    },
    [CANCEL_EVENT]: (state, payload) => {
        state.homeofficeDates = state.homeofficeDates.filter(e => e.id!== payload)
    }
}

const actions = {
    getHomeOffice: async ({commit}, dept_id) => {
        const payload = await homeofficeService.getHomeOffice(dept_id)
        commit(GET_HOMEOFFICE, payload)
    },
    submitHomeOffice: async (context) => {
        const emp_id = context.rootState.auth.id
        const team_id = context.rootState.auth.team_id
        const dept_id = context.rootState.auth.dept_id
        const payload = await homeofficeService.submitHomeOffice(context.state.selectedDates, emp_id, dept_id, team_id)
        context.commit(GET_HOMEOFFICE, payload)
        context.dispatch('teamEvent/getTeamEvents', null, {root:true})
    },
    setSelectedDates: ({commit}, payload) => {
        commit(SET_SELECTEDDATES, payload)
    },
    cancelEvent: async ({commit}, id) => {
        const payload = await homeofficeService.cancelEvent(id)
        if(payload==='Deleted')
            commit(CANCEL_EVENT, id)
    }
}

const getters = {
    getHomeofficeDates : (state) => {
        const map = {}
        state.homeofficeDates.forEach(e => {
            e.open = false
            return (map[e.date] = map[e.date] || []).push(e)
        });
        return map
    }
}

export const homeofficeModule = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};