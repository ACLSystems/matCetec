import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';

import { Grade, BlockGrade } from '@shared/types/block.type';

import { UserCourseService } from '@shared/services/userCourse.service';
import { WindowService } from '@shared/services/windowSize.service';

declare const $: any;

interface dataChart {
	labels: string[],
	series: number[]
}

@Component({
	selector: 'app-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.scss'],
	providers: [
		UserCourseService
	]
})
export class ProgressComponent implements OnInit {

	loading: boolean;
	groupid: string;
	grade: Grade;
	track: number;
	rubricData: dataChart;
	totalW: number;
	totalPercentage: number;
	finalGrade: number;
	width: number;

	startAnimationForBarChart(chart: any) {
			let seq2: any, delays2: any, durations2: any;
			seq2 = 0;
			delays2 = 80;
			durations2 = 500;
			chart.on('draw', function(data: any) {
				if (data.type === 'bar') {
						seq2++;
						data.element.animate({
							opacity: {
								begin: seq2 * delays2,
								dur: durations2,
								from: 0,
								to: 1,
								easing: 'ease'
							}
						});
				}
			});

			seq2 = 0;
	}

	constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private userCourseService: UserCourseService,
		private windowService: WindowService
	) {
		this.activatedRoute.params.subscribe(params => {
				this.groupid = params.groupid;
			}
		);
	}

	ngOnInit() {
		this.loading = true;
		this.width = this.windowService.windowRef.innerWidth;
		this.getGrades();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event) {
		// console.log(event)
		this.width = this.windowService.windowRef.innerWidth;
		if(this.width > 768) {
			setTimeout(() => {
				this.displayChart();
			}, 100);
		}
	}

	getGrades() {
		this.userCourseService.getMyGrades(this.groupid).subscribe(data => {
			this.grade = data.message;
			this.track = +this.grade.track.replace('%','');
			this.grade = this.generateDisplayValues(this.grade);
			this.loading = false;
			console.log(this.grade);
			if(this.width > 768){
				setTimeout(() => {
					this.displayChart();
				}, 100);
			}
		});
	}

	displayChart() {
		const dataChartGrades: dataChart= {
			labels: [],
			series: []
		};
		const dataChartRubric: dataChart = {
			labels: [],
			series: []
		};
		var grades: BlockGrade[] = (this.grade.blocks && this.grade.blocks.length > 0) ? this.grade.blocks : [];
		if(grades.length > 0) {
			grades.forEach(grade => {
				if(grade.blockNumber === 0) {
					dataChartGrades.labels.push(grade.blockTitle);
					dataChartRubric.labels.push(grade.blockTitle);
					dataChartGrades.series.push(grade.grade);
					dataChartRubric.series.push(grade.blockW);
				}
			});
		}
		var counts = [];
		for(let i=0; i < dataChartRubric.series.length; i++) {
			let serie = dataChartRubric.series[i];
			let label = dataChartRubric.labels[i];
			let found = counts.findIndex(c => c.number === serie);
			if(found > -1) {
				if(counts[found].label) {
					counts[found] = {
						number: serie,
						count: counts[found].count + 1,
						label: 'El resto de las unidades',
						acc: counts[found].acc + serie
					}
				} else {
					counts[found] = {
						number: serie,
						count: counts[found].count + 1,
						label: label,
						acc: serie
					}
				}

			} else {
				counts.push({
					number: serie,
					count: 1,
					label: label,
					acc: serie
				});
			}
		}
		const newDataChartRubric = {
			series: [],
			labels: []
		}
		counts.forEach(label => {
			newDataChartRubric.series.push(label.acc);
			newDataChartRubric.labels.push(label.label);
		})
		// console.log(counts);
		// console.log(dataChartGrades);
		// console.log(dataChartRubric);
		// console.log(newDataChartRubric);
		this.rubricData = newDataChartRubric;
		// const dataChartTest = {
		// 	labels: ['U1', 'U2', 'U3','U4', 'U5', 'U6','U7', 'U8', 'U9','U10', 'U11', 'U12'],
		// 	series: [
		// 		[100,95,80,93,100,64,0,0,0,0,0,0]
		// 	]
		// };
		const optionsChart = {
			seriesBarDistance: 10,
			axisX: {
				showGrid: false
			},
			// height: '400px'
			high: 100,
			low: 0,
			chartPadding: {
				top: 15,
				right: 15,
				bottom: 40,
				left: 10
			}
		};

		const responsiveOptions: any = [
			['screen and (max-width: 640px)', {
				seriesBarDistance: 5,
				axisX: {
					labelInterpolationFnc: function (value: any) {
						return value[0];
					}
				}
			}]
		];

		const chartGrades = new Chartist.Bar('#chart-grades', dataChartGrades,optionsChart, responsiveOptions);
		this.startAnimationForBarChart(chartGrades);
		new Chartist.Pie('#chart-rubric',newDataChartRubric,{height: '230px'});


	}

	private generateDisplayValues(grades: any) {
		this.totalW = 0;
		this.totalPercentage = 0;
		this.finalGrade = 0;
		grades.blocks.forEach((value: any) => {
			if(value.blockType === 'questionnarie') {
				value.typeDisplay = 'Examen/Quiz';
			} else if(value.blockType === 'task') {
				value.typeDisplay = 'Actividad/Tarea';
			} else if(value.blockNumber === 0) {
				value.typeDisplay = 'Sección';
				this.totalW += value.blockW;
			} else {
				value.typeDisplay = value.blockType;
			}
		});
		grades.blocks.forEach((value: any) => {
			if(value.blockNumber === 0) {
				this.totalPercentage += value.blockW / this.totalW;
				this.finalGrade += value.blockW * value.grade / this.totalW;
			}
		});
		if((this.finalGrade - this.grade.finalGrade) > 0.1) {
			this.finalGrade = this.grade.finalGrade;
		}
		return grades;
	}

}
