export default ({ store, route, redirect }) => {

	if (!store.getters.isAuthenticated && route.name !== 'login' && route.name !== 'register') {
		redirect('/login')
	}
	if (store.getters.isAuthenticated && (route.name === 'login' || route.name === 'register')) {
		redirect('/')
	}
}
