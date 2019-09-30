export interface Options {
	name: string,
	value: string,
	eval?: number
}

export interface Answer {
	type: string,
	index: number,
	tf?: string,
	group?: any[]
}

export interface Question {
	header?: string,
	footer?: string,
	footerShow?: boolean,
	display?: any[],
	text?: string,
	group?: string[],
	id: string,
	label?:	string,
	options?: Options[],
	answers?: Answer[],
	isVisible?: boolean,
	help?: string,
	type: string,
	w: number
}

export interface Questionnarie {
	org?: any,
	begin: boolean,
	id: string,
	maxAttempts: number,
	minimum: number,
	questions: Question[],
	isVisible?: boolean,
	type: string,
	w: number,
	diagnostic?: {
		aspects: [
			{
				name?: string,
				min?: number,
				max?: number,
				eval?: [
					{
						min?: number,
						max?: number,
						results?: string,
						notes?: string
					}
				]
			}
		],
		notes: {
			text?: string,
			show: boolean
		}
	}
}

export interface Block {
	blockCode: string,
	blockContent: string,
	blockCurrentId: string,
	blockMedia?: string[],
	blockMinimumTime: number,
	blockNextId: string,
	blockNumber: number,
	blockPrevId: string,
	blockSection: number,
	blockTitle: string,
	blockTrack: boolean,
	blockType: string,
	blockUnitBeginning?: string | Date,
	courseCode: string,
	groupCode: string,
	rosterid: string,
	studentid: string,
	questionnarie?: Questionnarie,
	maxGrade?: number,
	lastAttempt?: string | Date,
	track?: number,
	attempts?: number
}
