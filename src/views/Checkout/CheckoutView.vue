<template>
	<section class="checkout">
		<h2 class="checkout-title">{{ $t('checkout.title') }}</h2>
		<form class="checkout-form" @submit.prevent>
			<div class="checkout-form__left">
				<div class="checkout-form__left-item">
					<h3 class="checkout-form__left-item-title">
						{{ $t('checkout.info') }}
					</h3>
					<div class="checkout-form__left-item-inputs">
						<input
							type="text"
							class="checkout-form__left-item-input"
							name="name"
							:placeholder="$t('checkout.infoName')"
							v-model="formDate.name"
							:class="{ valid: v$.$error }"
						/>
						<input
							class="checkout-form__left-item-input"
							name="phone"
							v-model="formDate.phone"
							v-maska="phoneMasked"
							data-maska="+998 (##) ###-##-##"
							placeholder="+998 (##) ###-##-##"
							:class="{ valid: v$.$error }"
						/>
					</div>
				</div>
				<div class="checkout-form__left-products" id="checkout-products">
					<h3 class="checkout-form__left-products-title">
						{{ $t('checkout.orders') }}
					</h3>
					<div class="checkout-form__left-products-items">
						<template v-for="product in cartItems" :key="product.id">
							<div class="checkout-form__left-products-item">
								<div class="checkout-form__left-products-item-left">
									<img
										v-lazy="
											`https://sieveserp.ams3.cdn.digitaloceanspaces.com/${product.photo.path}/${product.photo.name}.${product.photo.format}`
										"
										alt=""
										class="checkout-form__left-products-item-img"
									/>
									<p class="checkout-form__left-products-item-name">
										{{ product.name }}
									</p>
								</div>
								<div class="checkout-form__left-products-item-right">
									<span class="checkout-form__left-products-item-price">
										{{
											(
												product.priceList.price * product.quantity
											).toLocaleString()
										}}
										<span>{{ $t('checkout.orderCurrency') }}</span>
									</span>
									<div class="checkout-form__left-products-item-plusOrMinus">
										<button
											class="checkout-form__left-products-item-minus"
											@click="minusCart(product)"
										>
											<minus-icon width="15" height="15" fill="#000" />
										</button>
										<span class="checkout-form__left-products-item-count">{{
											product.quantity
										}}</span>
										<button
											class="checkout-form__left-products-item-plus"
											@click="plusCart(product)"
										>
											<plus-icon width="15" height="15" fill="#000" />
										</button>
									</div>
								</div>
							</div>
						</template>
					</div>
				</div>
				<div class="checkout-form__left-item">
					<h3 class="checkout-form__left-item-title">
						{{ $t('checkout.address') }}
					</h3>
					<p class="checkout-form__left-item-sub">
						{{ $t('checkout.addressPlaceholder') }}
					</p>
					<div class="checkout-form__left-item-inputs">
						<textarea
							type="text"
							class="checkout-form__left-item-input"
							:placeholder="$t('checkout.addressPlaceholder')"
							v-model="formDate.address"
							:class="{ valid: v$.$error }"
							disabled
						/>
					</div>
					<div id="map" style="height: 400px"></div>
					<!-- <button @click="getMyLocation">Поставить метку</button> -->
				</div>
				<div class="checkout-form__left-item">
					<h3 class="checkout-form__left-item-title">
						{{ $t('checkout.comment') }}
					</h3>
					<!-- <p class="checkout-form__left-item-sub">
            {{ $t("checkout.commentPlaceholder") }}
          </p> -->
					<div class="checkout-form__left-item-inputs">
						<textarea
							type="text"
							class="checkout-form__left-item-input"
							:placeholder="$t('checkout.commentPlaceholder')"
							v-model="formDate.comment"
							:class="{ valid: v$.$error }"
						/>
					</div>
				</div>
				<div class="checkout-form__left-item checkout-form__left-last">
					<div class="checkout-form__left-last-top">
						<h1 class="checkout-form__left-last-top-title">
							{{ $t('checkout.paymentType') }}
						</h1>
					</div>
					<div class="checkout-form__left-last-payment">
						<div
							class="checkout-form__left-last-payment-type"
							v-for="payment in paymentType"
							:key="payment.id"
						>
							<label
								:for="payment.paymentId"
								:class="{
									active: formDate.payment == payment.value,
									valid: v$.$error,
									disabled: isOrderButtonDisabled && payment.id === 2,
								}"
							>
								<input
									type="radio"
									name="paymentType"
									:id="payment.paymentId"
									:value="payment.value"
									v-model="formDate.payment"
									:disabled="isOrderButtonDisabled && payment.id === 2"
								/>

								<span class="checkout-form__left-last-payment-icon">
									<payment-icon fill="#ffae00" />
								</span>
								<span class="checkout-form__left-last-payment-title">
									{{ $t(`${payment.title}`) }}
								</span>
								<span
									class="checkout-form__left-last-payment-select"
									:class="{ active: formDate.payment == payment.value }"
								></span>
							</label>
						</div>
					</div>
				</div>
			</div>
			<div class="checkout-form__right">
				<div class="checkout-form__right-item">
					<div class="checkout-form__right-item-block">
						<h1 class="checkout-form__right-item-title">
							{{ $t('checkout.total') }}
						</h1>
						<div class="checkout-form__right-item-info">
							<div class="checkout-form__right-item-text">
								<p class="checkout-form__right-item-p1">
									{{ $t('checkout.orderSum') }}
								</p>
								<p class="checkout-form__right-item-p2">
									{{ totalPrice.toLocaleString() }}
									<span>{{ $t('checkout.orderCurrency') }}</span>
								</p>
							</div>
							<div class="checkout-form__right-item-text">
								<p class="checkout-form__right-item-p1">
									{{ $t('checkout.deliveryPrice') }}
								</p>
								<p class="checkout-form__right-item-p2">
									{{ $t('checkout.unknown') }}
								</p>
							</div>
							<div class="checkout-form__right-item-text">
								<p class="checkout-form__right-item-p1">
									{{ $t('checkout.deliveryTime') }}
								</p>
								<p class="checkout-form__right-item-p2">
									{{ $t('checkout.dMinutes') }}
								</p>
							</div>
						</div>
						<div class="checkout-form__right-item-total">
							<span class="checkout-form__right-item-total-title">
								{{ $t('checkout.totalSum') }}
							</span>
							<span class="checkout-form__right-item-total-price">
								{{ totalPrice.toLocaleString() }}
								<span>{{ $t('checkout.orderCurrency') }}</span>
							</span>
						</div>
						<div class="checkout-form__right-item-accept">
							<button
								type="submit"
								class="checkout-form__right-item-accept-btn"
								@click="checkout"
							>
								{{ $t('checkout.confirm') }}
							</button>
						</div>
					</div>
				</div>
			</div>
		</form>
		<div class="checkout-pay" v-if="paymentModal">
			<div class="checkout-pay__modal">
				<div class="checkout-pay__modal-add" v-if="paymentSteps.one">
					<h3 class="checkout-pay__modal-title">
						<span>{{ t('checkout.onlinePay.title') }}</span>
					</h3>
					<div class="checkout-pay__modal-add-card">
						<label for="cardNumber" class="checkout-pay__modal-add-card-label">
							<span>{{ t('checkout.onlinePay.cardNumberTitle') }}</span>
							<div class="checkout-pay__modal-add-card-input">
								<input
									type="text"
									id="cardNumber"
									v-maska="cardNumMasked"
									data-maska="#### #### #### ####"
									placeholder="1234 5678 9123 4567"
								/>
								<div class="checkout-pay__modal-add-card-input-icons">
									<uzcard-icon style="width: 20px; height: 20px" />
									<humo-icon style="width: 20px; height: 20px" />
								</div>
							</div>
						</label>
						<label for="cardDate" class="checkout-pay__modal-add-card-label">
							<span>{{ t('checkout.onlinePay.cardDateTitle') }}</span>
							<div class="checkout-pay__modal-add-card-input">
								<input
									type="text"
									id="cardDate"
									v-maska="cardDateMasked"
									data-maska="##/##"
									placeholder="12/23"
								/>
							</div>
						</label>
					</div>
					<div class="checkout-pay__modal-btns">
						<button class="checkout-pay__modal-btn" @click="sendCard">
							{{ t('checkout.onlinePay.continue') }}
						</button>
						<button
							class="checkout-pay__modal-btn close"
							@click=";(paymentModal = false), (paymentSteps.one = false)"
						>
							{{ t('checkout.onlinePay.cancel') }}
						</button>
					</div>
				</div>
				<div class="checkout-pay__modal-code" v-else-if="paymentSteps.two">
					<h3 class="checkout-pay__modal-title">
						{{ t('checkout.onlinePay.smsCodeTitle') }}
					</h3>
					<p class="checkout-pay__modal-sub">
						{{ t('checkout.onlinePay.smsCodeSub') }} <br />
						{{ smsNotificationNumber }}
					</p>
					<div class="checkout-pay__modal-code-check">
						<OTPpad :length="6" @entered="v => (smsCode = v)" />
					</div>
					<button
						class="checkout-pay__modal-btn-resend"
						@click="resendCode"
						disabled
						id="smsResendButton"
					>
						<span id="countdown"> 00:{{ smsResendSeconds }} </span>
						{{ t('checkout.onlinePay.smsCodeSec') }}
					</button>
					<button class="checkout-pay__modal-btn" @click="confirmCard">
						{{ t('checkout.onlinePay.continue') }}
					</button>
				</div>
				<div class="checkout-pay__modal-success" v-else-if="paymentSteps.three">
					<h3 class="checkout-pay__modal-title">
						{{ t('checkout.onlinePay.successPaymentTitleHead') }}
					</h3>
					<p class="checkout-pay__modal-sub">
						{{ t('checkout.onlinePay.successPaymentScreen') }}
					</p>
					<p class="checkout-pay__modal-sub">
						{{ t('checkout.onlinePay.successPaymentViewCheck') }}
					</p>
					<a
						class="checkout-pay__modal-btn"
						:href="qrcodeUrlFromGlobalPay"
						download=""
						target="_blank"
						@click="closePaymentGP"
					>
						{{ t('checkout.onlinePay.successPaymentBtnCheck') }}
					</a>
				</div>
				<div class="checkout-pay__modal-loader" v-else-if="paymentSteps.loader">
					<span class="loader"></span>
				</div>
				<span class="checkout-pay__modal-powered">Powered by Global Pay</span>
				<span class="checkout-pay__modal-police">
					✅ {{ t('checkout.onlinePay.oferta1') }}
					<a href="https://global.uz/agreement" target="_blank">
						{{ t('checkout.onlinePay.oferta2') }}
					</a>
				</span>
			</div>
		</div>
	</section>
