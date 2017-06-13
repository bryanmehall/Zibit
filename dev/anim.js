var keyframes = [
	{
		time: 1,
		actions: [
			{
				type: "fadeWidgetIn",
				params: {
					dur: 3,
					type: 'Plot',
					name: 'testPlot',
					parent: "SmdApp"
				}
			}
		]
	}
]

var actions = {
	fadeWidgetIn: function (params) {
		console.log('fading widget', params)
	}
}
