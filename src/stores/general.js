import { defineStore } from 'pinia'
import { instance, telegramUrl, telegramDebUrl } from '../axios'
import Swal from 'sweetalert2'
import axios from 'axios'
import router from '../router'

export const useGeneralStore = defineStore('general', {
	state: () => ({
		loader: false,
		categories: null,
		showCart: false,
		cart: {},
		totalPrice: 0,
	}),
	actions: {
		async getCategory() {
			this.loader = true
			await instance
				.get('/pos-category?photo=1&product=1')
				.then(result => {
					this.categories = result.data
					this.loader = false
				})
				.catch(error => {
					console.log(error)
				})
		},
		priceView(price) {
			let pos = 0
			if (price / 1000 < 10) {
				pos = 1
			}
			if (price / 1000 >= 10 && price / 1000 < 100) {
				pos = 2
			}
			if (price / 1000 >= 100 && price / 1000 < 1000) {
				pos = 3
			}
			return price.toString().slice(0, pos) + ' ' + price.toString().slice(pos)
		},
		async PostOrderInTg(
			formData,
			phone,
			branchName,
			swalTitle,
			swalText,
			latitude,
			longitude,
			online
		) {
			try {
				let total = 0
				let paymentType =
					formData.payment === 'Cash'
						? '💵 ' + formData.payment
						: '💳 ' + formData.payment

				// Используйте метод map для удобного форматирования данных
				const orderItems = Object.values(this.cart).map(item => {
					const itemTotal = item.quantity * item.priceList.price
					total += itemTotal

					return `${item.name}\n ${item.quantity} x ${this.priceView(
						item.priceList.price
					)} = ${this.priceView(itemTotal)} сум\n\n`
				})

				const orderDetails =
					`Адрес: ${formData.address}\n` +
					`Филиал: ${branchName}\n` +
					`Имя: ${formData.name}\n` +
					`Тел: ${phone}\n` +
					`Тип платежа: ${paymentType}\n\n` +
					`Заметка: ${formData.comment || 'Нет заметки'}\n\n` +
					`🛒 <b>Корзина:</b>\n${orderItems.join('')}\n` +
					`<b>Итого:</b> ${this.priceView(total)} сум\n\n` +
					`-----------------------\n` +
					`Источник: WebSite\n`

				// Используйте async/await вместо .then и .catch
				const sendToTelegram = async url => {
					const response = await axios.get(url, {
						headers: {
							'Content-Type': 'application/json; charset=UTF-8',
						},
						params: {
							text: orderDetails,
							latitude,
							longitude,
						},
					})

					if (!response.data) {
						throw new Error('Failed to send to Telegram')
					}
				}

				await sendToTelegram(telegramUrl)
				await sendToTelegram(telegramDebUrl)

				await Swal.fire({
					icon: 'success',
					title: `${swalTitle}`,
					text: `${swalText}`,
					showConfirmButton: true,
				})

				this.cart = {}
				localStorage.removeItem('cart')

				if (!online) {
					router.push('/')
				}
			} catch (error) {
				console.error(error)

				await this.PostOrderInTg(
					formData,
					phone,
					branchName,
					swalTitle,
					swalText,
					latitude,
					longitude,
					online
				)
			}
		},
		openOrCloseCart() {
			this.showCart = !this.showCart
			if (this.showCart) {
				document.documentElement.style.overflow = 'hidden'
			} else {
				document.documentElement.style.overflow = 'auto'
			}
		},
		addCart(product, text) {
			const Toast = Swal.mixin({
				toast: true,
				position: 'bottom-start',
				showConfirmButton: false,
				timer: 1000,
				timerProgressBar: true,
				didOpen: toast => {
					toast.onmouseenter = Swal.stopTimer
					toast.onmouseleave = Swal.resumeTimer
				},
			})
			if (this.cart[product.id]) {
				this.cart[product.id].quantity++
			} else {
				this.cart[product.id] = product
				this.cart[product.id].quantity = 1
			}
			localStorage.setItem('cart', JSON.stringify(this.cart))
			Toast.fire({
				icon: 'success',
				title: `${product.name} ${text}`,
			})
		},
		delCart(product) {
			delete this.cart[product.id]
			localStorage.setItem('cart', JSON.stringify(this.cart))
		},
		minusCart(product) {
			if (this.cart[product.id].quantity > 1) {
				this.cart[product.id].quantity--
			}
			localStorage.setItem('cart', JSON.stringify(this.cart))
		},
		plusCart(product) {
			this.cart[product.id].quantity++
			localStorage.setItem('cart', JSON.stringify(this.cart))
		},
		clearCart() {
			this.cart = {}
			localStorage.removeItem('cart')
		},
	},
	getters: {},
})