</template>

<script setup>
import { computed, ref, onMounted, reactive } from 'vue'
import { useGeneralStore } from '@/stores/general'
import useVuelidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import { vMaska } from 'maska'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
import axios from 'axios'
import qs from 'querystring'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'vue-router'
import OTPpad from '../../components/OTPPad/OTPpad.vue'

const { t } = useI18n()
const router = useRouter()
const formDate = reactive({
	name: '',
	phone: '',
	address: '',
	payment: '',
	comment: '',
})
const rules = {
	name: { required },
	phone: { required },
	address: { required },
	payment: { required },
}
const v$ = useVuelidate(rules, formDate)
const phoneMasked = reactive({})
const cardNumMasked = reactive({})
const cardDateMasked = reactive({})
const smsCode = ref('')
const paymentSteps = reactive({
	one: false,
	two: false,
	three: false,
	loader: true,
})
let paymentModal = ref(false)
const generalStore = useGeneralStore()
let cartItems = computed(() => generalStore.cart)
const totalPrice = computed(() => {
	let totalPrice = 0
	for (const key in generalStore.cart) {
		totalPrice +=
			generalStore.cart[key].priceList.price * generalStore.cart[key].quantity
	}
	return totalPrice
})
const paymentType = reactive([
	{ id: 1, paymentId: 'cash', value: 'Cash', title: 'checkout.paymentCash' },
	{
		id: 2,
		paymentId: 'globalpay',
		value: 'Global Pay',
		title: 'checkout.paymentOnline',
	},
	{
		id: 3,
		paymentId: 'card',
		value: 'Card',
		title: 'checkout.paymentCard',
	},
])

