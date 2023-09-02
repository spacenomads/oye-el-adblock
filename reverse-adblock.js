const reverseAdblock = (function() {

	let hasAdBlockActive = false


	function getContentTemplate(content) {
		const {custom_class_name} = content;
		const wrapper = document.createElement('DIV')
		wrapper.classList.add(`reverseAdblock__wrapper`)
		wrapper.classList.add(`${custom_class_name}__wrapper`)

		const title = `<h2 class="reverseAdblock__title ${custom_class_name}__title">${content.title}</h2>`
		wrapper.innerHTML += title

		for (const p of content.html_text) {
			const template = `<p class="reverseAdblock__paragraph ${custom_class_name}__paragraph">${p}</p>`
			wrapper.innerHTML += template
		}

		return wrapper;
	}

	function init(userContent) {

		const defaultContent = {
			title: '🦄 Madre de Crom, no tienes un AdBlock instalado!!',
			html_text: [
				'Bla, bla, bla, bloqueador, privacidad, lama de cántaro y aquí puedes leer por qué lo necesitas y algunas extensiones recomendadas.',
			],
			link: {
				url: '#AdBlocker',
				text: 'Por qué necesito un AdBlocker',
			},
			custom_class_name: 'paque'
		}

		const content = {...defaultContent, ...userContent}

		const reverseAdblockExists = !!document.querySelector('.js-reverseAdblock')

		const newAdElement = document.createElement('SECTION')
		newAdElement.className = `reverseAdblock js-reverseAdblock ${content.custom_class_name} ftf-dma-note ad native-ad native-ad-1 ytd-j yxd-j yxd-jd aff-content-col aff-inner-col aff-item-list ark-ad-message inplayer-ad inplayer_banners in_stream_banner trafficjunky-float-right dbanner preroll-blocker happy-inside-player blocker-notice blocker-overlay exo-horizontal ave-pl bottom-hor-block brs-block advboxemb wgAdBlockMessage glx-watermark-container overlay-advertising-new header-menu-bottom-ads rkads mdp-deblocker-wrapper amp-ad-inner imggif bloc-pub bloc-pub2 hor_banner aan_fake aan_fake__video-units rps_player_ads fints-block__row full-ave-pl full-bns-block vertbars video-brs player-bns-block wps-player__happy-inside gallery-bns-bl stream-item-widget adsbyrunactive happy-under-player adde_modal_detector adde_modal-overlay ninja-recommend-block aoa_overlay message`
		newAdElement.append(getContentTemplate(content));

		!reverseAdblockExists && document.body.append(newAdElement)
		const reverseAdblockElement = document.querySelector('.js-reverseAdblock')

		hasAdBlockActive = !!reverseAdblockElement.offsetHeight

		console.log(!hasAdBlockActive ? '😎 El adBlocker está bloqueando' : '🤬 Ni está ni se le espera')



	}

	return {
		init,
	};
})()

const customContent = {
	custom_class_name: '🌵'
}

reverseAdblock.init(customContent)
