const oyeElAdBlock = (function() {
	let hasAdBlockActive = false

	const AD_TARGET_CLASSES = [
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

	function getContentTemplate(content) {
		const {custom_class_name} = content;
		const newElement = document.createElement('SECTION')
		newElement.className = `oyeElAdBlock js-oyeElAdBlock ${content.custom_class_name} ${AD_TARGET_CLASSES.join(' ')}`

		const wrapper = document.createElement('DIV')
		wrapper.classList.add(`oyeElAdBlock__wrapper`)
		wrapper.classList.add(`${custom_class_name}__wrapper`)

		const title = `<h2 class="oyeElAdBlock__title ${custom_class_name}__title">${content.title}</h2>`
		wrapper.innerHTML += title

		for (const p of content.html_text) {
			const template = `<p class="oyeElAdBlock__paragraph ${custom_class_name}__paragraph">${p}</p>`
			wrapper.innerHTML += template
		}

		if (content.link.url && content.link.text) {
			const extraLinkTemplate = `<p class="oyeElAdBlock__paragraph ${custom_class_name}__paragraph"><a href="${content.link.url}" class="oyeElAdBlock__link ${custom_class_name}__link">${content.link.text}</a></p>`
			wrapper.innerHTML += extraLinkTemplate
		}

		newElement.append(wrapper)

		return newElement;
	}

	function init(userContent) {
		const defaultContent = {
			title: '🤠 Oye, que no tienes Adblock!',
			html_text: [
				'Bla, bla, bla, bloqueador, privacidad, lama de cántaro y aquí puedes leer por qué lo necesitas y algunas extensiones recomendadas.',
			],
			link: {
				url: '#adblock',
				text: 'Por qué necesito un AdBlocker',
			},
			custom_class_name: 'paque'
		}

		const content = {...defaultContent, ...userContent}
		const oyeElAdBlockExists = !!document.querySelector('.js-oyeElAdBlock')

		const newAdElement = getContentTemplate(content)
		newAdElement.append();

		!oyeElAdBlockExists && document.body.append(newAdElement)
		const oyeElAdBlockElement = document.querySelector('.js-oyeElAdBlock')

		hasAdBlockActive = !!oyeElAdBlockElement.offsetHeight

		console.log(!hasAdBlockActive ? '😎 El adBlocker está bloqueando' : '🤬 Ni está ni se le espera')



	}

	return {
		init,
	};
})()

const customContent = {
	custom_class_name: '🌵'
}

oyeElAdBlock.init(customContent)
