var Entity = require('./entity.js');

var Player = module.exports = Entity.extend({
	_id: 0,
	_name: "",
	_photo: "",
	_gold: 0,
	
	_hp: 0,
	_atk: 0,
	_defense: 0,
	_undefense: 0,
	_crit: 0,
	_uncrit: 0,
	_dodge: 0,
	_hit: 0,	

    ctor: function(attrs) {
        this.sets(attrs);
    }
});