const isOrderButtonDisabled = ref(false)

const checkTime = () => {
	const currentTime = new Date()
	const tashkentTime = new Date(currentTime.getTime())

	isOrderButtonDisabled.value =
		tashkentTime.getHours() >= 22 && tashkentTime.getHours() < 10
}


let smsNotificationNumber = ref(null)
const gPBU = 'https://app.sievesapp.com/v1/public'
let cardToken = ref(null)
let uuid = ref(null)

const branches = {
	yunusabad: {
		serviceId: 22,
		branchID: 3,
		name: 'Юнусобод',
		coords: [41.366715, 69.294083],
	},
	chilonzor: {
		serviceId: 23,
		branchID: 5,
		name: 'Чилонзор',
		coords: [41.276925, 69.201833],
	},
	maximGorkiy: {
		serviceId: 24,
		branchID: 11,
		name: 'Максим Горький',
		coords: [41.326423, 69.327293],
	},
	beruniy: {
		serviceId: 25,
		branchID: 4,
		name: 'Беруний',
		coords: [41.344081, 69.207719],
	},
}
let activeBranch

let smsResendSeconds = ref(60)
let smsResendButtonN = ref(false)
let qrcodeUrlFromGlobalPay = ref('')

let apiKey = ref('b9e4054d-f47c-4f0a-99c6-d1bd83383428')
let address = ref('')
let map = reactive({})
let ymaps = reactive({})
let myLocationPlacemark = reactive({})
let lat = ref(null)
let lon = ref(null)

