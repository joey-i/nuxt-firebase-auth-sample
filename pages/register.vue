<template>
	<v-container>
		<v-row justify="center">
			<v-col sm="12" md="5">
				<h2 class="text-center subtitle-1 font-weight-bold mb-2">
					メールアドレスで登録
				</h2>
				<v-row>
					<v-col>
						<v-tabs
							v-model="tab"
							background-color="transparent"
							color="blue accent-2"
							grow
							class="mb-3"
						>
							<v-tab to="/login">ログイン</v-tab>
							<v-tab to="/register">アカウント登録</v-tab>
						</v-tabs>

						<v-row>
							<v-col sm="12">
								<v-card flat>
									<v-card-text class="pa-0">
										<v-form
											ref="register_form"
											v-model="register_valid"
											lazy-validation
										>
											<v-text-field
												v-model="register_email"
												label="メールアドレス"
												:rules="emailRules"
												required
												validate-on-blur
											/>

											<v-text-field
												ref="register_password"
												v-model="register_password"
												label="パスワード"
												required
												:append-icon="
													show_registerPassword
														? 'mdi-eye'
														: 'mdi-eye-off'
												"
												:type="
													show_registerPassword
														? 'text'
														: 'password'
												"
												:rules="register_passwordRules"
												validate-on-blur
												loading
												@click:append="
													show_registerPassword = !show_registerPassword
												"
											>
												<template v-slot:progress>
													<v-progress-linear
														:value="score.value"
														:color="score.color"
														absolute
														height="2"
													/>
												</template>
											</v-text-field>
											<v-text-field
												v-model="
													register_password_again
												"
												label="パスワード（確認）"
												required
												:append-icon="
													show_registerPassword
														? 'mdi-eye'
														: 'mdi-eye-off'
												"
												:type="
													show_registerPassword
														? 'text'
														: 'password'
												"
												validate-on-blur
												:rules="
													register_passwordAgainRules
												"
												@click:append="
													show_registerPassword = !show_registerPassword
												"
											/>

											<v-alert
												v-if="registerErrorMsg"
												dense
												text
												type="error"
											>
												{{ registerErrorMsg }}
											</v-alert>

											<v-btn
												:disabled="!register_valid"
												color="blue darken-3"
												class="mr-4 white--text"
												@click="email_register"
											>
												登録
											</v-btn>
										</v-form>
									</v-card-text>
								</v-card>
							</v-col>
						</v-row>
						<v-divider class="my-8" />
						<v-row>
							<v-col sm="12">
								<h2
									class="text-center subtitle-1 font-weight-bold mb-2"
								>
									その他のアカウントでログイン
								</h2>
							</v-col>
						</v-row>
						<SocialLogin />
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>
import SocialLogin from '~/components/SocialLogin.vue'
import firebase from '@/plugins/firebase'
import zxcvbn from 'zxcvbn'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
	layout: 'signin',
	components: {
		SocialLogin
	},
	data: function() {
		return {
			registerErrorMsg: '',
			tab: null,
			register_valid: true,
			register_email: '',
			register_password: '',
			register_password_again: '',
			emailRules: [
				(v) => {
					if (v) {
						return (
							/.+@.+\..+/.test(v) ||
							'有効なメールアドレスを入力してください'
						)
					}else{
						return true
					}
				}
			],
			register_passwordRules: [
				(v) => !!v || 'パスワードを入力してください',
				(v) =>
					zxcvbn(v).score >= 3 ||
					'大文字・小文字・数字・記号を混ぜた強いパスワードにしてください'
			],
			register_passwordAgainRules: [
				(v) => {
					if (v) {
						return (
							this.$refs.register_password.value === v ||
							'パスワードと一致しません'
						)
					}else{
						return true
					}
				}
			],
			show_registerPassword: false
		}
	},
	computed: {
		progress() {
			return this.score.value
		},
		score() {
			const result = zxcvbn(this.register_password)

			switch (result.score) {
				case 4:
					return {
						color: 'green',
						value: 100
					}
				case 3:
					return {
						color: 'light-green lighten-1',
						value: 75
					}
				case 2:
					return {
						color: 'amber accent-2',
						value: 50
					}
				case 1:
					return {
						color: 'deep-orange lighten-1',
						value: 25
					}
				default:
					return {
						color: 'red darken-3',
						value: 0
					}
			}
		}
	},
	methods: {
		email_register: function(err) {
			if (this.$refs.register_form.validate()) {
				this.$store
					.dispatch('signUp', {
						email: this.register_email,
						password: this.register_password
					})
					.then(() => {
						this.register_email = ''
						this.register_password = ''
						this.$router.push({
							name: 'index',
							params: {
								dashboard_msg: true,
								dashboard_msg_text:
									'アカウントの登録が完了しました。'
							}
						})
					})
					.catch((err) => {
						console.log(err)
						if (err.code === 'auth/email-already-in-use') {
							this.registerErrorMsg =
								'このメールアドレスは既に登録されています。'
						} else if (err.code === 'auth/invalid-email') {
							this.registerErrorMsg = '無効なメールアドレスです。'
						} else {
							this.registerErrorMsg =
								'エラーにより登録できませんでした。'
						}
					})
			}
		}
	}
}
</script>
