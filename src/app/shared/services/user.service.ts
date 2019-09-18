import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { JSONHeaders } from '@shared/services/httpHeaders';

 ;

//permitimos con este decorador inyectar a otras dependencias
@Injectable()
export class UserService{

	public url: string;
	public identity: any;
	public token: any;
	public tokenVersion: string;
	public roles: any;


	constructor(private http: HttpClient) {
		this.url = environment.url;
	}

	/*
	metodo para obtener la informacion del usuario
	*/
	/*
	Falta validar que hacer si no hay token. Debería mandarlo a login
	*/
	getUser(username:string): Observable<any> {
		const httpOptions = {
			headers: JSONHeaders.set(
				'Authorization',
				'Bearer ' + this.getToken()
			),
			params: new HttpParams().set(
				'name', username
			)
		};
		const route = this.url + 'api/v1/user/getdetails';
		return this.http.get(route, httpOptions);
	}

	/*
	metodo para traer la identidad del usuario autenticado
	*/
	getidentity() {
		const identity = JSON.parse(localStorage.getItem('identity'));
		if (identity !== 'undefined') {
			this.identity = identity;
		} else {
			this.identity = null;
		}
		return this.identity;
	}

	/*
	metodo para poner el token del usuario logueado donde el api lo requiera
	*/
	getToken() {
		const token = localStorage.getItem('token');
		if (token !== 'undefined') {
			this.token = token;
		} else {
			this.token = null;
		}
		return this.token;
	}

	/*
	método para eliminar datos de la sesión
	*/
	destroySession() {
		localStorage.removeItem('identity');
		localStorage.removeItem('token');
		localStorage.removeItem('tokenVersion');
		localStorage.clear();
		return;
	}

	/*
	metodo para poner el token del usuario logueado donde el api lo requiera
	*/
	getTokenVersion() {
		const tokenVersion = localStorage.getItem('tokenVersion');
		if (tokenVersion !== 'undefined') {
			this.tokenVersion = this.tokenVersion;
		} else {
			this.tokenVersion = null;
		}
		return this.tokenVersion;
	}

	/*
	Metodo para obtener los roles del usuario
	*/
	/*
	Falta validar qué sucede si no hay token. Debería mandarlo a login
	*/
	getRoles():Observable<any>{
		const httpOptions = {
			headers: JSONHeaders.set(
				'Authorization',
				'Bearer ' + this.getToken()
			)
		};
		const route = this.url+'api/v1/user/myroles';
		return this.http.get(route,httpOptions);
	}

	/*
	Metodo para imprimir los errores que se generen en API
	*/
	parserErrors(error:string):string{
		if(error.match("Not Found")){
			return "Usuario o contraseña invalido, favor de validar que los datos proporcionados sean las correctos";
		}
		return "Error desconocido";
	}

	/*
	funcion para el cambio de contraseña
	*/
	changePassword(newpassword:string){
		const params = JSON.stringify(newpassword);
		const headers = JSONHeaders.set(
			'Authorization',
			'Bearer ' + this.getToken()
		);
		const route = this.url+'api/v1/user/passwordchange';
		return this.http.put(route, params, {headers});
	}

	/*
	metodo para devolver el total de notificaciones nuevas
	*/
	getNotifications():Observable<any>{
		const headers = JSONHeaders.set(
			'Authorization',
			'Bearer ' + this.getToken()
		);
		const route = this.url+'api/v1/user/message/new';
		return this.http.get(route, {headers});
	}

	/*
	metodo para obtener mis notificaciones
	*/
	getMyNotificationsBell(): Observable<any> {
		const httpOptions = {
			parms: new HttpParams()
				.set('read','false'),
			headers: JSONHeaders.set(
				'Authorization',
				'Bearer ' + this.getToken()
			)
		}
		const route = this.url+'api/v1/user/message/my';
		return this.http.get(route, httpOptions);
	}

	/*
	metodo para obtener mis notificaciones
	*/
	getMyNotifications():Observable<any>{
		const headers = JSONHeaders.set(
			'Authorization',
			'Bearer ' + this.getToken()
		);
		const route = this.url+'api/v1/user/message/my';
		return this.http.get(route, {headers});
	}

	/*
	meotodo para agregar una notificacion
	*/
	setNotification(message:any):Observable<any>{
		const params = JSON.stringify(message);
		const headers = JSONHeaders.set(
				'Authorization',
				'Bearer ' + this.getToken()
			);
		const route = this.url+'api/v1/user/message/create';
		return this.http.post(route, params, {headers});
	}

	/*
	metodo para cerrar notificaciones
	*/
	closeNotification(notificationid:any):Observable<any>{
		const params = JSON.stringify(notificationid);
		const headers = JSONHeaders.set(
				'Authorization',
				'Bearer ' + this.getToken()
			);
		const route = this.url+'api/v1/user/message/close';
		return this.http.put(route, params, {headers});
	}

	/*
	crear un follos a determinado elemento
	*/
	setFollow(follow:any):Observable<any>{
		const params = JSON.stringify(follow);
		const headers = JSONHeaders.set(
			'Authorization',
			'Bearer ' + this.getToken()
		);
		const route = this.url+'api/v1/user/follow/create';
		return this.http.post(route, params, {headers});
	}

	/*
	quitar el follos a determinado elemento
	*/
	quitFollow(followid: any):Observable<any> {
		const params = JSON.stringify(followid);
		const headers = JSONHeaders.set(
			'Authorization',
			'Bearer ' + this.getToken()
		);
		const route = this.url+'api/v1/user/follow/delete';
		return this.http.put(route, params, {headers});
	}
	/*
	metodo para modificar los datos del usuario
	*/
	userModify(person: any):Observable<any> {
		const params = JSON.stringify(person);
		const headers = JSONHeaders.set(
			'Authorization',
			'Bearer ' + this.getToken()
		);
		const route = this.url+'api/v1/user/modify';
		return this.http.put(route, params, {headers});
	}
}
