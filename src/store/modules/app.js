
const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}
const mutations = {
    toggleMenu(state) {
        state.isCollapse = !state.isCollapse;
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    }
}
const actions = {

};
const getters = {

};
export default {
    namescaped: true,
    state,
    mutations,
    actions,
    getters
};