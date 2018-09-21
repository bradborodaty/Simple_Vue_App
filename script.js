// create vue instance
let app = new Vue({
	// el is where to display
	el: '#app',
	// data for vue to track
	data: {
		message: 'Vote for your favorite',
		editMode: false,
		frameworks: [
			{ name: 'Vue.js', votes: 0 },
			{ name: 'React', votes: 0 },
			{ name: 'Angular', votes: 0 }
		]
	},
	// methods for the app, functionality here
	methods: {
		voteFor: function(f) {
			f.votes += 1
			this.save()
		},
		addNew: function(event) {
			this.frameworks.push({
				name: event.target.value,
				votes: 0
			})
			event.target.value = ''
			this.save()
		},
		// deletes by only showing items in frameworks that aren't f
		remove: function(f) {
			this.frameworks = this.frameworks.filter(i => i != f)
			this.save()
		},
		load: function() {
			let data = localStorage.getItem('saved')
			// if data exists, retrieve and unparse it
			if (data) {
				this.frameworks = JSON.parse(data)
			}
		},
		save: function() {
			// encode data to save in local storage
			let data = JSON.stringify(this.frameworks)
			localStorage.setItem('saved', data)
		},
		toggleEditMode: function() {
			this.editMode = !this.editMode
		}
	},
	// keep up-to-date with changes to variables
	computed: {
		winnerString: function() {
			let scores = this.frameworks.map(f => f.votes)
			let highscore = Math.max.apply(Math, scores)
			let bestList = this.frameworks.filter(f => f.votes == highscore)
			let bestNames = bestList.map(f => f.name)
			return bestNames.join(', ')
		},
		loserString: function() {
			let scores = this.frameworks.map(f => f.votes)
			let lowscore = Math.min.apply(Math, scores)
			let worstList = this.frameworks.filter(f => f.votes == lowscore)
			let worstName = worstList.map(f => f.name)
			return worstName.join(', ')
		}
	},
	// lifecycle hook in vue
	created: function() {
		this.load()
	}
})
