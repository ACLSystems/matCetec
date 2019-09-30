import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

	async testLaunchAlert() {
		const { value: test } = await Swal.fire({
			title: 'Hola',
			input: 'text',
			inputValue: 'test',
			showCancelButton: true,
			inputValidator: (value) => {
				if(!value) {
					return 'Necesitas poner un valor!'
				}
			}
		})
		if(test) {
			Swal.fire(`escribiste ${test}`);
		}
	}

}
