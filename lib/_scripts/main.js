'use strict';

import $ from 'jquery';

$(() => {
	var nav = document.getElementById('#nav');

	var a = 5;
	var b = 15;

	var c = a * + a + a;

	console.log(c);

	var options = {'color':'black'};

	$('body').css('color', 'tomato');
});