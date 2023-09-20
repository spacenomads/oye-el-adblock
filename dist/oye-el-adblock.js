class OyeElAdblock {
	constructor(userConfig) {
		this.hasAdBlockActive = false
		this.NAMESPACE = '🤠'
		this.AD_TARGET_CLASSES = [
			'aan_fake',
			'aan_fake__video-units',
			'ad',
			'adde_modal_detector',
			'adde_modal-overlay',
			'adsbyrunactive',
			'advboxemb',
			'advertising',
			'aff-content-col',
			'aff-inner-col',
			'aff-item-list',
			'amp-ad-inner',
			'aoa_overlay',
			'ark-ad-message',
			'ave-pl',
			'bloc-pub',
			'bloc-pub2',
			'blocker-notice',
			'blocker-overlay',
			'bottom-hor-block',
			'brs-block',
			'd-none',
			'dbanner',
			'exo-horizontal',
			'fints-block__row',
			'ftf-dma-note',
			'full-ave-pl',
			'full-bns-block',
			'gallery-bns-bl',
			'glx-watermark-container',
			'GoogleActiveViewElement',
			'happy-inside-player',
			'happy-under-player',
			'header-menu-bottom-ads',
			'hor_banner',
			'imggif',
			'in_stream_banner',
			'inplayer_banners',
			'inplayer-ad',
			'mdp-deblocker-wrapper',
			'message',
			'native-ad',
			'native-ad-1',
			'ninja-recommend-block',
			'overlay-advertising-new',
			'player-bns-block',
			'preroll-blocker',
			'rkads',
			'rps_player_ads',
			'stream-item-widget',
			'trafficjunky-float-right',
			'vertbars',
			'video-brs',
			'wgAdBlockMessage',
			'wps-player__happy-inside',
			'ytd-j',
			'yxd-j',
			'yxd-jd',
		]
		this.config = {
			title: 'Oye, el adBlock!',
			text: [
				'Pero bueno, que no se puede ir por la vida sin un bloqueador de publicidad!',
			],
			link: {
				url: '#adblock',
				label: 'Por qué necesito uno?',
			},
			close_btn: {
				label: 'Cerrar ',
				sr_label: 'aviso de que no se ha detectado adBlock'
			},
		}

		if (typeof userConfig === 'object') {
			this.config = {...this.config, ...userConfig}
		}

		this.init()
	}


	getCustomClass(em) {
		if (!em) return this.config.custom_class_name ? `${this.config.custom_class_name}` : ''
		return this.config.custom_class_name ? `${this.config.custom_class_name}__${em}` : ''
	}


	getContentTemplate(content) {
		const {custom_class_name} = content
		const newElement = document.createElement('aside')
		newElement.className = `${this.NAMESPACE} js-${this.NAMESPACE} ${this.getCustomClass()} ${this.AD_TARGET_CLASSES.join(' ')}`
		newElement.setAttribute('aria-hidden', 'false')
		newElement.setAttribute('role', 'alert')

		const wrapper = document.createElement('div')
		wrapper.classList.add(`${this.NAMESPACE}__wrapper`)
		const wrapperCustomClassList = this.getCustomClass('wrapper')
		wrapperCustomClassList && wrapper.classList.add(wrapperCustomClassList)

		const title = `<h2 class="${this.NAMESPACE}__title ${this.getCustomClass('title')}">${content.title}</h2>`
		wrapper.innerHTML += title

		for (const p of content.text) {
			const template = `<p class="${this.NAMESPACE}__paragraph ${this.getCustomClass('paragraph')}">${p}</p>`
			wrapper.innerHTML += template
		}

		if (content.link && content.link.url && content.link.label) {
			const extraLinkTemplate = `<p class="${this.NAMESPACE}__paragraph ${this.NAMESPACE}__paragraph--extra-link ${this.getCustomClass('paragraph')} ${this.getCustomClass('paragraph--extra-link')}"><a href="${content.link.url}" class="${this.NAMESPACE}__link ${this.getCustomClass('link')}">${content.link.label}</a></p>`
			wrapper.innerHTML += extraLinkTemplate
		}

		newElement.append(wrapper)

		if (content.close_btn && (content.close_btn?.label || content.close_btn?.sr_label)) {

			const closeButton = document.createElement('button')
			closeButton.type = 'button'
			closeButton.classList.add(`${this.NAMESPACE}__close`)
			closeButton.classList.add(`js-${this.NAMESPACE}-close`)
			const closeButtonCustomClass = this.getCustomClass('close')
			closeButtonCustomClass && closeButton.classList.add(closeButtonCustomClass)

			const buttonLabel = document.createTextNode(content.close_btn.label || '')
			const buttonSrLabel = document.createElement('span')
			buttonSrLabel.classList.add(`${this.NAMESPACE}__sr-only`)
			const srOnlyCustomClass = this.getCustomClass('sr-only')
			srOnlyCustomClass && buttonSrLabel.classList.add(srOnlyCustomClass)
			buttonSrLabel.textContent = content.close_btn.sr_label || ''

			// TODO: No añadir el span de screen reader si no hay contenido.
			closeButton.append(buttonLabel, buttonSrLabel)
			closeButton.addEventListener('click', (event) => this.closeAdBlockWarning(event.currentTarget))

			newElement.append(closeButton)
		}

		return newElement
	}


	closeAdBlockWarning(btn) {
		const adWarningElement = btn.closest(`.js-${this.NAMESPACE}`)
		adWarningElement.setAttribute('aria-hidden', true)
		adWarningElement.classList.add(`${this.NAMESPACE}--hidden`)
	}


	init() {
		const oyeElAdBlockExists = !!document.querySelector(`.js-${this.NAMESPACE}`)
		const newAdElement = this.getContentTemplate(this.config)

		if (!oyeElAdBlockExists) {
			document.body.append(newAdElement)


		}
		const oyeElAdBlockElement = document.querySelector(`.js-${this.NAMESPACE}`)
		this.hasAdBlockActive = !Boolean(oyeElAdBlockElement.offsetHeight)
		oyeElAdBlockElement.setAttribute('aria-hidden', this.hasAdBlockActive)
	}
}