// FUNC

const plusCart = product => generalStore.plusCart(product)
const minusCart = product => generalStore.minusCart(product)

const toRadians = degrees => {
	return (degrees * Math.PI) / 180
}
const calculateDistance = (lat1, lon1, lat2, lon2) => {
	const R = 6371 // Радиус Земли в километрах
	const dLat = toRadians(lat2 - lat1)
	const dLon = toRadians(lon2 - lon1)

	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(toRadians(lat1)) *
			Math.cos(toRadians(lat2)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)

	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

	const distance = R * c // Расстояние в километрах
	return distance
}
const addLocationMarker = coords => {
	if (myLocationPlacemark) {
		map.geoObjects.remove(myLocationPlacemark)
	}

	myLocationPlacemark = new ymaps.Placemark(
		coords,
		{ preset: 'islands#geolocationIcon' },
		{
			draggable: true,
			iconColor: '#c00a27',
		}
	)
	myLocationPlacemark.events.add('dragend', e => {
		const coords = e.get('target').geometry.getCoordinates()
		getAddressFromLocation(coords)
		findNearestBranch(coords)
		ymaps.geocode(coords).then(result => {
			const firstGeoObject = result.geoObjects.get(0)
			address.value = firstGeoObject.getAddressLine()
			formDate.address = firstGeoObject.getAddressLine()
		})
	})

	map.geoObjects.add(myLocationPlacemark)
}
const findNearestBranch = userCoords => {
	let minDistance = Infinity
	let closestBranch = null

	Object.keys(branches).forEach(branchKey => {
		const branch = branches[branchKey]
		const distance = calculateDistance(
			userCoords[0],
			userCoords[1],
			branch.coords[0],
			branch.coords[1]
		)

		if (distance < minDistance) {
			minDistance = distance
			closestBranch = branch.name
			activeBranch = branch
		}
	})

}
const loadYandexMaps = () => {
	if (window.ymaps) {
		ymaps = window.ymaps
		initMap()
	} else {
		const script = document.createElement('script')
		script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`
		script.onload = () => {
			ymaps = window.ymaps
			initMap()
		}
		document.head.appendChild(script)
	}
}
const initMap = () => {
	if ('geolocation' in navigator) {
		navigator.geolocation.getCurrentPosition(
			position => {
				const userCoords = [position.coords.latitude, position.coords.longitude]
				map = new ymaps.Map('map', {
					center: userCoords,
					zoom: 11,
				})
				myLocationPlacemark = new ymaps.Placemark(
					userCoords,
					{ preset: 'islands#geolocationIcon' },
					{
						draggable: true,
						iconColor: '#c00a27',
					}
				)

				// Добавляем маркер на карту
				map.geoObjects.add(myLocationPlacemark)
				map.events.add('click', e => {
					const coords = e.get('coords')
					moveLocationMarker(coords)
				})
				addLocationMarker(userCoords)
				getAddressFromLocation(userCoords)
			},
			error => {
				console.error(
					'Ошибка получения текущего местоположения:',
					error.message
				)
			}
		)
	} else {
		console.error('Ваш браузер не поддерживает геолокацию.')
	}
}
const getAddressFromLocation = coords => {
	ymaps.geocode(coords).then(result => {
		const firstGeoObject = result.geoObjects.get(0)
		myLocationAddress = firstGeoObject.getAddressLine()
		address.value = firstGeoObject.getAddressLine()
		formDate.address = firstGeoObject.getAddressLine()
	})
}
const moveLocationMarker = coords => {
	// Remove the old marker
	lat.value = coords[0]
	lon.value = coords[1]

	if (myLocationPlacemark) {
		map.geoObjects.remove(myLocationPlacemark)
	}

	// Create a new marker
	myLocationPlacemark = new ymaps.Placemark(
		coords,
		{ preset: 'islands#geolocationIcon' },
		{
			draggable: true,
			iconColor: '#c00a27',
		}
	)

	// Add an event listener for the hold event
	myLocationPlacemark.events.add('hold', e => {
		const newCoords = e.get('target').geometry.getCoordinates()
		getAddressFromLocation(newCoords)
		findNearestBranch(newCoords)
		ymaps.geocode(newCoords).then(result => {
			const firstGeoObject = result.geoObjects.get(0)
			address.value = firstGeoObject.getAddressLine()
			formDate.address = firstGeoObject.getAddressLine()
			// console.log(firstGeoObject.getAddressLine());
		})
	})

	// Add the new marker to the map
	map.geoObjects.add(myLocationPlacemark)

	// Trigger geocoding and address update immediately after placing the marker
	getAddressFromLocation(coords)
	findNearestBranch(coords)
	ymaps.geocode(coords).then(result => {
		const firstGeoObject = result.geoObjects.get(0)
		address.value = firstGeoObject.getAddressLine()
		formDate.address = firstGeoObject.getAddressLine()
		// console.log(firstGeoObject.getAddressLine());
	})
}

const getTokenGP = async () => {
	paymentSteps.loader = true
	let session_id = uuidv4()
	sessionStorage.setItem('session_id', session_id)
	axios({
		method: 'POST',
		url: `${gPBU}/get-token-pay`,
		data: qs.stringify({
			serviceId: activeBranch.serviceId,
			session_id: session_id,
		}),
	})
		.then(res => {
			console.log(res.data)
			paymentSteps.loader = false
			paymentSteps.one = true
		})
		.catch(err => {
			console.error(err)
		})
}
const updateCountdown = () => {
	if (smsResendSeconds.value > 0) {
		smsResendSeconds.value -= 1
		setTimeout(updateCountdown, 1000) // обновляем каждую секунду
	} else {
		document.getElementById('smsResendButton').removeAttribute('disabled')
		document.getElementById('smsResendButton').textContent = 'Отправить код'
	}
}
const sendCard = async () => {
	let session_id = sessionStorage.getItem('session_id')
	if (cardNumMasked.completed && cardDateMasked.completed) {
		paymentSteps.one = false
		paymentSteps.loader = true
		axios({
			method: 'POST',
			url: `${gPBU}/send-card`,
			data: {
				cardNumber: cardNumMasked.unmasked,
				expiryDate:
					cardDateMasked.unmasked.substring(2) +
					cardDateMasked.unmasked.substring(0, 2),
				smsNotificationNumber: '',
				session_id: session_id,
				branchID: activeBranch.branchID,
			},
		})
			.then(res => {
				if ((res.data.detail && !res.data.cardToken) || res.data.error) {
					Swal.fire({
						icon: 'error',
						title: `${t('checkout.payError.error')}`,
						text: `${t('checkout.payError.cardNumberError')}`,
						showDenyButton: true,
						confirmButtonText: `${t('checkout.payError.reenter')}`,
						denyButtonText: `${t('checkout.payError.cancel')}`,
					}).then(result => {
						if (result.isConfirmed) {
							paymentSteps.one = true
							paymentSteps.loader = false
						} else {
							paymentModal.value = false
							paymentSteps.one = false
							paymentSteps.two = false
							paymentSteps.three = false
						}
					})
				} else {
					paymentSteps.loader = false
					paymentSteps.two = true
					smsNotificationNumber.value = res.data.smsNotificationNumber
					updateCountdown()
				}
			})
			.catch(err => {
				console.error(err)
			})
	} else {
		Swal.fire({
			icon: 'error',
			title: `${t('checkout.payError.error')}`,
			text: `${t('checkout.payError.cardInputNotValid')}`,
		})
	}
}
const confirmCard = async () => {
	if (smsCode.value.length > 5) {
		paymentSteps.two = false
		paymentSteps.loader = true
		let session_id = sessionStorage.getItem('session_id')
		axios({
			method: 'POST',
			url: `${gPBU}/confirm-card`,
			data: {
				code: smsCode.value,
				session_id: session_id,
				branchID: activeBranch.branchID,
			},
		})
			.then(async res => {
				if (!res.data.confirm) {
					Swal.fire({
						icon: 'error',
						title: `${t('checkout.payError.error')}`,
						text: `${t('checkout.payError.errorOTP')}`,
						showDenyButton: true,
						confirmButtonText: `${t('checkout.payError.reenter')}`,
						denyButtonText: `${t('checkout.payError.cancel')}`,
					}).then(result => {
						if (result.isConfirmed) {
							paymentSteps.loader = false
							paymentSteps.two = true
							smsCode.value = ''
							smsResendButtonN.value = true
						} else {
							paymentModal.value = false
							paymentSteps.one = false
							paymentSteps.two = false
							paymentSteps.three = false
						}
					})
				} else {
					paymentInit()
				}
			})
			.catch(err => {
				console.error(err)
			})
	} else {
		Swal.fire({
			icon: 'error',
			title: `${t('checkout.payError.error')}`,
			text: `${t('checkout.payError.smsInputNotValid')}`,
		})
	}
}
const paymentInit = async () => {
	uuid.value = uuidv4()
	sessionStorage.setItem('externalId', uuid.value)
	let session_id = sessionStorage.getItem('session_id')
	axios({
		method: 'POST',
		url: `${gPBU}/payment-init`,
		data: {
			externalId: sessionStorage.getItem('externalId'),
			serviceId: activeBranch.serviceId,
			session_id: session_id,
			branchID: activeBranch.branchID,
			paymentFields: [
				{
					value: 'UZS',
					name: 'currency',
				},
				{
					value: `${totalPrice.value * 100}`,
					name: 'amount',
				},
			],
		},
	})
		.then(res => {
			if (res.data.confirm) {
				paymentPerform(res.data.id)
			} else {
				console.log(res)
			}
		})
		.catch(err => {
			console.error(err)
		})
}
const paymentPerform = async paymentInitID => {
	let session_id = sessionStorage.getItem('session_id')

	try {
		const res = await axios.post(`${gPBU}/payment-perform`, {
			externalId: sessionStorage.getItem('externalId'),
			serviceId: activeBranch.serviceId,
			session_id: session_id,
			branchID: activeBranch.branchID,
		})

		if (res.data.gnkFields) {
			await generalStore.PostOrderInTg(
				formDate,
				phoneMasked.unmasked,
				activeBranch.name,
				t('checkout.swal.orderAcceptTitle'),
				t('checkout.swal.orderAcceptText'),
				lat.value,
				lon.value,
				true
			)
			qrcodeUrlFromGlobalPay.value = res.data.gnkFields.qrcodeUrl
			paymentSteps.three = true
		} else if (res.data.error) {
			Swal.fire({
				icon: 'error',
				title: `${t('checkout.swal.oops')}`,
				text: `${t('checkout.swal.orderPaymentError')}`,
			})
			paymentSteps.three = false
		}
	} catch (err) {
		console.error(err)
	} finally {
		// Включаем/выключаем лоадер в зависимости от статуса запроса
		paymentSteps.loader = false
	}
}
const checkout = async () => {
	const result = await v$.value.$validate()
	if (result && phoneMasked.completed) {
		Swal.fire({
			icon: 'info',
			title: `${t('checkout.swal.checkOrder')}`,
			showDenyButton: true,
			confirmButtonText: `${t('checkout.swal.checkOrderYes')}`,
			denyButtonText: `${t('checkout.swal.checkOrderNo')}`,
		}).then(async result => {
			if (result.isConfirmed) {
				if (formDate.payment != 'Global Pay') {
					generalStore.PostOrderInTg(
						formDate,
						phoneMasked.unmasked,
						activeBranch.name,
						t('checkout.swal.orderAcceptTitle'),
						t('checkout.swal.orderAcceptText'),
						lat.value,
						lon.value,
						false
					)
				} else {
					paymentModal.value = true
					getTokenGP()
				}
			} else if (result.isDenied) {
				Swal.fire(`${t('checkout.swal.ordreCancel')}`, '', 'info')
			}
		})
	} else if (!phoneMasked.completed && result) {
		Swal.fire({
			icon: 'error',
			title: `${t('checkout.swal.oops')}`,
			text: `${t('checkout.swal.phoneErrorText')}`,
		})
	} else {
		Swal.fire({
			icon: 'error',
			title: `${t('checkout.swal.oops')}`,
			text: `${t('checkout.swal.formErrorText')}`,
		})
	}
}
const closePaymentGP = async () => {
	paymentModal.value = false
	paymentSteps.three = false
	router.push('/')
}

const resendCode = async () => {
	axios({
		method: 'POST',
		url: `${gPBU}/send-card`,
		headers: {
			Authorization: `${sessionStorage.getItem('access_token')}`,
		},
		data: {
			cardNumber: cardNumMasked.unmasked,
			expiryDate:
				cardDateMasked.unmasked.substring(2) +
				cardDateMasked.unmasked.substring(0, 2),
			smsNotificationNumber: '',
		},
	})
		.then(res => {
			cardToken.value = res.data.cardToken
			smsNotificationNumber.value = res.data.smsNotificationNumber
		})
		.catch(err => {
			console.error(err)
		})
}

onMounted(() => {
	generalStore.cart = JSON.parse(localStorage.getItem('cart')) || {}
	loadYandexMaps()
	checkTime()
	// scheduleCheck();
})
</script>

<style lang="scss" scoped></style>
